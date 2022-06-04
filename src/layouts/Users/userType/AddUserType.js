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

function AddUserType() {
    const request = useRequest()

    const userTypeNameRef = useRef(null)
   
    


    const saveUserType = () => {
        const userType = userTypeNameRef.current.querySelector('input[type=text]').value
        
        request(`${process.env.REACT_APP_API_URL}users/userType`, {}, {
            userType,
            
        }, {
            auth: true,
            type: 'json',
            snackbar: true,
            redirect:"/users"

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
                                    Add UserType
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">

                                
                                    
                                    <MDBox mb={2}>
                                        <MDInput type="text" label="userType" variant="standard" fullWidth ref={userTypeNameRef} />
                                    </MDBox>

                                    



                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="info" fullWidth onClick={saveUserType}>
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
export default AddUserType