import { Server } from 'socket.io';

let ioInstance = null;

/**
 * Initialize the Socket.IO server
 * @param {http.Server} server - The HTTP server instance
 */
const initSocket = (server) => {

  ioInstance = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', 
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true, 
    },
  });

 
  ioInstance.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

   
    socket.on('disconnect', (reason) => {
      console.log(`User disconnected: ${socket.id}`, reason);
    });

  
    socket.on('example_event', (data) => {
      console.log('Received example_event:', data);
    });
  });

  return ioInstance; 
};


export const getIO = () => {
  if (!ioInstance) {
    throw new Error('Socket.IO not initialized. Call initSocket(server) first.');
  }
  return ioInstance;
};

export default initSocket;
