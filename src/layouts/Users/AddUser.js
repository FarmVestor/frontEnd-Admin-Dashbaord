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

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

function AddUser() {
    const request = useRequest()

    const userNameRef = useRef(null)
    const userPhoneRef = useRef(null)
    const userEmailRef = useRef(null)
    const userPassRef = useRef(null)
    const userConfPassRef = useRef(null)
    const [Mssg, setMssg] = useState(' ')
    const [userTypesData, setuserTypesData] = useState([])
    const [userTypeId, setUserType] = useState(1)
    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}users/userType/all`, {}, {}, {
            auth: true,

            snackBar: true

        }, 'get').then(userTypes => {

            setuserTypesData(userTypes.data)

        })
    }, [])

    const handleUserTypeChange = (event) => {
        console.log("d")
        setUserType(event.target.value)
    }

    //get countries
    const [countriesData, setCountriesData] = useState([])
    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}addresses/country`, {}, {}, {
            auth: true,
        }, 'get').then(countries => {

            setCountriesData(countries?.data)

        })
    }, [])
    //to get governrates
    const [governratesData, setGovernratesData] = useState([])
    const handleCountryIdChange = (e) => {
        const country = countriesData.filter((country) => country.id == e.target.value)
        console.log("country", country)
        setGovernratesData(country[0]?.Governrates)
    }

    //to get cities
    const [citiesData, setCitiesData] = useState([])
    const [cityId, setCityId] = useState(0)
    const handleGovernratedChange = (e) => {
        const governrate = governratesData.filter((governrate) => governrate.id == e.target.value)
        console.log("governrate", governrate)
        setCitiesData(governrate[0]?.Cities)

    }




    console.log("governratesData", governratesData)
    const saveUser = () => {
        const userName = userNameRef.current.querySelector('input[type=text]').value
        const userPhone = userPhoneRef.current.querySelector('input[type=number]').value

        const userEmail = userEmailRef.current.querySelector('input[type=email]').value
        const userPassword = userPassRef.current.querySelector('input[type=password]').value
        const password_confirmation = userConfPassRef.current.querySelector('input[type=password]').value

        request(`${process.env.REACT_APP_API_URL}users`, {}, {
            userName,
            userPhone,
            userEmail,
            userPassword,
            userTypeId,
            password_confirmation,
            cityId,

        },
            {
                auth: true,
                type: 'json',
                snackbar: true,
                redirect: "/users"
            }, 'post')



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
                                    Add Admin
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">

                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            UserType
                                        </InputLabel>
                                        <NativeSelect


                                            inputProps={{
                                                name: 'UserType',
                                                id: 'uncontrolled-native',
                                            }}
                                            onChange={handleUserTypeChange}
                                        >

                                            {userTypesData?.map((userType, i) => <option value={userType.id} key={i}>{userType.userType}</option>)}

                                        </NativeSelect>
                                    </FormControl>
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="text" label="userName" variant="standard" fullWidth ref={userNameRef} />
                                </MDBox>

                                <MDBox mb={2}>
                                    <MDInput type="number" label="userPhone" variant="standard" fullWidth ref={userPhoneRef} />
                                </MDBox>

                                <MDBox mb={2}>
                                    <MDInput type="email" label="userEmail" variant="standard" fullWidth ref={userEmailRef} />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="password" label="userPassword" variant="standard" fullWidth ref={userPassRef} />
                                </MDBox>

                                <MDBox mb={2}>
                                    <MDInput type="password" label="confirm userPassword" variant="standard" fullWidth ref={userConfPassRef} />
                                </MDBox>

                                <MDBox component="form" role="form">

                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Country
                                        </InputLabel>
                                        <NativeSelect

                                            defaultValue={1}
                                            inputProps={{
                                                name: 'country',
                                                id: 'uncontrolled-native',
                                            }}
                                            onChange={handleCountryIdChange}
                                        >
                                            <option > </option>
                                            {countriesData?.map((country, i) => <option value={country.id} key={i}>{country.countryName}</option>)}

                                        </NativeSelect>
                                    </FormControl>
                                </MDBox>


                                <MDBox component="form" role="form">

                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Governrate
                                        </InputLabel>
                                        <NativeSelect


                                            inputProps={{
                                                name: 'governrate',
                                                id: 'uncontrolled-native',
                                            }}
                                            onChange={handleGovernratedChange}

                                        >

                                            <option > </option>
                                            {governratesData?.map((governrate, i) => <option value={governrate.id} key={governrate.id}>{governrate.governrateName}</option>)}

                                        </NativeSelect>
                                    </FormControl>
                                </MDBox>


                                <MDBox component="form" role="form">

                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Cities
                                        </InputLabel>
                                        <NativeSelect

                                            inputProps={{
                                                name: 'governrate',
                                                id: 'uncontrolled-native',
                                            }}
                                            onChange={(e) => setCityId(e.target.value)}


                                        >

                                            <option > </option>
                                            {citiesData?.map((city, i) => <option value={city.id} key={city.id}>{city.cityName}</option>)}

                                        </NativeSelect>
                                    </FormControl>
                                </MDBox>

                                <MDBox mt={4} mb={1}>
                                    <MDButton variant="gradient" color="info" fullWidth onClick={saveUser}>
                                        Save User
                                    </MDButton>
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
export default AddUser