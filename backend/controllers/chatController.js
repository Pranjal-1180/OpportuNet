// controllers/chatController.js
const Chat = require("../models/chatModel");
const ErrorResponse = require("../utils/errorResponse");

// Get chat history between admin and user
exports.getChatHistory = async (req, res, next) => {
  const { adminId, userId } = req.params;

  try {
    // Find chat between admin and user
    const chat = await Chat.findOne({ adminId, userId }).populate(
      "messages.senderId",
      "firstName lastName"
    );

    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat history not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        adminId: chat.adminId,
        userId: chat.userId,
        messages: chat.messages,
      });
  } catch (error) {
    return (new ErrorResponse("Error retrieving chat history", 500));
  }
};

// Save a new message in the chat between admin and user
exports.sendMessage = async (req, res) => {
  const { adminId, userId } = req.params;
  const { senderId, content } = req.body;

  try {
    // Find existing chat or create a new one if it doesn't exist
    let chat = await Chat.findOne({ adminId, userId });

    const newMessage = {
      senderId,
      receiverId: senderId === adminId ? userId : adminId, // Set the receiver based on sender
      content,
    };

    if (!chat) {
      // Create new chat document
      chat = new Chat({ adminId, userId, messages: [newMessage] });
    } else {
      // Add new message to existing chat
      chat.messages.push(newMessage);
    }

    await chat.save();

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error); // Log the error for debugging
    // Send a response with error status
    res.status(500).json({
      success: false,
      message: "Error sending message",
    });
  }
};



// Fetch admins who have messaged the specified user
exports.getConversations = async (req, res) => {
  const { userId } = req.params;
  

  try {
    const conversations = await Chat.find({ userId }).populate('adminId', 'firstName role');
    

    if (!conversations || conversations.length === 0) {
      return res.status(404).json({ message: "No conversations found." });
    }

    const admins = conversations
      .filter(chat => chat.adminId && chat.adminId.role === 1)
      .map(chat => ({
        adminId: chat.adminId._id,
        firstName: chat.adminId.firstName,
      }));
    

    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ message: "Failed to fetch conversations.", error: error.message });
  }
};
