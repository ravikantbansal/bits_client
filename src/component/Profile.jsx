import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user for profile view

  useEffect(() => {
    // Check if the user is logged in by verifying if the token is available in localStorage
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Check if userId exists

    console.log(token)
    console.log(userId)


    if (!token || !userId) {
      navigate('/login'); // If not logged in, redirect to login
      return;
    }
  }
  )
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/user/allUsers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Users Data: ", response);
        setUsers(response.data.users); // Assuming the users are in response.data.users
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user); // Set the selected user when clicked
  };

  const loggedInUserId = localStorage.getItem('userId');
  console.log(loggedInUserId);

  if (!users.length) return <div className="text-center text-lg">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <h2 className="text-3xl font-semibold text-center mb-6">Users</h2>

      {/* Grid for displaying all users */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all"
            onClick={() => handleSelectUser(user)}
          >
            <div className="flex items-center justify-center mb-4">

              <img
                src="https://static.vecteezy.com/system/resources/previews/034/784/595/original/little-buddha-cartoon-character-meditation-on-lotus-flower-vector.jpg"
                alt="Profile"
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
              />
            </div>
            <h3 className="text-xl font-semibold text-center">{user.username}</h3>
            <p className="text-center text-gray-600">{user.email}</p>
            <p className="text-center text-gray-500">{user.role}</p>
          </div>
        ))}
      </div>

      {/* Display selected user's detailed profile */}
      {selectedUser && (
        <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-center mb-4">Profile Details</h3>
          <div className="flex space-x-8">
            {/* Left Side - User Data */}
            <div className="flex-1 space-y-4">
              <div>
                <h4 className="font-medium text-lg">Username:</h4>
                <p className="text-gray-700">{selectedUser.username}</p>
              </div>

              <div>
                <h4 className="font-medium text-lg">Email:</h4>
                <p className="text-gray-700">{selectedUser.email}</p>
              </div>

              <div>
                <h4 className="font-medium text-lg">Role:</h4>
                <p className="text-gray-700">{selectedUser.role}</p>
              </div>
            </div>

            {/* Right Side - Profile Picture */}
            <div className="flex-shrink-0">
              <img
                src="https://static.vecteezy.com/system/resources/previews/034/784/595/original/little-buddha-cartoon-character-meditation-on-lotus-flower-vector.jpg"
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            {selectedUser.role === "student" ? (
              <>
              {loggedInUserId === selectedUser._id && (
                <>
                <button
                  className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
                  onClick={() => navigate('/allAppoints')}
                >
                  Book Appointment
                </button>
                <button
                  className="px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition"
                  onClick={() => navigate('/getallcourse')}
                >
                  Enroll Course
                </button>
                </>
              )}
              </>
            ) : (
              <>
                {/* Conditionally render buttons based on the logged-in user and selected user */}
                {loggedInUserId === selectedUser._id && (
                  <>
                    <button
                      className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
                      onClick={() => navigate('/bookApo', { state: { user: selectedUser } })}
                    >
                      Create Appointment
                    </button>
                    <button
                      className="px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition"
                      onClick={() => navigate('/createcourse')}
                    >
                      Add Course
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>

      )}

    </div>
  );
};

export default Profile;
