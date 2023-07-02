// messages controller
// Path: server/controllers/Messages.js
const Message = require('../models/Message');

// get all messages for a room
const getMessages = async (room) => 
{

    // validate request
    if (!room) 
        return null;
    

    try 
    {
        const messages = await Message.find({ roomId: req.params.room }).sort({ createdAt: 1 });

        return messages;
    } 
    catch (err) 
    {
        console.log(err);
        return null;
    }
};

// post a message to a room
const postMessage = async (username, message, room) =>
{

    // validate request
    if (!username || !message || !room)
        return null;
    
    // create new message
    try 
    {
        const newMessage = new Message({ username, message, room });
        console.log('newMessage: ', newMessage)
        const savedMessage = await newMessage.save();
        return savedMessage;
    }
    catch (err)
    {
        console.log(err);
        return null;
    }
};

// delete a message from a room
const deleteMessage = async (room, id ) =>
{

    // validate request
    if (!room || !id)
        return null;

    try
    {
        const deletedMessage = await Message.findByIdAndDelete(id);
        return deletedMessage;
    }
    catch (err)
    {
        console.log(err);
        return null;
    }
};


// delete all messages for a room
const deleteMessages = async (room) =>
{
    // validate request
    if (!room)
        return null;
    
    try 
    {
        const deletedMessages = await Message.deleteMany({ roomId: req.params.room });
        return deletedMessages;
    }
    catch (err)
    {
        console.log(err);
        return null;
    }
};

module.exports = { getMessages, postMessage, deleteMessage, deleteMessages}