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

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import NativeSelect from '@mui/material/NativeSelect';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';

const columns = [
    { Header: "Country", accessor: "Country", width: "70%", align: "left" },

    { Header: "actions", accessor: "actions", align: "center" },
]
const GovColumns = [
    { Header: "Governrate", accessor: "Governrate", width: "35%", align: "left" },
    { Header: "Country", accessor: "Country", width: "35%", align: "left" },
    { Header: "actions", accessor: "actions", align: "center" },
]


function Adresses() {
    const CityColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: "City", headerName: "City", width: 160, align: "left" },
        { field: "Governrate", headerName: "Governrate", width: 160, align: "left" },
        { field: "Country", headerName: "Country", width: 160, align: "left" },

        {
            field: "actions", headerName: "actions", width: 260, align: "center", renderCell: (params) => {
                return <>
                    <MDButton variant="text" color="error" onClick={() => { deleteRow(params.id) }}>
                        <Icon>delete</Icon>&nbsp;delete
                    </MDButton>
                    <Link to={`/addresses/city/edit/${params.id}`}>
                        <MDButton variant="text" color="info">
                            <Icon>edit</Icon>&nbsp;edit
                        </MDButton>
                    </Link>
                </>
            }
        },
    ]
    const [order, setOrder] = useState('ASC')
    const request = useRequest()
    const [rows, setRows] = useState([])
    const [GovRows, setGovRows] = useState([])
    const [CityRows, setCityRows] = useState([])

    const deleteRow = (userId, row) => {
        console.log(userId)
        if (window.confirm('Are you sure')) {
            request(`${process.env.REACT_APP_API_URL}addresses/city/${userId}`, {}, null, {
                auth: true,
                snackbar: true

            }, 'delete').then(data => {
                console.log(data.messages)
            })
        }

    }

    useEffect(() => {

        request(`${process.env.REACT_APP_API_URL}addresses/city`, {}, null, {
            auth: true,

            snackbar: true

        }, 'get')
            .then(cities => {

                const allcities = cities?.data?.map((city) => {
                    return {
                        id: city.id,
                        City: city.cityName,
                        Governrate: city.Governrate.governrateName,
                        Country: city.Governrate.Country.countryName,
                    }
                })
                setCityRows(allcities)

            })
    }, [order])
    return (
        <DashboardLayout>
            <DashboardNavbar />


            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>

                        {/* show Countries Table */}
                        {/* <Card mb={10}>
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
                                        Countries Table
                                    </MDTypography>


                                    <Link to='/addresses/country/add'>
                                        <MDButton variant="text">
                                            <Icon>add_circle</Icon>&nbsp;Add
                                        </MDButton>
                                    </Link>
                                </Grid>

                            </MDBox>
                            <MDBox pt={3} mb={10} >

                                <DataTable
                                    table={{ columns, rows }}

                                    isSorted={false}
                                    canSearch={true}
                                    entriesPerPage={true}
                                    showTotalEntries={false}
                                    noEndBorder
                                />

                            </MDBox>

                        </Card> */}

                        {/* show Governrate Tables */}
                        {/* <Card>
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
                                        Governrates Table
                                    </MDTypography>


                                    <Link to='/addresses/governrate/add'>
                                        <MDButton variant="text">
                                            <Icon>add_circle</Icon>&nbsp;Add
                                        </MDButton>
                                    </Link>
                                </Grid>

                            </MDBox >
                            <MDBox pt={3} mb={10}>

                                <DataTable
                                    table={{ columns: GonColumns, rows: GovRows }}

                                    isSorted={false}
                                    canSearch={true}
                                    entriesPerPage={true}
                                    showTotalEntries={false}
                                    noEndBorder
                                />

                            </MDBox>
                        </Card>

 */}

                        {/* show cities Table */}
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
                                        Cities Table
                                    </MDTypography>


                                    <Link to='/addresses/city/add'>
                                        <MDButton variant="text">
                                            <Icon>add_circle</Icon>&nbsp;Add
                                        </MDButton>
                                    </Link>
                                </Grid>

                            </MDBox >


                            <MDBox height="70vh" pt={3}>
                                <DataGrid
                                    rows={CityRows}
                                    columns={CityColumns}
                                    components={{ Toolbar: GridToolbar }}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                />
                            </MDBox>
                            {/* <DataTable
                                    table={{ columns: CityColumns, rows: CityRows }}

                                    isSorted={false}
                                    canSearch={true}
                                    entriesPerPage={true}
                                    showTotalEntries={false}
                                    noEndBorder
                                /> 
                                 */}



                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />

        </DashboardLayout>
    );
}

export default Adresses;