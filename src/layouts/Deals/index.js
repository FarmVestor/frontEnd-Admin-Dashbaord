import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import { Link, useParams } from "react-router-dom";
import { useRequest } from "lib/functions";
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function Deals() {

    const columns = [
        { headerName: "ID", field: "id", width: 60, align: "left" },

        { headerName: "Farm Name", field: "farmName", width: 130, align: "left" },
        { headerName: "Farmer Name", field: "farmerName", width: 130, align: "left" },
        { headerName: "Partner Name", field: "partnerName", width: 130, align: "left" },
        { headerName: "Partner Type", field: "partnerType", width: 130, align: "left" },
        { headerName: "Deal Price", field: "dealPrice", width: 130, align: "left" },
        {
            headerName: "Deal Status", field: "dealStatus", width: 130, align: "left", renderCell: (params) => {
                return <>{params.value ? <CheckIcon /> : <NotInterestedIcon />}</>
            }
        },
        {
            headerName: "actions", field: "actions", width: 230, align: "center", renderCell: (params) => {
                return <>
                    <MDButton variant="text" color="error" onClick={() => { deleteDeal(params.id) }}>
                        <Icon>delete</Icon>&nbsp;delete
                    </MDButton>
                    <Link to={`/deals/edit/${params.id}`}>
                        <MDButton variant="text" color="success">
                            <Icon>edit</Icon>&nbsp;edit
                        </MDButton>
                    </Link>
                </>
            }
        },
    ]

    const [order, setOrder] = useState('ASC')
    const { id } = useParams()
    const request = useRequest()
    const [rows, setRows] = useState([])
    const deleteDeal = (dealId) => {
        if (window.confirm('Are you sure')) {
            request(`${process.env.REACT_APP_API_URL}deals/${dealId}?deleted=${1}`, {}, null, {
                auth: true,
                snackbar: true
            }, 'delete').then(data => {
                // console.log(data.messages)
                const updatedRows=rows.filter((row)=>row.id != dealId)
                setRows(updatedRows)
            })
        }

    }

    useEffect(() => {

        request(`${process.env.REACT_APP_API_URL}deals`, {}, null, {
            auth: true,
        }, 'get')
            .then(deals => {
                // console.log("deal data", deals)

                const alldeals = deals?.data?.map((deal) => {
                    // console.log("deal data", deal)
                    return {
                        id:deal.id,
                        farmName: deal.Farm?.farmName,
                        farmerName: deal.Farm?.User?.userName,
                        partnerName: deal.agentId ? deal.agent?.userName : deal.investor?.userName,
                        partnerType: deal.agentId ? "Agent" : "Investor",
                        dealPrice: deal.dealPrice,
                        dealStatus: deal.dealStatus,

                    }
                })
                setRows(alldeals)

            })
    }, [])
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
                                bgColor="success"
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
                                
                                <MDBox height="70vh" pt={3}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        components={{ Toolbar: GridToolbar }}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection
                                        sx={{
                                            boxShadow: 2,
                                            border: 2,
                                            borderColor: 'success.light',
                                            '& .MuiDataGrid-cell:hover': {
                                              color: 'success.main',
                                            },
                                            color:'white.main'
                                          }}
                                    />
                                </MDBox>

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