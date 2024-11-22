import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', { email, password });
      console.log("response : ",response)
      const user = response.data.user;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', user._id);
      window.location.href = '/';
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 4rem)' }}>
    {/* 4rem represents the approximate height of the NavBar */}
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
        {error && (
          <p className="text-center text-red-500 mt-4">
            {error}
          </p>
        )}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:text-blue-700">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
