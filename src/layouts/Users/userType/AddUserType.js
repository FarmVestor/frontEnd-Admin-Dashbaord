
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import { useRef} from "react";
import { useRequest } from "lib/functions";


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