import React, { useState, useEffect } from 'react';
import Navbar from './UpdateNavbar';
import UpdateCourseModule from './UpdateCourseModule';
import UpdateCourseModal from './UpdateCourseModal';
import './UpdateCourseDisplay.css'; 
import { useParams } from 'react-router-dom';
import { getModules, updateModule } from '@/api/moduleApi';

const UpdateCourseDisplay = () => {
    const { courseId } = useParams();
    // console.log(courseId); // use this to retrieve the modules if any

    const [modules, setModules] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentModule, setCurrentModule] = useState(null);
    const [error, setError] = useState(null); // State to hold error messages

    const openModal = (moduleId) => {
        const module = modules.find(m => m._id === moduleId);
        setCurrentModule(module);
        console.log("currentModule",currentModule);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleUpdate  = (id, title, description) => {
        if (currentModule) {
            updateModule(id, title, description);
            setModules(modules.map(module => 
                module._id === id ? { ...module, title, description } : module
            ));
            closeModal();
        }
    };


    useEffect(() => {
        const fetchModules = async (courseId) => {
            try {
                const data = await getModules(courseId); // Fetch modules using the API
                setModules(data);
            } catch (error) {
                setError('Failed to fetch modules. Please try again later.'); // Set error message
            }
        };

        if (courseId) {
            fetchModules(courseId);
        }
    }, [courseId]);

    return (
        <div className={`App`}>
            <div className="uc-navbar">
                <p>Update Courses</p>
            </div>

            {error && <p className="error">{error}</p>} {/* Display error message */}
            {modules.length === 0 && <p>No modules available.</p>}
            <div className="update-course-container">
                <div className="update-course-modules">
                    {modules.map(module => (
                        <UpdateCourseModule key={module._id} module={module} onUpdate={openModal} />
                    ))}
                </div>
            </div>
            <UpdateCourseModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                module={currentModule} 
                onUpdate={handleUpdate} 
            />
        </div>
    );
};

export default UpdateCourseDisplay;
