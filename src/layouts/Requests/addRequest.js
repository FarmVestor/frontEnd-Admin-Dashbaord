import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Box from '@mui/material/Box';
import { useRequest } from "lib/functions";

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

    const [users, setUsers] = useState([0])
    const [userId, setUserId] = useState()


    const farmAreaeRef = useRef(null)
    const budgetRef = useRef(null)

    const ctx = useContext(AuthContext)
    const request = useRequest()


    const [serverResponse, setServerResponse] = useState(" ")
    const [snackBarType, setSnackBarType] = useState("success")
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const closeSnackBar = () => setOpenSnackBar(false);

    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}farms/farmKinds/all`, {}, {}, {
            auth: true,
        }, 'get').then(FarmKinds => {
            setfarmKindData(FarmKinds.data)
        })

    }, [])
    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_URL}farms/farmKinds/all`)
    //         .then(response => {
    //             response.json().then(FarmKinds => {
    //                 console.log(FarmKinds.data)
    //                 setfarmKindData(FarmKinds.data)
    //             })
    //         })
    // }, [])
    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}farms/crops/all`, {}, {}, {
            auth: true,
        }, 'get').then(Crops => {
            setcrop(Crops.data)
        })

    }, [])
    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_URL}farms/crops/all`)
    //         .then(response => {
    //             response.json().then(Crops => {
    //                 console.log(Crops.data)
    //                 setcrop(Crops.data)
    //             })
    //         })
    // }, [])

    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}users`, {}, {}, {
            auth: true,
        }, 'get').then(users => {
            setUsers(users.data)
        })

    }, [])
    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_URL}users`,{
    //          headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + ctx.token
    //         },  
    //     })
    //         .then(response => {
    //             response.json().then(users => {
    //                 console.log("users",users.data)
    //                 setUsers(users.data)
    //             })
    //         })
    // }, [])
    const saveRequest = () => {
        const farmArea = farmAreaeRef.current.querySelector('input[type=number]').value
        const budget = budgetRef.current.querySelector('input[type=text]').value

        request(`${process.env.REACT_APP_API_URL}requests`, {}, {
            farmArea: farmArea,
            budget: budget,
            farmKindId: farmKind,
            cropId: cropId,
            userId: userId


        }, {
            auth: true,
            type: 'json',
            snackbar: true
        }, 'post').then(result => {
            console.log(result)
        })
        // fetch(`${process.env.REACT_APP_API_URL}requests`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + ctx.token
        //     },
        //     body: JSON.stringify({
        //         farmArea:farmArea,
        //         budget:budget,
        //         farmKindId:farmKind,
        //         cropId:cropId,
        //         userId:userId
        //       }),
        // }).then(response => response.json())
        //     .then(result => {
        //         console.log(result)
        //         setServerResponse(result.messages.join(' '))
        //         if (result.success) {
        //             setSnackBarType('success')
        //         } else {
        //             setSnackBarType('error')
        //         }
        //         setOpenSnackBar(true)
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
    }
    const handlefarmKindsRefChange = (event) => {
        setfarmKind(event.target.value)
    }
    const handlecropsRefChange = (event) => {
        setcropId(event.target.value)
    }
    const handleusersRefChange = (event) => {
        setUserId(event.target.value)
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
                                            // defaultValue={1}
                                            inputProps={{
                                                name: 'farmKinds',
                                                id: 'uncontrolled-native',
                                            }}
                                            onChange={handlefarmKindsRefChange}
                                        >
                                            <option></option>
                                            {farmKindData?.map((farmKind, i) => <option value={farmKind.id} key={i}>{farmKind.farmKind}</option>)}
                                        </NativeSelect>
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Crops
                                        </InputLabel>
                                        <NativeSelect
                                            // defaultValue={1}
                                            inputProps={{
                                                name: 'crop',
                                                id: 'uncontrolled-native',
                                            }}
                                            onChange={handlecropsRefChange}
                                        >
                                            <option></option>

                                            {crop?.map((crop, i) => <option value={crop.id} key={i}>{crop.cropName}</option>)}
                                        </NativeSelect>
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Users
                                        </InputLabel>
                                        <NativeSelect
                                            // defaultValue={1}
                                            inputProps={{
                                                name: 'user',
                                                id: 'uncontrolled-native',
                                            }}
                                            onChange={handleusersRefChange}
                                        >
                                            <option></option>

                                            {users?.map((user, i) => <option value={user.id} key={i}>{user.userName}</option>)}
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