import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"

const GetAllAppoint = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all appointments from the backend
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5001/api/appointments/get");
      if (response.status === 200) {
        setAppointments(response.data); // Update the state with fetched appointments
      } else {
        setError("Failed to fetch appointments.");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError(error.response?.data || "Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

// Handle appointment fix button click
const handleFixAppointment = (appointment) => {
  Swal.fire({
    icon: "success",
    title: "Appointment Fixed",
    text: `Your appointment is fixed with ${appointment.teacherName}`,
    confirmButtonText: "OK",
  });
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-2xl font-semibold text-center mb-4">
          All Appointments
        </h3>

        {/* Display Loading State */}
        {loading && <p className="text-gray-600">Loading appointments...</p>}

        {/* Display Error State */}
        {error && <p className="text-red-600">{error}</p>}

        {/* Display Appointments */}
        {appointments.length > 0 && !loading && !error ? (
          <ul className="space-y-4">
            {appointments.map((appointment, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Teacher:</strong> {appointment.teacherName}
                  </p>
                  <p>
                    <strong>Start Time:</strong> {appointment.startTime}
                  </p>
                  <p>
                    <strong>End Time:</strong> {appointment.endTime}
                  </p>
                </div>
                <div>
                  <button
                    // onClick={() => console.log("Appointment details", appointment)}
                    onClick={() => handleFixAppointment(appointment)}
                    className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600"
                  >
                    Fix Appointmant
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !loading && !error && <p className="text-gray-600">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default GetAllAppoint;
