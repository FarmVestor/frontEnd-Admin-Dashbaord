import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import MDSnackbar from "components/MDSnackbar";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import { useRequest } from "lib/functions";
import NativeSelect from '@mui/material/NativeSelect';




function EditRquest() {
    const request = useRequest()


    const [requestData, setRequestData] = useState({
        FarmKind: {
            id:null
                  },
        farmArea: "",
        budget: "",
        Crop:{
            id:null
        },
        User:{
            id:null
        },
    })
    const { id } = useParams()

    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}requests/${id}`, {}, {}, {
            auth: true,
        }, 'get').then(currentRequest => {
            setRequestData(currentRequest.data)
            })
                       
    }, [])
    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_URL}requests/${id}`,{
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + ctx.token
    //         },
    //     })
    //         .then(response => {
    //             response.json().then(currentRequest => {
    //                 setRequestData(currentRequest.data)
    //             })
    //         })
    //         .catch(e => e)
    // }, [])

    const ctx = useContext(AuthContext)

    const [serverResponse, setServerResponse] = useState(" ")
    const [snackBarType, setSnackBarType] = useState("success")
    const [openSnackBar, setOpenSnackBar] = useState(false)

    const closeSnackBar = () => setOpenSnackBar(false);

    const [farmKindData, setFarmKindData] = useState([]) //all farm kind
    const [cropsData, setCropsData] = useState([]) // all crops
    const [usersData, setUsersData] = useState([]) // all users

    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}users`, {}, {}, {
            auth: true,
        }, 'get').then(users => {
            setUsersData(users.data)
        })
    
    }, [])
    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_URL}users`,{
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + ctx.token
    //         },
    //     })
        
    //         .then(response => {
    //             response.json().then(users => {
    //                 setUsersData(users.data)
    //             })
    //         })
    // }, [])
    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}farms/farmKinds/all`, {}, {}, {
            auth: true,
        }, 'get').then(farmKinds => {
            setFarmKindData(farmKinds.data)
        })
    
    }, [])

    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_URL}farms/farmKinds/all`,{
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + ctx.token
    //         },
    //     })
        
    //         .then(response => {
    //             response.json().then(farmKinds => {
    //                 setFarmKindData(farmKinds.data)
    //             })
    //         })
    // }, [])

    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}farms/crops/all`, {}, {}, {
            auth: true,
        }, 'get').then(crops => {
            setCropsData(crops.data)
        })
    
    }, [])
    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_URL}farms/crops/all`,{   
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + ctx.token
    //         },
    //     })
    //     .then(response => {
    //         response.json().then(crops => {
    //             setCropsData(crops.data)
    //              })
    //          })
    // }, [])
    const savePlace = () => {
        request(`${process.env.REACT_APP_API_URL}requests/${id}`, {}, {
            farmArea:requestData?.farmArea,
            budget:requestData?.budget,
            farmKindId:requestData?.FarmKind?.id,
            cropId:requestData?.Crop?.id,
            userId:requestData?.User?.id
        }, {
            auth: true,
            type: 'json',
            snackbar: true
        }, 'put').then(result => {
                    console.log(result)
        })
    //     fetch(`${process.env.REACT_APP_API_URL}requests/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + ctx.token
    //         },
    //         body: JSON.stringify({
    //             farmArea:requestData?.farmArea,
    //             budget:requestData?.budget,
    //             farmKindId:requestData?.FarmKind?.id,
    //             cropId:requestData?.Crop?.id,
    //             userId:requestData?.userId
    //           }),
    //     }).then(response => response.json())
    //         .then(result => {
    //             console.log(result)
    //             setServerResponse(result.messages.join(' '))
    //             if (result.success) {
    //                 setSnackBarType('success')
    //             } else {
    //                 setSnackBarType('error')
    //             }
    //             setOpenSnackBar(true)
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    }

    const updateRequestData = (obj) => {
        setRequestData({
            ...requestData,
            ...obj
        })
    }

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
                                <MDTypography variant="h6" color="white">
                                    Edit Request
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">
                                    <MDBox mb={2}>
                                        <MDInput onChange={(e) => {updateRequestData({farmArea: e.target.value})}} type="text" label="farmArea" variant="standard" fullWidth value={requestData.farmArea} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput onChange={(e) => {updateRequestData({budget: e.target.value})}} type="text" label="Budget" variant="standard" fullWidth value={requestData.budget} />
                                    </MDBox>
                                        
                                    {/* <MDBox mb={2}> */}
                                        {/* <Box sx={{ minWidth: 120 }}> */}
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native">Farm Kind</InputLabel>
                                                <NativeSelect
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={requestData?.FarmKind?.id}
                                                    label="Farm Kind"
                                                    // style={{padding: '20px 0'}}
                                                    onChange={(e) => {updateRequestData({FarmKind: {id:e.target.value}})}}
                                                >
                                                    <option></option>
                                                    {farmKindData.map((farmkind, i) => {
                                                        return <option value={farmkind?.id} key={i}>{farmkind?.farmKind}</option>
                                                    })}
                                                    {console.log("----requestData",requestData?.FarmKind?.id)}
                                                </NativeSelect>
                                            </FormControl>
                                        {/* </Box> */}
                                    {/* </MDBox> */}

                                    {/* <MDBox mb={2}> */}
                                        {/* <Box sx={{ minWidth: 120 }}> */}
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native">crops Kind</InputLabel>
                                                <NativeSelect
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={requestData?.Crop?.id}
                                                    label="Farm Kind"
                                                    // style={{padding: '20px 0'}}
                                                    onChange={(e) => {updateRequestData({Crop: {id:e.target.value}})}}
                                                >
                                                    <option></option>
                                                    {cropsData.map((crop, i) => {
                                                        return <option value={crop.id} key={i}>{crop.cropName}</option>
                                              
                                                    })}
                                                </NativeSelect>
                                            </FormControl>
                                        {/* </Box> */}
                                    {/* </MDBox> */}

                                    {/* <MDBox mb={2}> */}
                                        {/* <Box sx={{ minWidth: 120 }}> */}
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native">users</InputLabel>
                                                <NativeSelect
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={requestData?.User?.id}
                                                    label="Farm Kind"
                                                    // style={{padding: '20px 0'}}
                                                    onChange={(e) => {updateRequestData({User: {id:e.target.value}})}}
                                                >
                                                    <option></option>
                                                         {usersData.map((user, i) => {
                                                        return <option value={user.id} key={i}>{user.userName}</option>
                                                    })}
                                                </NativeSelect>
                                            </FormControl>
                                        {/* </Box> */}
                                    {/* </MDBox> */}
  
                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="info" fullWidth onClick={savePlace}>
                                            Save Place
                                        </MDButton>
                                    </MDBox>
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <MDSnackbar
                color={snackBarType}
                icon={snackBarType == 'success' ? 'check' : 'warning'}
                title="Places App"
                content={serverResponse}
                open={openSnackBar}
                // onClose={closeSnackBar}
                close={closeSnackBar}
                dateTime=""
                bgWhite
            />
            <Footer />
        </DashboardLayout>
    )
}
export default EditRquest