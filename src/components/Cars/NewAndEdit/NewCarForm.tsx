import { useState, ChangeEvent, useContext } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import TimeToLeaveOutlinedIcon from "@mui/icons-material/TimeToLeaveOutlined";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Divider, Typography, Button, Grid, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CarDetail } from "../../../interfaces/CarDetail.interface";
import appContext from "../../../context/app/appContext";
import UploadCarImage from "../../Buttons/UploadCarImage";

enum Gas {
  Electric = 'electric',
  Gasoline = 'gasoline'
}

const NewCarForm = () => {
  const AppContext = useContext(appContext);
  const { loading, newCar, setCar, car } = AppContext;

  const [entryDate, setEntryDate] = useState<Dayjs | null>(dayjs(Date.now()));
  const [gas, setGas] = useState("");

  const handle = (event: SelectChangeEvent) => {
    setGas(event.target.value as Gas);
    setCar({ ...car, gas: event.target.value as Gas});
  };

  const handleChangeEntryDate = (newValue: Dayjs | null) => {
    setEntryDate(newValue);
    setCar({...car, entryDate: newValue ? newValue.toDate() : new Date()});
  };

  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Box sx={{ width: "90%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignContent: "center",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            color="text.secondary"
            sx={{ mb: 4, mt: 2, mr: 4 }}
          >
            Nuevo auto
          </Typography>{" "}
          <TimeToLeaveOutlinedIcon sx={{ fontSize: 60 }} />
        </Box>
        <UploadCarImage/>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl sx={{ m: 1, width: "35ch" }}>
            <TextField
              label="Marca"
              name="brand"
              id="filled-brand"
              variant="filled"
              placeholder="Ingresa la marca"
              onChange={handleChangeEvent}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "35ch" }}>
            <TextField
              label="Modelo"
              name="model"
              id="filled-model-normal"
              placeholder="Ingresa el modelo"
              variant="filled"
              onChange={handleChangeEvent}
            />
          </FormControl>

        </Box>
        <FormControl fullWidth sx={{ m: 1, width: "35ch" }}>
            <TextField
              label="Placa de carro*"
              name="carRegistrationPlate"
              id="filled-car-registration-normal"
              placeholder="Ingresa la placa del auto"
              variant="filled"
              onChange={handleChangeEvent}
            />
          </FormControl>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl fullWidth sx={{ ml: 1 }}>
            <TextField
              id="filled-multiline-static"
              label="Descripción"
              name="description"
              multiline
              fullWidth
              rows={4}
              variant="filled"
              onChange={handleChangeEvent}
            />
          </FormControl>
        </Box>

        <Box sx={{ ml: 1, my: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Fecha de ingreso"
              inputFormat="MM/DD/YYYY"
              value={entryDate}
              onChange={handleChangeEntryDate}
              renderInput={(params) => (
                <TextField fullWidth variant="filled" {...params} />
              )}
            />
          </LocalizationProvider>
        </Box>
        <FormControl fullWidth variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="gas-select-helper-label">Tipo</InputLabel>
          <Select
            labelId="gas-helper-label"
            id="gas-simple-select-helper"
            value={gas}
            label="Gas"
            onChange={handle}
          >
            <MenuItem value="">
              <em>Ninguno</em>
            </MenuItem>
            <MenuItem value="gasoline">Gasolina</MenuItem>
            <MenuItem value={"electric"}>Electrico</MenuItem>
          </Select>
          <FormHelperText>Tipo de vehículo</FormHelperText>
        </FormControl>
        <Box sx={{display:'flex', justifyContent:'center', mb:2}}>
        <FormControl sx={{mr:4}}>
            <TextField
            
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              label="Año del modelo de auto"
              name="year"
              id="filled-year-normal"
              placeholder="Ingresa el año del auto"
              variant="filled"
              onChange={handleChangeEvent}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Color de auto"
              name="color"
              id="filled-color-normal"
              placeholder="Ingresa el color del auto"
              variant="filled"
              onChange={handleChangeEvent}
            />
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            label="Kilometraje"
            id="filled-start-adornment"
            name="mileage"
            sx={{ m: 1, width: "25ch" }}
            onChange={handleChangeEvent}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">km</InputAdornment>
              ),
            }}
            variant="filled"
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <FormControl sx={{ m: 1, width: "35ch" }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Precio</InputLabel>
              <FilledInput
                onChange={handleChangeEvent}
                id="filled-adornment-amount"
                name="price"
                placeholder="Por defecto el precio es $200.000"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NewCarForm;
