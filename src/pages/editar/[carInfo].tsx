import { useState, useContext, useEffect, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import {
  Divider,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useRouter } from "next/router";

import Layout from "../../components/Layout/Layout";
import axiosClient from "../../config/axios";
import appContext from "../../context/app/appContext";
import authContext from "../../context/auth/authContext";
import EditCarForm from "../../components/Cars/NewAndEdit/EditCar";
import { CarDetail } from "./../../interfaces/CarDetail.interface";
import Loader from "../../components/Loaders/Loader";

interface Props {
  carInfo: string;
}

export async function getServerSideProps(context: any) {
  const { carInfo } = context.params;
  return {
    props: {
      carInfo,
    },
  };
}

const EditCar = ({ carInfo }: Props) => {
  const router = useRouter();
  // context de la app
  const AppContext = useContext(appContext);
  const { updateCar, message, setCar, car } = AppContext;
  const [cleanAlert, setCleanAlert] = useState<boolean>(false);
  const [carInfoDetail, setCarInfoDetail] = useState<CarDetail>();
  const [loading, setLoading] = useState(false);

  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (!message.status) {
      return;
    }
    setCleanAlert(true);
    const timer = setTimeout(() => {
      setCleanAlert(false);
      if (message.status === 201 && !cleanAlert) {
        router.push("/");
        setCleanAlert(false);
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [message]);

  const getCarById = async () => {
    setLoading(true);
    const response = await axiosClient.get(`/api/cars/${carInfo}`);
    setCarInfoDetail(response.data);
  };

  useEffect(() => {
    getCarById();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  const updateCarSubmit = async () => {
    const formData = new FormData();
    //formData.append("file", car.file);
    if (car && carInfoDetail && carInfoDetail._id) {
      Object.entries(car)
        .filter(([key, value]) => value)
        .forEach(([key, value]) => formData.append(key, value));
      updateCar(formData, carInfoDetail._id);
    }
  };

  if (!carInfoDetail && loading) {
    return (
      <>
        <Loader />{" "}
      </>
    );
  }

  return (
    <>
      <Layout>
        {carInfoDetail && !loading && (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={12} sm={7} md={7}>
              {message.status === 400 && cleanAlert ? (
                <>
                  <Alert severity="error">
                    <AlertTitle>Ocurrió un error :(</AlertTitle>
                    Verifica que estés enviando los datos necesarios
                  </Alert>
                </>
              ) : null}
              {message.status === 201 && cleanAlert ? (
                <>
                  <Alert severity="success">
                    <AlertTitle>Se creó el auto con éxito</AlertTitle>
                    Ahora puedes ver el auto con los demás
                  </Alert>
                </>
              ) : null}
              <EditCarForm carDetail={carInfoDetail} />
            </Grid>
            <Divider sx={{ mt: 4 }} orientation="vertical" flexItem />

            <Grid item xs={12} sm={4} md={4}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <PersonAddIcon sx={{ fontSize: 50 }} />
                  <Typography
                    variant="h6"
                    gutterBottom
                    color="text.secondary"
                    sx={{ mb: 4, mr: 2 }}
                  >
                    Info cliente
                  </Typography>{" "}
                </Box>
                <FormControl sx={{ m: 1, width: "35ch" }}>
                  <TextField
                    label="Nombre del cliente"
                    id="filled-owner"
                    name="owner"
                    variant="filled"
                    onChange={handleChangeEvent}
                    defaultValue={carInfoDetail?.owner}
                    placeholder="Ingresa el nombre del cliente (opcional)"
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: "35ch" }}>
                  <TextField
                    label="Numero del cliente"
                    id="filled-phone-owner"
                    variant="filled"
                    name="phoneOwner"
                    defaultValue={carInfoDetail?.phoneOwner}
                    onChange={handleChangeEvent}
                    placeholder="Ingresa el telefono del cliente (opcional)"
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: "35ch" }}>
                  <TextField
                    label="Dirección del cliente"
                    id="filled-brand"
                    variant="filled"
                    name="addressOwner"
                    defaultValue={carInfoDetail?.addressOwner}
                    onChange={handleChangeEvent}
                    placeholder="Ingresa la dirección del cliente(opcional)"
                  />
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={() => updateCarSubmit()}
                    type="submit"
                    size="large"
                    sx={{ my: 4 }}
                    variant="contained"
                  >
                    Actualizar auto
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Layout>
    </>
  );
};

export default EditCar;
