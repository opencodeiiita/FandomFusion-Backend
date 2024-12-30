import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/user.model.js";
import { getIO, getConnectedUsers } from "../config/socket.js";

export const sendFriendRequest = async (req, res) => {
  try {

    const { recipientUserName } = req.body; // Accept username instead of ID as it's practical for the frontend
    const senderId = req.user.id;

    // Find the recipient's ID by their username
    const recipient = await User.findOne({ username: recipientUserName });
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found." });
    }
    const recipientId = recipient._id;

    // Check if the recipient is already in the sender's friend list
    const sender = await User.findById(senderId);
    if (sender.friends.includes(recipientId.toString())) {
      return res.status(400).json({ message: "Recipient is already a friend." });
    }

    // Check if request already exists
    const existingRequest = await FriendRequest.findOne({
      sender: senderId,
      recipient: recipientId,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent." });
    }

    // Create friend request
    const friendRequest = new FriendRequest({
      sender: senderId,
      recipient: recipientId,
      status: "pending",
    });

    await friendRequest.save();

    // Notify the recipient in real-time
    const connectedUsers = getConnectedUsers();
    const recipientSocketId = connectedUsers[recipientId.toString()];
    if (recipientSocketId) {
      const io = getIO();
      io.to(recipientSocketId).emit("friendRequestReceived", {
        message: "You have received a new friend request.",
        sender: { id: senderId, username: sender.username },
      });
    }

    res.status(201).json({
      message: "Friend request sent.",
      friendRequest,
    });

  } 
  catch (error) {
    res.status(500).json({ message: "Error sending friend request.", error });
  }
};

export const getFriendRequests = async (req, res) => {
  try {

    const userId = req.user.id;

    // Find friend requests for the recipient
    const friendRequests = await FriendRequest.find({
      recipient: userId,
    }).populate('sender', 'username profileImg'); // Populate sender with username and profileImg

    res.status(200).json({
      friendRequests,
    });

  } 
  catch (error) {
    res.status(500).json({ message: 'Error retrieving friend requests.', error });
  }
};

export const respondToFriendRequest = async (req, res) => {
  try {

    const { username, action } = req.body; // Receive sender's username and action
    const recipientId = req.user.id; // The current user's ID, i.e., the Recipient as they are the ones responding

    // Find the sender's ID based on the provided username
    const sender = await User.findOne({ username });
    if (!sender) {
      return res.status(404).json({ error: "User not found." });
    }
    const senderId = sender._id;

    // Find the unique friend request between the sender and recipient
    const friendRequest = await FriendRequest.findOne({
      sender: senderId,
      recipient: recipientId,
      status: "pending",
    });

    if (!friendRequest) {
      return res.status(404).json({ error: "Friend request not found." });
    }

    if (action === "accept") {
      // Add each other to their respective friends lists
      await Promise.all([
        User.findByIdAndUpdate(senderId, {
          $push: { friends: recipientId },
        }),
        User.findByIdAndUpdate(recipientId, {
          $push: { friends: senderId },
        }),
      ]);
    }

    // Notify the sender in real-time about the response
    const connectedUsers = getConnectedUsers();
    const senderSocketId = connectedUsers[senderId.toString()];
    if (senderSocketId) {
      const io = getIO();
      io.to(senderSocketId).emit("friendRequestResponded", {
        message: `Your friend request has been ${action}ed.`,
        recipient: { id: recipientId, username: req.user.username },
      });
    }

    // Remove the friend request after responding
    await FriendRequest.findByIdAndDelete(friendRequest._id);

    res.json({ message: `Friend request ${action}ed.` });

  } 
  catch (error) {
    res.status(500).json({ message: "Error responding to friend request.", error });
  }
};
