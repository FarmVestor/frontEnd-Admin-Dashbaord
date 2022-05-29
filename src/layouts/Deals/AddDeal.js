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

import { useRef, useState, useEffect } from "react";

import { useRequest } from "lib/functions";

import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Radio } from "@mui/material";

function AddDeal() {
    const request = useRequest()
    const [dealStatus, setDealStatus] = useState()
    const dealFarmIdRef = useRef(null)
    const dealPriceIdRef = useRef(null)
    const dealAgentRef = useRef(null)
    const dealInvestorRef = useRef(null)


    const saveDeal = () => {
        const farmId = dealFarmIdRef.current.querySelector('input[type=text]').value
        const dealPrice = dealPriceIdRef.current.querySelector('input[type=text]').value

        const agentId = dealAgentRef.current.querySelector('input[type=text]').value
        const investorId = dealInvestorRef.current.querySelector('input[type=text]').value


        request(`${process.env.REACT_APP_API_URL}deals`, {}, {
            farmId,
            agentId: agentId ? agentId : null,
            investorId: investorId ? investorId : null,
            dealPrice,
            dealStatus,


        }, {
            auth: true,
            type: 'json',
            snackBar: true
        }, 'post').then(data => {
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
                                    Add Deal
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">



                                    <MDBox mb={2}>
                                        <MDInput type="text" label="farmId" variant="standard" fullWidth ref={dealFarmIdRef} />
                                    </MDBox>

                                    <MDBox mb={2}>
                                        <MDInput type="text" label="dealPrice" variant="standard" fullWidth ref={dealPriceIdRef} />
                                    </MDBox>


                                    <MDBox mb={2}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">dealStatus</FormLabel>
                                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={(event) => {
                                                setDealStatus(event.target.value)
                                            }}>
                                                <FormControlLabel value={true} control={<Radio />} label="ِAgreed" />
                                                <FormControlLabel value={false} control={<Radio />} label="Not Agreed yet" />
                                            </RadioGroup>
                                        </FormControl>
                                    </MDBox>
                                    <MDTypography variant="h6" color="info">
                                        Add Either an Agent or an Investor
                                    </MDTypography>
                                    <MDBox mb={2}>
                                        <MDInput type="text" label="agentId" variant="standard" fullWidth ref={dealAgentRef} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput type="text" label="investorId" variant="standard" fullWidth ref={dealInvestorRef} />
                                    </MDBox>




                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="info" fullWidth onClick={saveDeal}>
                                            Save Deal
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
export default AddDeal