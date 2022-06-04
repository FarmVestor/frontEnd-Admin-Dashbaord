import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState, useContext } from "react";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import { useRequest } from "lib/functions";
import { AuthContext } from "context/AuthContext";
import { Link } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import { InputLabel } from "@mui/material";
import { NativeSelect } from "@mui/material";
const columns = [
    { Header: "Farmer name", accessor: "userId", width: "45%", align: "left" },
    { Header: "Farm Id", accessor: "id", width: "45%", align: "left" },
    { Header: "farm Name", accessor: "farmName", align: "left" },
    { Header: "farm Picture", accessor: "farmPicture", align: "left" },
    { Header: "city", accessor: "city", align: "left" },
    { Header: "farm Area", accessor: "farmArea", align: "left" },
    { Header: "crop Name", accessor: "cropId", align: "left" },
    { Header: "farm License", accessor: "farmLicense", align: "left" },
    { Header: "farm Available", accessor: "farmAvailable", align: "left" },
    { Header: "farm KindId", accessor: "farmKindId", align: "left" },
    { Header: "farm Visibiltiy", accessor: "farmVisibiltiy", align: "left" },
    { Header: "farm WaterSalinity", accessor: "farmWaterSalinity", align: "left" },
    { Header: "farm LastCropsId", accessor: "farmLastCropsId", align: "left" },
    { Header: "farm Fertilizer", accessor: "farmFertilizer", align: "left" },
    { Header: "farm TreesAge", accessor: "farmTreesAge", align: "left" },
    { Header: "farm Description", accessor: "farmDescription", align: "left" },
    { Header: "actions", accessor: "actions", align: "center" },
]
// const rows = []

function Farms() {
    const [rows, setRows] = useState([])
    const ctx = useContext(AuthContext)
    const request = useRequest()
    const [order, setOrder] = useState('ASC')


    const deleteFarm = (farmId) => {
        if (window.confirm('Are you sure')) {
            request(`${process.env.REACT_APP_API_URL}farms/${farmId}`, {}, {}, {
                auth: true,
                snackbar: true,

            }, 'delete')
            .then(deleted=>{
                console.log(deleted)
            })
        }
    }

    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}farms?order=${order}`, {}, null, {
            // auth: true,
        }, 'get')
            .then(farms => {
                    const allfarms = farms?.data?.map((farm) => {
                        return {
                            userId: <>{farm.User.userName}</>,
                            id: <>{farm.id}</>,
                            farmName: <>{farm.farmName}</>,
                            farmPicture: <><img src={farm.farmPicture} width="80" /></>,
                            city: <>{farm.City?.cityName}</>,
                            farmArea: <>{farm.farmArea}</>,
                            cropId: <>{farm.Crop.cropName}</>,
                            farmLicense: <>{farm.farmLicense}</>,
                            farmAvailable: <>{farm.farmAvailable ? <CheckIcon /> : <NotInterestedIcon />}</>,
                            farmKindId: <>{farm.FarmKind?.farmKind ? farm.FarmKind?.farmKind:"-" }</>,
                            farmVisibiltiy: <>{farm.farmVisibiltiy ? <VisibilityIcon/> : <VisibilityOffIcon/>}</>,
                            farmWaterSalinity: <>{farm.farmWaterSalinity}</>,
                            farmLastCropsId: <>{farm.LastCrop.cropName}</>,
                            farmFertilizer: <>{farm.farmFertilizer}</>,
                            farmTreesAge: <>{farm.farmTreesAge}</>,
                            farmDescription: <>{farm.farmDescription}</>,

                            actions: <>
                                <MDButton variant="text" color="error" onClick={() => { deleteFarm(farm.id) }}>
                                    <Icon>delete</Icon>&nbsp;delete
                                </MDButton>
                                <Link to={`/farms/edit/${farm.id}`}>
                                    <MDButton variant="text" color="info">
                                        <Icon>edit</Icon>&nbsp;edit
                                    </MDButton>
                                </Link>
                                <Link to={`/deals/add/${farm.id}`}>
                                    <MDButton variant="text" color="info">
                                        <Icon>person</Icon>&nbsp;Deal
                                    </MDButton>
                                </Link>
                            </>,
                        }
                    })
                    setRows(allfarms)
                })
            
    }, [order])
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
                                        farms Table
                                    </MDTypography>
                                    <Link to='/farms/add'>
                                        <MDButton variant="text">
                                            <Icon>add_circle</Icon>&nbsp;Add
                                        </MDButton>
                                    </Link>
                                </Grid>

                            </MDBox>
                            <MDBox pt={3}>
                            <MDBox mb={2} p={2}>
                                        <FormControl fullWidth >
                                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                Order
                                            </InputLabel>
                                            <NativeSelect

                                                defaultValue={"ASC"}
                                                onChange={(e) => { setOrder(e.target.value) }}
                                                inputProps={{
                                                    name: 'UserType',
                                                    id: 'uncontrolled-native',
                                                }}

                                            >
                                                <option value="ASC" defaultValue >ASC</option>
                                                <option value="DESC" >DESC</option>

                                            </NativeSelect>
                                        </FormControl>
                                        
                                    </MDBox>
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
    );
}

export default Farms;