import ChatMessage from "../models/chatMessage.model.js";
import { getIO, getConnectedUsers } from "../config/socket.js";

const sendMessage = async (req, res) => {
  try {

    const { recipientId, content } = req.body;
    const senderId = req.user.id;

    // Validate inputs
    if (!recipientId || !content) {
      return res.status(400).json({ message: "Recipient and content are required." });
    }

    // Save message to database
    const message = await ChatMessage.create({ sender: senderId, recipient: recipientId, content });

    // Emit real-time notification
    const io = getIO();
    const connectedUsers = getConnectedUsers();
    const recipientSocketId = connectedUsers[recipientId];

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("messageReceived", { sender: senderId, content });
    }

    return res.status(200).json({ message: "Message sent.", chatMessage: message });

  } 
  catch (error) {
    return res.status(500).json({ message: "Failed to send message.", error: error.message });
  }
};

const getChatHistory = async (req, res) => {
  try {

    const { recipientId } = req.query;
    const senderId = req.user.id;

    // Validate inputs
    if (!recipientId) {
      return res.status(400).json({ message: "Recipient ID is required." });
    }

    // Fetch chat history
    const messages = await ChatMessage.find({
      $or: [
        { sender: senderId, recipient: recipientId },
        { sender: recipientId, recipient: senderId },
      ],
    })
      .sort({ createdAt: 1 }) // Sort by time
      .populate("sender", "username profileImg")
      .populate("recipient", "username profileImg");

    return res.status(200).json({ messages });

  } 
  catch (error) {
    return res.status(500).json({ message: "Failed to fetch chat history.", error: error.message });
  }
};

export { sendMessage, getChatHistory };
