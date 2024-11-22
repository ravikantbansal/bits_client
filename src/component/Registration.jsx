import React, { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2"

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default to 'student'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/register', { username: name, email, password, role });
      
      // Show success alert with SweetAlert
      Swal.fire({
        icon: 'success',
        width: 400,
        title: 'Registration Successful',
        text: 'You have successfully registered. Redirecting to login...',
        showConfirmButton: false,
        timer: 2000, // Show alert for 2 seconds before redirect
      });
  
      // Save the token in localStorage
      localStorage.setItem('token', response.data.token);
  
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      // Show error alert with SweetAlert
      Swal.fire({
        icon: 'error',
        width: 400,
        title: 'Registration Failed',
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
        showConfirmButton: true,
      });
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      {/* 4rem represents the approximate height of the NavBar */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:text-blue-700">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
