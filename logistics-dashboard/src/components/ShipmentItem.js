// src/components/ShipmentItem.js
import React from 'react';

function ShipmentItem({ shipment }) {
  return (
    <li>
      <strong>{shipment.location}</strong> - {shipment.status} ({shipment.updatedAt})
    </li>
  );
}

export default React.memo(ShipmentItem);