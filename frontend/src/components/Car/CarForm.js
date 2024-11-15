import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Changed useHistory to useNavigate
import api from '../../api';

function CarForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', tags: '', imageUrl: '' });

  // Fetch car details if id is present (for editing an existing car)
  useEffect(() => {
    if (id) fetchCar();
  }, [id]);

  // Fetch car details by ID (for editing)
  const fetchCar = async () => {
    try {
      const response = await api.get(`/cars/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching car details:', error);
      if (error.response) {
        console.log('Error response:', error.response);
      }
    }
  };

  // Handle input field changes
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (create or update car)
  const handleSubmit = async e => {
    e.preventDefault();

    // Prepare car data (ensure tags is an array, handle imageUrl)
    const carData = {
      title: formData.title,
      description: formData.description,
      tags: formData.tags.trim() ? formData.tags.split(',').map(tag => tag.trim()) : [], // Convert to array
      imageUrl: formData.imageUrl.trim() || null,  // Handle empty image URL gracefully
    };

    try {
      if (id) {
        // Update car
        const response = await api.put(`/cars/${id}`, carData);
        console.log('Car updated:', response.data);
      } else {
        // Create new car
        const response = await api.post('/cars', carData);
        console.log('Car created:', response.data);
      }

      // Navigate back to the car list page
      navigate('/cars');
    } catch (error) {
      console.log(formData)
      console.error('Error submitting car form:', error);
      if (error.response) {
        console.log('Error response:', error.response);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="Tags (comma-separated)"
      />
      <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <button type="submit">{id ? 'Update' : 'Create'} Car</button>
    </form>
  );
}

export default CarForm;
