import React, { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";

import {
  SHOW_ALERTS,
  REMOVE_ALERTS,
  NEW_CAR,
  NEW_CAR_SUCCESS,
  NEW_CAR_ERROR,
  UPDATE_CAR,
  UPDATE_CAR_SUCCESS,
  UPDATE_CAR_ERROR,
  SET_DELETE_CAR_MODAL,
  SET_CARS_SEARCHED,
  RESET_STATE,
  SET_CAR,
} from "../../types";
import axiosClient from "../../config/axios";
import { CarDetail } from "../../interfaces/CarDetail.interface";
import { AxiosError } from "axios";

type Props = {
  children: React.ReactNode;
}

type ErrorResponse = {
  error: string
  status: number
};

const AppState = ({ children }: Props) => {
  const initialState = {
    message: "",
    car: {},
    loading: false,
    deleteCarModal: false,
    alertMessage: null,
    carsSearched: []
  };

  // crear dispatch y state
  const [state, dispatch] = useReducer(appReducer, initialState);

  // toast alerts
  const showAlert = (msg: string) => {
    dispatch({
      type: SHOW_ALERTS,
      payload: msg,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERTS,
      });
    }, 5000);
  };

  const newCar = async (formData: FormData) => {
    dispatch({
      type: NEW_CAR,
    });

    try {
      const response = await axiosClient.post("/api/cars", formData);
      dispatch({
        type: NEW_CAR_SUCCESS,
        payload: {
          data: response.data.message,
          status: response.status,
        },
      });
    } catch (error: any) {
      
      const payload: ErrorResponse = {
        error: error.response.data.message,
        status: error.response.status,
      };
      dispatch({
        type: NEW_CAR_ERROR,
        payload,
      });
    }
  };

  const updateCar = async (formData: FormData, id: string) => {
    dispatch({
      type: UPDATE_CAR,
    });

    try {
      const response = await axiosClient.patch(`/api/cars/${id}`, formData);
      dispatch({
        type: UPDATE_CAR_SUCCESS,
        payload: {
          data: response.data.message,
          status: response.status,
        },
      });
    } catch (error: any) {
      const payload = {
        error: error.response.data.message,
        status: error.response.status,
      };
      dispatch({
        type: UPDATE_CAR_ERROR,
        payload,
      });
    }
  };
  const resetState = () => {
    dispatch({
      type: RESET_STATE,
    });
  };

  //  Agregue el car
  const setCar = (car: Partial<CarDetail>) => {
    dispatch({
      type: SET_CAR,
      payload: car,
    });
  };

  // modal eliminar auto
  const setOpenDeleteCarModal = (id: string, open: boolean) => {
    dispatch({
      type: SET_DELETE_CAR_MODAL,
      payload: {
        id,
        open,
      },
    });
  };

  // set cars de la busqueda
  const setCarsSearched = (cars: CarDetail[]) => {
      dispatch({
        type: SET_CARS_SEARCHED,
        payload: cars
      })
  }

  return (
    <appContext.Provider
      value={{
        loading: state.loading,
        message: state.message,
        car: state.car,
        deleteCarModal: state.deleteCarModal,
        alertMessage: state.alertMessage,
        carsSearched: state.carsSearched,
        showAlert,
        newCar,
        updateCar,
        setOpenDeleteCarModal,
        setCarsSearched,
        resetState,
        setCar,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
