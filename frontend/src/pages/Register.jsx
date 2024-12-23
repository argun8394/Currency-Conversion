import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const Register = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
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

    try {
      const response = await axios.post(`http://127.0.0.1:8000/users`, formData);
      // console.log(response)
      if (response.status == 201) {
        setSuccess('Registration successful!');
        setError('');
        console.log(success)

        navigate('/login');

      }
    } catch (err) {
      setError('Registration failed. ' );
      setSuccess('');
      console.log(error)
    }
  };

  return (
    <div className="w-full flex justify-center items-center pageH">
      <div className="flex flex-col items-center gap-8 border py-4 px-8 w-max rounded-md">
        <h2 className="font-semibold text-[32px]">Sign Up</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-between gap-4">
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

            <div className="flex justify-between gap-4">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border rounded-md"
              />
            </div>

            <div className="flex justify-between gap-4">
              <label>First Name:</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="border rounded-md"
              />
            </div>

            <div className="flex justify-between gap-4">
              <label>Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
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

export default Register