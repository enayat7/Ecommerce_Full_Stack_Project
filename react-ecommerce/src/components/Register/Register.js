// RegistrationForm.jsx
import React, { useState } from 'react';
import './Register.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';



const Register = () => {
  const navigate = useNavigate()
  const { setToken } = useAuth()
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });
  const [showPopup, setShowPopup] = useState(false);

  const handlePopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 1500);
  };
  const [err,seterr] = useState("Registered successfully");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://updated-ecommerce-backend1.onrender.com/api/v1/users/register',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json();
      if(response.status==201)
      {
        setToken(data.token)
        navigate("/")
      }
      else{
        if(data.message)seterr(data.message)
        else if(data.error)seterr(data.error)
        else seterr("Registration failed")
      }
      
    } catch (error) {
      seterr(err)
    }
    handlePopup();
  };

  return (
    <div className="container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label htmlFor="fullname">Full Name:</label>
        <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} required />

        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit" >Register</button>
        <p>Already have an account? <Link to="/login">click here</Link> </p>
      </form>
      {showPopup && <div className="popup">{err}</div>}
    </div>
  );
};

export default Register;
 