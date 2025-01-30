// src/Signup.jsx
import React, { useState } from 'react';
import './signup.css'; // Import the CSS file

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.role) newErrors.role = 'Role is required';

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form submitted successfully:', formData);
            // Handle form submission (e.g., send data to an API)
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        
        <div className="Signup-container">
        <form onSubmit={handleSubmit} className="signup-form">
            <h1 className="signup-title">Sign Up</h1>
            {Object.keys(formData).map((key) => (
                <div key={key} className="signup-input">
                    <label className="signup-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    <input
                        type={key === 'password' ? 'password' : 'text'}
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="input"
                    />
                    {errors[key] && <div className="signup-error">{errors[key]}</div>}
                </div>
            ))}
            <button type="submit" className="signup-button">Sign Up</button>
        </form>
    </div>
        
    );
};

export default Signup;
