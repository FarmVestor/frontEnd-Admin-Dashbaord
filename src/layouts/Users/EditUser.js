import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";

import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "lib/functions";



import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

function EditUser() {
    const request = useRequest()

    const passwordRef = useRef(null)
    const passwordConfirmationRef = useRef(null)


    const { id } = useParams()
    const [userData, setUserData] = useState({
        userName: '',
        userEmail: '',
    })


    const [userTypesData, setuserTypesData] = useState([])
    const [userTypeId, setUserType] = useState(1)
    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}users/userType/all`, {}, null, {
            auth: true,
        }, 'get').then(userTypes => {
            setuserTypesData(userTypes.data)
        })
    }, [])
    const handleUserTypeChange = (event) => {
        setUserType(event.target.value)
    }


    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}users/${id}`, {}, null, {
            auth: true,
        }, 'get').then(currentUser => {
            setUserData(currentUser.data)
            console.log("current userdata", currentUser.data)
        })


    }, [])




    //get countries
    const [countriesData, setCountriesData] = useState([])
    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}addresses/country`, {}, null, {
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
    const editUser = () => {

        const userPassword = passwordRef.current.querySelector('input[type=password]').value
        const password_confirmation = passwordConfirmationRef.current.querySelector('input[type=password]').value

        request(`${process.env.REACT_APP_API_URL}users/${id}`, {}, {
            userName: userData.userName,
            userTypeId,
            userPhone: userTypesData.userPhone,
            userEmail: userData.userEmail,
            userPassword,
            password_confirmation,
            cityId,

        }, {
            auth: true,
            type: 'json',
            snackbar: true,
            redirect:"/users"


        }, 'put').then(data => {
            if (data.success) {
                setUserData(data.data)
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
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            UserType
                                        </InputLabel>
                                        <NativeSelect

                                            value={1}
                                            inputProps={{
                                                name: 'UserType',
                                                id: 'uncontrolled-native',
                                            }}
                                            onChange={handleUserTypeChange}
                                        >
                                            {userTypesData?.map((userType, i) => <option value={userType.id} key={i}>{userType.userType}</option>)}

                                        </NativeSelect>
                                    </FormControl>

                                    <MDBox mb={2}>
                                        <MDInput value={userData.userName} onChange={(e) => { setUserData({ ...userData, userName: e.target.value }) }} type="text" label="userName" variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput value={userData.userEmail} onChange={(e) => { setUserData({ ...userData, userEmail: e.target.value }) }} type="email" label="userEmail" variant="standard" fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput ref={passwordRef} type="password" label="Password" variant="standard" fullWidth />
                                    </MDBox>

                                    <MDBox mb={2}>
                                        <MDInput ref={passwordConfirmationRef} type="password" label="Password Confirmation" variant="standard" fullWidth />
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
                                        <MDButton variant="gradient" color="info" fullWidth onClick={editUser}>
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

export default EditUser