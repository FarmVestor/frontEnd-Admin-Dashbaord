import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
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
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
const columns = [
  { Header: "Request Id", accessor: "id", width: "45%", align: "left" },
  { Header: "Farm Area", accessor: "farmArea", width: "45%", align: "left" },
  { Header: "Budget", accessor: "budget", align: "left" },
  { Header: "Crop Name", accessor: "cropName", align: "left" },
  { Header: "Farm Kind", accessor: "farmKind", align: "left" },
  { Header: "User Name", accessor: "userName", align: "left" },
  { Header: "actions", accessor: "actions", align: "center" },
]
function Requests() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [rows, setRows] = useState([])
  const ctx = useContext(AuthContext)
  const [serverResponse, setServerResponse] = useState(" ")
    const [snackBarType, setSnackBarType] = useState("success")
    const [openSnackBar, setOpenSnackBar] = useState(false)

  const deleteReuest = (requestId) => {
    if (window.confirm('Are you sure')) {
      fetch(`${process.env.REACT_APP_API_URL}requests/${requestId}`,
        {
          method: "Delete",
          headers: {
            'Authorization': 'Bearer ' + ctx.token
          },
        })
        .then(response => {
          response.json()
            .then(deleted => {
              console.log(deleted)
              setServerResponse(deleted.message.join(' '))
              if (deleted.success) {
                  setSnackBarType('success')
              } else {
                  setSnackBarType('error')
              }
              setOpenSnackBar(true)
            })
        })
        .catch(e => e)
    }
  }
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}requests`,{
        headers: {
            'Authorization': 'Bearer ' + ctx.token
          },
    })
      .then(response => {
        response.json().then(requests => {
          console.log(requests)
          // console.log("__________".requests.FarmKind?.farmKind)

          const allRequests = requests.data.map((request, i) => {
          console.log("request",request)

            return {
              id: <>{request.id}</>,
              farmArea: <>{request.farmArea}</>,
              budget: <>{request.budget}</>,
              farmKind: <>{request.farmKindId}</>,
              cropName: <>{request.cropId }</>,
              userName: <>{request.User?.userName }</>,
              actions: <>
                <MDButton variant="text" color="error" onClick={() => { deleteReuest(request.id) }}>
                  <Icon>delete</Icon>&nbsp;delete
                </MDButton>
                <Link to={`/requests/edit/${request.id}`}>
                  <MDButton variant="text" color={darkMode ? "white" : "dark"} >
                    <Icon>edit</Icon>&nbsp;edit
                  </MDButton>
                </Link>
              </>
            }
          })
          setRows(allRequests)
        })
      })
  }, [])
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
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  )
}
export default Requests;