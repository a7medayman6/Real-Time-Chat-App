// messages controller
// Path: server/controllers/Messages.js
const Message = require('../models/Message');

// get all messages for a room
// /api/messages?room=room
const getMessages = async (req, res) =>
{
    // deconstruct request data
    const { room } = req.query;
    console.log('req.query: ', req.query);
    console.log('data: ', room);

    // validate request
    if (!room)
        return res.status(400).json({ message: 'Invalid request' });
    
    try
    {
        const messages = await Message.find({ room: room }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    }
    catch (err)
    {
        console.log(err);
        res.status(500).json(err);
    }
};



// const getMessages = async (req, res) => 
// {
//     // deconstruct request data
//     const { room } = req.query.room;
//     console.log('req.params: ', req.params, room);
//     // validate request
//     if (!room) 
//         return res.status(400).json({ message: 'Invalid request' });
    

//     try 
//     {
//         const messages = await Message.find({ room: room }).sort({ createdAt: 1 });

//         res.status(200).json(messages);
//     } 
//     catch (err) 
//     {
//         res.status(500).json(err);
//     }
// };

// post a message to a room
const postMessage = async (req, res) =>
{
    // deconstruct request data
    const { username, message, room } = req.body;
    console.log('req.body: ', req.body);
    console.log('data: ', username, message, room);

    // validate request
    if (!username || !message || !room)
        return res.status(400).json({ message: 'Invalid request' });
    
    // create new message
    try 
    {
        const newMessage = new Message({ username, message, room });
        console.log('newMessage: ', newMessage)
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }
    catch (err)
    {
        console.log(err);
        res.status(500).json(err);
    }
};

// delete a message from a room
const deleteMessage = async (req, res) =>
{
    // deconstruct request data {room, id}
    const room = req.params['room'];
    const id = req.params['id'];

    // validate request
    if (!room || !id)
        return res.status(400).json({ message: 'Invalid request' });

    try
    {
        const deletedMessage = await Message.findByIdAndDelete(id);
        res.status(200).json(deletedMessage);
    }
    catch (err)
    {
        res.status(500).json(err);
    }
};


// delete all messages for a room
const deleteMessages = async (req, res) =>
{
    // deconstruct request data
    const { room } = req.params['room'];

    // validate request
    if (!room)
        return res.status(400).json({ message: 'Invalid request' });
    
    try 
    {
        const deletedMessages = await Message.deleteMany({ roomId: req.params.room });
        res.status(200).json(deletedMessages);
    }
    catch (err)
    {
        res.status(500).json(err);
    }
};

module.exports = { getMessages, postMessage, deleteMessage, deleteMessages}