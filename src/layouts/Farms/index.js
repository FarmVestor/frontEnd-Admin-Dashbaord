import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import { useContext, useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import { useRequest } from "lib/functions";
import { Link } from "react-router-dom";

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { AppContext } from "context/AppContext";
import App from "App";

// const rows = []

function Farms() {
    const AppCtx = useContext(AppContext)
    const columns = [
        { headerName: "Id", field: "id", width: 60, align: "left" },
        { headerName: "Farmer Name", field: "farmerName", width: 130, align: "left" },
        { headerName: "farm Name", field: "farmName", width: 130, align: "left" },
        {
            headerName: "farm Picture", field: "farmPicture", width: 130, align: "left", renderCell: (params) => {
                return <> <img src={params.value} width="80" /> </>
            }
        },
        { headerName: "city", field: "city", width: 130, align: "left" },
        { headerName: "farm Area", field: "farmArea", width: 130, align: "left" },
        { headerName: "crop Name", field: "cropId", width: 130, align: "left" },
        { headerName: "farm License", field: "farmLicense", width: 130, align: "left" },
        {
            headerName: "farm Available", field: "farmAvailable", width: 130, align: "left", renderCell: (params) => {
                return <>{params.value ? <CheckIcon /> : <NotInterestedIcon />}</>
            }
        },
        { headerName: "farm KindId", field: "farmKindId", width: 130, align: "left" },
        {
            headerName: "farm Visibiltiy", field: "farmVisibiltiy", width: 130, align: "left", renderCell: (params) => {
                return <>{params.value ? <VisibilityIcon /> : <VisibilityOffIcon />}</>
            }
        },
        { headerName: "farm WaterSalinity", field: "farmWaterSalinity", width: 130, align: "left" },
        { headerName: "farm LastCropsId", field: "farmLastCropsId", width: 130, align: "left" },
        { headerName: "farm Fertilizer", field: "farmFertilizer", width: 130, align: "left" },
        { headerName: "farm TreesAge", field: "farmTreesAge", width: 130, align: "left" },
        { headerName: "farm Description", field: "farmDescription", width: 130, align: "left" },
        {
            headerName: "actions", field: "actions", width: 230, align: "center", renderCell: (params) => {
                return <>
                    <MDButton variant="text" color="error" onClick={() => { deleteFarm(params.id) }}>
                        <Icon>delete</Icon>&nbsp;delete
                    </MDButton>
                    <Link to={`/farms/edit/${params.id}`}>
                        <MDButton variant="text" color="success">
                            <Icon>edit</Icon>&nbsp;edit
                        </MDButton>
                    </Link>
                    <Link to={`/deals/add/${params.id}`}>
                        <MDButton variant="text" color="info">
                            <Icon>person</Icon>&nbsp;Deal
                        </MDButton>
                    </Link>
                </>
            }
        },
    ]

    const [rows, setRows] = useState([])
    const request = useRequest()
    

    const deleteFarm = (farmId) => {
        if (window.confirm('Are you sure')) {
            request(`${process.env.REACT_APP_API_URL}farms/${farmId}?deleted=${1}`, {}, null, {
                auth: true,
                snackbar: true,

            }, 'delete')
                .then(deleted => {
                    // console.log(deleted)
                    const updatedRows = rows.filter((row) => row.id != farmId)
                    setRows(updatedRows)
                })
        }
    }

    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}farms`, {}, null, {
            auth: true,
        }, 'get')
            .then(farms => {
                // console.log("farm", farms.data.length)

                const allfarms = farms?.data?.map((farm) => {
                    // console.log("farm", farm)

                    return {
                        id: farm.id,
                        farmerName: farm.User.userName,
                        farmName: farm.farmName,
                        farmPicture: farm.farmPicture,
                        city: farm.City?.cityName,
                        farmArea: farm.farmArea,
                        cropId: farm.Crop.cropName,
                        farmLicense: farm.farmLicense,
                        farmAvailable: farm.farmAvailable,
                        farmKindId: farm.FarmKind?.farmKind ? farm.FarmKind?.farmKind : "-",
                        farmVisibiltiy: farm.farmVisibiltiy,
                        farmWaterSalinity: farm.farmWaterSalinity,
                        farmLastCropsId: farm.LastCrop.cropName,
                        farmFertilizer: farm.farmFertilizer,
                        farmTreesAge: farm.farmTreesAge,
                        farmDescription: farm.farmDescription,

                    }
                })
                setRows(allfarms)

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
                                        farms Table
                                    </MDTypography>
                                    <Link to='/farms/add'>
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
                                {/* <DataTable
                                    table={{ columns, rows }}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                /> */}
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Farms;