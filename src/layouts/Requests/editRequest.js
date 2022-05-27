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


function EditRquest() {

    const [requestData, setRequestData] = useState({
        FarmKind: {
            id:null
        },
        farmArea: "",
        budget: "",
        Crop:{
            id:null
        },
    })
    const { id } = useParams()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}requests/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + ctx.token
            },
        })
            .then(response => {
                response.json().then(currentRequest => {
                    setRequestData(currentRequest.data)
                })
            })
            .catch(e => e)
    }, [])

    const ctx = useContext(AuthContext)

    const [serverResponse, setServerResponse] = useState(" ")
    const [snackBarType, setSnackBarType] = useState("success")
    const [openSnackBar, setOpenSnackBar] = useState(false)

    const closeSnackBar = () => setOpenSnackBar(false);

    const [farmKindData, setFarmKindData] = useState([]) //all farm kind
    const [cropsData, setCropsData] = useState([]) // all crops

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}farms/farmKinds/all`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + ctx.token
            },
        })
        
            .then(response => {
                response.json().then(farmKinds => {
                    setFarmKindData(farmKinds.data)
                })
            })
    }, [])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}farms/crops/all`,{   
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + ctx.token
            },
        })
        .then(response => {
            response.json().then(crops => {
                setCropsData(crops.data)
                 })
             })
    }, [])
    const savePlace = () => {

        fetch(`${process.env.REACT_APP_API_URL}requests/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + ctx.token
            },
            body: JSON.stringify({
                farmArea:requestData?.farmArea,
                budget:requestData?.budget,
                farmKindId:requestData?.FarmKind?.id,
                cropId:requestData?.Crop?.id
              }),
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                setServerResponse(result.message.join(' '))
                if (result.success) {
                    setSnackBarType('success')
                } else {
                    setSnackBarType('error')
                }
                setOpenSnackBar(true)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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
{                                    console.log("requestData",requestData?.FarmKind?.id)
}
                                    <MDBox mb={2}>
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Farm Kind</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={requestData?.FarmKind?.id}
                                                    label="Farm Kind"
                                                    style={{padding: '20px 0'}}
                                                    onChange={(e) => {updateRequestData({FarmKind: {id:e.target.value}})}}
                                                >
                                                    {farmKindData.map((farmkind, i) => {
                                                        return <MenuItem value={farmkind.id} key={i}>{farmkind.farmKind}</MenuItem>
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </MDBox>

                                    <MDBox mb={2}>
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">crops Kind</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={requestData?.Crop?.id}
                                                    label="Farm Kind"
                                                    style={{padding: '20px 0'}}
                                                    onChange={(e) => {updateRequestData({Crop: {id:e.target.value}})}}
                                                >
                                                    {cropsData.map((crop, i) => {
                                                        return <MenuItem value={crop.id} key={i}>{crop.cropName}</MenuItem>
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </MDBox>
  
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