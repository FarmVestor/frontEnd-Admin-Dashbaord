import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";

import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "lib/functions";



function EditDeal() {
    const request = useRequest()


    const { id } = useParams()
    const [dealData, setDealData] = useState({
       
    })

    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}deals/${id}`, {}, {}, {
            auth: true,
           
            snackBar: true

        }, 'get').then(data => {
            console.log("current data", data)
            if (data.success) {
                setDealData(data.data)
            }
        })
    }, [])

console.log("dealData",dealData)

    const editDeal = () => {


        request(`${process.env.REACT_APP_API_URL}deals/${id}`, {}, {
            farmId: dealData?.farmId,
            userId: dealData?.userId,
            dealPrice: dealData?.dealPrice,
            dealStatus: dealData?.dealStatus,
            partenerId: dealData?.partenerId,

        }, {
            auth: true,
            type: 'json',
            snackBar: true

        }, 'put').then(data => {
            console.log("edit data", data)
            if (data.success) {
                setDealData(data.data)
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
                                        <MDInput value={dealData?.farmId} onChange={(e) => { setDealData({ ...dealData, farmId: e.target.value }) }} type="number" label="farmId" variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput value={dealData?.partenerId} onChange={(e) => { setDealData({ ...dealData, partenerId: e.target.value }) }} type="number" label="partenerId" variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput value={dealData?.dealPrice} onChange={(e) => { setDealData({ ...dealData, dealPrice: e.target.value }) }} type="number" label="dealPrice" variant="standard" fullWidth />
                                    </MDBox>

                                    <MDBox mb={2}>
                                        <MDInput value={dealData?.dealStatus} onChange={(e) => { setDealData({ ...dealData, dealStatus: e.target.value }) }} type="number" label="dealStatus" variant="standard" fullWidth />
                                    </MDBox>

                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="info" fullWidth onClick={editDeal}>
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

export default EditDeal