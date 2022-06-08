import {  useParams } from "react-router-dom";


import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

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
                // console.log(mapsMouseEvent)
                const coordinates = mapsMouseEvent.latLng.toJSON()
                setLat(coordinates.lat)
                setLng(coordinates.lng)
            });
        }
    }, [map])
    return (<div ref={mapRef} style={{ height: '400px' }} />)
}
function EditCity() {
    const request = useRequest()

    const [longitude, setLongitude] = useState(28.5)
    const [latitude, setLatitude] = useState(40.5)


    const [governratesData, setGovernratesData] = useState([])
    const [governrateId, setGovernrateId] = useState()
    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}addresses/governrate`, {}, null, {
            auth: true,
        }, 'get').then(data => {
            setGovernratesData(data.data)
            // console.log("governrate data", data.data)
        })
    }, [])
    const [cityData, setCityData] = useState([])
    const { id } = useParams()
    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}addresses/city/${id}`, {}, null, {
            auth: true,
        }, 'get').then(data => {
            // console.log("city data", data.data)
            setCityData(data.data)
        })
    }, [])
    const saveCity = () => {
       
        request(`${process.env.REACT_APP_API_URL}addresses/city/${id}`, {}, {
            cityName:cityData.cityName,
            governrateId:cityData.governrateId,
            latitude:cityData.latitude,
            longitude:cityData.longitude,


        }, {
            auth: true,
            type: 'json',
            redirect:"/adresses/",
            snackbar: true
        }, 'put').then(data => {
            // console.log("updated city data", data)
        })



    }
    const handleGovernrateChange = (e) => {

        setGovernrateId(e.target.value)
        request(`${process.env.REACT_APP_API_URL}addresses/governrate/${e.target.value}`, {}, null, {
            auth: true,
        }, 'get').then(data => {
            // console.log("governrate data by id ", data.data)
            setLatitude(data.data.Cities[0].latitude)
            setLongitude(data.data.Cities[0].longitude)
        })
        // setLatitude()
    }

    const updateCityData = (obj) => {
        setCityData({
            ...cityData,
            ...obj
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
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    Edit City
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">



                                    <MDBox mb={2}>
                                        <MDInput type="text" label="cityName" variant="standard" fullWidth value={cityData.cityName} onChange={(e) => {updateCityData({cityName: e.target.value})}} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput value={latitude} type="text" label="Latitude" variant="standard" fullWidth onChange={(e) => {updateCityData({latitude: e.target.value})}}  />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput value={longitude} type="text" label="longitude" variant="standard" fullWidth onChange={(e) => {updateCityData({longitude: e.target.value})}}  />
                                    </MDBox>

                                    <MDBox mb={2}>
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Governrate</InputLabel>
                                                <NativeSelect
                                                    labelid="demo-simple-select-label"
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
                                            </FormControl>
                                        </Box>
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
export default EditCity