import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Aunthetication
// import Signup from './pages/signup/Signup1'
import Login from './pages/login/Login';
import { useAuth } from './context/AuthContext'
import SignupPage from './pages/SignupPage/SignupPage'
// Pages
import CoursesProgress from './pages/progress/CoursesProgress';
import CoursePage from './pages/CourseContent/CourseContent';
import AccountDetails from './pages/AccountDetails/AccountDetails';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import AddCourses from './pages/AddCourses/AddCourses'
import CourseUpdate from './pages/courseUpdate/CourseUpdate'
import HomePage from './pages/HomePage/HomePage'
import Navbar from './components/custom/Navbar'
import LoginPage from './app/login/page'
import AddToCartPage from './pages/AddToCart/AddToCartPage';
import LPNavbar from './components/landingpage/LPNavBar';
import LandingPage from './pages/LandingPage/LandingPage';
import { Toaster } from 'react-hot-toast';


function App() {
  const { user, logout, roleName } = useAuth();

  // Custom route for protected access based on role
  const ProtectedRoute = ({ element, allowedRoles }) => {
    return allowedRoles.includes(roleName) ? element : <Navigate to="/" />;
  };

  return (
    <>
      <div><Toaster/></div>
      <Router>
        {/* Redirect to login/signup if user is null */}
        {user === null ? (
          
          <>
          <LPNavbar/>
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login2" element={<LoginPage />} />
            
            <Route path="*" element={<Navigate to="/landing" />} />
          </Routes>
          </>
        ) : (
          <>
            <Navbar onLogout={logout} /> {/* Include the Navbar here for authenticated users */}
            <Routes>
              {/* Main application routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/courses/:courseId" element={<CoursePage />} />
              <Route 
                path="/progress" 
                element={<ProtectedRoute element={<CoursesProgress />} allowedRoles={['student']} />} 
              />
              <Route 
                path="/courses/add" 
                element={<ProtectedRoute element={<AddCourses />} allowedRoles={['trainer']} />} 
              />
              
              <Route path="/cart" element={<AddToCartPage />} />

              <Route path="/courses/update/:courseId" element={<CourseUpdate />} />
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
