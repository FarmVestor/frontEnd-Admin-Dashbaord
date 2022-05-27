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

import { AuthContext } from "context/AuthContext";
import { Link } from "react-router-dom";

// Authentication layout components
import BasicLayout from "./BasicLayout";
import { useRequest } from "lib/functions";

const columns = [
    { Header: "name", accessor: "name", width: "45%", align: "left" },
    { Header: "email", accessor: "email", align: "left" },
    { Header: "actions", accessor: "actions", align: "center" },
]

function Users() {
    const request=useRequest()
    const [rows, setRows] = useState([])
    const ctx = useContext(AuthContext)
console.log(ctx)
    const deleteUser = (userId) => {
        if (window.confirm('Are you sure')) {
            request(`${process.env.REACT_APP_API_URL}users/${userId}`, {}, {}, {
                auth: true,
                
                snackBar:true
                
            }, 'delete')
        }
        // if (window.confirm('Are you sure')) {
        //     fetch(`${process.env.REACT_APP_API_URL}users/${userId}`, {
        //         method: "DELETE",
        //         headers: {
        //             'Authorization': 'Bearer ' + ctx.token
        //         }
        //     }).then(response => {
        //         response.json()
        //             .then(deleted => {
        //                 console.log(deleted)
        //             })
        //     })
        //         .catch(e => e)
        // }
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}users`, {
            headers: {
                'Authorization': 'Bearer ' + ctx.token
            }
        })
            .then(response => {
                response.json().then(users => {
                    const allusers = users.data.map((user) => {
                        return {
                            name: <>{user.userName}</>,
                            email: <>{user.userEmail}</>,
                            actions: <>
                                <MDButton variant="text" color="error" onClick={() => { deleteUser(user.id) }}>
                                    <Icon>delete</Icon>&nbsp;delete
                                </MDButton>
                                <Link to={`/users/edit/${user.id}`}>
                                    <MDButton variant="text" color="info">
                                        <Icon>edit</Icon>&nbsp;edit
                                    </MDButton>
                                </Link>
                            </>,
                        }
                    })
                    setRows(allusers)
                })
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
                                        users Table
                                    </MDTypography>
                                    <Link to='/users/add'>
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
                                    entriesPerPage={false}
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

export default Users;