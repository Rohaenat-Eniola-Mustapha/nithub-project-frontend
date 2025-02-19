import React from 'react';
import { render, screen, within } from '@testing-library/react';
import ShipmentItem from './ShipmentItem';

describe('ShipmentItem Component', () => {
    it('renders shipment details correctly', () => {
        const shipment = { id: 1, location: 'New York', status: 'In Transit', updatedAt: '2024-02-22' };
        render(<ShipmentItem shipment={shipment} />);
        const listItem = screen.getByRole('listitem');
        expect(within(listItem).getByText('New York - In Transit (2024-02-22)')).toBeInTheDocument(); // Use within
    });
});