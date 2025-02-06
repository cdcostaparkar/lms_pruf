import { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { authenticateUser } from "@/api/userApi";

const Login = () => {
  const [username, setUsername] = useState(""); // Changed from email to username
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false); // Changed from emailError to usernameError
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(""); // State for login error
  // const navigate = useNavigate(); 
  const { login } = useAuth(); 

  const validateForm = async (e) => {
    e.preventDefault();

    // Validate username and password
    if (username.length < 3) { // Adjusted length check for username
      setUsernameError(true);
      return;
    } else {
      setUsernameError(false);
    }

    if (password.length < 6) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    // Make API call to authenticate user
    try {
      const data = await authenticateUser(username, password);

      login(data.userId, data.role_name);

      // navigate(`/`);
      

    } catch (error) {
      setLoginError(error.message); // Set error message for display
    }
    
  };

  return (
    <div className="login-div">
      <div className="login-container">
        <h1 className="login-label">User Login</h1>
        <form className="login_form" onSubmit={validateForm}>
          <div className="font">Username</div> 
          <input
            type="text"
            value={username} // Changed from email to username
            onChange={(e) => setUsername(e.target.value)} // Changed from setEmail to setUsername
          />
          {usernameError && <div className="error">Please fill up your Username</div>} {/* Changed error message */}

          <div className="font font2">Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <div className="error">Please fill up your Password</div>}

          {loginError && <div className="error">{loginError}</div>} {/* Display login error */}

          <button type="submit">Login</button>

          <div className="create-an-account">
            <Link to="/signup">
              <p>Create an account</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
