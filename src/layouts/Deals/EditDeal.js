import { useParams } from "react-router-dom";

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

import {  useState, useEffect } from "react";

import { useRequest } from "lib/functions";

import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Radio } from "@mui/material";

function EditDeal() {
    const request = useRequest()

    const { id } = useParams()
    // console.log(typeof id,id)
    const [dealData, setDealData] = useState({
        farmId: id,
        agentId: null,
        investorId: null,
        dealPrice: 0,
        dealStatus: 0,
    })
    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}deals/${id}`, {}, null, {
            auth: true,
        }, 'get').then(data => {
            // console.log("current deal data", data)
            setDealData(data.data)
        })
    }, [])


    const editDeal = () => {
        request(`${process.env.REACT_APP_API_URL}deals/${id}`, {}, {
            farmId: dealData?.farmId,
            agentId: dealData?.agentId ? dealData?.agentId : null,
            investorId: dealData?.investorId ? dealData?.investorId : null,
            dealPrice: dealData?.dealPrice,
            dealStatus: dealData?.dealStatus,


        }, {
            auth: true,
            type: 'json',
            snackbar: true,
            redirect:"/Deals/"

        }, 'put').then(data => {
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
                                    EditDeal
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">



                                    <MDBox mb={2}>
                                        <MDInput type="number" label="farmId" variant="standard" fullWidth value={dealData?.farmId ? dealData.farmId: ''} onChange={(e) => { setDealData({ ...dealData, farmId: e.target.value }) }} />
                                    </MDBox>

                                    <MDBox mb={2}>
                                        <MDInput type="text" label="dealPrice $" variant="standard" fullWidth value={dealData?.dealPrice ? dealData.dealPrice :''} onChange={(e) => { setDealData({ ...dealData, dealPrice: e.target.value }) }} />
                                    </MDBox>


                                    <MDBox mb={2}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">dealStatus</FormLabel>
                                            <RadioGroup value={dealData?.dealStatus} row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={(e) => {
                                                setDealData({ ...dealData, dealStatus: e.target.value })
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
                                        <MDInput type="text" label="agentId" variant="standard" fullWidth value={dealData?.agentId ? dealData?.agentId :''} onChange={(e) => { setDealData({ ...dealData, agentId: e.target.value }) }} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput type="text" label="investorId" variant="standard" fullWidth value={dealData?.investorId ? dealData?.investorId:''} onChange={(e) => { setDealData({ ...dealData, investorId: e.target.value }) }} />
                                    </MDBox>




                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="success" fullWidth onClick={editDeal}>
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
export default EditDeal