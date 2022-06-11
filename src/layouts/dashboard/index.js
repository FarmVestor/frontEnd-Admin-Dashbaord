/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import ComplexStatisticsCard from "./components/ComplexStatisticsCard";

// // Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useContext, useEffect } from "react";
import { AppContext } from "context/AppContext";
import { useRequest } from "lib/functions";
import { Card } from "@mui/material";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const AppCtx = useContext(AppContext)
  const request = useRequest()


  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}reports/admin`, {}, null, {
      auth: true,
    }, 'get').then((data) => {
      console.log("reports", data)
      AppCtx.setReports(data)

    })
  }, [])

  console.log("AppCtx", AppCtx.reports?.users?.numUsers)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6} lg={3} >
            <MDBox mb={1.5}>
              <Card>
                <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
                  <MDBox
                    variant="gradient"
                    bgColor={'dark'}
                    color={"white"}
                    coloredShadow={'white'}
                    borderRadius="xl"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="4rem"
                    height="4rem"
                    mt={-3}
                  >
                    <Icon fontSize="medium" color="inherit">
                      people
                    </Icon>
                  </MDBox>
                  <MDBox textAlign="right" lineHeight={1.25}>
                    <MDTypography variant="button" fontWeight="light" color="text">
                      users
                    </MDTypography>
                    <MDTypography variant="h4" color='success'>{AppCtx.reports?.users?.numUsers}</MDTypography>
                  </MDBox>
                </MDBox>
                <Divider />

                <MDBox pb={2} px={2}>
                  <MDTypography component="p" variant="button" color="text" display="flex">

                    Number Of Investors
                    &nbsp;{AppCtx.reports?.investors.numInvestors}
                  </MDTypography>
                  <MDTypography component="p" variant="button" color="text" display="flex">

                    Number Of Farmers
                    &nbsp;{AppCtx.reports?.farmers.numFarmers}
                  </MDTypography>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Card>
                <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
                  <MDBox
                    variant="gradient"
                    bgColor={'dark'}
                    color={"white"}
                    coloredShadow={'white'}
                    borderRadius="xl"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="4rem"
                    height="4rem"
                    mt={-3}
                  >
                    <Icon fontSize="medium" color="inherit">
                      people
                    </Icon>
                  </MDBox>
                  <MDBox textAlign="right" lineHeight={1.25}>
                    <MDTypography variant="button" fontWeight="light" color="text">
                      Investors
                    </MDTypography>
                    <MDTypography variant="h4" color='success'>{AppCtx.reports?.investors.numInvestors}</MDTypography>
                  </MDBox>
                </MDBox>
                <Divider />

                <MDBox pb={2} px={2}>
                  <MDTypography component="p" variant="button" color="text" display="flex">

                    Today's Investors
                    &nbsp;{AppCtx.reports?.investors.TodayInvestors}
                  </MDTypography>
                  <MDTypography component="p" variant="button" color="text" display="flex">

                    Number Of Requests
                    &nbsp;{AppCtx.reports?.requests.numRequests}
                  </MDTypography>
                  <MDTypography component="p" variant="button" color="text" display="flex">
                    Order of Crop Perference :
                  </MDTypography>
                  {AppCtx.reports?.requests?.mostWantedCrop?.map((crop,i) => {
                    return <MDTypography key={i} component="p" variant="button" color="success" display="flex">{crop.Crop.cropName}</MDTypography>
                  })}
                </MDBox>
              </Card>
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Card>
                <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
                  <MDBox
                    variant="gradient"
                    bgColor={'dark'}
                    color={"white"}
                    coloredShadow={'white'}
                    borderRadius="xl"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="4rem"
                    height="4rem"
                    mt={-3}
                  >
                    <Icon fontSize="medium" color="inherit">
                      people
                    </Icon>
                  </MDBox>
                  <MDBox textAlign="right" lineHeight={1.25}>
                    <MDTypography variant="button" fontWeight="light" color="text">
                      Farmers
                    </MDTypography>
                    <MDTypography variant="h4" color='success'>{AppCtx.reports?.farmers.numFarmers}</MDTypography>
                  </MDBox>
                </MDBox>
                <Divider />

                <MDBox pb={2} px={2}>
                  <MDTypography component="p" variant="button" color="text" display="flex">

                    Today's Farmers
                    &nbsp;{AppCtx.reports?.farmers.TodayFarmers}
                  </MDTypography>

                </MDBox>
              </Card>
            </MDBox>
          </Grid>


          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Card>
                <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
                  <MDBox
                    variant="gradient"
                    bgColor={'info'}
                    color={"white"}
                    coloredShadow={'white'}
                    borderRadius="xl"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="4rem"
                    height="4rem"
                    mt={-3}
                  >
                    <Icon fontSize="medium" color="inherit">
                      groups
                    </Icon>
                  </MDBox>
                  <MDBox textAlign="right" lineHeight={1.25}>
                    <MDTypography variant="button" fontWeight="light" color="text">
                      Deals
                    </MDTypography>
                    <MDTypography variant="h4" color='success'>{AppCtx.reports?.deals.numDeals}</MDTypography>
                  </MDBox>
                </MDBox>
                <Divider />

                <MDBox pb={2} px={2}>
                  <MDTypography component="p" variant="button" color="text" display="flex">

                    Agreed Deals
                    &nbsp;{AppCtx.reports?.deals.numAgreedDeels}
                  </MDTypography>
                  <MDTypography component="p" variant="button" color="text" display="flex">

                    Not Agreed Deals
                    &nbsp;{AppCtx.reports?.deals.numNotAgreedDeels}
                  </MDTypography>
                  <MDTypography component="p" variant="button" color="text" display="flex">

                    Dealed By Investor
                    &nbsp;{AppCtx.reports?.deals.numDealedByInvestors}
                  </MDTypography>
                  <MDTypography component="p" variant="button" color="text" display="flex">

                    Dealed By Agents
                    &nbsp;{AppCtx.reports?.deals.numDealedByAgents}
                  </MDTypography>

                </MDBox>
              </Card>
            </MDBox>
          </Grid>




          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Card>
                <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
                  <MDBox
                    variant="gradient"
                    bgColor={'success'}
                    color={"white"}
                    coloredShadow={'white'}
                    borderRadius="xl"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="4rem"
                    height="4rem"
                    mt={-3}
                  >
                    <Icon fontSize="medium" color="inherit">
                      grass
                    </Icon>
                  </MDBox>
                  <MDBox textAlign="right" lineHeight={1.25}>
                    <MDTypography variant="button" fontWeight="light" color="text">
                      Farms
                    </MDTypography>
                    <MDTypography variant="h4" color='success'>{AppCtx.reports?.farms.numFarms}</MDTypography>
                  </MDBox>
                </MDBox>
                <Divider />

                <MDBox pb={2} px={2}>
                  <MDTypography component="p" variant="button" color="text" display="flex">

                    Today's Farms
                    &nbsp;{AppCtx.reports?.farms.TodayFarms}
                  </MDTypography>

                  <MDTypography component="p" variant="button" color="text" display="flex">

                    Farms Available
                    &nbsp;{AppCtx.reports?.farms.numAvFarms}
                  </MDTypography>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>


          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count={'2'}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="grass"
                title="Farms"
                count={AppCtx.numberOfFarms}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="grass"
                title="Today's Farms"
                count={''}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
