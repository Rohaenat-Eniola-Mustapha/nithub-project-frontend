const io = require('socket.io')(3000, {
    cors: {
        origin: 'http://localhost:3000', // Or your React app's URL
        methods: ["GET", "POST"] // If needed
    }
});
  
  let shipments = [
    { id: 1, location: 'New York', status: 'In Transit', updatedAt: '2024-02-15' },
    { id: 2, location: 'Los Angeles', status: 'Delivered', updatedAt: '2024-02-14' },
    { id: 3, location: 'Chicago', status: 'Pending', updatedAt: '2024-02-13' },
  ];
  
  io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Send initial data
    socket.emit('initialData', shipments);
  
    // Simulate shipment status update every 5 seconds
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * shipments.length);
      shipments[randomIndex].status = ['In Transit', 'Delivered', 'Pending'][Math.floor(Math.random() * 3)];
      shipments[randomIndex].updatedAt = new Date().toISOString().split('T')[0];
  
      io.emit('shipmentUpdate', shipments[randomIndex]);
    }, 3000);
  });
  