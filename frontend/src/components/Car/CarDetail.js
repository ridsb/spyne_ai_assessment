import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';

function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetchCar();
  }, []);

  const fetchCar = async () => {
    try {
      const response = await api.get(`/cars/${id}`);
      setCar(response.data.car);
      console.log(car)
    } catch (error) {
      console.error('Failed to fetch car:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/cars/${id}`);
      navigate('/cars');
    } catch (error) {
      console.error('Failed to delete car:', error);
    }
  };

  if (!car) return <p>Loading...</p>;

  // Check if tags is an array before using join
  const tagsList = car.tags.join(', ');

  return (
    <div>
      <h2>{car.title}</h2>
      <p>{car.description}</p>
      <p>Tags: {tagsList}</p> {/* Safely display tags */}
      <button onClick={() => navigate(`/cars/edit/${car._id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default CarDetail;
