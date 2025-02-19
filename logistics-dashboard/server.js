// server.js (Create this file in your project's root)
const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
});

let shipments = [
    { id: 1, location: 'New York', status: 'In Transit', updatedAt: '2024-02-23' },
    { id: 2, location: 'Los Angeles', status: 'Delivered', updatedAt: '2024-02-22' },
    { id: 3, location: 'Chicago', status: 'Pending', updatedAt: '2024-02-21' },
];

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.emit('initialData', shipments); // Send initial data

    // Simulate updates (replace with your actual update logic)
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * shipments.length);
        shipments[randomIndex].status = ['In Transit', 'Delivered', 'Pending'][Math.floor(Math.random() * 3)];
        shipments[randomIndex].updatedAt = new Date().toISOString().slice(0, 10); // Format date

        io.emit('shipmentUpdate', shipments[randomIndex]); // Send update to all clients
    }, 5000); // Update every 5 seconds

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

console.log('WebSocket server listening on port 3001');