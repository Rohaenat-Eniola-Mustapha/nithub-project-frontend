// src/components/ShipmentList.js
import React from 'react';
import ShipmentItem from './ShipmentItem';

function ShipmentList({ shipments }) {
  return (
    <ul>
      {shipments.map((shipment) => (
        <ShipmentItem key={shipment.id} shipment={shipment} />
      ))}
    </ul>
  );
}

export default ShipmentList;