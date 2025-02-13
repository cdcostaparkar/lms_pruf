import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Authetication
import LoginPage from './pages/login/LoginPage'
import SignupPage from './pages/signup/SignupPage'
import { useAuth } from './context/AuthContext'

// Navbar
import Navbar from './components/custom/Navbar'
// Pages
import CoursesProgress from './pages/progress/CoursesProgress';
import CoursePage from './pages/CourseContent/CourseContent';
import AccountDetails from './pages/AccountDetails/AccountDetails';
import AddCourses from './pages/AddCourses/AddCourses'
import CourseUpdate from './pages/courseUpdate/CourseUpdate'
import HomePage from './pages/HomePage/HomePage'
import AddToCartPage from './pages/AddToCart/AddToCartPage';
import LandingPage from './pages/LandingPage/LandingPage';
import WishListPage from './pages/WishList Page/WishListPage';

// Toast
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
        <Navbar onLogout={logout} />
        {/* Redirect to login/signup if user is null */}
        {user === null ? (
          
          <>
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="*" element={<Navigate to="/landing" />} />
          </Routes>
          </>
        ) : (
          <>
            {/* <Navbar onLogout={logout} /> */}
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
              
              {/* Right on Navbar */}
              <Route path="/wishlist" element={<WishListPage />} />
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
