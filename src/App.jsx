import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Aunthetication
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login';

// Pages
import CoursesProgress from './pages/progress/CoursesProgress';
import CoursePage from './pages/CourseContent/CourseContent';
import AccountDetails from './pages/AccountDetails/AccountDetails';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import AddCourses from './pages/AddCourses/AddCourses'
import CourseUpdate from './pages/courseUpdate/CourseUpdate'
import HomePage from './pages/HomePage/HomePage'
import Navbar from './components/custom/Navbar'


function App() {
  const [user, setUser] = useState("null");

  return (
    <>
      <Router>
        {/* Redirect to login/signup if user is null */}
        {user === null ? (
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        ) : (
          <>
            <Navbar /> {/* Include the Navbar here for authenticated users */}
            <Routes>
              {/* Main application routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/courses/:courseId" element={<CoursePage />} />
              <Route path="/progress" element={<CoursesProgress />} />
              <Route path="/courses/update/:courseId" element={<CourseUpdate />} />
              <Route path="/courses/add" element={<AddCourses />} />
              <Route path="/account" element={<AccountDetails />} />

              {/* This is a modal, and can be persisted on click in HomePage */}
              {/* <Route path="/courses/details/:courseId" element={<CourseDetails />} /> */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        )}
      </Router>
    </>
  );
}

export default App;
