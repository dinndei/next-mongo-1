import { create } from "zustand"
import { getCars } from "../services/carActions";



export interface Car {
  id: string;
  name: string;
  model: string;
}

interface CarStore {
  cars: Car[];
  initCars: () => void;
  addCar: (name: string, model: string) => void;
  deleteCar: (id: string) => void;
  editCar: (id: string, updatedCar:Car) => void;
}

export const useCarStore = create<CarStore>((set) => ({
  cars: [],
  initCars: async () => {
    const cars = await getCars();
    set({ cars })
  },
  addCar: (name, model) =>
    set((state) => ({
      cars: [...state.cars, { ...{ name: name, model: model }, id: String(Date.now()) }],
    })),
  deleteCar: (id) =>
    set((state) => ({
      cars: state.cars.filter((car) => car.id !== id),
    })),
  editCar: (id, updatedCar) =>
    set((state) => ({
      cars: state.cars.map((car) => (car.id === id ? { ...car, ...updatedCar } : car)),
    })),
}));
