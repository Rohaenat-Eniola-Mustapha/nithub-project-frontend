import React from 'react';
import { render, screen, within } from '@testing-library/react';
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
        const listItem = screen.getByRole('listitem');
        expect(within(listItem).getByText('New York - In Transit (2024-02-22)')).toBeInTheDocument(); // Use within

    });
});