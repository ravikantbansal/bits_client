import React, { useState } from "react";
import axios from "axios";

const CreateCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [duration, setDuration] = useState("");
  const [courseLink, setCourseLink] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseName || !duration || !courseLink) {
      setError("All fields are required.");
      return;
    }

    const courseDetails = {
      courseName,
      duration,
      courseLink,
    };

    try {
      const response = await axios.post("http://localhost:5002/api/courses/add", courseDetails);
      if (response.status === 201) {
        setSuccessMessage("Course created successfully!");
        setCourseName("");
        setDuration("");
        setCourseLink("");
        setError("");
      } else {
        setError("Failed to create the course.");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      setError("Failed to create the course. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-2xl font-semibold text-center mb-4">Create Course</h3>
        
        {/* Display Success Message */}
        {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}

        {/* Display Error Message */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Name */}
          <div>
            <label
              htmlFor="courseName"
              className="block text-lg font-medium text-gray-700"
            >
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter course name"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="duration"
              className="block text-lg font-medium text-gray-700"
            >
              Duration
            </label>
            <input
              type="text"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter course duration"
              required
            />
          </div>

          {/* Course Link */}
          <div>
            <label
              htmlFor="courseLink"
              className="block text-lg font-medium text-gray-700"
            >
              Course Link
            </label>
            <input
              type="url"
              id="courseLink"
              value={courseLink}
              onChange={(e) => setCourseLink(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter course URL"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
