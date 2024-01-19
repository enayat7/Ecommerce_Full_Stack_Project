import React, { useState } from 'react';
import './OrderForm.css';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Form data submitted:', formData);
    alert('Order placed successfully!');
    navigate('/')
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <label htmlFor="contact">Contact:</label>
      <input
        type="text"
        id="contact"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        required
      />

      <label htmlFor="address">Address:</label>
      <textarea
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        rows="4"
        required
      ></textarea>

      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
