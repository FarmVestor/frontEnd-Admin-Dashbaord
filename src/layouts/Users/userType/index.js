import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState, useContext } from "react";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";

import { Link } from "react-router-dom";

// Authentication layout components
import BasicLayout from "../BasicLayout";
import { useRequest } from "lib/functions";


const columns = [
    { Header: "name", accessor: "name", width: "45%", align: "left" },

    { Header: "actions", accessor: "actions", align: "center" },
]

function UserTypes() {
    const [order, setOrder] = useState('ASC')
    const request = useRequest()
    const [rows, setRows] = useState([])

    const deleteUserType = (userId) => {
        // console.log(userId)
        if (window.confirm('Are you sure')) {
            request(`${process.env.REACT_APP_API_URL}users/userType/${userId}?deleted=${1}`, {}, null, {
                auth: true,
                snackbar: true

            }, 'delete').then(data => {
                // console.log(data.messages)
                // const updatedRows = rows.filter((row) => row.id != userId)
                // setRows(updatedRows)
            })
        }

    }

    useEffect(() => {

        request(`${process.env.REACT_APP_API_URL}users/userType/all`, {}, null, {
            auth: true,
        }, 'get')
            .then(userTypes => {

                const alluserTypes = userTypes.data.map((userType) => {
                    return {
                        name: <>{userType.userType}</>,

                        actions: <>
                            <MDButton variant="text" color="error" onClick={() => { deleteUserType(userType.id) }}>
                                <Icon>delete</Icon>&nbsp;delete
                            </MDButton>
                            <Link to={`/users/userType/edit/${userType.id}`}>
                                <MDButton variant="text" color="info">
                                    <Icon>edit</Icon>&nbsp;edit
                                </MDButton>
                            </Link>
                        </>,
                    }
                })
                setRows(alluserTypes)

            })
    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <BasicLayout >

                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Card>
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
                                            userTypes Table
                                        </MDTypography>


                                        <Link to='/users/userType/add'>
                                            <MDButton variant="text">
                                                <Icon>add_circle</Icon>&nbsp;Add
                                            </MDButton>
                                        </Link>
                                    </Grid>

                                </MDBox>
                                <MDBox pt={3}>

                                    <DataTable
                                        table={{ columns, rows }}

                                        isSorted={false}
                                        canSearch={true}
                                        entriesPerPage={true}
                                        showTotalEntries={false}
                                        noEndBorder
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

export default UserTypes;