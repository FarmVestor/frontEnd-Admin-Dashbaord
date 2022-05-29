import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Box from '@mui/material/Box';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import MDSnackbar from "components/MDSnackbar";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

// import MenuItem from '@mui/material/MenuItem';

// import { Wrapper, Status } from "@googlemaps/react-wrapper";/

function AddRequest() {
    const [farmKindData, setfarmKindData] = useState([])
    const [farmKind, setfarmKind] = useState()

    const [crop, setcrop] = useState([])
    const [cropId, setcropId] = useState()


    const farmAreaeRef = useRef(null)
    const budgetRef = useRef(null)
    // const farmKindsRef = useRef(null)

    const ctx = useContext(AuthContext)

    const [serverResponse, setServerResponse] = useState(" ")
    const [snackBarType, setSnackBarType] = useState("success")
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const closeSnackBar = () => setOpenSnackBar(false);

    // const [categoriesData, setCategoriesData] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}farms/farmKinds/all`)
            .then(response => {
                response.json().then(FarmKinds => {
                    console.log(FarmKinds.data)
                    setfarmKindData(FarmKinds.data)
                })
            })
    }, [])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}farms/crops/all`)
            .then(response => {
                response.json().then(Crops => {
                    console.log(Crops.data)
                    setcrop(Crops.data)
                })
            })
    }, [])
    const saveRequest = () => {
        const farmArea = farmAreaeRef.current.querySelector('input[type=number]').value
        const budget = budgetRef.current.querySelector('input[type=text]').value

        fetch(`${process.env.REACT_APP_API_URL}requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + ctx.token
            },
            body: JSON.stringify({
                farmArea:farmArea,
                budget:budget,
                farmKindId:farmKind,
                cropId:cropId
              }),
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                setServerResponse(result.messages.join(' '))
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
    const handlefarmKindsRefChange = (event) => {
        setfarmKind(event.target.value)
    }
    const handlecropsRefChange = (event) => {
        setcropId(event.target.value)
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
                                    Add Request
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">
                                    <MDBox mb={2}>
                                        <MDInput type="number" label="farm Areae" variant="standard" fullWidth ref={farmAreaeRef} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput type="text" label="budget" variant="standard" fullWidth ref={budgetRef} />
                                    </MDBox>
                                  
                                         <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Farm Kind
                                        </InputLabel>
                                        <NativeSelect
                                            defaultValue={1}
                                            inputProps={{
                                                name: 'farmKinds',
                                                id: 'uncontrolled-native',
                                            }}
                                            onChange={handlefarmKindsRefChange}
                                        >
                                            {farmKindData?.map((farmKind,i)=> <option value={farmKind.id} key={i}>{farmKind.farmKind}</option> )}
                                        </NativeSelect>
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Crops
                                        </InputLabel>
                                        <NativeSelect
                                            defaultValue={1}
                                            inputProps={{
                                                name: 'crop',
                                                id: 'uncontrolled-native',
                                            }}
                                            onChange={handlecropsRefChange}
                                        >
                                            {crop?.map((crop,i)=> <option value={crop.id} key={i}>{crop.cropName}</option> )}
                                        </NativeSelect>
                                    </FormControl>

                                    
                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="info" fullWidth onClick={saveRequest}>
                                            Save Request
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
export default AddRequest