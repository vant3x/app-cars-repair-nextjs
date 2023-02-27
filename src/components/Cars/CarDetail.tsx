import { useContext } from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Props } from "../../interfaces/Props.interface";
import { CarDetail } from "../../interfaces/CarDetail.interface";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Fab, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import appContext from "../../context/app/appContext";

interface PropsType extends Props {
  carInfo: CarDetail;
}

const CarDetailComponent = ({ carInfo }: PropsType) => {
  const AppContext = useContext(appContext);
  const { loading, deleteCarModal, setOpenDeleteCarModal } = AppContext;

  const handleClickOpen = () => {
    if (carInfo && carInfo._id) {
      setOpenDeleteCarModal(carInfo._id, true);
    }
  };

  const router = useRouter();
  return (
    <>
      <Card sx={{ maxWidth: 500, mt: "10px", pb: 2 }}>
        {carInfo.image && (
          <CardMedia
            component="img"
            alt={carInfo.brand}
            height="150"
            image={carInfo.image}
          />
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {carInfo.brand} {carInfo.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {carInfo.description}
          </Typography>
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button onClick={()=> router.push(`/detalle/${carInfo._id}`)} variant="outlined" size="small">Ver Detalle</Button>
          <Tooltip title="Editar">
          <Fab
            onClick={() => router.push(`/editar/${carInfo._id}`)}
            size="small"
            color="primary"
            aria-label="delete"
          >
            <EditIcon />
          </Fab>
          </Tooltip>
          <Tooltip title="Eliminar">
          <Fab size="small" onClick={handleClickOpen} color="primary" sx={{backgroundColor: '#f50057'}} aria-label="delete">
            <DeleteIcon />
          </Fab>
          </Tooltip>
        </CardActions>
      </Card>
    </>
  );
};

export default CarDetailComponent;
