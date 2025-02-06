import React, { useState, useEffect } from 'react';
import Navbar from './UpdateNavbar';
import UpdateCourseModule from './UpdateCourseModule';
import UpdateCourseModal from './UpdateCourseModal';
import './UpdateCourseDisplay.css'; 
import { useParams } from 'react-router-dom';

const UpdateCourseDisplay = () => {
    const {courseId} = useParams();
    console.log(courseId); // use this to retrieve the modules if any

    const [modules, setModules] = useState([
        { id: 'module1', name: 'Module 1', description: 'This is a description of Module 1.' },
        { id: 'module2', name: 'Module 2', description: 'This is a description of Module 2.' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentModule, setCurrentModule] = useState(null);
    // const [isDarkMode, setIsDarkMode] = useState(false);

    // console.log(currentCourse);

    const openModal = (moduleId) => {
        const module = modules.find(m => m.id === moduleId);
        setCurrentModule(module);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const updateModule = (id, name, description) => {
        setModules(modules.map(module => 
            module.id === id ? { ...module, name, description } : module
        ));
    };

    return (
        <div className={`App`}>
            <div className="uc-navbar">
                <p>Update Courses</p>
            </div>

            <div className="update-course-container">
                <div className="update-course-modules">
                    {modules.map(module => (
                        <UpdateCourseModule key={module.id} module={module} onUpdate={openModal} />
                    ))}
                </div>
            </div>
            <UpdateCourseModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                module={currentModule} 
                onUpdate={updateModule} 
            />
        </div>
    );
};

export default UpdateCourseDisplay;
