import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './component/NavBar';
import Profile from './component/Profile';
import Login from './component/Login';
import Registration from './component/Registration';
import Appointment from './component/Appointment'
import BookAppoint from './component/BookAppoint';
import GetAllAppoint from './component/GetAllAppoint';
import CreateCourse from './component/CreateCourse';
import GetCourse from './component/GetCourse';
// import Course from './component/Course'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <BrowserRouter>
        <NavBar />

        {/* Main Content */}
        <div className="flex-1 bg-gray-100">
          <Routes>
            {/* Profile Route (protected route, user needs to be logged in) */}
            <Route path="/" element={<Profile />} />

            <Route path="/appointment" element={<Appointment />} />


            {/* Login Route */}
            <Route path="/login" element={<Login />} />
            <Route path="/bookApo" element={<BookAppoint />} />
            <Route path="/allAppoints" element={<GetAllAppoint />} />
            <Route path="/createcourse" element={<CreateCourse />} />
            <Route path="/getallcourse" element={<GetCourse />} />


            {/* Register Route */}
            <Route path="/register" element={<Registration />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
