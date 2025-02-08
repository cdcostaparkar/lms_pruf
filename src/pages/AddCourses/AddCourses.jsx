import React, { useState } from "react";
import "./AddCourses.css";

// APIs
import { createCourse } from "@/api/courseApi";
import { createModule } from "@/api/moduleApi";
import { useAuth } from "@/context/AuthContext";

const AddCourses = () => {
    const { user } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modules, setModules] = useState([]);
    const [courseDetails, setCourseDetails] = useState({
        title: "AI",
        description: "Artificial Intelligence",
        duration: 6
    });
    const [moduleDetails, setModuleDetails] = useState({
        title: "",
        video_url: "",
        content: "",
        duration: "",
        description: "" 
    });

    const handleModuleAdd = () => {
        if (!moduleDetails.title || !moduleDetails.content || !moduleDetails.duration || !moduleDetails.description) {
            alert("Please fill in all fields for the module.");
            return;
        }

        // Validate duration
        // const duration = parseInt(moduleDetails.duration, 10);
        // if (isNaN(duration) || duration < 1 || duration > 99) {
        //     alert("Duration must be a number between 1 and 99.");
        //     return;
        // }

        if (modules.length >= 3) {
            setShowModal(false);
            document.getElementById("module-alert").style.display = "block";
            setTimeout(() => {
                document.getElementById("module-alert").style.display = "none";
            }, 2000);
            return;
        }

        // Add module_order based on the current length of modules
        const newModule = {
            ...moduleDetails,
            module_order: modules.length // This will be the order index
        };

        setModules([...modules, newModule]);
        setModuleDetails({ title: "", video_url: "", content: "", duration: "", description: "" });
        setShowModal(false);
    };

    const handleCourseDetailChange = (e) => {
        const { name, value } = e.target;
        setCourseDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const closeModalIfClickedOutside = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            setShowModal(false);
        }      
    };

    const truncateContent = (content, maxLength = 50) => {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + "...";
        }
        return content;
    };

    const openModuleModal = () => {
        if (modules.length >= 3) {
            setShowModal(false);
            document.getElementById("module-alert").style.display = "block";
            setTimeout(() => {
                document.getElementById("module-alert").style.display = "none";
            }, 2000);
            return;
        }
        setShowModal(true);
    };

    const handleSubmit = async () => {
        try {
            console.log(courseDetails);
            const createdCourse = await createCourse(user, courseDetails);
            const courseId = createdCourse._id;

            console.log(modules);
            for (const module of modules) {
                await createModule(courseId, module);
            }

            alert("Course and modules created successfully!");
            // Reset the form or redirect as needed
        } catch (error) {
            console.error("Error submitting course and modules:", error);
            alert("Failed to create course and modules.");
        }
    };

    return (
        <div className="page-container">
            <div className="module-alert" id="module-alert">Can't add more than 3 modules</div>
            <div className="header-container">
                <div className="header-content">
                    <h1 className="page-heading">Add New Course</h1>
                    <div className="button-container">
                        <button className="submit-course-button" onClick={handleSubmit}> 
                            Submit 
                        </button>
                        <button className="add-module-button" onClick={openModuleModal}> 
                            Add Module 
                        </button>
                    </div>
                </div>
            </div>
            <div className="complete-container">
                <h2 className="course-heading">Course Details</h2>
                <div className="form-modules-container">
                    <section className="form-container">
                        <div className="form-group">
                            <label className="form-label">Course Title:</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Course Title"
                                className="input-field"
                                value={courseDetails.title}
                                onChange={handleCourseDetailChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Small Description:</label>
                            <input
                                type="text"
                                name="description"
                                placeholder="Small Description"
                                className="input-field"
                                value={courseDetails.description}
                                onChange={handleCourseDetailChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Duration:</label>
                            <input
                                type="text"
                                name="duration"
                                placeholder="Duration"
                                className="input-field"
                                value={courseDetails.duration}
                                onChange={handleCourseDetailChange}
                            />
                        </div>
                    </section>
                    <section className="modules-container">
                        {modules.length > 0 && (
                            <>
                                <h2 className="modules-heading">Added Modules</h2>
                                <ul className="modules-list">
                                    {modules.map((module, index) => (
                                        <li key={index} className="module-item">
                                            <div className="module-title">{module.title}</div>
                                            <div className="module-duration">Duration: {module.duration} weeks</div>
                                            <div className="module-description">Description: {truncateContent(module.description)}</div>
                                            <div className="module-description">
                                                {truncateContent(module.content)}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </section>
                </div>

                {showModal && (
                    <div className="modal-overlay" onClick={closeModalIfClickedOutside}>
                        <div className="modal-content">
                            <h2 className="modal-heading">Add Module</h2>
                            <div className="modal-group name-duration-group">
                                <div className="name-duration-container">
                                    <div className="modal-group">
                                        <label className="modal-label">Module Title:</label>
                                        <input 
                                            type="text" 
                                            placeholder="Module Name" 
                                            className="modal-input" 
                                            value={moduleDetails.title} 
                                            onChange={e => setModuleDetails({ ...moduleDetails, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="modal-group">
                                        <label className="modal-label">Module Duration:</label>
                                        <input
                                            type="text"
                                            placeholder="Module Duration (in weeks)"
                                            className="modal-input"
                                            value={moduleDetails.duration}
                                            onChange={e => setModuleDetails({ ...moduleDetails, duration: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-group">
                                <label className="modal-label">Module URL:</label>
                                <input
                                    type="text"
                                    placeholder="Module URL"
                                    className="modal-input"
                                    value={moduleDetails.video_url}
                                    onChange={e => setModuleDetails({ ...moduleDetails, video_url: e.target.value })}
                                />
                            </div>
                            <div className="modal-group">
                                <label className="modal-label">Module Content:</label>
                                <textarea
                                    placeholder="Module Content"
                                    className="modal-textarea"
                                    value={moduleDetails.content}
                                    onChange={e => setModuleDetails({ ...moduleDetails, content: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="modal-group">
                                <label className="modal-label">Module Description:</label>
                                <textarea
                                    placeholder="Module Description"
                                    className="modal-textarea"
                                    value={moduleDetails.description}
                                    onChange={e => setModuleDetails({ ...moduleDetails, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="button-container">
                                <button className="add-button" onClick={handleModuleAdd}>Add New Module</button>
                                <button className="close-button" onClick={() => setShowModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddCourses;
