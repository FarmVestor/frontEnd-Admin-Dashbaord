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
import { useRequest } from "lib/functions";


import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

const columns = [
    { Header: "Farm Name", accessor: "farmName", align: "left" },
    { Header: "Farmer Name", accessor: "farmerName", align: "left" },
    { Header: "Partner Name", accessor: "partnerName", align: "left" },
    { Header: "Partner Type", accessor: "partnerType", align: "left" },


    { Header: "Deal Price", accessor: "dealPrice", align: "left" },
    { Header: "Deal Status", accessor: "dealStatus", align: "left" },
    { Header: "actions", accessor: "actions", align: "center" },
]

function Deals() {
    const [order, setOrder] = useState('ASC')
    const { id } = useParams()
    const request = useRequest()
    const [rows, setRows] = useState([])
    const deleteDeal = (userId) => {
        if (window.confirm('Are you sure')) {
            request(`${process.env.REACT_APP_API_URL}deals/${userId}`, {}, {}, {
                auth: true,

                snackbar: true

            }, 'delete').then(data => {
                console.log(data.messages)
            })
        }

    }

    useEffect(() => {

        request(`${process.env.REACT_APP_API_URL}deals?order=${order}`, {}, {}, {
            auth: true,

            snackbar: true

        }, 'get')
            .then(deals => {
                // console.log("deal data", deals)

                const alldeals = deals.data.map((deal) => {
                    console.log("deal data", deal)
                    return {
                        farmName: <>{deal.Farm?.farmName}</>,
                        farmerName: <>{deal.Farm?.User?.userName}</>,
                        partnerName: <>{deal.agentId ? deal.agent?.userName : deal.investor?.userName}</>,
                        partnerType: <>{deal.agentId ? "Agent" : "Investor"}</>,
                        dealPrice: <>{deal.dealPrice}</>,
                        dealStatus: <>{deal.dealStatus ? <CheckIcon /> : <NotInterestedIcon />}</>,
                        actions: <>
                            <MDButton variant="text" color="error" onClick={() => { deleteDeal(deal.id) }}>
                                <Icon>delete</Icon>&nbsp;delete
                            </MDButton>
                            <Link to={`/deals/edit/${deal.id}`}>
                                <MDButton variant="text" color="info">
                                    <Icon>edit</Icon>&nbsp;edit
                                </MDButton>
                            </Link>
                        </>,
                    }
                })
                setRows(alldeals)

            })
    }, [order])
    return (
        <DashboardLayout>
            <DashboardNavbar />


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
                                        Deals Table
                                    </MDTypography>


                                    <Link to='/deals/add'>
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

        </DashboardLayout>
    );
}

export default Deals;