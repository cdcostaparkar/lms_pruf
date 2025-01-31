import { useState } from "react";
const UpdateNavbar = ({ toggleTheme }) => {
    return (
        <nav className="uc-navbar">
            <p>Update Courses</p>
            {/* <button id="theme-toggle" className="theme-toggle" onClick={toggleTheme}>
                <i className="fas fa-adjust">Change Theme</i>
            </button> */}
        </nav>
    );
};

export default UpdateNavbar;
