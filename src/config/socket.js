import { Server } from "socket.io";

let io; // Socket.IO instance
const connectedUsers = {}; // Track connected users by their IDs

const initializeSocket = (server) => {
    
  io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins for simplicity
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {

    //console.log("New client connected");

    // Save the userId associated with the connected socket
    socket.on("register", (userId) => {
      connectedUsers[userId] = socket.id;
      //console.log(`User ${userId} connected with socket ID ${socket.id}`);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      const userId = Object.keys(connectedUsers).find(
        (key) => connectedUsers[key] === socket.id
      );
      delete connectedUsers[userId];
      //console.log(`User ${userId} disconnected`);
    });
  });

  return io;
  
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized.");
  }
  return io;
};

const getConnectedUsers = () => connectedUsers;

export { initializeSocket, getIO, getConnectedUsers };
