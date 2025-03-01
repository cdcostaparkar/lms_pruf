// src/components/UpdateCourse/Modal.js
import React, { useState } from 'react';

const UpdateCourseModal = ({ isOpen, onClose, module, onUpdate }) => {
    if (!isOpen) return null;

    const [name, setName] = useState(module.name);
    const [description, setDescription] = useState(module.description);

    const handleUpdate = () => {
        onUpdate(module.id, name, description);
        onClose();
    };

    return (
        <div className="update-course-modal" onClick={onClose}>
            <div className="update-course-modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="update-course-modal-close" onClick={onClose}>&times;</span>
                <h2>Update Module</h2>
                <input className='modal-input'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name of Module"
                    
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <button className="update-modal-btn" onClick={handleUpdate}>Update</button>
            </div>
        </div>
    );
};

export default UpdateCourseModal;
