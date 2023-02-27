import { CarDetail } from './CarDetail.interface';

export interface AppContextType {
    message: {
        message: string;
        status: number | null;
    };
    loading: boolean;
    deleteCarModal: {
        id: string;
        open: boolean;
    };
    alertMessage: string;
    carsSearched: CarDetail[];
    newCar: (car: FormData) => void;
    updateCar: (car: FormData, id: string) => void;
    setOpenDeleteCarModal: (id: string, open: boolean) => void;
    setCarsSearched: (cars:CarDetail[]) => void;
    resetState: () => void;
    showAlert: (message: string) => void;
    setCar: (car: Partial<CarDetail>) => void;
    state?: boolean;
    car?: CarDetail;
}