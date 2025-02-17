import React, { useState, useEffect } from "react";
import "./AddCourses.css";

// APIs
import { createCourse } from "@/api/courseApi";
import { createModule } from "@/api/moduleApi";
import { useAuth } from "@/context/AuthContext";
import convertMinutes from "@/lib/calcTime";
import toast from "react-hot-toast";

const AddCourses = () => {
    const { user } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [modules, setModules] = useState([]);
    const [courseDetails, setCourseDetails] = useState({
        title: "AI",
        description: "Artificial Intelligence",
        duration: 0, // This will store the duration in minutes
    });
    const [moduleDetails, setModuleDetails] = useState({
        title: "",
        video_url: "",
        content: "",
        duration: "",
        durationUnit: "minutes",
        description: "",
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
        const calculateTotalDuration = () => {
            let totalDurationInMinutes = 0;
            modules.forEach((module) => {
                totalDurationInMinutes += module.duration; // Use the stored duration in minutes
            });

            setCourseDetails((prevDetails) => ({
                ...prevDetails,
                duration: totalDurationInMinutes, // Store in minutes
            }));
        };

        calculateTotalDuration();
    }, [modules]);

    const handleModuleAdd = () => {
        if (
            !moduleDetails.title ||
            !moduleDetails.content ||
            !moduleDetails.duration ||
            !moduleDetails.description
        ) {
            toast.error("Please fill in all fields for the module.")
            //   alert("Please fill in all fields for the module.");
            return;
        }

        const duration = parseInt(moduleDetails.duration, 10);
        if (isNaN(duration) || duration < 1) {
            toast.error("Duration must be a number greater than 0.")
            return;
        }

        let durationInMinutes = duration;

        if (moduleDetails.durationUnit === "hours") {
            durationInMinutes = duration * 60;
        } else if (moduleDetails.durationUnit === "days") {
            durationInMinutes = duration * 60 * 24;
        } else if (moduleDetails.durationUnit === "weeks") {
            durationInMinutes = duration * 60 * 24 * 7;
        }

        const newModule = {
            ...moduleDetails,
            duration: durationInMinutes, // Store duration in minutes
            module_order: modules.length,
        };

        delete newModule.durationUnit;

        setModules([...modules, newModule]);
        setModuleDetails({
            title: "",
            video_url: "",
            content: "",
            duration: "",
            durationUnit: "minutes",
            description: "",
        });
        setShowModal(false);
    };

    const handleCourseDetailChange = (e) => {
        const { name, value } = e.target;
        setCourseDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const closeModalIfClickedOutside = (e) => {
        if (e.target.classList.contains("add-module-modal-overlay")) {
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
        setShowModal(true);
    };

    const handleSubmit = async () => {
        try {
            if (modules.length === 0) {
                toast("Please add at least one module before submitting.", {
                    icon: "🖐️",
                });

                return;
            }

            // Create a FormData object to send the file
            const formData = new FormData();
            formData.append("title", courseDetails.title);
            formData.append("description", courseDetails.description);
            formData.append("duration", courseDetails.duration);
            if (image) {
                formData.append("image", image); // 'image' should match the multer fieldname
            }

            const createdCourse = await createCourse(user, formData);
            const courseId = createdCourse._id;

            for (const module of modules) {
                await createModule(courseId, module);
            }

            toast.success("Course and modules created successfully!");
        } catch (error) {
            console.error("Error submitting course and modules:", error);
            toast.error("Failed to create course and modules.");
        }
    };

    const handleDeleteModule = (indexToDelete) => {
        setModules((prevModules) =>
            prevModules.filter((_, index) => index !== indexToDelete)
        );
    };

    const handleModuleURLChange = (e) => {
        const url = e.target.value;
        if (url.startsWith("https://youtu.be/")) {
            const videoId = url.substring("https://youtu.be/".length);
            setModuleDetails({
                ...moduleDetails,
                video_url: videoId,
            });
        } else {
            setModuleDetails({
                ...moduleDetails,
                video_url: url,
            });
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="page-container">
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
                        {/* Image Upload Field */}
                        <div className="form-group">
                            <label className="form-label">Course Image:</label>
                            <input
                                type="file"
                                name="image"
                                className="input-field"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label"> Course Duration:</label>
                            <div>{convertMinutes(courseDetails.duration)}</div>
                        </div>
                    </section>
                    <section className="added-modules-container">
                        {modules.length > 0 && (
                            <>
                                <h2 className="added-modules-heading">Added Modules</h2>
                                <ul className="modules-list">
                                    {modules.map((module, index) => (
                                        <li key={index} className="module-item">
                                            <div className="module-title">{module.title}</div>
                                            <div className="module-duration">
                                                Duration: {convertMinutes(module.duration)}
                                            </div>
                                            <div className="module-description">
                                                Description: {truncateContent(module.description)}
                                            </div>
                                            <div className="module-description">
                                                {truncateContent(module.content)}
                                            </div>
                                            <button
                                                className="delete-module-button bg-red-400"
                                                onClick={() => handleDeleteModule(index)}
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </section>
                </div>

                {showModal && (
                    <div
                        className="add-module-modal-overlay"
                        onClick={closeModalIfClickedOutside}
                    >
                        <div className="add-module-modal-content ">
                            <h2 className="add-module-modal-heading">Add Module</h2>
                            <div className="add-module-form-group">
                                <div>
                                    <div className="add-module-input-group">
                                        <div>
                                            <label>Module Title:</label>
                                            <input
                                                type="text"
                                                placeholder="Module Name"
                                                value={moduleDetails.title}
                                                onChange={(e) =>
                                                    setModuleDetails({
                                                        ...moduleDetails,
                                                        title: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label>Module Duration:</label>
                                            <div className="duration-input-group">
                                                <input
                                                    type="number"
                                                    placeholder="Module Duration"
                                                    value={moduleDetails.duration}
                                                    min="0"
                                                    onChange={(e) =>
                                                        setModuleDetails({
                                                            ...moduleDetails,
                                                            duration: e.target.value,
                                                        })
                                                    }
                                                />
                                                <select
                                                    value={moduleDetails.durationUnit}
                                                    onChange={(e) =>
                                                        setModuleDetails({
                                                            ...moduleDetails,
                                                            durationUnit: e.target.value,
                                                        })
                                                    }
                                                >
                                                    <option value="minutes">Minutes</option>
                                                    <option value="hours">Hours</option>
                                                    <option value="days">Days</option>
                                                    <option value="weeks">Weeks</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="add-module-form-group">
                                <label>Module Video: (Use Youtube URL)</label>
                                <input
                                    type="text"
                                    placeholder="Module URL"
                                    value={moduleDetails.video_url}
                                    onChange={handleModuleURLChange}
                                />
                            </div>
                            <div className="add-module-form-group">
                                <label>Module Content:</label>
                                <textarea
                                    placeholder="Module Content"
                                    value={moduleDetails.content}
                                    onChange={(e) =>
                                        setModuleDetails({
                                            ...moduleDetails,
                                            content: e.target.value,
                                        })
                                    }
                                ></textarea>
                            </div>
                            <div className="add-module-form-group">
                                <label>Module Description:</label>
                                <textarea
                                    placeholder="Module Description"
                                    value={moduleDetails.description}
                                    onChange={(e) =>
                                        setModuleDetails({
                                            ...moduleDetails,
                                            description: e.target.value,
                                        })
                                    }
                                ></textarea>
                            </div>
                            <div className="add-module-form-actions">
                                <button onClick={handleModuleAdd}>Add New Module</button>
                                <button onClick={() => setShowModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddCourses;
