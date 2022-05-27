import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";

import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import {  useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "lib/functions";



function EditUserType() {
    const request=useRequest()

   
    const { id } = useParams()
    const [userTypesData, setUserTypesData] = useState({
        userType: '',
       
    })


    

    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}users/userType/${id}`, {}, {}, {
            auth: true,
            
            snackBar:true
            
        }, 'get').then(currentUser => setUserTypesData(currentUser.data))
            
       
    }, [])


    const editUser = () => {
       
        request(`${process.env.REACT_APP_API_URL}users/userType/${id}`, {}, {
            userType:userTypesData.userType,
           
        }, {
            auth: true,
            type: 'json',
            snackBar:true
            
        }, 'put').then(data => {
            console.log("edit data",data)
            if (data.success) {
                setUserTypesData(data.data)
            } 
        })
       
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">
                               

                                    <MDBox mb={2}>
                                        <MDInput  value={userTypesData.userType} onChange={(e) => {setUserTypesData({...userTypesData, userType: e.target.value})}} type="text" label="userType" variant="standard" fullWidth />
                                    </MDBox>
                                    
                                    
                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="info" fullWidth onClick={editUser}>
                                            save changes
                                        </MDButton>
                                    </MDBox>
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    )
}

export default EditUserType