import axios from "axios";
import { ICar } from "../types/ICar";
import { Car } from "../store/carStore";

//GET
export const getCars = async (): Promise<ICar[] | []> => {
    try {
        let res = await axios.get<{ cars: ICar[] }>('http://localhost:3000/api/car/get/cars',
            {
                headers: { 'Cache-control': 'no-cache' }
            });
        return res.data.cars;
    }
    catch (error) {
        console.error(error)
        return [];
    }

}

//GET BY ID
export const getCarById = async (carId: string): Promise<ICar | null> => {
    try {
        let res = await axios.get<{ car: ICar }>(`http://localhost:3000/api/car/get/${carId}`,
            {
                headers: { 'Cache-control': 'no-cache' }
            });
        return res.data.car;
    }
    catch (error) {
        console.error(error)
        return null;
    }

}



//DELETE BY ID
export const deleteById = async (carId: string): Promise<ICar | null> => {
    try {
        let res = await axios.delete<{ car: ICar }>(`http://localhost:3000/api/car/delete/${carId}`,
            {
                headers: { 'Cache-control': 'no-cache' }
            });
        return res.data.car;
    }
    catch (error) {
        console.error(error)
        return null;
    }

}


//UPDATE BY ID
export const updateCarById = async (carId: string,newCar:Car): Promise<ICar | null> => {
    try {
        let res = await axios.put<{ car: ICar }>(`http://localhost:3000/api/car/put/${carId}`,
        newCar,
            {
                headers: { 'Cache-control': 'no-cache' }
            });
        return res.data.car;
    }
    catch (error) {
        console.error(error)
        return null;
    }

}

//CREATE 
export const createCar = async (id: string, name: string, model: string): Promise<ICar | null> => {
    try {
        let res = await axios.post<{ car: ICar }>(`http://localhost:3000/api/car/post`,
            { id, name, model },
            {
                headers: { 'Cache-control': 'no-cache' }
            });
        return res.data.car;
    }
    catch (error) {
        console.error(error)
        return null;
    }

}


