import { Link } from "react-router-dom";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDButton from "components/MDButton";


import MDInput from "components/MDInput";
import Checkbox from "@mui/material/Checkbox";


// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";

import { useRef, useState,useEffect } from "react";

import { useRequest } from "lib/functions";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

function AddUser() {
    const request = useRequest()

    const userNameRef = useRef(null)
    const userPhoneRef=useRef(null)
    const userEmailRef = useRef(null)
    const userPassRef = useRef(null)
    const userConfPassRef = useRef(null)
    const [Mssg, setMssg] = useState(' ')
const [userTypesData,setuserTypesData]=useState([])
const [userTypeId,setUserType]=useState(1)
    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}users/userType/all`, {}, {}, {
            auth: true,

            snackBar: true

        }, 'get').then(userTypes => {
                
            setuserTypesData(userTypes.data)

            })
    }, [])

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value)
    }

    const saveUser = () => {
        const userName = userNameRef.current.querySelector('input[type=text]').value
        const userPhone = userPhoneRef.current.querySelector('input[type=number]').value

        const userEmail = userEmailRef.current.querySelector('input[type=email]').value
        const userPassword = userPassRef.current.querySelector('input[type=password]').value
        const password_confirmation = userConfPassRef.current.querySelector('input[type=password]').value

        request(`${process.env.REACT_APP_API_URL}users`, {}, {
            userName,
            userPhone,
            userEmail,
            userPassword,
            userTypeId,
            password_confirmation
        }, {
            auth: true,
            type: 'json',
            snackBar: true
        }, 'post').then(data=>{
            console.log(data)
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
                                    Add Admin
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">

                                <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            UserType
                                        </InputLabel>
                                        <NativeSelect
                                            
                                            defaultValue={1}
                                            inputProps={{
                                                name: 'UserType',
                                                id: 'uncontrolled-native',
                                            }}
                                            onChange={handleUserTypeChange}
                                        >
                                            {userTypesData?.map((userType,i)=> <option value={userType.id} key={i}>{userType.userType}</option> )}
                                            
                                        </NativeSelect>
                                    </FormControl>

                                    <MDBox mb={2}>
                                        <MDInput type="text" label="userName" variant="standard" fullWidth ref={userNameRef} />
                                    </MDBox>

                                    <MDBox mb={2}>
                                        <MDInput type="number" label="userPhone" variant="standard" fullWidth ref={userPhoneRef} />
                                    </MDBox>

                                    <MDBox mb={2}>
                                        <MDInput type="email" label="userEmail" variant="standard" fullWidth ref={userEmailRef} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput type="password" label="userPassword" variant="standard" fullWidth ref={userPassRef} />
                                    </MDBox>

                                    <MDBox mb={2}>
                                        <MDInput type="password" label="confirm userPassword" variant="standard" fullWidth ref={userConfPassRef} />
                                    </MDBox>

                                    <p>{Mssg}</p>



                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="info" fullWidth onClick={saveUser}>
                                            Save User
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
export default AddUser