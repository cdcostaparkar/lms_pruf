import { useState } from "react";
import "./AccountDetails.css";
const mockUser = {
  name: "Ananya Mehta",
  username: "ananya_mehta",
  email: "ananya_mehta@example.com",
  address:"123 , Main St, Anytown, USA",
  role:"Student",
  profileImage: "https://eu.ui-avatars.com/api/?name=John+Doe&size=250",
};

function AccountDetails() {
  const [darkMode, setDarkMode] = useState(false);

  return (
      <div className ={`mode ${darkMode ? "dark" : "light"}`}>  
        <header className="header"> 
          <h1 className="user-profile-heading">User Profile </h1>      
          <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
          </button>
        </header> 

        <div className='profile-container'>
          <div className ="user-profile-card">
            <img 
                src={mockUser.profileImage}
                alt="Profile"
                className="profile-img" 
            />
            <div className="user-info">
              <p><strong>Name: </strong> {mockUser.name}</p>
              <p><strong>Username: </strong> {mockUser.username}</p>
              <p><strong>Email: </strong> {mockUser.email}</p>
              <p><strong>Address: </strong> {mockUser.address}</p>
              <p><strong>Role: </strong> {mockUser.role}</p>
            </div>
          </div>
          </div>
        </div>

  );
}
export default AccountDetails
