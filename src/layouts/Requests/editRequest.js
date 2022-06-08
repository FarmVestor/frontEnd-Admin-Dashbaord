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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useParams } from "react-router-dom";
import { useRequest } from "lib/functions";
import NativeSelect from '@mui/material/NativeSelect';




function EditRquest() {
    const request = useRequest()


    const [requestData, setRequestData] = useState({
        farmKindId:null,
        farmArea: "",
        budget: "",
        cropId:null,
        userId:null,
    })
    const { id } = useParams()

    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}requests/${id}`, {}, null, {
            auth: true,
        }, 'get').then(currentRequest => {
            setRequestData(currentRequest.data)
            })
                       
    }, [])

   

    const [farmKindData, setFarmKindData] = useState([]) //all farm kind
    const [cropsData, setCropsData] = useState([]) // all crops
    const [usersData, setUsersData] = useState([]) // all users

    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}users`, {}, null, {
            auth: true,
        }, 'get').then(users => {
            setUsersData(users.data)
        })
    
    }, [])
    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}farms/farmKinds/all`, {}, null, {
            auth: true,
        }, 'get').then(farmKinds => {
            setFarmKindData(farmKinds.data)
        })
    
    }, [])


    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}farms/crops/all`, {}, null, {
            auth: true,
        }, 'get').then(crops => {
            setCropsData(crops.data)
        })
    
    }, [])
    const savePlace = () => {
        request(`${process.env.REACT_APP_API_URL}requests/${id}`, {}, {
            farmArea:requestData?.farmArea,
            budget:requestData?.budget,
            farmKindId:requestData?.farmKindId,
            cropId:requestData?.cropId,
            userId:requestData?.userId
        }, {
            auth: true,
            type: 'json',
            snackbar: true,
            redirect:"/requests"
        }, 'put').then(result => {
                    console.log(result)
        })
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
                                                    value={requestData?.farmKindId}
                                                    label="Farm Kind"
                                                    // style={{padding: '20px 0'}}
                                                    onChange={(e) => {updateRequestData({FarmKindId:e.target.value})}}
                                                >
                                                    <option></option>
                                                    {farmKindData.map((farmkind, i) => {
                                                        return <option value={farmkind?.id} key={i}>{farmkind?.farmKind}</option>
                                                    })}
                                                    {/* {console.log("----requestData",requestData?.FarmKind?.id)} */}
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
                                                    value={requestData?.cropId}
                                                    label="Farm Kind"
                                                    // style={{padding: '20px 0'}}
                                                    onChange={(e) => {updateRequestData({cropId:e.target.value})}}
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
                                                    value={requestData?.userId}
                                                    label="Farm Kind"
                                                    // style={{padding: '20px 0'}}
                                                    onChange={(e) => {updateRequestData({userId: e.target.value})}}
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
                                            Save Request
                                        </MDButton>
                                    </MDBox>
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            
            <Footer />
        </DashboardLayout>
    )
}
export default EditRquest