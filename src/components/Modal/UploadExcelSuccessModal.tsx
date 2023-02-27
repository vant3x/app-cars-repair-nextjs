import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box } from "@mui/material";

interface Props {
    openExcelSuccessModal:  boolean;
    setOpenExcelSuccessModal: (open: boolean) => void;
} 

export default function UploadExcelSuccessModal({openExcelSuccessModal, setOpenExcelSuccessModal}: Props) {  
  const handleClose = () => {
    setOpenExcelSuccessModal(false);
  };

  return (<>
      {
       openExcelSuccessModal && <div>
        <Dialog
          open={openExcelSuccessModal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {" "}

          <DialogTitle  id="alert-dialog-title" sx={{display:'center', justifyContent: 'center', alignItems:'center'}}>
          <CheckCircleOutlineIcon fontSize="large" color="success" sx={{position: 'relative',top:'10px', mr:2}}  />
        Subida del excel con éxito    
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              El archivo se subió sin problema y realizó las operaciones, ahora puedes revisar los cambios
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>Salir</Button>
          </DialogActions>
        </Dialog>
      </div>
      }
 </> );
}
