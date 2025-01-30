import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateForm = (e) => {
    e.preventDefault();

    if (email.length < 9) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (password.length < 6) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    alert("Login Successful");
  };

  return (
    <div className="login-div "> 
      <div className="login-container">
        <h1 className="login-label">User Login</h1>
        <form className="login_form" onSubmit={validateForm}>
          <div className="font">Email or Phone</div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="error">Please fill up your Email or Phone</div>}

          <div className="font font2">Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <div className="error">Please fill up your Password</div>}

          <button type="submit">Login</button>

          <div className="create-an-account">
            <a href="./pages/signup/Signup.js">
              <p>Create an account</p>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;