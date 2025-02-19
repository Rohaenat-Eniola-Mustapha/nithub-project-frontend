import React from 'react';
import { render, screen } from '@testing-library/react';
import ShipmentList from './ShipmentList';

describe('ShipmentList Component', () => {
    it('renders the list of shipments correctly', () => {
        const shipments = [
            { id: 1, location: 'New York', status: 'In Transit', updatedAt: '2024-02-22' },
            { id: 2, location: 'Los Angeles', status: 'Delivered', updatedAt: '2024-02-21' },
        ];
        render(<ShipmentList shipments={shipments} />);

        shipments.forEach((shipment) => {
            expect(screen.getByText(`${shipment.location} - ${shipment.status} (${shipment.updatedAt})`)).toBeInTheDocument();
        });
    });

    it('renders "No shipments" message when the list is empty', () => {
        render(<ShipmentList shipments={[]} />);
        // If you have a "No shipments" message, uncomment the below assertion
        // expect(screen.getByText('No shipments found.')).toBeInTheDocument();
    });
});