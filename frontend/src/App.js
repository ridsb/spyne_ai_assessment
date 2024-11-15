import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  // Import Navigate for redirection
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import CarList from './components/Car/CarList';
import CarDetail from './components/Car/CarDetail';
import CarForm from './components/Car/CarForm';
import Navbar from './components/Navbar';

function App() {
  // Check if the user is logged in by checking the localStorage for the 'token'
  const isLoggedIn = localStorage.getItem('token');

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Route for Signup page */}
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/cars" /> : <Signup />} />

        {/* Route for Login page */}
        <Route path="/login" element={isLoggedIn ? <Navigate to="/cars" /> : <Login />} />

        {/* Protected Route for Car List: Accessible only if the user is logged in */}
        <Route path="/cars" element={isLoggedIn ? <CarList /> : <Navigate to="/login" />} />

        {/* Protected Route for creating a new car */}
        <Route path="/cars/create" element={isLoggedIn ? <CarForm /> : <Navigate to="/login" />} />

        {/* Protected Route for editing a car */}
        <Route path="/cars/edit/:id" element={isLoggedIn ? <CarForm /> : <Navigate to="/login" />} />

        {/* Protected Route for viewing car details */}
        <Route path="/cars/:id" element={isLoggedIn ? <CarDetail /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
