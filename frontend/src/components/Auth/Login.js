import React, { useState } from 'react';
import api from '../../api';
import './Auth.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/cars';
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;
