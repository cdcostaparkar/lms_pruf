import { useState } from "react";
import UpdateCourseDisplay from "../updateCourse/UpdateCourseDisplay";
import { useNavigate } from "react-router-dom";


const TrainerCourses = ({availableCourses}) => {
    const navigate = useNavigate();
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [currentCourse, setCurrentCourse] = useState(null);

    // const openModal = (courseId) => {
    //     setCurrentCourse(courseId);
    //     setIsModalOpen(true);
    // };

    // const closeModal = () => {
    //     setIsModalOpen(false);
    //     setCurrentCourse(null);
    // };

    const CourseTrainerActions = ({ onUpdate, onDelete}) => {
        return (
            <div className="course-actions">
                <button className="button update-button" onClick={onUpdate}>
                    Update
                </button>
                <button className="button delete-button" onClick={onDelete}>
                    Delete
                </button>
            </div>
        );
    };

    return (
        <div className="course-created-section">
            {/* <UpdateCourseDisplay
                isModalOpen={isModalOpen} 
                onClose={closeModal} 
                currentCourse={currentCourse}
            /> */}
            <h2 className="course-created-heading"> Courses Created by You </h2>
            <div className="course-created-grid">
                {availableCourses.map((course,index)=>(
                    <div key={index} className="course-card">
                        <img src={course.image} alt={course.title}className="course-image" />
                        <h3 className="course-title"> {course.title} </h3>
                        <p className="course-instructor">{course.instructor}</p>
                        <CourseTrainerActions
                            onUpdate={() => navigate(`/courses/update/${course.courseID}`)}
                            onDelete={() => console.log(`Deleting Course ID: ${course.courseID}`)} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainerCourses;