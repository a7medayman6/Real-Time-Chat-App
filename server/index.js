// Packages
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Services
const socketHandler = require('./services/socket');
const connectDB = require('./config/db');

// Middlewares
dotenv.config();
app.use(cors()); 
app.use(express.json());
app.use(morgan('dev'));

connectDB();

// Constants
const PORT =  process.env.PORT | 4000;
const ORIGIN = process.env.ORIGIN | 'http://localhost:3000';

// Server
const server = http.createServer(app);

// routes
app.use('/api/messages', require('./routes/Messages'));


// socket.io
socketHandler(server, ORIGIN);

server.listen(PORT, () => `Server is running on port ${PORT}`);


