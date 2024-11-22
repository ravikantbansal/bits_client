import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

const BookAppoint = () => {
    const location = useLocation();
    const user = location.state.user;
  const [teacherName, setTeacherName] = useState(user.username);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [appointments, setAppointments] = useState([]); // State to store fetched appointments

  console.log("User : ",user)
  console.log("appointments : ",appointments)


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const appointmentDetails = {
      teacherName,
      startTime,
      endTime,
    };
  
    try {
      const response = await axios.post("http://localhost:5001/api/appointments/book", appointmentDetails);
      if (response.status === 201) {
        console.log("Appointment booked successfully:", response.data);
        alert("Appointment booked successfully!");
        // Add any additional logic, such as redirecting the user
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error booking the appointment:", error.response?.data || error.message);
      alert("Failed to book the appointment. Please try again.");
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/appointments/get"
      );
      if (response.status === 200) {
        console.log("Fetched appointments:", response.data);
        setAppointments(response.data); // Update state with fetched appointments
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error(
        "Error fetching appointments:",
        error.response?.data || error.message
      );
      alert("Failed to fetch appointments. Please try again.");
    }
  };

  useEffect(() => {
    fetchAppointments(); // Fetch appointments when the component mounts
  }, []);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
      <h3 className="text-2xl font-semibold text-center mb-4">Create Appointment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Teacher's Name */}
        <div>
          <label
            htmlFor="teacherName"
            className="block text-lg font-medium text-gray-700"
          >
            Teacher's Name
          </label>
          <input
            type="text"
            id="teacherName"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter teacher's name"
            required
          />
        </div>

        {/* Start Time */}
        <div>
          <label
            htmlFor="startTime"
            className="block text-lg font-medium text-gray-700"
          >
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* End Time */}
        <div>
          <label
            htmlFor="endTime"
            className="block text-lg font-medium text-gray-700"
          >
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Create Appointment
        </button>
      </form>
    </div>
    </div>
  );
};

export default BookAppoint;
