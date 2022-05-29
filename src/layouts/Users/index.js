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

import { Link, useParams } from "react-router-dom";

// Authentication layout components
import BasicLayout from "./BasicLayout";
import { useRequest } from "lib/functions";


import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';

const columns = [
    { Header: "name", accessor: "name",  align: "left" },
    { Header: "city", accessor: "city",  align: "left" },

    { Header: "email", accessor: "email", align: "left" },
    { Header: "actions", accessor: "actions",width: "30%", align: "center" },
]

function Users() {
    const [order, setOrder] = useState('ASC')
    const { id } = useParams()
    const request = useRequest()
    const [rows, setRows] = useState([])
    const deleteUser = (userId) => {
        if (window.confirm('Are you sure')) {
            request(`${process.env.REACT_APP_API_URL}users/${userId}`, {}, {}, {
                auth: true,

                snackbar: true,
                

            }, 'delete')
        }

    }

    useEffect(() => {

        request(`${process.env.REACT_APP_API_URL}users?id=${id}&order=${order}`, {}, {}, {
            auth: true,
        }, 'get')
            .then(users => {
                const allusers = users?.data?.map((user) => {
                    console.log(user)
                    return {
                        name: <>{user.userName}</>,
                        city: <>{user.cityId}</>,
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
    }, [id, order])
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
                                <MDBox mb={2} p={2}>
                                        <FormControl fullWidth >
                                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                Order
                                            </InputLabel>
                                            <NativeSelect

                                                defaultValue={"ASC"}
                                                onChange={(e) => { setOrder(e.target.value) }}
                                                inputProps={{
                                                    name: 'UserType',
                                                    id: 'uncontrolled-native',
                                                }}

                                            >
                                                <option value="ASC" defaultValue >ASC</option>
                                                <option value="DESC" >DESC</option>

                                            </NativeSelect>
                                        </FormControl>
                                        
                                    </MDBox>
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

export default Users;