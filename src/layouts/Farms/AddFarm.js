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
import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Radio } from "@mui/material";
import { Box } from "@mui/material";
import Select from '@mui/material/Select';
import { MenuItem } from "@mui/material";
import { useRequest } from "lib/functions";

// import { useRef } from "react";
// import { FourGMobiledataRounded } from "@mui/icons-material";
function AddFarms() {
  const ctx = useContext(AuthContext);
  const request = useRequest()

  const [openSnakBar, setOpenSnakBar] = useState(false)
  const [serverResponce, setServerResponce] = useState('')
  const [snakBarColor, setSnakBarColor] = useState('success')
  const [available, setAvailable] = useState(true);
  const [visiable, setVisiable] = useState(true);
  const [farmKindData, setFarmKindData] = useState([])
  const [farmKind, setfarmKind] = useState("")
  const [cityData, setCityData] = useState([])
  const [city, setCity] = useState("")
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

  const addFarm = () => {

    const userId = userIdRef.current.querySelector("input[type=text]").value;
    const farmName = farmNameRef.current.querySelector("input[type=text]").value;
    const farmArea = farmAreaRef.current.querySelector("input[type=text]").value;
    const farmLicense = farmLicenseRef.current.querySelector("input[type=text]").value;
    const farmWaterSalinity = farmWaterSalinityRef.current.querySelector("input[type=text]").value;
    const farmFertilizer = farmFertilizerRef.current.querySelector("input[type=text]").value;
    const farmTreesAge = farmTreesAgeRef.current.querySelector("input[type=text]").value;
    const farmDescription = farmDescriptionRef.current.querySelector("input[type=text]").value;
    const farmPicture = farmPictureRef.current.querySelector("input[type=file").files;

    const formdata = new FormData();
    formdata.append("userId", userId);
    formdata.append("farmName", farmName);
    formdata.append("cityId", city);
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
    request(`${process.env.REACT_APP_API_URL}farms/farmKinds/all`, {}, {}, {
      auth: true,
    }, 'get')
      .then((farmkinds) => {
        console.log("farmkinds", farmkinds)

        setFarmKindData(farmkinds?.data);
      });

  }, []);

  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}addresses/city`, {}, {}, {
      auth: true,
    }, 'get')
      .then((city) => {
        console.log("cityData",city)
        setCityData(city.data);
        
      });

  }, []);

  // useEffect(() => {
  //   request(`${process.env.REACT_APP_API_URL}farms/crops/all`, {}, {}, {
  //     auth: true,
  //   }, 'get')
  //     .then((crop) => {
  //       console.log("cropsData",crop)
  //       setCropData(crop?.data);
  //       setLastCropData(crop?.data);
        
  //     });

  // }, []);

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
  const handleCityChange = (event) => {
    setCity(event.target.value);
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
                      type="text"
                      ref={farmAreaRef}
                      label="farm Area"
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
                      type="text"
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
                      type="text"
                      ref={farmTreesAgeRef}
                      label="farm TreesAge"
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
                      <FormLabel id="demo-row-radio-buttons-group-label">farm Available</FormLabel>
                      <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={handleAvaliableChange} >
                        <FormControlLabel value={true} control={<Radio />} label="Available" />
                        <FormControlLabel value={false} control={<Radio />} label="Not Available" />
                      </RadioGroup>
                    </FormControl>
                  </MDBox>
                  <MDBox mb={2}>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">farm Visiable</FormLabel>
                      <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={handleVisiableChange} >
                        <FormControlLabel value={true} control={<Radio />} label="Visiable" />
                        <FormControlLabel value={false} control={<Radio />} label="Not Visiable" />
                      </RadioGroup>
                    </FormControl>
                  </MDBox>
                  {/* <MDBox mb={2}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          City
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={farmKind}
                          label="City"
                          defaultValue="1"
                          onChange={handleCityChange}
                        >
                          {cityData?.map((city, i) => {
                            return (
                              <MenuItem value={city.id} key={i}>
                                {city.cityName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </MDBox> */}
                  <MDBox mb={2}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Crops
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={farmKind}
                          label="Crops"
                          defaultValue="1"
                          onChange={handleCropChange}
                        >
                          {lastCropData?.map((crop, i) => {
                            return (
                              <MenuItem value={crop.id} key={i}>
                                {crop.cropName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </MDBox>
                  <MDBox mb={2}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Farm Last Crops
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={farmKind}
                          label="Crops"
                          defaultValue="1"
                          onChange={handleLastCropChange}
                        >
                          {cropData?.map((crop, i) => {
                            return (
                              <MenuItem value={crop.id} key={i}>
                                {crop.cropName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </MDBox>
                  <MDBox mb={2}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Farm Kind
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={farmKind}
                          label="FarmKind"
                          defaultValue="1"
                          onChange={handleFarmKindChange}
                        >
                          {farmKindData?.map((farmkind, i) => {
                            return (
                              <MenuItem value={farmkind.id} key={i}>
                                {farmkind.farmKind}
                              </MenuItem>
                            );
                          })}
                        </Select>
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
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      color="info"
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