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
        if (e.target.classList.contains("fixed")) {
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
            // Do not send duration
            // formData.append("duration", courseDetails.duration);
            if (image) {
                formData.append("image", image); // 'image' should match the multer fieldname
            }
            for (const entry of formData.entries()) {
                const [key, value] = entry;
                console.log(key, value);
            }
            const createdCourse = await createCourse(user, formData);
            const courseId = createdCourse._id;

            for (const module of modules) {
                console.log("courseId", module)
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
        const file = e.target.files[0];
        if (file) {
          if (file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImage(reader.result);
            };
            reader.readAsDataURL(file);
          } else {
            toast.error("Please select a valid image file (max 5MB).");
            e.target.value = null;
          }
        }
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
                        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
                        onClick={closeModalIfClickedOutside}
                    >
                        <div className="bg-white p-5 rounded-md w-4/5 max-w-[500px] max-h-[500px] shadow-md">
                            <h2 className="font-bold mb-4 text-center text-lg">Add Module</h2>
                            <div className="mb-2">
                                <div>
                                    <div className="flex justify-between">
                                        <div className="w-[48%]">
                                            <label className="block mb-1 font-bold text-md">Module Title:</label>
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
                                                className="w-full p-2 border border-gray-300 rounded-md box-border text-md"
                                            />
                                        </div>
                                        <div className="w-[48%]">
                                            <label className="block mb-1 font-bold text-md">
                                                Module Duration:
                                            </label>
                                            <div className="flex items-center">
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
                                                    className="w-[70px] p-2 border border-gray-300 rounded-md mr-1 text-md"
                                                />
                                                <select
                                                    value={moduleDetails.durationUnit}
                                                    onChange={(e) =>
                                                        setModuleDetails({
                                                            ...moduleDetails,
                                                            durationUnit: e.target.value,
                                                        })
                                                    }
                                                    className="p-2 border border-gray-300 rounded-md w-[120px] text-md"
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
                            <div className="mb-2">
                                <label className="block mb-1 font-bold text-md">
                                    Module Video: (Use Youtube URL)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Module URL"
                                    value={moduleDetails.video_url}
                                    onChange={handleModuleURLChange}
                                    className="w-full p-2 border border-gray-300 rounded-md box-border text-md"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1 font-bold text-md">Module Content:</label>
                                <textarea
                                    placeholder="Module Content"
                                    value={moduleDetails.content}
                                    onChange={(e) =>
                                        setModuleDetails({
                                            ...moduleDetails,
                                            content: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded-md box-border min-h-[60px] text-md"
                                ></textarea>
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1 font-bold text-md">
                                    Module Description:
                                </label>
                                <textarea
                                    placeholder="Module Description"
                                    value={moduleDetails.description}
                                    onChange={(e) =>
                                        setModuleDetails({
                                            ...moduleDetails,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded-md box-border min-h-[60px] text-md"
                                ></textarea>
                            </div>
                            <div className="text-right">
                                <button
                                    onClick={handleModuleAdd}
                                    className="bg-[#aa40d4] text-white py-2 px-4 rounded-md hover:bg-purple-700 mr-2 text-md"
                                >
                                    Add New Module
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 text-md"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
};

export default AddCourses;
