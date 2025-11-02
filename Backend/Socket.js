import { Server } from 'socket.io';

let ioInstance = null;

/**
 * Initialize the Socket.IO server
 * @param {http.Server} server - The HTTP server instance
 */
const initSocket = (server) => {
  // create and store the io instance
  ioInstance = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', // Allow frontend to connect from this URL
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true, // If you're using authentication with cookies
    },
  });

  // Listen for connections
  ioInstance.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle any socket events here
    socket.on('disconnect', (reason) => {
      console.log(`User disconnected: ${socket.id}`, reason);
    });

    // You can listen for custom events here
    socket.on('example_event', (data) => {
      console.log('Received example_event:', data);
    });
  });

  return ioInstance; // Return the io instance for further use
};

// named getter for other modules to access the io instance
export const getIO = () => {
  if (!ioInstance) {
    throw new Error('Socket.IO not initialized. Call initSocket(server) first.');
  }
  return ioInstance;
};

export default initSocket;
