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

function Requests() {
  const columns = [
    { headerName: "Request Id", field: "id", width: 60, align: "left" },
    { headerName: "Farm Area", field: "farmArea", width: 130, align: "left" },
    { headerName: "Budget", field: "budget", width: 130, align: "left" },
    { headerName: "Crop Name", field: "cropName", width: 130, align: "left" },
    { headerName: "Farm Kind", field: "farmKind", width: 130, align: "left" },
    { headerName: "User Name", field: "userName", width: 130, align: "left" },
    {
      headerName: "actions", field: "actions", width: 230, align: "center", renderCell: (params) => {
        return <>
          <MDButton variant="text" color="error" onClick={() => { deleteReuest(params.id) }}>
            <Icon>delete</Icon>&nbsp;delete
          </MDButton>
          <Link to={`/requests/edit/${params.id}`}>
            <MDButton variant="text" color={darkMode ? "white" : "dark"} >
              <Icon>edit</Icon>&nbsp;edit
            </MDButton>
          </Link>
        </>
      }
    },
  ]

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [rows, setRows] = useState([])
  const request = useRequest()


  const deleteReuest = (requestId) => {
    if (window.confirm('Are you sure')) {
      request(`${process.env.REACT_APP_API_URL}requests/${requestId}?deleted=${1}`, {}, null, {
        auth: true,
        snackbar: true
      }, 'delete').then(data => {
        // console.log(data.messages)
        const updatedRows = rows.filter((row) => row.id != requestId)
        setRows(updatedRows)
      })
    }

  }
  useEffect(() => {

    request(`${process.env.REACT_APP_API_URL}requests`, {}, null, {
      auth: true,
    }, 'get')
      .then(requests => {
        // console.log("deal data", deals)

        const allRequests = requests?.data?.map((request, i) => {
          // console.log("request", request)

          return {
            id: request.id,
            farmArea: request.farmArea,
            budget: request.budget,
            farmKind: request.FarmKind?.farmKind,
            cropName: request.Crop?.cropName,
            userName: request.User?.userName,

          }
        })
        setRows(allRequests)
      })
  }, [])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <BasicLayout > */}

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
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h6" color="white">
                    Requests Table
                  </MDTypography>
                  <Link to='/requests/add'>
                    <MDButton variant="text">
                      <Icon>add</Icon>&nbsp;Add
                    </MDButton>
                  </Link>
                </Grid>
              </MDBox>



              <MDBox height="70vh" pt={3}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  components={{ Toolbar: GridToolbar }}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      {/* </BasicLayout> */}

    </DashboardLayout>
  )
}
export default Requests;