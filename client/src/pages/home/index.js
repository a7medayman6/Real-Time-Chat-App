
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'; 

const Home = ({ username, setUsername, room, setRoom, socket }) => 
{
  const navigate = useNavigate();
  
  const joinRoom = () =>
  {
    if (username !== '' && room !== '')
      socket.emit('join_room', {username: username, room: room});
    
    navigate(`/chat/${room}`, {replace: true});
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`Lab Chat`}</h1>
        <input 
          className={styles.input} 
          placeholder='Username...'
          onChange={(e) => setUsername(e.target.value)}
        />

        <select 
          className={styles.input}
          onChange={(e) => setRoom(e.target.value)}>

          <option>-- Select Room --</option>
          <option value='javascript'>Room A</option>
          <option value='node'>Room B</option>
          <option value='express'>Room C</option>
          <option value='react'>Room D</option>

        </select>

        <button 
          className='btn btn-secondary' 
          style={{ width: '100%' }}
          onClick={joinRoom}>
            Join Room
        </button>

      </div>
    </div>
  );
};

export default Home;