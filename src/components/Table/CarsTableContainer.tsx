import { useState, useEffect, useContext } from "react";
import CarTable from "./CarTable";
import axiosClient from "../../config/axios";
import DeleteCarModal from "../Modal/DeleteCarModal";
import appContext from "../../context/app/appContext";
import useAuthChecker from "../../hooks/useAuthChecker";
import { ErrorSessionExpired } from "./../Errors/ErrorSessionExpired";
import { AppContextType } from "../../interfaces/AppContextType";
import { AxiosResponse } from "axios";
import { CarDetail } from './../../interfaces/CarDetail.interface';

const CarTableContainer = () => {
  const AppContext = useContext<AppContextType>(appContext);
  const { loading, showAlert } = AppContext;
  const [cars, setCars] = useState<CarDetail[]>([]);
  const [error, setError] = useState<boolean>(false);
  const authError = useAuthChecker();

  const getCars = async () => {
    try {
      const carsData = await axiosClient.get<AxiosResponse<CarDetail[]>>(
        "/api/cars"
      );
      if (carsData && carsData.data) {
        setCars(carsData.data as CarDetail[]);
      }
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <>
      {authError && error ? (
        <ErrorSessionExpired message={authError} />
      ) : (
        <>
          <CarTable cars={cars} />
          <DeleteCarModal getCars={getCars} />
        </>
      )}
    </>
  );
};

export default CarTableContainer;
