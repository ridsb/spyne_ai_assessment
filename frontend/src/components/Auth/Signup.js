import React, { useState } from 'react';
import api from '../../api';

function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/cars';
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
