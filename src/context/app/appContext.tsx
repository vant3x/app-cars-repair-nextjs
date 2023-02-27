import  { createContext } from "react";
import { AppContextType } from "./../../interfaces/AppContextType";
import { CarDetail } from './../../interfaces/CarDetail.interface';

const appContext = createContext<AppContextType>({
    message: {
        message: '',
        status: null
    },
    newCar: () => { },
    updateCar: () => { },
    setCar: () => { },
    loading: false,
    deleteCarModal: {
        id: "",
        open: false
    },
    alertMessage: "",
    carsSearched:[],
    setOpenDeleteCarModal:  (id: string, open: boolean) => void { },
    resetState: () => void {},
    showAlert:  (message: string) =>  void {},
    setCarsSearched: (cars: CarDetail[]) => void{},
    car: {} as CarDetail
});

export default appContext;
