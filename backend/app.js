const express = require("express");
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const path = require('path');
require("dotenv").config();
const errorHandler = require("./middleware/error");

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobTypeRoute = require('./routes/jobsTypeRoutes');
const jobRoute = require('./routes/jobsRoutes');
const chatRoutes = require('./routes/chatRoutes');
const chatController = require('./controllers/chatController');

// Database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

// Initialize app and middleware
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Register routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoute);
app.use('/api', jobRoute);
app.use('/api/chat', chatRoutes);
app.use(errorHandler);

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Socket.io setup
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

// Socket.io connection handling
io.on('connection', (socket) => {
    

    socket.on('joinRoom', ({ adminId, userId }) => {
        const room = `${adminId}-${userId}`;
        socket.join(room);
       
    });

    // Handle incoming messages
    socket.on('sendMessage', async ({ adminId, userId, senderId, content }) => {
        const room = `${adminId}-${userId}`;
        io.to(room).emit('receiveMessage', { senderId, content });

        // Save the message using chatController
        try {
            const response = await chatController.sendMessage({
                params: { adminId, userId },
                body: { senderId, content }
            });
            
        } catch (error) {
            console.error('Error saving message:', error.message);
        }
    });

    socket.on('disconnect', () => {
       
    });
});

// Port configuration
const port = process.env.PORT || 9000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
