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
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useRouter } from "next/router";

import Layout from "../../components/Layout/Layout";
import axiosClient from "../../config/axios";
import appContext from "../../context/app/appContext";
import authContext from "../../context/auth/authContext";
import EditCarForm from "../../components/Cars/NewAndEdit/EditCar";
import { CarDetail } from "../../interfaces/CarDetail.interface";
import Loader from "../../components/Loaders/Loader";
import DeleteCarModal from "../../components/Modal/DeleteCarModal";

export async function getServerSideProps(context: any) {
  const { carInfo } = context.params;
  return {
    props: {
      carInfo,
    },
  };
}

type Props = {
  carInfo: string;
}

const CarInfoDetailComponent = ({ carInfo }: Props) => {
  const router = useRouter();
  // context de la app
  const AppContext = useContext(appContext);
  const { updateCar, message, setCar, car, setOpenDeleteCarModal, deleteCarModal } = AppContext;
  const [carInfoDetail, setCarInfoDetail] = useState<CarDetail>();
  const [loading, setLoading] = useState(false);

  const getCarById = async () => {
    setLoading(true);
    const response = await axiosClient.get(`/api/cars/${carInfo}`);
    setCarInfoDetail(response.data);
  };

  const deleteCar = () => {
    if (carInfoDetail && carInfoDetail._id) {
      setOpenDeleteCarModal(carInfoDetail._id, true);

    }
  }

  useEffect(() => {
    getCarById();
  }, []);


  return (
    <>
      <Layout>
        {!carInfoDetail && loading && (
          <>
            <Loader />
          </>
        )}
        <Grid  sx={{p: 4}} container spacing={2}>
          <Grid item xs={6}>
            <img src={carInfoDetail?.image} width="450" />
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom color="primary">
                {carInfoDetail?.brand} {carInfoDetail?.model}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Año del modelo: {carInfoDetail?.year}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Placa: {""}
                <Chip
                  label={carInfoDetail?.carRegistrationPlate.toUpperCase()}
                  color="primary"
                  variant="outlined"
                />
              </Typography>
              <Typography variant="h6" gutterBottom>
                Tipo de vehículo:{" "}
                {carInfoDetail?.gas === "gasoline" ? "Gasolina" : "Electrico"}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Kilometraje: {carInfoDetail?.mileage} km
              </Typography>
              <Typography variant="h6" gutterBottom>
                Cliente: {carInfoDetail?.owner}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Precio:{" "}
                  ${carInfoDetail?.price}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Estado:{" "}
                <Chip
                  label={carInfoDetail?.state ? "Activo" : "Inactivo"}
                  color="primary"
                  variant={!carInfoDetail?.state ? "outlined" : "filled"}
                />
              </Typography>
              
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6" gutterBottom>
              Descripción:
            </Typography>
            {carInfoDetail?.description}
        
          </Grid>
          <Grid item xs={4}>
            <Box>
            <Button  onClick={()=> router.push(`/editar/${carInfoDetail?._id}`)} sx={{mr:2}} variant="outlined" endIcon={<EditIcon />}>
              Editar
            </Button>
            <Button onClick={() => deleteCar()} variant="outlined"  color="primary" endIcon={<DeleteIcon />}>
              Eliminar
            </Button>
            </Box>
          </Grid>
        </Grid>
        <DeleteCarModal/>
      </Layout>
    </>
  );
};

export default CarInfoDetailComponent;
