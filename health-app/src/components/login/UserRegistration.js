import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    emailid: '',
    mobile: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    const userData = JSON.stringify(formData);

    try {
      const response = await axios.post(`${apiUrl}/register`, userData);
      const patientData = response.data;
      console.log(response.data);

      if (patientData.insertion === 'success') {
        setMessage('You have been registered successfully!');
        setIsSuccess(true);
        navigate("/");
      } else if (patientData.insertion === 'duplicate') {
        setMessage('Username already exists. Please try with another username.');
        setStatus(patientData.insertion);
      } else {
        setMessage('Registration failed. Please check all fields and try again.');
        setStatus(patientData.insertion);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">User Registration</h2>
        
        {message && (
          <div className={`p-2 text-center ${status === 'duplicate' ? 'text-red-500 bg-red-100' : 'text-green-500 bg-green-100'} rounded`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">Firstname:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Enter your firstname"
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Lastname:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Enter your lastname"
            />
          </div>
          <div>
            <label htmlFor="emailid" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="emailid"
              name="emailid"
              value={formData.emailid}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile:</label>
            <input
              type="number"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Enter your mobile number"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
            />
          </div>
          <div>
            {!isSuccess && (
              <button
                type="submit"
                className="w-full py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Register
              </button>
            )}
          </div>
        </form>      
      </div>
    </div>
  );
};

export default UserRegistration;
