import React from 'react'
import {useState} from 'react'
import axios from 'axios'
// import { useUserName } from './Username';

function Login() {
    // const {setUsername}=useUserName()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:8000/api/login', { username, password } ,{ withCredentials: true });
          setLoginMessage(response.data);
          console.log(response)
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleRegister = async () => {
        try {
          const response = await axios.post('http://localhost:8000/api/register', { username, password });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>

      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
      <p>{loginMessage}</p>
    </div>
  )
}

export default Login
