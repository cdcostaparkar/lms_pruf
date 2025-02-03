import React from "react";
import { useState } from "react";
import "./CourseDetails.css";

const CourseDetails = ({ course, toggleModal }) => {

    const modules = [
        { content: 'Module 1: Introduction to React' },
        { content: 'Module 2: Working with Components' },
        { content: 'Module 3: React State and Hooks' },
    ];

    const closeModalIfClickedOutside = (e) => {
        if (e.target === e.currentTarget) {
            toggleModal(null);
        }
    };
    return (
        <div className="course-box">
            <div className="container">
                {/* <h1>Courses</h1>
                <button className="open-modal-btn" onClick={toggleModal}>
                    Show Course Info
                </button> */}

                {/* Modal */}
                {/* {isModalOpen &&( */}
                <div className="modal-overlay" onClick={closeModalIfClickedOutside}>
                    <div className="modal-content">
                        <button className="close-btn" onClick={toggleModal}>
                            X
                        </button>
                        <div className="course-info">
                            <img src="https://eu.ui-avatars.com/api/?name=John+Doe&size=250"
                                alt="Course"
                                className="course-image" />
                            <h2> Course Name: React Development </h2>
                            <p className="course-description">
                                A brief overview of React, its components and how to build
                                applications using React framework.
                            </p>
                            <p><strong> Mode of Learning: </strong> Online </p>
                            <p><strong>Duration: </strong> 6 weeks </p>
                        </div>

                        <div className="course-details-modules">
                            <h3>Modules: </h3>
                            <ul>
                                {modules.map((module, index) => (
                                    <li key={index} style={{ fontSize: '18px' }}>
                                        {module.content}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button className="enroll-btn">  Enroll Now</button>
                    </div>
                </div>
                {/* )} */}
            </div>
        </div>
    );
};

export default CourseDetails;
