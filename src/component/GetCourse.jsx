import React, { useEffect, useState } from "react";
import axios from "axios";

const GetCourse = () => {
  // State to store courses
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses data from the backend on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/courses/get");
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch courses.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array means this runs only once on mount

  // Render loading or error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-8" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <h2 className="text-2xl font-semibold text-center mb-6">Courses List</h2>

      {courses.length === 0 ? (
        <p className="text-center text-gray-500">No courses available</p>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200"
            >
              <h3 className="text-xl font-semibold">{course.courseName}</h3>
              <p className="text-gray-600">Duration: {course.duration}</p>
              <a
                href={course.courseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Go to Course
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetCourse;
