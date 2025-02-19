import React, { useState, useEffect, lazy, Suspense } from 'react'; // Import lazy and Suspense
import io from 'socket.io-client';
//import ShipmentList from './ShipmentList'; // No longer import directly
import initialShipmentData from '../data.json';

const ShipmentList = lazy(() => import('./ShipmentList')); // Lazy load ShipmentList

const socket = io('http://localhost:3001'); // WebSocket connection

function Dashboard() {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 1. Load initial data (from data.json)
        setShipments(initialShipmentData);
        setLoading(false);

        // 2. WebSocket logic
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
            setError(null);
        });

        socket.on('initialData', (serverShipments) => {
            setShipments(serverShipments);
            setLoading(false);
        });

        socket.on('shipmentUpdate', (updatedShipment) => {
            setShipments((prevShipments) =>
                prevShipments.map((shipment) =>
                    shipment.id === updatedShipment.id ? updatedShipment : shipment
                )
            );
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
            setError('Connection to server lost.');
            setLoading(true);
        });

        socket.on('connect_error', (err) => {
            console.error('WebSocket connection error:', err);
            setError('Failed to connect to server.');
            setLoading(true);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <div>Loading shipments...</div>;
    }

    return (
        <div>
            <h1>Shipment Dashboard</h1>
            <Suspense fallback={<div>Loading shipment list...</div>}> {/* Wrap with Suspense */}
                <ShipmentList shipments={shipments} />
            </Suspense>
        </div>
    );
}

export default Dashboard;