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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignOut from "layouts/authentication/sign-out";
import Users  from "layouts/Users"
import Requests  from "layouts/Requests"
import AddRequest from "layouts/Requests/addRequest"
import EditRequest from "layouts/Requests/editRequest"

import EditUser from "layouts/Users/EditUser"
import AddUser from "layouts/Users/AddUser"
import Farms  from "layouts/Farms"
import AddFarms  from "layouts/Farms/AddFarm"
import EditFarms  from "layouts/Farms/EditFarm"

// @mui icons
import Icon from "@mui/material/Icon";
import UserTypes from "layouts/Users/userType"
import AddUserType from "layouts/Users/userType/AddUserType"
import EditUserType from "layouts/Users/userType/EditUserType"
import Deals from "layouts/Deals"
import EditDeal from "layouts/Deals/EditDeal"
import AddDeal from "layouts/Deals/AddDeal"
// import UserTypes from "layouts/Users/userType"
import Adresses from "layouts/Addresses"
import AddCity from "layouts/Addresses/AddCity"
import EditCity from "layouts/Addresses/EditCity"

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    columns: 2,
    rowsPerColumn: 2,
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    collapse: [
      {
        name: "Analytics",
        dropdown: true,
        key: "analytics",
        route: "/dashboards/analytics",
        component: <SignIn />,
      },
      {
        name: "Sales",
        key: "sales",
        dropdown: true,
        route: "/dashboards/sales",
        component: <SignIn />,
      },
    ],
    route: "/dashboard",
    inSideNav: true,
    component: <Dashboard />,
    requireAuth:true,
    inSideNav:true
  },
  {
    type: "collapse",
    name: "Users",
    key: "Users",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/users",
    inSideNav: true,
    component: <Users />,
    requireAuth:true,
    inSideNav:true
  },
  {
    type: "collapse",
    name: "Farms",
    key: "farms",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/farms",
    component: <Farms />,
    requireAuth:true,
    inSideNav:true
  },
  {
    type: "collapse",
    name: "Add Farms",
    key: "add-farms",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/farms/add",
    component: <AddFarms />,
    requireAuth:true,
    inSideNav:false

  },
  {
    type: "collapse",
    name: "Edit Farms",
    key: "edit-farms",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/farms/edit/:id",
    component: <EditFarms />,
    requireAuth:true,
    inSideNav:false

  },
  
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    inSideNav: true,
    component: <Tables />,
    requireAuth:true,
    inSideNav:true
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    inSideNav: true,
    component: <Billing />,
    requireAuth:true,
    inSideNav:true
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    inSideNav: true,
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    inSideNav: true,
    component: <Notifications />,
    requireAuth:true,
    inSideNav:true
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    inSideNav: true,
    component: <Profile />,
    requireAuth:true,
    inSideNav:true
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/sign-in",
    inSideNav: true,
    component: <SignIn />,
    requireAuth:true,
    inSideNav:true
  },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
  {
    type: "collapse",
    name: "Sign out",
    key: "sign-out",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/sign-out",
    inSideNav: true,
    component: <SignOut />,
  },
  {
    type: "collapse",
    name: "Requests",
    key: "Requests",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/requests",
    component: <Requests />,
    inSideNav: true,
  },
  {
    type: "collapse",
    name: "AddRequest",
    key: "addRequest",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/requests/add",
    component: <AddRequest />,
    // requiresAuth: true,
    inSideNav: false,
  },
  {
    type: "collapse",
    name: "EditRequest",
    key: "EditRequest",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/requests/edit/:id",
    component: <EditRequest />,
    // requiresAuth: true,
    inSideNav: false,

  },











  {
    type: "collapse",
    name: "Users",
    key: "Users",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/users/:id",
    inSideNav: false,
    component: <Users />,
  },

  {
    type: "collapse",
    name: "edit User",
    key: "edit User",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/users/edit/:id",
    inSideNav: false,
    component: <EditUser />,
  },
  {
    type: "collapse",
    name: "add User",
    key: "add User",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/users/add",
    inSideNav: false,
    component: <AddUser />,
  },
  {
    type: "collapse",
    name: "UserTypes",
    key: "UserTypes",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/users/userType/all",
    inSideNav: false,
    component: <UserTypes />,
  },
  {
    type: "collapse",
    name: "add UserTypes",
    key: "add UserTypes",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/users/userType/add",
    inSideNav: false,
    component: <AddUserType />,
  },
  {
    type: "collapse",
    name: "edit UserTypes",
    key: "edit UserTypes",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/users/userType/edit/:id",
    inSideNav: false,
    component: <EditUserType />,
  },
  {
    type: "collapse",
    name: "Deals",
    key: "Deals",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/Deals/",
    inSideNav: true,
    component: <Deals />,
  },
  {
    type: "collapse",
    name: "edit Deals",
    key: "edit Deals",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/deals/edit/:id",
    inSideNav: false,
    component: <EditDeal />,
  },
  {
    type: "collapse",
    name: "add Deals",
    key: "add Deals",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/deals/add",
    inSideNav: false,
    component: <AddDeal />,
  },
  {
    type: "collapse",
    name: "Adresses",
    key: "Adresses",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/adresses/",
    inSideNav: true,
    component: <Adresses />,
  },
  {
    type: "collapse",
    name: "add Adresses",
    key: "add Adresses",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/addresses/city/add",
    inSideNav: false,
    component: <AddCity />,
  },
  {
    type: "collapse",
    name: "edit Adresses",
    key: "edit Adresses",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/addresses/city/edit/:id",
    inSideNav: false,
    component: <EditCity />,
  },
];

export default routes;
