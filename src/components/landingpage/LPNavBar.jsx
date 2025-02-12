import React from "react";
import { useNavigate } from "react-router-dom";
import ELlogo from "../../assets/platformLogo/ELlogo.png";
// public\platformLogo\ELlogo.png
import "./LPNavBar.css"; // Import your CSS file for styling

const LPNavbar = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignUp = () => {
        navigate("/signup");
    };

    return (
        <div className="LPnavbar">
            <div className="logo-heading-container">
            <div className="logo" onClick={() => navigate("/")}>
                <img className="logo-img" src={ELlogo} alt="Website Logo"/>
            </div>
            <div className="LPnavbar-heading">
                <h2>Easy Learning</h2>
            </div>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder=" 🔍 Search for anything"
                    className="search-input"
                />
            </div>
            <div className="auth-buttons">
                <button className="login-button" onClick={handleLogin}>
                    Login
                </button>
                <button className="signup-button" onClick={handleSignUp}>
                    Sign Up
                </button>      
            </div>
        </div>
    );
};

export default LPNavbar;
