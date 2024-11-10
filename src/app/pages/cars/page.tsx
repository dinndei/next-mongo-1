'use client';
import React, { useEffect, useState } from 'react';
import { useCarStore } from '@/app/store/carStore';
import CarCard from '@/app/components/CarCard';

const CarsPage: React.FC = () => {
  const { cars, addCar ,initCars } = useCarStore();
  const [name, setName] = useState('');
  const [model, setModel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && model) {
      addCar( name, model );
      setName('');
      setModel('');
    }
  };

  useEffect(()=>{
    initCars();
  },[])
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Car List</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Car Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Car Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Car</button>
      </form>

      <div>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarsPage;
