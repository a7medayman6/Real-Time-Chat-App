const { Server } = require('socket.io'); 
const axios = require('axios');

const messages = require('../utils/Messages');
const CHATBOT = 'Lab Bot';
const dotenv = require('dotenv');
dotenv.config();

const APIURL = process.env.APIURL;
const MESSAGESAPIURL = `${APIURL}/messages`;

const socketHandler = (server, ORIGIN) =>
{
    const io = new Server(server, 
    {
        cors: 
        {
            origin: [ORIGIN, APIURL],
            methods: ['GET', 'POST'],
        },
    });

    let users = [];

    io.on('connection', (socket) => 
    {

        console.log(`User connected ${socket.id}`);


        socket.on('join_room', (data) =>
        {
            const { username, room } = data;

            socket.join(room);
            users.push({ username, socketId: socket.id, room });

            let __createdtime__ = Date.now();

            console.log(`User with ID: ${username} joined room: ${room} at ${__createdtime__}`);
            
            chatRoomUsers = users.filter((user) => user.room === room);
            socket.to(room).emit('chatroom_users', chatRoomUsers);


            socket.to(room).emit('receive_message', 
            { 
                message: `${username} joined the room, say Hi!`,
                username: CHATBOT,
                __createdtime__,
            });
            
            socket.emit('receive_message', 
            { 
                message: `Hello ${username}, Welcome to room ${room}.`,
                username: CHATBOT,
                __createdtime__,
            });
        });

        socket.on('send_message', (data) => 
        {
            const { message, username, room, __createdtime__ } = data;
            io.in(room).emit('receive_message', data); // Send to all users in room, including sender
            
            messages.postMessage(username, message, room);
        });
        
    });
};

module.exports = socketHandler;