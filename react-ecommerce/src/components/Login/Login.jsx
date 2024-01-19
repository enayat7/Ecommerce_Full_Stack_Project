// Login.js
import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import './Login.css'; // Import the corresponding CSS file
import { Route, renderMatches, useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

  const Login = () => {
  const { token,setToken } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // console.log(username)
    // console.log(password)
    try {
      const response = await fetch('https://updated-ecommerce-backend1.onrender.com/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          
          username,
          password,
          
        })
      })

      // console.log(2345)
        const result = await response.json()
        if(result.token!=null){
          setToken(result.token)
          navigate("/")
        }
        else setError('Invalid username or password');
    } catch (error) {
      setError('Invalid username or password');
    }
  };
  return (
    <div>
    <div className="login-container">
      <div className="login-form">
        <div className='login'>Login</div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleLogin}>Login</button>
        <p>Create an account? <Link to="/register">click here</Link> </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
