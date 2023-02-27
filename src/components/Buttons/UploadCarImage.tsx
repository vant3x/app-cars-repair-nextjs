import { useState, ChangeEvent, useContext } from "react";
import { Typography, Button, Grid, Stack, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import appContext from "../../context/app/appContext";
import { CarDetail } from "../../interfaces/CarDetail.interface";

const UploadCarImage = () => {
  const AppContext = useContext(appContext);
  const { loading, newCar, setCar, car } = AppContext;

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setCar({ ...car, file: e.currentTarget.files[0]});
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button variant="contained" component="label">
          Subir imagen
          <input
            hidden
            accept="image/*"
            onChange={handleFileInputChange}
            multiple
            type="file"
          />
        </Button>
        <IconButton color="primary" aria-label="subir imagen" component="label">
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default UploadCarImage;
