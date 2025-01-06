# SOCKETS.md

## Setting Up and Using Sockets in the Project

### Overview

This project uses **Socket.IO** to enable real-time communication between the server and connected clients. The socket setup is initialized in `socket.js` and integrated with the server in `app.js`.

### How to Import and Use Sockets in a Controller

To use the socket functionality in a new controller:

1. **Import Required Functions:**
   - `getIO`: Retrieves the initialized Socket.IO instance.
   - `getConnectedUsers`: Provides a mapping of connected users and their respective socket IDs.

   ```javascript
   import { getIO, getConnectedUsers } from "../config/socket.js";
   ```

2. **Use Sockets for Real-Time Communication:**
   - `Emit events to specific users or broadcast messages`
   - `Use getConnectedUsers to find the recipient's socketId`

   ```javascript
   const io = getIO(); // Access the Socket.IO instance
   const connectedUsers = getConnectedUsers(); // Get connected users

   const recipientSocketId = connectedUsers[recipientId];
   if (recipientSocketId) {
        io.to(recipientSocketId).emit("eventName", {
            message: "Your custom message",
            additionalData: {},
        });
   }
   ```

## Connecting to a socket

### Registering a User

- **Event:** `register`
- **Input:**
    ```json
    {
        "userId": "<userId>"
    }
    ```
- **Output:** `User is registered with their socket ID in the connectedUsers object.`

### Disconnecting a User

- **Event:** `disconnect`
- **Input:** `None`
- **Output:** `Removes the disconnected user from connectedUsers`

## Messages and Events

### Receives a new Friend Request.

- **Event:** `friendRequestReceived`
- **Payload:**
    ```json
    {
        "message": "You have received a new friend request.",
        "sender": {
            "id": "<senderId>",
            "username": "<senderUsername>"
        }
    }
    ```

### User responds to a Friend Request.

- **Event:** `friendRequestResponded`
- **Payload:**
    ```json
    {
        "message": "Your friend request has been <accepted/rejected>.",
        "recipient": {
            "id": "<recipientId>",
            "username": "<recipientUsername>"
        }
    }
    ```


### User recieves a chat message

- **Event:** `messageReceived`
- **Payload:**
    ```json
    {
        "recipient": {
            "sender": "<senderId>",
            "content": "<jsonObject>"
        }
    }
    ```
