import React, { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import './Car.css';


function CarList() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await api.get("/cars");
      setCars(response.data.cars);
      console.log(cars, "test"); // Check the response structure in the console
    } catch (error) {
      console.error("Error fetching cars:", error);
      setCars([]); // Fallback to an empty array in case of an error
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/cars?search=${search}`);
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setCars([]); // Fallback to an empty array
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="Search cars..." 
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {cars.length > 0 ? (
          cars.map(car => (
            <li key={car._id} style={{ margin: '10px 0', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {/* Image Section */}
                {car.imageUrl && (
                  <img 
                    src={car.imageUrl} 
                    alt={car.title} 
                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '15px', borderRadius: '5px' }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  {/* Title */}
                  <h3 style={{ margin: 0 }}>
                    <Link to={`/cars/${car._id}`}>{car.title}</Link> {/* Link to Car Detail Page */}
                  </h3>
                  {/* Description */}
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>{car.description}</p>
                  {/* Tags */}
                  <p style={{ margin: '5px 0', fontSize: '12px', color: '#555' }}>
                    Tags: {car.tags ? car.tags.join(', ') : 'No tags available'}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No cars found.</p>
        )}
      </ul>
    </div>
  );
}

export default CarList;
