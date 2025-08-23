import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import apiClient from '../utils/api';

function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };    

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            setError('Please enter both username and password');
            return;
        }
        console.log('Form Data Submitted:', formData);        
        try {        
            const response = await apiClient.post("/login",  formData);
            console.log(response.data);
            console.log('Cookies:', response.headers);
            
            if (response.status === 200) {      
              login(response);    
              console.log('Login Successful');
              navigate("/upload");
            } else {               
              console.log('Unexpected response status:', response.status);
              setError('Invalid username or password');
              return;
            }
          } catch (error) {
            console.error("Login failed:", error);
            if (error.response.status === 401) {              
              console.log('Username or Password is incorrect');
              setError('Invalid username or password');
              return;
            }else {        
              console.log('Unexpected error while login');
              setError('Unexpected error while login');
              return;
            }        
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                {error && (
                    <div className="p-2 text-center text-red-500 bg-red-100 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={(e) => handleInputChange(e)}
                            className="w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            placeholder="Enter your email or username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange(e)}
                            className="w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don’t have an account?{' '}
                        <a href="/registration" className="text-indigo-600 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
