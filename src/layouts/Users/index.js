import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import { useEffect, useState, useContext } from "react";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";

import { Link, useParams } from "react-router-dom";

// Authentication layout components
import BasicLayout from "./BasicLayout";
import { useRequest } from "lib/functions";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


function Users() {

    const columns = [
        { headerName: "ID", field: "id", width: 60, align: "left" },
        { headerName: "name", field: "name", width: 130, align: "left" },
        { headerName: "city", field: "city", width: 130, align: "left" },
        { headerName: "email", field: "email", width: 230, align: "left" },
        {
            headerName: "actions", field: "actions", width: 230, align: "center", renderCell: (params) => {
                return <>
                    <MDButton variant="text" color="error" onClick={() => { deleteUser(params.id) }}>
                        <Icon>delete</Icon>&nbsp;delete
                    </MDButton>
                    <Link to={`/users/edit/${params.id}`}>
                        <MDButton variant="text" color="info">
                            <Icon>edit</Icon>&nbsp;edit
                        </MDButton>
                    </Link>
                </>
            }
        },
    ]

    const { id, name } = useParams()
    id ? id : null
    const request = useRequest()
    const [rows, setRows] = useState([])
    const deleteUser = (userId) => {
        if (window.confirm('Are you sure')) {
            request(`${process.env.REACT_APP_API_URL}users/${userId}?deleted=${1}`, {}, null, {
                auth: true,
                snackbar: true,
            }, 'delete').then(() => {
                const updatedRows = rows.filter((row) => row.id != userId)
                setRows(updatedRows)
            })
        }

    }
    useEffect(() => {

        request(`${process.env.REACT_APP_API_URL}users?type=${id}`, {}, null, {
            auth: true,
        }, 'get')
            .then(users => {
                const allusers = users?.data?.map((user) => {
                    // console.log(user)
                    return {
                        id: user.id,
                        name: user.userName,
                        city: user.City?.cityName,
                        email: user.userEmail,

                    }
                })
                setRows(allusers)

            })
    }, [id])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <BasicLayout >

                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Card style={{ backgroundColor: "#ECFFDC" }}>
                                <MDBox
                                    mx={2}
                                    mt={-3}
                                    py={3}
                                    px={2}
                                    variant="gradient"
                                    bgColor="info"
                                    borderRadius="lg"
                                    coloredShadow="info"
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                         <MDTypography variant="h6" color="white">
                                            {name} Table
                                        </MDTypography>


                                        <Link to='/users/add'>
                                            <MDButton variant="text">
                                                <Icon>add_circle</Icon>&nbsp;Add
                                            </MDButton>
                                        </Link>
                                    </Grid>

                                </MDBox>
                                <MDBox height="70vh" pt={3}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        components={{ Toolbar: GridToolbar }}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection
                                    />
                                </MDBox>
                            </Card>
                        </Grid>
                    </Grid>
                </MDBox>
                <Footer />
            </BasicLayout>
        </DashboardLayout>
    );
}

export default Users;