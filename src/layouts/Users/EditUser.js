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



import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

function EditUser() {
    const request=useRequest()

   
    const { id } = useParams()
    const [userData, setUserData] = useState({
        userName: '',
        userEmail: '',
    })


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


    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}users/${id}`, {}, {}, {
            auth: true,
            
            snackBar:true
            
        }, 'get').then(currentUser => setUserData(currentUser.data))
            
       
    }, [])

   
    const passwordRef = useRef(null)
    const passwordConfirmationRef = useRef(null)

    const editUser = () => {
        
        const userPassword = passwordRef.current.querySelector('input[type=password]').value
        const password_confirmation = passwordConfirmationRef.current.querySelector('input[type=password]').value
        
        request(`${process.env.REACT_APP_API_URL}users/${id}`, {}, {
            userName:userData.userName,
            userTypeId,
            userPhone: userTypesData.userPhone,
            userEmail:userData.userEmail,
            userPassword,
            password_confirmation,
            
        }, {
            auth: true,
            type: 'json',
            snackBar:true
            
        }, 'put').then(data => {
            console.log("edit data",data)
            if (data.success) {
                setUserData(data.data)
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
                                <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            UserType
                                        </InputLabel>
                                        <NativeSelect
                                            
                                            value={1}
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
                                        <MDInput  value={userData.userName} onChange={(e) => {setUserData({...userData, userName: e.target.value})}} type="text" label="userName" variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput value={userData.userEmail} onChange={(e) => {setUserData({...userData, userEmail: e.target.value})}} type="email" label="userEmail" variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput ref={passwordRef} type="password" label="Password" variant="standard" fullWidth />
                                    </MDBox>
                                    
                                    <MDBox mb={2}>
                                        <MDInput ref={passwordConfirmationRef} type="password" label="Password Confirmation" variant="standard" fullWidth />
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

export default EditUser