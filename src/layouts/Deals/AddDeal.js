import { useParams } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";

import { useRef, useState,} from "react";
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
    const {id} =useParams()


    const saveDeal = () => {
       const farmId= (!id) ? dealFarmIdRef.current.querySelector('input[type=text]').value  : id
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
            snackbar: true,
            redirect:"/Deals/"

        }, 'post').then(data => {
            // console.log(data)
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
                                bgColor="success"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    Add Deal
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">


                                   {(!id)? <MDBox mb={2}>
                                        <MDInput type="text" label="farmId" variant="standard" fullWidth ref={dealFarmIdRef}

                                        />
                                    </MDBox> : <></>}
                                    

                                    <MDBox mb={2}>
                                        <MDInput type="text" label="dealPrice $" variant="standard" fullWidth ref={dealPriceIdRef} />
                                    </MDBox>


                                    <MDBox mb={2}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">dealStatus</FormLabel>
                                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={(event) => {
                                                setDealStatus(event.target.value)
                                            }}>
                                                <FormControlLabel value={true} control={<Radio />} label="??Agreed" />
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
                                        <MDButton variant="gradient" color="success" fullWidth onClick={saveDeal}>
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