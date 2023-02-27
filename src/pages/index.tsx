import { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import axiosClient from "../config/axios";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { Button, Grid, Box, Typography, Tooltip, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Pagination from "@mui/material/Pagination";

import { CarDetail } from "./../interfaces/CarDetail.interface";
import styles from "../styles/Home.module.css";
import Layout from "./../components/Layout/Layout";
import Loader from "./../components/Loaders/Loader";
import UploadExcelButton from "../components/Buttons/UploadExcelButton/UploadExcelButton";
import CarDetailComponent from "../components/Cars/CarDetail";
import DeleteCarModal from "../components/Modal/DeleteCarModal";
import { AuthContextType } from "../interfaces/AuthContextType";
import { AppContextType } from "../interfaces/AppContextType";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import useAuthChecker from "../hooks/useAuthChecker";
import { ErrorSessionExpired } from "../components/Errors/ErrorSessionExpired";
import UploadExcelSuccessModal from "../components/Modal/UploadExcelSuccessModal";

const Home = () => {
  // definir el context
  const AuthContext = useContext<AuthContextType>(authContext);
  const { message, auth, user, login, userAuthtenticate, errorSession } =
    AuthContext;

  const AppContext = useContext<AppContextType>(appContext);
  const { alertMessage, carsSearched } = AppContext;
  // state
  const [cars, setCars] = useState<CarDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [openExcelSuccessModal, setOpenExcelSuccessModal] = useState<boolean>(false);
  // next router
  const router = useRouter();
  const authError = useAuthChecker();

  const getCars = async () => {
    try {
      const carsData = await axiosClient.get<CarDetail[]>(
        "/api/cars"
      );
      setCars(carsData.data);
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    userAuthtenticate();
    getCars();

    if (errorSession.error || errorSession.statusCode ) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
      return setCars(carsSearched);
  }, [carsSearched]);

  return (
    <>
      <Layout>
        {loading && !authError && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Loader />
          </Box>
        )}
        {alertMessage && (
          <>
            <Alert severity="success">
              <AlertTitle>Se ha eliminado</AlertTitle>
              {alertMessage}
            </Alert>
          </>
        )}
        {authError && error && <ErrorSessionExpired message={authError} />}
        <Grid
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignContent: "center",
          }}
        >
          <UploadExcelButton setOpenExcelSuccessModal={setOpenExcelSuccessModal} getCars={getCars} />
          <Tooltip title="Registrar nuevo vehículo">
            <Fab
              onClick={() => router.push("/nuevo-carro")}
              sx={{ position: "relative", top: "30px", mr: 4 }}
              size="small"
              color="primary"
              aria-label="delete"
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
        <Box sx={{ margin: 0 }}></Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Vehículos en reparación
          </Typography>

          {cars.map((car, index) => (
            <CarDetailComponent key={index} carInfo={car} />
          ))}
          {
            cars.length < 1 && (
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              No hay carros aún, registra uno 
            </Typography>
  
            )
          }
        </Box>
        <DeleteCarModal getCars={getCars} />
        <UploadExcelSuccessModal openExcelSuccessModal={openExcelSuccessModal} setOpenExcelSuccessModal={setOpenExcelSuccessModal} />
        <Box sx={{ mb: 4, mt: 6, display: "flex", justifyContent: "center" }}>
          <Pagination count={10} />
        </Box>
      </Layout>
    </>
  );
};

export default Home;
