import React from 'react';

const UpdateCourseModule = ({ module, onUpdate }) => {
    return (
        <div className="update-course-module-div">
            <div className="update-course-module" id={module.id}>
            <h2>{module.name}</h2>
            <p>{module.description}</p>
            <button className="update-course-btn" onClick={() => onUpdate(module.id)}>
                {/* <i className="fas fa-edit"></i>  */}
                Update
            </button>
            </div>
        </div>
    );
};

export default UpdateCourseModule;
