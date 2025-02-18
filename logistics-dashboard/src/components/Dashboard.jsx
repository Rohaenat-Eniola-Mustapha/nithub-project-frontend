import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('initialData', (shipments) => {
      setData(shipments);
      setLoading(false); // Data loaded, set loading to false
    });

    socket.on('shipmentUpdate', (updatedShipment) => {
      setData((prevData) =>
        prevData.map((shipment) =>
          shipment.id === updatedShipment.id ? updatedShipment : shipment
        )
      );
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Add or remove the 'dark' class to the body and other elements.
    document.body.classList.toggle('dark');
    document.querySelector('.app').classList.toggle('dark');  // Toggle on app div
    document.querySelectorAll('li').forEach(li => li.classList.toggle('dark'));
    document.querySelectorAll('button').forEach(button => button.classList.toggle('dark'));
    document.querySelector('h1').classList.toggle('dark');

  };

  if (loading) {
    return <div>Loading shipment data...</div>; // Display loading message
  }

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}> {/* Add dynamic class */}
      <button onClick={handleToggleDarkMode}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <h1>Shipment Dashboard (Real-Time)</h1>
      <ul>
        {data.map((shipment) => (
          <li key={shipment.id} className={darkMode ? 'dark' : 'light'}> {/* Add dynamic class to li */}
            <strong>{shipment.location}</strong> - {shipment.status} (Last updated: {shipment.updatedAt})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
