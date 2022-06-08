import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
// import BasicLayout from "./BasicLayout";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDButton from "components/MDButton";
// @mui material components
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
import { useRequest } from "lib/functions";

import { Link } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TrashTable from "./trashTable"
function MyTrash() {
    const requestsColumns = [
        { headerName: "Request Id", field: "id", width: 60, align: "left" },
        { headerName: "Farm Area", field: "farmArea", width: 130, align: "left" },
        { headerName: "Budget", field: "budget", width: 130, align: "left" },
        { headerName: "Crop Name", field: "cropName", width: 130, align: "left" },
        { headerName: "Farm Kind", field: "farmKind", width: 130, align: "left" },
        { headerName: "User Name", field: "userName", width: 130, align: "left" },
        {
            headerName: "actions", field: "actions", width: 230, align: "center", renderCell: (params) => {
                return <>
                    <MDButton variant="text" color="error" onClick={() => { undoDeleting(params.id, "requests") }}>
                        <Icon>undo</Icon>&nbsp;undo
                    </MDButton>
                </>
            }
        },
    ]
    const farmsColumns = [
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
        {
            headerName: "actions", field: "actions", width: 230, align: "center", renderCell: (params) => {
                return <>
                    <MDButton variant="text" color="error" onClick={() => { undoDeleting(params.id, "farms") }}>
                        <Icon>undo</Icon>&nbsp;undo
                    </MDButton>

                </>
            }
        },
    ]


    const usersColumns = [
        { headerName: "ID", field: "id", width: 60, align: "left" },
        { headerName: "name", field: "name", width: 130, align: "left" },
        { headerName: "city", field: "city", width: 130, align: "left" },
        { headerName: "email", field: "email", width: 230, align: "left" },
        { headerName: "userType", field: "userType", width: 230, align: "left" },

        {
            headerName: "actions", field: "actions", width: 230, align: "center", renderCell: (params) => {
                return <>
                    <MDButton variant="text" color="error" onClick={() => { undoDeleting(params.id, "users") }}>
                        <Icon>undo</Icon>&nbsp;undo
                    </MDButton>

                </>
            }
        },
    ]

    const CitiesColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: "City", headerName: "City", width: 160, align: "left" },
        { field: "Governrate", headerName: "Governrate", width: 160, align: "left" },
        { field: "Country", headerName: "Country", width: 160, align: "left" },

        {
            field: "actions", headerName: "actions", width: 260, align: "center", renderCell: (params) => {
                return <>
                    <MDButton variant="text" color="error" onClick={() => { undoDeleting(params.id, "addresses/city") }}>
                        <Icon>undo</Icon>&nbsp;undo
                    </MDButton>

                </>
            }
        },
    ]
    const [requestsRows, setRequestsRows] = useState([])
    const [citiesRows, setCitiesRows] = useState([])
    const [farmsRows, setFarmsRows] = useState([])
    const [usersRows, setUsersRows] = useState([])




    const request = useRequest()

    const undoDeleting = (id, route) => {
        if (window.confirm('Are you sure')) {
            request(`${process.env.REACT_APP_API_URL}${route}/${id}?deleted=${0}`, {}, null, {
                auth: true,
                snackbar: true
            }, 'delete')

        }

    }


    useEffect(() => {

        request(`${process.env.REACT_APP_API_URL}requests?deleted=${1}`, {}, null, {
            auth: true,
        }, 'get')
            .then(requests => {
                // console.log("deal data", deals)

                const allRequests = requests?.data?.map((request, i) => {
                    // console.log("request", request)

                    return {
                        id: request.id,
                        farmArea: request.farmArea,
                        budget: request.budget,
                        farmKind: request.FarmKind?.farmKind,
                        cropName: request.Crop?.cropName,
                        userName: request.User?.userName,

                    }
                })
                setRequestsRows(allRequests)
            })
    }, [])
    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}farms?deleted=${1}`, {}, null, {
            // auth: true,
        }, 'get')
            .then(farms => {
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
                setFarmsRows(allfarms)
            })

    }, [])

    //get deleted users
    useEffect(() => {

        request(`${process.env.REACT_APP_API_URL}users?deleted=${1}`, {}, null, {
            auth: true,
        }, 'get')
            .then(users => {
                // console.log(users)

                const allusers = users?.data?.map((user) => {
                    // console.log(user)
                    return {
                        id: user.id,
                        name: user.userName,
                        userType: user.UserType?.userType,
                        city: user.City?.cityName,
                        email: user.userEmail,

                    }
                })
                setUsersRows(allusers)

            })
    }, [])

    //get deleted cities 
    useEffect(() => {

        request(`${process.env.REACT_APP_API_URL}addresses/city?deleted=${1}`, {}, null, {
            auth: true,
        }, 'get')
            .then(cities => {

                const allcities = cities?.data?.map((city) => {
                    return {
                        id: city.id,
                        City: city.cityName,
                        Governrate: city.Governrate?.governrateName,
                        Country: city.Governrate?.Country?.countryName,
                    }
                })
                setCitiesRows(allcities)

            })
    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            {/* <BasicLayout > */}

            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <TrashTable rows={requestsRows} columns={requestsColumns} tableName="Requests" />
                    </Grid>
                    <Grid item xs={12}>
                        <TrashTable rows={farmsRows} columns={farmsColumns} tableName="Farms" />

                    </Grid>
                    <Grid item xs={12}>
                        <TrashTable rows={usersRows} columns={usersColumns} tableName="Users" />

                    </Grid>
                    <Grid item xs={12}>
                        <TrashTable rows={citiesRows} columns={CitiesColumns} tableName="Cities" />

                    </Grid>

                </Grid>
            </MDBox>
            <Footer />
            {/* </BasicLayout> */}

        </DashboardLayout>
    )
}
export default MyTrash;