import React from "react";
import { useState, useEffect } from "react";
import "./LPCourseDetails.css";
import { getModules } from "@/api/moduleApi";
import { useAuth } from "@/context/AuthContext";

const LPCourseDetails = ({ course, toggleModal }) => {    
    const [modules, setModules] = useState([]);
    console.log("course",course);
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

    // const modules = [
    //     { content: 'Module 1: Introduction to React' },
    //     { content: 'Module 2: Working with Components' },
    //     { content: 'Module 3: React State and Hooks' },
    // ];
    console.log("modules",modules);
    const closeModalIfClickedOutside = (e) => {
        if (e.target === e.currentTarget) {
            toggleModal(null);
        }
    };

    const truncateDescription = (description) => {
        const words = description.split(" ");
        const limit =50;
        if(words.length<=limit){
            return description;
        }

        const truncated = words.slice(0,limit).join(" ");

        const lastPeriodIndex = truncated.lastIndexOf(".");

        return lastPeriodIndex !== -1 ? truncated.slice(0, lastPeriodIndex + 1) + " " : truncated+ " " ;
        
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
                        <button className="close-button" onClick={toggleModal}>
                            X
                        </button>
                        <div className="course-info">
                            <img src={`https://picsum.photos/200?random=${course._id}`}
                                alt={course.title}
                                className="course-image" />
                            <h1 className="course-heading"> {course.title}</h1>
                            <div className="trainer-and-duration">
                                <p className="course-trainer"><strong> Trainer: </strong> {course.trainer_id.name}</p>
                                <p className="course-duration"><strong> Duration: </strong> {course.duration} hours </p>
                            </div>
                            <p className="modal-course-description">{truncateDescription(course.description)}</p>         
                        </div>

                        <div className="course-details-modules">
                            <h3>Modules: </h3>
                            {modules.length > 0 ? (
                                <ul>
                                    {modules.map((module, index) => (
                                        <li key={index}>
                                            Module {index + 1}: {module.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No modules yet</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LPCourseDetails;
