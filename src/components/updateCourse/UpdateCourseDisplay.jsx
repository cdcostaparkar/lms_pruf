import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
    getModules,
    updateModule,
    deleteModuleById,
    createModule,
} from "@/api/moduleApi";
import { updateCourse } from "@/api/courseApi"; // Import the new API function
import ModuleUpdateModal from "./ModuleUpdateModal";
import convertMinutes from "@/lib/calcTime";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

const UpdateCourseDisplay = () => {
    const { user } = useAuth();

    const { courseId } = useParams();
    console.log(courseId);
    const location = useLocation();
    const course = location.state?.course;

    const [modules, setModules] = useState([]);
    const [error, setError] = useState(null);
    const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
    const [selectedModuleId, setSelectedModuleId] = useState(null);
    const [isCourseUpdating, setIsCourseUpdating] = useState(false);
    const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);

    const [courseTitle, setCourseTitle] = useState(course.title || "");
    const [courseDescription, setCourseDescription] = useState(
        course.description || ""
    );
    const [courseImage, setCourseImage] = useState(course.imageUrl || "");
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        const fetchModules = async (courseId) => {
            try {
                const data = await getModules(courseId);
                setModules(data);
            } catch (error) {
                console.error("API Error:", error);
                toast.error("Failed to fetch modules. Please try again later.");
            }
        };

        if (courseId) {
            fetchModules(courseId);
        }
    }, [courseId]);

    const handleCourseTitleChange = (e) => {
        setCourseTitle(e.target.value);
    };

    const handleCourseDescriptionChange = (e) => {
        setCourseDescription(e.target.value);
    };

    //   const handleImageChange = (e) => {
    //     setNewImage(e.target.files[0]);
    // };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewImage(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                toast.error("Please select a valid image file (max 5MB).");
                e.target.value = null;
            }
        }
    };

    const handleCourseDetailsSubmit = async () => {
        setIsCourseUpdating(true);
        try {
            const formData = new FormData();
            formData.append("title", courseTitle);
            formData.append("description", courseDescription);

            console.log(newImage);
            if (newImage) {
                formData.append("image", newImage);
            }

            for (const entry of formData.entries()) {
                const [key, value] = entry;
                console.log(key, value);
            }

            // Call the updateCourse API function
            await updateCourse(user, courseId, formData);

            toast.success("Course details updated successfully!");
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error("Failed to update course details. Please try again.");
        } finally {
            setIsCourseUpdating(false);
        }
    };

    const openModuleModal = (moduleId) => {
        setSelectedModuleId(moduleId);
        setIsModuleModalOpen(true);
    };

    const closeModuleModal = () => {
        setIsModuleModalOpen(false);
        setSelectedModuleId(null);
    };

    const openAddModuleModal = () => {
        setIsAddModuleModalOpen(true);
    };

    const closeAddModuleModal = () => {
        setIsAddModuleModalOpen(false);
    };

    const handleUpdateModule = async (moduleId, updatedModuleData) => {
        try {
            const { title, description, video_url, content, duration } =
                updatedModuleData;

            // console.log(duration)
            // let durationInMinutes = duration;

            // if (durationUnit === "hours") {
            //     durationInMinutes = duration * 60;
            // } else if (durationUnit === "days") {
            //     durationInMinutes = duration * 60 * 24;
            // } else if (durationUnit === "weeks") {
            //     durationInMinutes = duration * 60 * 24 * 7;
            // }

            const updatedModule = await updateModule(
                moduleId,
                title,
                description,
                video_url,
                content,
                duration
            );

            setModules(
                modules.map((module) =>
                    module._id === moduleId ? { ...module, ...updatedModule } : module
                )
            );

            toast.success("Module updated successfully!");
            // console.log("Updated Module Details:", updatedModule);
            closeModuleModal();
        } catch (error) {
            console.error("Error updating module:", error);
            toast.error("Failed to update module. Please try again.");
        }
    };

    const handleCreateModule = async (moduleData) => {
        try {
            let durationInMinutes = moduleData.duration;
            // console.log(moduleData);

            if (moduleData.durationUnit === "hours") {
                durationInMinutes = duration * 60;
            } else if (moduleData.durationUnit === "days") {
                durationInMinutes = duration * 60 * 24;
            } else if (moduleData.durationUnit === "weeks") {
                durationInMinutes = duration * 60 * 24 * 7;
            }

            const moduleDataWithMinutes = {
                ...moduleData,
                duration: durationInMinutes,
                // module_order: modules.length, // Assign module_order based on the number of modules
            };
            delete moduleDataWithMinutes.durationUnit;
            // Determine the next module order
            const nextModuleOrder =
                modules.length > 0
                    ? Math.max(...modules.map((m) => m.module_order)) + 1
                    : 1;

            moduleDataWithMinutes.module_order = nextModuleOrder;

            // console.log("mDwM", moduleDataWithMinutes)
            const newModule = await createModule(courseId, moduleDataWithMinutes);

            setModules([...modules, newModule.module]);
            closeAddModuleModal();
            toast.success("Module created successfully!");
            console.log("Created Module Details:", newModule);
        } catch (error) {
            console.error("Error creating module:", error);
            toast.error("Failed to create module. Please try again.");
        }
    };

    const handleDeleteModule = async (moduleId) => {
        try {
            await deleteModuleById(moduleId);
            setModules(modules.filter((module) => module._id !== moduleId));
            console.log(`Module with ID ${moduleId} deleted successfully.`);
        } catch (error) {
            console.error("Error deleting module:", error);
            toast.error("Failed to delete module. Please try again.");
        }
    };

    const handleModuleSubmit = async (moduleId, moduleDetails) => {
        if (moduleId) {
            await handleUpdateModule(moduleId, moduleDetails);
        } else {
            await handleCreateModule(moduleDetails);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-5">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Update Course: {course.title}</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {modules.length === 0 && <p>No modules available.</p>}

                <div className="flex flex-wrap lg:flex-nowrap gap-4">
                    {/* Course Details Section */}
                    <section className="w-full lg:w-1/3 bg-purple-100 shadow rounded-md p-4">
                        <h2 className="text-lg font-semibold mb-2">Update Course Details</h2>
                        <div className="mb-4">
                            <label
                                htmlFor="courseTitle"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Course Title:
                            </label>
                            <input
                                type="text"
                                id="courseTitle"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={courseTitle}
                                onChange={handleCourseTitleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="courseDescription"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Course Description:
                            </label>
                            <textarea
                                id="courseDescription"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={courseDescription}
                                onChange={handleCourseDescriptionChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="courseImage"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Current Course Image:
                            </label>
                            {courseImage && (
                                <img
                                    src={newImage || courseImage}
                                    alt="Course"
                                    className="w-auto h-32 object-cover rounded-md mb-2"
                                />
                            )}
                            <input
                                type="file"
                                id="courseImage"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div>
                            <button
                                onClick={handleCourseDetailsSubmit}
                                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                disabled={isCourseUpdating}
                            >
                                {isCourseUpdating ? "Updating..." : "Update Course Details"}
                            </button>
                        </div>
                    </section>

                    {/* Course Modules Section */}
                    <section className="w-full lg:w-2/3">
                        <div className="bg-purple-100 p-4 shadow rounded-md">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-lg font-bold">Course Modules</h2>
                                <button
                                    onClick={openAddModuleModal}
                                    className="bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline transition-colors duration-500"
                                >
                                    Add New Module
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {modules.map((module) => (
                                    <div
                                        key={module._id}
                                        className="bg-gray-50 p-4 rounded-md shadow-sm flex items-center justify-between"
                                    >
                                        <div>
                                            <h3 className="text-lg font-semibold">{module.title}</h3>
                                            {/* <p className="text-gray-600 text-sm">
                                            {module.description}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Duration: {convertMinutes(module.duration)}
                                        </p> */}
                                            <p className="text-gray-600 text-sm">
                                                Module Order: {module.module_order}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openModuleModal(module._id)}
                                                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDeleteModule(module._id)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {isModuleModalOpen && selectedModuleId && (
                    <ModuleUpdateModal
                        isOpen={isModuleModalOpen}
                        onClose={closeModuleModal}
                        moduleId={selectedModuleId}
                        modules={modules}
                        onSubmit={handleModuleSubmit}
                    />
                )}

                {isAddModuleModalOpen && (
                    <ModuleUpdateModal
                        isOpen={isAddModuleModalOpen}
                        onClose={closeAddModuleModal}
                        onSubmit={handleModuleSubmit}
                    />
                )}
            </div>
        </div>
    );
};

export default UpdateCourseDisplay;
