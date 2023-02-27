import { useContext } from "react";
import axiosClient from "../../config/axios";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import appContext from "../../context/app/appContext";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

interface Props {
  getCars?: () => void;
} 

export default function DeleteCarModal({getCars}: Props) {
  const AppContext = useContext(appContext);
  const { loading, deleteCarModal, setOpenDeleteCarModal, showAlert } = AppContext;

  const router = useRouter();
  
  const handleClose = () => {
    setOpenDeleteCarModal("", false);
  };

  const deleteCarById = async (id: string) => {
    const deleteCar = await axiosClient.delete(`/api/cars/${id}`);
    if (deleteCar.status === 200) {
      if (getCars) {
        getCars();
      } else {
        router.push('/');
      }
      showAlert('El auto se ha eliminado con éxito');
    }
    handleClose();
  };

  return (<>
      {
        deleteCarModal && deleteCarModal.open && <div>
        <Dialog
          open={deleteCarModal.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {" "}
          <DialogTitle id="alert-dialog-title">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CarCrashIcon fontSize="large" />
            </Box>
          </DialogTitle>
          <DialogTitle id="alert-dialog-title">
            ¿Estás seguro que deseas eliminar el auto?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Esta acción no se podrá revertir
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={()=>deleteCarById(deleteCarModal.id)} autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      }
 </> );
}
