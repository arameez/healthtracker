import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './login/AuthContext';

const Header = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    //logout();
    navigate('/'); // Redirect to login page
  };

  return (
    <header className="bg-indigo-600 shadow-lg">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto text-white">
        {/* Logo */}
        <a href="/upload" className="text-2xl font-bold hover:text-gray-200">
          Home
        </a>

        {/* Logout Button */}        
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium bg-white text-indigo-600 rounded-lg shadow hover:bg-gray-200"
          >
            Logout
          </button>        
      </div>
    </header>
  );
};

export default Header;
