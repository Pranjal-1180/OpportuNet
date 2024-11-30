

const express = require('express');
const router = express.Router();
const { getChatHistory, sendMessage,getConversations } = require('../controllers/chatController');
const { isAuthenticated, isAdmin } = require('../middleware/auth'); // Import isAdmin

// Route to get all conversations for a specific user
router.get('/conversations/:userId', isAuthenticated, async (req, res) => {
    await getConversations(req, res);
});

// Route to get chat history between admin and user
router.get('/:adminId/:userId', isAuthenticated, (req, res) => {
    console.log('Chat GET route hit with userId:', req.params.userId, 'adminId:', req.params.adminId);
    getChatHistory(req, res);  // Proceed if authenticated (either admin or user)
});

// Route to send a message in the chat between admin and user
router.post('/:adminId/:userId/send', isAuthenticated, (req, res) => {
    console.log('Chat POST route hit with userId:', req.params.userId, 'adminId:', req.params.adminId);
    
    // Additional check: only allow sending messages if the logged-in user is part of the chat (admin or user)
    const { adminId, userId } = req.params;
    if (req.user.id !== adminId && req.user.id !== userId) {
        return res.status(403).json({ message: "You can't send a message in this chat" });
    }

    sendMessage(req, res);
});




module.exports = router;


