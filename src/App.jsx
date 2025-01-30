import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Courses from './pages/progress/Courses';
import Login from './pages/login/Login';
import Layout from './pages/CourseModules/layout';


function App() {
  return (
    <>
    <Layout/>
      {/* <Login/> */}
      {/* <Courses /> */}
    </>
  );
}

export default App;
