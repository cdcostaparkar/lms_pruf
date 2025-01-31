import React, { useState } from "react";
import "./AddCourses.css";

const AddCourses = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modules, setModules] = useState([]);
    const [courseDetails, setCourseDetails] = useState({
        image: " ",
        name: " AI ",
        description: " Artificial Intelligence ",
        trainer: " Adam Smith",
        mode: "Online ",
        duration: " 6 weeks"
    });
    const [moduleDetails, setModuleDetails] = useState({
        name: "",
        url: "",
        content: ""
    });

    const handleModuleAdd = () => {
        if (!moduleDetails.name || !moduleDetails.content) {
            alert("Please fill in both the module name and content.");
            return;
        }

        if (modules.length >= 3) {
            document.getElementById("module-alert").style.display = "block";
            setTimeout(() => {
                document.getElementById("module-alert").style.display = "none";
            }, 2000);
            return;
        }

        setModules([...modules, { ...moduleDetails }]);
        setModuleDetails({ name: "", url: "", content: "" });
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

    return (
        <div className="page-container">
            <div className="header-container">
                <div className="header-content">
                <h2 className="page-heading">Add New Course</h2>
                <button className="add-module-button" onClick={() => setShowModal(true)}> 
                    Add Module 
                </button>
            </div>
            </div>
            <div className="complete-container">
                <h2 className="course-heading">Course Details</h2>
                <div className="form-modules-container">
                <section className="form-container">
                    <div className="form-group">
                        <label className="form-label">Course Name:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Course Name"
                            className="input-field"
                            value={courseDetails.name}
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
                        <label className="form-label">Trainer:</label>
                        <input
                            type="text"
                            name="trainer"
                            placeholder="Trainer"
                            className="input-field"
                            value={courseDetails.trainer}
                            onChange={handleCourseDetailChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Mode of Learning:</label>
                        <input
                            type="text"
                            name="mode"
                            placeholder="Mode of Learning"
                            className="input-field"
                            value={courseDetails.mode}
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
                {/* Added Modules Section */}
                <section className="modules-container">
                    {modules.length > 0 && (
                        <>
                            <h2 className="modules-heading">Added Modules</h2>
                            <ul className="modules-list">
                                {modules.map((module, index) => (
                                    <li key={index} className="module-item">
                                        <div className="module-title">{module.name}</div>
                                        <div className="module-description">{module.content}</div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </section>
            </div>
                {/* Submit Button */}
            <div className="submit-container">
                <button onClick={() => alert("Course Submitted!")}>
                    Submit
                </button>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={closeModalIfClickedOutside}>
                    <div className="modal-content">
                        <h2 className="modal-heading">Add Module</h2>
                            <div className="modal-group">
                                <label className="modal-label">Module Name:</label>
                                <input 
                                    type="text" 
                                    placeholder="Module Name" 
                                    className="modal-input" 
                                    value={moduleDetails.name} 
                                    onChange={e => setModuleDetails({ ...moduleDetails, name: e.target.value })}
                                />
                            </div>
                            <div className="modal-group">
                                <label className="modal-label">Module URL:</label>
                                <input
                                   type="text"
                                   placeholder="Module URL"
                                   className="modal-input"
                                   value={moduleDetails.url}
                                   onChange={e => setModuleDetails({ ...moduleDetails, url: e.target.value })}
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

