import React from "react";
import { useState, useEffect } from "react";
import "./CourseDetails.css";
import { getModules } from "@/api/moduleApi";

const CourseDetails = ({ course, toggleModal, roleName, handleEnroll }) => {
    const [modules, setModules] = useState([]);
    
    useEffect(() => {
        const fetchModules = async (courseId) => {
            try {
                const data = await getModules(courseId); // Fetch modules using the API
                setModules(data);
            } catch (error) {
                setError('Failed to fetch modules. Please try again later.'); // Set error message
            }
        };

        if (course._id) {
            fetchModules(course._id);
        }
    }, [course._id]);

    
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
                <div className="modal-overlay" onClick={closeModalIfClickedOutside}>
                    <div className="modal-content">
                        <button className="close-btn" onClick={toggleModal}>
                            X
                        </button>
                        <div className="course-info">
                            <img src="https://eu.ui-avatars.com/api/?name=John+Doe&size=250"
                                alt={course.title}
                                className="course-image" />
                            <h2> {course.title}</h2>
                            <p className="course-description">
                                {course.description}
                            </p>
                            <p><strong> Mode of Learning: </strong> Online </p>
                            <p><strong>Duration: </strong> {course.duration} weeks </p>
                        </div>

                        <div className="course-details-modules">
                            <h3>Modules: </h3>
                            {modules.length > 0 ? (
                                <ul>
                                    {modules.map((module, index) => (
                                        <li key={index} style={{ fontSize: '18px' }}>
                                            Module {index + 1}: {module.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No modules yet</p>
                            )}
                        </div>

                        {roleName !== 'trainer' && (
                            <button className="enroll-btn" onClick={() => handleEnroll(user, course._id)}>Enroll Now</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
