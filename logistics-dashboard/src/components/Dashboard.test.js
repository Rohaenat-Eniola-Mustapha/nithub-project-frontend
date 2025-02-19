import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'; // No need for act
import Dashboard from './Dashboard';
import io from 'socket.io-client';
import mockShipmentData from '../mockShipmentData';

jest.mock('socket.io-client');

describe('Dashboard Component', () => {
    let mockSocket; // Declare mockSocket outside beforeEach

    beforeEach(() => {
        mockSocket = { // Initialize mockSocket
            on: jest.fn((event, callback) => {
                if (event === 'connect') {
                    callback();
                }
                if (event === 'initialData') {
                    callback(mockShipmentData);
                }
                if (event === 'shipmentUpdate'){
                    callback({id: 1, location: "Douala", status: "Arrived", updatedAt: "2024-02-23"})
                }
                if (event === 'disconnect'){
                    callback()
                }
                if (event === 'connect_error'){
                    callback(new Error("Connection error"))
                }
            }),
            disconnect: jest.fn(),
        };
        io.mockReturnValue(mockSocket);
    });

    it('renders loading message initially', () => {
      render(<Dashboard />);
      expect(screen.getByText('Loading shipments...')).toBeInTheDocument();
    });

    it('renders shipment list after data is loaded', async () => {
        render(<Dashboard />);

        // Wait for the data to load and the loading message to disappear
        await waitFor(() => expect(screen.queryByText('Loading shipments...')).not.toBeInTheDocument());

        // Check if the shipment items are rendered
        expect(screen.getByText('Shipment Dashboard')).toBeInTheDocument();
        mockShipmentData.forEach((shipment) => {
            expect(screen.getByText(`${shipment.location} - ${shipment.status} (${shipment.updatedAt})`)).toBeInTheDocument();
        });
    });

    it('handles WebSocket connection errors', async () => {
        const mockSocket = {
            on: jest.fn((event, callback) => {
                if (event === 'connect_error') {
                    callback(new Error('Connection error')); // Simulate connection error
                }
            }),
            disconnect: jest.fn(),
        };

        io.mockReturnValue(mockSocket);
        render(<Dashboard />);

        await waitFor(() => expect(screen.getByText('Error: Failed to connect to server.')).toBeInTheDocument());
    });

    it('handles WebSocket disconnection', async () => {
        const mockSocket = {
            on: jest.fn((event, callback) => {
                if (event === 'disconnect') {
                    callback(); // Simulate disconnection
                }
            }),
            disconnect: jest.fn(),
        };

        io.mockReturnValue(mockSocket);
        render(<Dashboard />);
        await waitFor(() => expect(screen.getByText('Loading shipments...')).toBeInTheDocument());
    });
});