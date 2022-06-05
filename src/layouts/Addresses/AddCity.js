

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDButton from "components/MDButton";

import MDInput from "components/MDInput";


// @mui material components


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";

import { useRef, useState, useEffect } from "react";

import { useRequest } from "lib/functions";

import InputLabel from '@mui/material/InputLabel';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';


import { Wrapper } from "@googlemaps/react-wrapper";
import { NativeSelect } from "@mui/material";
function Map({ center, zoom, setLat, setLng }) {
    const mapRef = useRef(null)
    const [map, setMap] = useState()
    useEffect(() => {
        setMap(new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
        }));
    }, []);
    useEffect(() => {
        if (map) {
            map.addListener("click", (mapsMouseEvent) => {
                console.log(mapsMouseEvent)
                const coordinates = mapsMouseEvent.latLng.toJSON()
                setLat(coordinates.lat)
                setLng(coordinates.lng)
            });
        }
    }, [map])
    return (<div ref={mapRef} style={{ height: '400px' }} />)
}
function AddCity() {
    const request = useRequest()
    const cityNameRef = useRef(null)
    const PlaceLatRef = useRef(null)
    const PlaceLongRef = useRef(null)
    const [longitude, setLongitude] = useState(28.5)
    const [latitude, setLatitude] = useState(40.5)


    // const [governratesData, setGovernratesData] = useState([])
    const [governrateId, setGovernrateId] = useState()
    // useEffect(() => {
    //     request(`${process.env.REACT_APP_API_URL}addresses/governrate`, {}, null, {
    //         auth: true,
    //     }, 'get').then(data => {
    //         setGovernratesData(data.data)
    //         console.log("governrate data", data.data)
    //     })
    // }, [])
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
    const handleGovernrateChange = (e) => {
        setGovernrateId(e.target.value)
        setLatitude(governratesData[0].Cities[0].latitude)
        setLongitude(governratesData[0].Cities[0].longitude)
        // const governrate = governratesData.filter((governrate) => governrate.id == e.target.value)
        // console.log("governrate", governrate)
        // setCitiesData(governrate[0]?.Cities)

    }


    const saveCity = () => {
        const longitude = PlaceLongRef.current.querySelector('input[type=text]').value
        const latitude = PlaceLatRef.current.querySelector('input[type=text]').value
        const cityName = cityNameRef.current.querySelector('input[type=text]').value
        request(`${process.env.REACT_APP_API_URL}addresses/city`, {}, {
            cityName,
            governrateId,
            latitude,
            longitude,


        }, {
            auth: true,
            type: 'json',
            redirect: "/adresses/",
            snackbar: true
        }, 'post').then(data => {
            console.log("city data", data)
        })



    }
    // const handleGovernratedChange = (e) => {

    //     setGovernrateId(e.target.value)
    //     request(`${process.env.REACT_APP_API_URL}addresses/governrate/${e.target.value}`, {}, null, {
    //         auth: true,
    //     }, 'get').then(data => {
    //         console.log("governrate data by id ", data.data)
    //         setLatitude(data.data.Cities[0].latitude)
    //         setLongitude(data.data.Cities[0].longitude)
    //     })
    //     // setLatitude()
    // }
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
                                    Add City
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">



                                    <MDBox mb={2}>
                                        <MDInput type="text" label="cityName" variant="standard" fullWidth ref={cityNameRef} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput value={latitude} type="text" label="Latitude" variant="standard" fullWidth ref={PlaceLatRef} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput value={longitude} type="text" label="longitude" variant="standard" fullWidth ref={PlaceLongRef} />
                                    </MDBox>

                                    <MDBox mb={2}>
                                        <Box sx={{ minWidth: 120 }}>
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
                                            {/* <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Governrate</InputLabel>
                                                <NativeSelect
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    // value={governratesData?.id}
                                                    label="Category"
                                                    style={{ padding: '20px 0' }}
                                                    onChange={handleGovernrateChange}
                                                >

                                                    {governratesData?.map((governrate, i) => {
                                                        return <option value={governrate.id} key={governrate.id}>{governrate.governrateName}</option>
                                                    })}
                                                </NativeSelect>
                                            </FormControl> */}
                                        </Box>
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
                                                onChange={handleGovernrateChange}

                                            >

                                                <option > </option>
                                                {governratesData?.map((governrate, i) => <option value={governrate.id} key={governrate.id}>{governrate.governrateName}</option>)}

                                            </NativeSelect>
                                        </FormControl>
                                    </MDBox>

                                    
                                    <MDBox mb={2}>
                                        <Wrapper apiKey={''} >
                                            <Map center={{ lat: latitude, lng: longitude }} setLat={setLatitude} setLng={setLongitude} zoom={8} />
                                        </Wrapper>
                                    </MDBox>


                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="info" fullWidth onClick={saveCity}>
                                            Save User
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
export default AddCity