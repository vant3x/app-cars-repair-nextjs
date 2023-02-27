import { ChangeEvent, useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import Layout from "../components/Layout/Layout";
import { Divider, Typography, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import NewCarForm from "../components/Cars/NewAndEdit/NewCarForm";
import { CarDetail } from "./../interfaces/CarDetail.interface";
import appContext from "../context/app/appContext";
import { useRouter } from "next/router";
import { AppContextType } from "./../interfaces/AppContextType";

const NewCar = () => {
  const router = useRouter();
  // context de la app
  const AppContext = useContext<AppContextType>(appContext);
  const { loading, newCar, message, setCar, car } = AppContext;
  const [cleanAlert, setCleanAlert] = useState(false);

  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  const createNewCar = () => {
    const formData = new FormData();
    if (car) {
      Object.entries(car)
        .filter(([key, value]) => value)
        .forEach(([key, value]) => formData.append(key, value));
      if (!car.year) {
        formData.append("year", "2023");
      }

      if (!car.price) {
        formData.append("price", "200000");
      }

      if (!car.entryDate) {
        formData.append("entryDate", Date.now().toString());
      }
      newCar(formData);

    }
  };

  useEffect(() => {
    setCleanAlert(true);
    const timer = setTimeout(() => {
      setCleanAlert(false);
      if (message.status === 201 && !cleanAlert) {
        setCleanAlert(false);
        router.push("/");
      } else {
        setCleanAlert(true);
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
      <Layout>
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
            <NewCarForm />
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
                  placeholder="Ingresa el nombre del cliente (opcional)"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "35ch" }}>
                <TextField
                  label="Numero del cliente"
                  id="filled-phone-owner"
                  variant="filled"
                  name="phoneOwner"
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
                  onChange={handleChangeEvent}
                  placeholder="Ingresa la dirección del cliente(opcional)"
                />
              </FormControl>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={() => createNewCar()}
                  type="submit"
                  size="large"
                  sx={{ my: 4 }}
                  variant="contained"
                  endIcon={<AddIcon />}
                >
                  Registrar auto
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default NewCar;
