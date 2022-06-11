import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import InputLabel from '@mui/material/InputLabel';
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { AuthContext } from "context/AuthContext";
import { useContext, useRef, useState, useEffect } from "react";
import MDSnackbar from "components/MDSnackbar";
import { FormControl, NativeSelect } from "@mui/material";
import { FormLabel } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Radio } from "@mui/material";
import { Box } from "@mui/material";
import { useRequest } from "lib/functions";

import { Wrapper } from "@googlemaps/react-wrapper";
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
function AddFarms() {
  const ctx = useContext(AuthContext);
  const request = useRequest()

  const [openSnakBar, setOpenSnakBar] = useState(false)
  const [serverResponce, setServerResponce] = useState('')
  const [snakBarColor, setSnakBarColor] = useState('success')
  const [available, setAvailable] = useState(1);
  const [visiable, setVisiable] = useState(1);
  const [farmKindData, setFarmKindData] = useState([])
  const [farmKind, setfarmKind] = useState("")
  const [cropData, setCropData] = useState([])
  const [crop, setCrop] = useState("")
  const [lastCropData, setLastCropData] = useState([])
  const [lastCrop, setLastCrop] = useState("")


  const closeSnakBar = () => setOpenSnakBar(false)
  const userIdRef = useRef();
  const farmNameRef = useRef();
  const farmAreaRef = useRef();
  const farmLicenseRef = useRef();
  const farmWaterSalinityRef = useRef();
  const farmFertilizerRef = useRef();
  const farmTreesAgeRef = useRef();
  const farmDescriptionRef = useRef();
  const farmPictureRef = useRef();
  const [longitude, setLongitude] = useState(28.5)
  const [latitude, setLatitude] = useState(40.5)
  const farmLatitudeRef = useRef(null)
  const farmLongitudeRef = useRef(null)

  const addFarm = () => {
    const farmLatitude = farmLatitudeRef.current.querySelector("input[type=number]").value;
    const farmLongitude = farmLongitudeRef.current.querySelector("input[type=number]").value;
    const userId = userIdRef.current.querySelector("input[type=text]").value;
    const farmName = farmNameRef.current.querySelector("input[type=text]").value;
    const farmArea = farmAreaRef.current.querySelector("input[type=number]").value;
    const farmLicense = farmLicenseRef.current.querySelector("input[type=text]").value;
    const farmWaterSalinity = farmWaterSalinityRef.current.querySelector("input[type=number]").value;
    const farmFertilizer = farmFertilizerRef.current.querySelector("input[type=text]").value;
    const farmTreesAge = farmTreesAgeRef.current.querySelector("input[type=number]").value;
    const farmDescription = farmDescriptionRef.current.querySelector("input[type=text]").value;
    const farmPicture = farmPictureRef.current.querySelector("input[type=file").files;

    const formdata = new FormData();
    formdata.append("userId", userId);
    formdata.append("farmName", farmName);
    formdata.append("cityId", cityId);
    formdata.append("farmArea", farmArea);
    formdata.append("cropId", crop);
    formdata.append("farmLicense", farmLicense);
    formdata.append("farmAvailable", available);
    formdata.append("farmKindId", farmKind);
    formdata.append("farmVisibiltiy", visiable);
    formdata.append("farmWaterSalinity", farmWaterSalinity);
    formdata.append("farmLastCropsId", lastCrop);
    formdata.append("farmFertilizer", farmFertilizer);
    formdata.append("farmTreesAge", farmTreesAge);
    formdata.append("farmDescription", farmDescription);
    formdata.append("farmLatitude", farmLatitude);
    formdata.append("farmLongitude", farmLongitude);

    formdata.append("farmPicture", farmPicture[0]);


    fetch(`${process.env.REACT_APP_API_URL}farms`, {
      method: "POST",
      body: formdata,
      headers: {
        Authorization: "bearer " + ctx.token,
      },
    }).then(responce => {
      responce.json().then(farmAdded => {
        console.log(farmAdded)
        setServerResponce(farmAdded.messages.join(' '))
        if (farmAdded.success) {
          setSnakBarColor('success')
        }
        else {
          setSnakBarColor('warning')
        }
        setOpenSnakBar(true)
      })
    }).catch(e => e)

  };


  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}farms/farmKinds/all`, {}, null, {
      auth: true,
    }, 'get')
      .then((farmkinds) => {
        console.log("farmkinds", farmkinds)

        setFarmKindData(farmkinds?.data);
      });

  }, []);

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
  const handleCitiesChange = (e) => {
    const city = citiesData.filter((city) => city.id == e.target.value)
    setLatitude(city.latitude)
    setLongitude(city.longitude)
    setCityId(e.target.value);
  }


  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}farms/crops/all`, {}, null, {
      auth: true,
    }, 'get')
      .then((crop) => {
        console.log("cropsData", crop)
        setCropData(crop?.data);
        setLastCropData(crop?.data);

      });

  }, []);

  const handleAvaliableChange = (event) => {
    setAvailable(event.target.value);
    // console.log( available)
  };
  const handleVisiableChange = (event) => {
    setVisiable(event.target.value);
    //console.log( visiable)
  };
  const handleFarmKindChange = (event) => {
    setfarmKind(event.target.value);
  };

  const handleCropChange = (event) => {
    setCrop(event.target.value);
  };
  const handleLastCropChange = (event) => {
    setLastCrop(event.target.value);
  };

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
                    <MDInput
                      type="text"
                      ref={userIdRef}
                      label="farmer Id"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      ref={farmNameRef}
                      label="farm Name"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="number"
                      ref={farmAreaRef}
                      label="farm Area in Meters"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      ref={farmLicenseRef}
                      label="farm License"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="number"
                      ref={farmWaterSalinityRef}
                      label="farm WaterSalinity"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      ref={farmFertilizerRef}
                      label="farm Fertilizer"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="number"
                      ref={farmTreesAgeRef}
                      label="farm TreesAge (Years)"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      ref={farmDescriptionRef}
                      label="farm Description"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <FormControl>
                      <FormLabel id="farm-availability">farm Availablility</FormLabel>
                      <RadioGroup row aria-labelledby="farm-availability" name="row-radio-buttons-group" onChange={handleAvaliableChange} >
                        <FormControlLabel value={1} control={<Radio />} label="Available" />
                        <FormControlLabel value={0} control={<Radio />} label="Not Available" />
                      </RadioGroup>
                    </FormControl>
                  </MDBox>
                  <MDBox mb={2}>
                    <FormControl>
                      <FormLabel id="farm-visibility">farm Visiablility</FormLabel>
                      <RadioGroup row aria-labelledby="farm-visibility" name="row-radio-buttons-group" onChange={handleVisiableChange} >
                        <FormControlLabel value={1} control={<Radio />} label="Visiable" />
                        <FormControlLabel value={0} control={<Radio />} label="Not Visiable" />
                      </RadioGroup>
                    </FormControl>
                  </MDBox>
                  <MDBox mb={2}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Crops
                        </InputLabel>
                        <NativeSelect
                          labelid="demo-simple-select-label"
                          id="demo-simple-select"
                          value={crop}
                          label="Crops"
                          
                          onChange={handleCropChange}
                        >
                          <option></option>
                          {lastCropData?.map((crop, i) => {
                            return (
                              <option value={crop.id} key={i}>
                                {crop.cropName}
                              </option>
                            );
                          })}
                        </NativeSelect>
                      </FormControl>
                    </Box>
                  </MDBox>
                  <MDBox mb={2}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Farm Last Crops
                        </InputLabel>
                        <NativeSelect
                          labelid="demo-simple-select-label"
                          id="demo-simple-select"
                          value={lastCrop}
                          label="Crops"
                          
                          onChange={handleLastCropChange}
                        >
                          <option></option>
                          {cropData?.map((crop, i) => {
                            return (
                              <option value={crop.id} key={i}>
                                {crop.cropName}
                              </option>
                            );
                          })}
                        </NativeSelect>
                      </FormControl>
                    </Box>
                  </MDBox>
                  <MDBox mb={2}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Farm Kind
                        </InputLabel>
                        <NativeSelect
                          labelid="demo-simple-select-label"
                          id="demo-simple-select"
                          value={farmKind}
                          label="FarmKind"
                          
                          onChange={handleFarmKindChange}
                        >
                          <option></option>
                          {farmKindData?.map((farmkind, i) => {
                            return (
                              <option value={farmkind.id} key={i}>
                                {farmkind.farmKind}
                              </option>
                            );
                          })}
                        </NativeSelect>
                      </FormControl>
                    </Box>
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      ref={farmPictureRef}
                      type="file"
                      variant="standard"
                      fullWidth
                    />
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
                        onChange={handleCitiesChange}


                      >

                        <option > </option>
                        {citiesData?.map((city, i) => <option value={city.id} key={city.id}>{city.cityName}</option>)}

                      </NativeSelect>
                    </FormControl>
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="number"
                      value={latitude}
                      ref={farmLatitudeRef}
                      label="farm Latitude"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="number"
                      value={longitude}
                      ref={farmLongitudeRef}
                      label="farm Longitude"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <Wrapper apiKey={''} >
                      <Map center={{ lat: latitude, lng: longitude }} setLat={setLatitude} setLng={setLongitude} zoom={8} />
                    </Wrapper>
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      color="success"
                      fullWidth
                      onClick={addFarm}
                    >
                      Add Farm
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDSnackbar
        color={snakBarColor}
        icon={snakBarColor == "success" ? 'check' : 'warning'}
        title="Place App"
        content={serverResponce}
        open={openSnakBar}
        dateTime=""
        onClose={closeSnakBar}
        close={closeSnakBar}
        bgWhite
      />
    </DashboardLayout>
  );
}
export default AddFarms;