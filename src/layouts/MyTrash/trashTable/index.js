import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
// import BasicLayout from "./BasicLayout";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDButton from "components/MDButton";
// @mui material components
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
import { useRequest } from "lib/functions";

import { Link } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function TrashTable(params) {
    // console.log("rows",params.rows)
    return (

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
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <MDTypography variant="h6" color="white">
                        Deleted {params.tableName} Table
                    </MDTypography>

                </Grid>
            </MDBox>



            <MDBox height="70vh" pt={3}>
                <DataGrid
                    rows={params.rows}
                    columns={params.columns}
                    components={{ Toolbar: GridToolbar }}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </MDBox>
        </Card>
    )
}
export default TrashTable;