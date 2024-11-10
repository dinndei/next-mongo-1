// src/components/CarCard.tsx
import React from 'react';
import { Car, useCarStore } from '@/app/store/carStore';
import { deleteById, updateCarById } from '../services/carActions';
import { ICar } from '../types/ICar';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { deleteCar,editCar} = useCarStore();


  const handleDelete = () => {
    deleteCar(car.id)
    deleteById(String(car.id));
  };

  const handleEdit = () => {
    const newName = prompt('Enter new car name:', car.name);
    const newModel = prompt('Enter new car model:', car.model);
    if (newName && newModel) {
    const updatedCar:Car={id:car.id, name: newName, model: newModel }
      editCar(car.id,updatedCar );
      updateCarById(car.id,updatedCar );
      
    }
  };

  return (
    <div className="bg-white shadow-md p-4 mb-4 rounded-lg">
      <h3 className="text-lg font-bold">{car.name}</h3>
      <p>Model: {car.model}</p>
      <div className="flex space-x-2 mt-2">
        <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700">Edit</button>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700">Delete</button>
      </div>
    </div>
  );
};

export default CarCard;
