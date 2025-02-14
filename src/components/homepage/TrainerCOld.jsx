import { useState } from "react";
import UpdateCourseDisplay from "../updateCourse/UpdateCourseDisplay";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "@/api/courseApi";

const TrainerCourses = ({availableCourses, setAvailableCourses}) => {
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

    const handleDeleteCourse = async (courseId) => {
        try {
            await deleteCourse(courseId);
            // Update the availableCourses state to remove the deleted course
            setAvailableCourses((prevCourses) =>
                prevCourses.filter((course) => course._id !== courseId)
            );
            console.log(`Course ID ${courseId} deleted successfully.`);
        } catch (error) {
            console.error(`Failed to delete course ID ${courseId}:`, error);
        }
    };

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
                        <img 
                            src={`data:image/jpeg;base64,${course.imageUrl}`}
                            alt={course.title}
                            className="course-image" 
                        />
                        <h3 className="course-title"> {course.title} </h3>
                        <p className="course-instructor">{course.instructor}</p>
                        <CourseTrainerActions
                            onUpdate={() => navigate(`/courses/update/${course._id}`)}
                            onDelete={() => handleDeleteCourse(course._id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainerCourses;