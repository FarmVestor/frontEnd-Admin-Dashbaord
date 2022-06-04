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
import { useParams } from "react-router-dom";
import { useRequest } from "lib/functions";

function EditFarms() {
  const request = useRequest()
  const ctx = useContext(AuthContext);
  const { id } = useParams()
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
  const [farmData, setFarmData] = useState({ userId: 0, farmName: '', cityId: 0, farmArea: 0, cropId: 0, farmLicense: '', farmAvailable: 1, farmKindId: 0, farmVisiable: 1, farmWaterSalinity: 0, farmLastCropId: 0, farmFertilizer: '', farmTreesAge: 0, farmDescription: '' })
  const closeSnakBar = () => setOpenSnakBar(false)

  const farmPictureRef = useRef();

  const editFarm = () => {

    const farmPicture = farmPictureRef.current.querySelector("input[type=file").files;

    const formdata = new FormData();
    formdata.append("userId", farmData.userId);
    formdata.append("farmName", farmData.farmName);
    formdata.append("cityId", city);
    formdata.append("farmArea", farmData.farmArea);
    formdata.append("cropId", crop);
    formdata.append("farmLicense", farmData.farmLicense);
    formdata.append("farmAvailable", available);
    formdata.append("farmKindId", farmKind);
    formdata.append("farmVisibiltiy", visiable);
    formdata.append("farmWaterSalinity", farmData.farmWaterSalinity);
    formdata.append("farmLastCropsId", lastCrop);
    formdata.append("farmFertilizer", farmData.farmFertilizer);
    formdata.append("farmTreesAge", farmData.farmTreesAge);
    formdata.append("farmDescription", farmData.farmDescription);
    formdata.append("farmPicture", farmPicture[0]);

  //   request(`${process.env.REACT_APP_API_URL}farms/${id}`, {}, formdata, {
  //     auth: true,
  //     // type: 'json',
  //     snackbar: true,
  //     redirect:"/farms"
  // }, 'put').then(farmedited => {
  //             console.log(farmedited)
  // })
    fetch(`${process.env.REACT_APP_API_URL}farms/${id}`, {
      method: "put",
      body: formdata,
      headers: {
        Authorization: "bearer " + ctx.token,
      },
    }).then(responce => {
      responce.json().then(farmedited => {
        // console.log(farmedited)
        setServerResponce(farmedited.message.join(' '))
        if (farmedited.success) {
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
        console.log("farmkindsData",farmkinds)

        setFarmKindData(farmkinds?.data);
      });

  }, []);

  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}addresses/city`, {}, {}, {
      auth: true,
    }, 'get')
      .then((city) => {
        console.log("cityData",city )
        setCityData(city?.data);

      });

  }, []);


  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}farms/crops/all`, {}, {}, {
      auth: true,

      snackbar: true

    }, 'get')
      .then((crop) => {
        setCropData(crop?.data);
        setLastCropData(crop?.data);
        // console.log(crop )
      });

  }, []);

  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}farms/${id}`, {}, {}, {
      auth: true,

      snackbar: true

    }, 'get')

      .then(farms => {
        setFarmData(farms?.data)
        // console.log(farms.data+"---------from farm------------")
      })

  }, [])

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
                      label="farmer Id"
                      variant="standard"
                      value={farmData?.userId}
                      onChange={(e) => { setFarmData({ ...farmData, userId: e.target.value }) }}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      value={farmData?.farmName}
                      onChange={(e) => { setFarmData({ ...farmData, farmName: e.target.value }) }}
                      label="farm Name"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      value={farmData?.farmArea}
                      onChange={(e) => { setFarmData({ ...farmData, farmArea: e.target.value }) }}
                      type="text"
                      label="farm Area"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      value={farmData?.farmLicense}
                      onChange={(e) => { setFarmData({ ...farmData, farmLicense: e.target.value }) }}
                      type="text"
                      label="farm License"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      value={farmData?.farmWaterSalinity}
                      onChange={(e) => { setFarmData({ ...farmData, farmWaterSalinity: e.target.value }) }}
                      type="text"
                      label="farm WaterSalinity"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      value={farmData?.farmFertilizer}
                      onChange={(e) => { setFarmData({ ...farmData, farmFertilizer: e.target.value }) }}
                      type="text"
                      label="farm Fertilizer"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      value={farmData?.farmTreesAge}
                      onChange={(e) => { setFarmData({ ...farmData, farmTreesAge: e.target.value }) }}
                      label="farm TreesAge"
                      variant="standard"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      value={farmData?.farmDescription}
                      onChange={(e) => { setFarmData({ ...farmData, farmDescription: e.target.value }) }}
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
                  <MDBox mb={2}>
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
                  </MDBox>
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
                  {farmData?.farmPicture && <img src={farmData?.farmPicture} width={80} />}
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
                      onClick={editFarm}
                    >
                      Save Farm
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
export default EditFarms;