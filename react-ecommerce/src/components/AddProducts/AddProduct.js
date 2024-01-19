import React, { useState } from 'react';
import './AddProduct.css'; // Import your CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const AddProduct = () => {

    const navigate = useNavigate()
    const {token} = useAuth()

  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: '',
  });
  const [thumbnail,setThumbnail] = useState(null);

  const handlethumbnail = (event) => {
    setThumbnail(event.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newFormdata = new FormData()
    newFormdata.append('title',productData.title);
    newFormdata.append('description',productData.description);
    newFormdata.append('price',productData.price);
    newFormdata.append('discountPercentage',productData.discountPercentage);
    newFormdata.append('thumbnail',thumbnail);
    console.log(newFormdata)
    console.log(thumbnail)
    const response = await axios.post('https://updated-ecommerce-backend1.onrender.com/api/v1/users/addproduct',
      newFormdata
    ,{
        headers: {
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
          'Authorization': `Bearer ${token}`,
        },
      });
      if(response.status === 201){
        alert("Product Added Sccessfully")
        navigate('/');
      }
      else{
        alert("internal server error")
      }

  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={productData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={productData.description}
        onChange={handleChange}
        rows="4"
        required
      ></textarea>

      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={productData.price}
        onChange={handleChange}
        required
      />

      <label htmlFor="discountPercentage">Discount Percentage:</label>
      <input
        type="number"
        id="discountPercentage"
        name="discountPercentage"
        value={productData.discountPercentage}
        onChange={handleChange}
        required
      />

       <label htmfor="thumbnail">Choose photo:</label>
      <input type="file" name="thumbnail" accept="image/*" onChange={ handlethumbnail} required/>

      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
