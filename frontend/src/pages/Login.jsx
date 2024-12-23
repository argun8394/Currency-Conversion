import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// const API = import.meta.env.VITE_API_URL;

const Login = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData)
    try {
      const response = await axios.post(`http://127.0.0.1:8000/auth/login`, formData);

      console.log(response)
      setSuccess('Login successful!');
      setError('');

      localStorage.setItem('accessToken', response.data.bearer.accessToken);
      
      const sessionStartTime = new Date();
      localStorage.setItem('sessionTime', sessionStartTime.toLocaleString());

      navigate('/currency');
    } catch (err) {
      setError('Login failed. ');
      setSuccess('');
      console.log(err)
    }
  };

  return (
    <div className="w-full flex justify-center items-center pageH">
      <div className="flex flex-col items-center gap-10 border py-8 px-12 w-max rounded-md">
        <h2 className="font-semibold text-[32px]">Login</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-between gap-6">
            <div className="flex justify-between gap-4">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="border rounded-md"
              />
            </div>

            <div className="flex justify-between gap-4">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border rounded-md"
              />
            </div>
            <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Submit</button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Login