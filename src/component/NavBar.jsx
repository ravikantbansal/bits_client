import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
        // Extract token from localStorage
        const token = localStorage.getItem('token');

        // If no token, just return
        if (!token) {
            return;
        }

        // Call the logout API (use the correct logout endpoint here)
        await axios.post(
            'http://localhost:5000/api/user/logout', // Correct logout API endpoint
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass the token in the header
                },
            }
        );

        // Remove token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirect to login page
        navigate('/login');
    } catch (err) {
        console.error('Logout error', err);
    }
};
const isLoggedIn = localStorage.getItem('token');
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side Navigation */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-lg font-semibold hover:text-blue-400">Profile</Link>
            {/* <Link to="/appointment" className="text-lg font-semibold hover:text-blue-400">Appointment</Link> */}
            {/* <Link to="/course" className="text-lg font-semibold hover:text-blue-400">Course</Link> */}
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              // If logged in, show the Logout button
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                {/* If not logged in, show Login and Register buttons */}
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600 transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
