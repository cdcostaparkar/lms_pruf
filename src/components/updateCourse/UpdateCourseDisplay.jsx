import React, { useState, useEffect } from 'react';
import Navbar from './UpdateNavbar';
import Module from './UpdateCourseModule';
import Modal from './UpdateCourseModal';
import './UpdateCourseDisplay.css'; 

const UpdateCourseDisplay = () => {
    const [modules, setModules] = useState([
        { id: 'module1', name: 'Module 1', description: 'This is a description of Module 1.' },
        { id: 'module2', name: 'Module 2', description: 'This is a description of Module 2.' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentModule, setCurrentModule] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);


    // console.log(isModalOpen);
    // Load the saved theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
            document.body.classList.toggle('dark', savedTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    };

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
        <div className={`App ${isDarkMode ? 'dark' : ''}`}>
            <Navbar toggleTheme={toggleTheme} />
            <div className="update-course-container">
                <div className="update-course-modules">
                    {modules.map(module => (
                        <Module key={module.id} module={module} onUpdate={openModal} />
                    ))}
                </div>
            </div>
            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                module={currentModule} 
                onUpdate={updateModule} 
            />
        </div>
    );
};

export default UpdateCourseDisplay;
