import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Aunthetication
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login';

// Pages
import CoursesProgress from './pages/progress/CoursesProgress';
import CoursePage from './pages/CourseContent/CourseContent';
import AccountDetails from './pages/AccountDetails/AccountDetails';
import CourseDetails from './pages/CourseDetails/CourseDetails';


function App() {
  return (
    <>
    <CoursePage/>

    {/* <Signup/> */}
    {/* <Login/> */}
    {/* <CoursesProgress /> */}
    {/* <AccountDetails/> */}
    {/* <CourseDetails/> */}
    </>
  );
}

export default App;
