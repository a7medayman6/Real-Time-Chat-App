import axios from 'axios';

import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import config from '../../config';


const APIURL = config.APIURL;
const MESSAGESAPIURL = `${APIURL}/messages`;

const Messages = ({ socket }) => 
{
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const [messages, setMessages] = useState([]);
  const {room} = useParams()
  
  useEffect(() =>
    {
      console.log('room: ', room);
        // get all room messages
        axios.get(`${MESSAGESAPIURL}?room=${room}`)
            .then((res) =>
            {
                setMessages(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => 
  {
    socket.on('receive_message', (data) => 
    {
      console.log(data);
      setMessages((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          createdAt: data.createdAt,
        },
      ]);
    });

	// Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) 
  {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messagesColumn}>
      {messages.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {msg.createdAt}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;