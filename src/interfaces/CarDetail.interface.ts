enum Gas {
    Electric = 'electric',
    Gasoline = 'gasoline'
}

export interface CarDetail {
    _id?: string;
    brand: string;
    model: string;
    entryDate: Date;
    year: number;
    description: string;
    mileage?: number;
    color: string;
    price: number;
    image: string;
    file?: File;
    carRegistrationPlate: string;
    owner: string;
    phoneOwner?: number;
    addressOwner?: string;
    gas?: Gas;
    state: boolean;
}