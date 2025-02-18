import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// WebSocket connection
const socket = io('http://localhost:3000'); 

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    socket.on('initialData', (shipments) => {
      setData(shipments);
    });

    socket.on('shipmentUpdate', (updatedShipment) => {
      setData((prevData) =>
        prevData.map((shipment) =>
          shipment.id === updatedShipment.id ? updatedShipment : shipment
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <h1>Shipment Dashboard (Real-Time)</h1>
      <ul>
        {data.map((shipment) => (
          <li key={shipment.id}>
            <strong>{shipment.location}</strong> - {shipment.status} (Last updated: {shipment.updatedAt})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
