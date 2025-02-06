import { availableCourses } from "@/lib/mockData";
import CourseDetails from "@/pages/CourseDetails/CourseDetails";
import { useState } from "react";
// import "../../pages/CourseDetails/CourseDetails.css"
import { useNavigate } from "react-router-dom";
import UpdateCourseDisplay from "../updateCourse/UpdateCourseDisplay";
import TrainerCourses from "./TrainerCourses";

const AvailableCourses = () => {

    const mockUserData = {
        userId: "001",
        role: "trainer"
    };

    

    const CourseStudentActions = ({onResume}) => {
        return (
            <div className="course-actions">
                <button className="button resume-button" onClick={onResume}>
                    Resume
                </button>
            </div>
        );
    };


    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const toggleModal = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(!isModalOpen);
    };

    const handleEnroll = async (courseId) => {
        try {
            const response = await enrollInCourse(courseId); // Call the API
            if (response.success) {
                // Redirect to the course details page with the course ID
                navigate(`/courses/${courseId}`);
            }
        } catch (error) {
            console.error("Enrollment failed:", error);
            // Handle error (e.g., show a notification)
        }
    };

    return (
        <div>
            {mockUserData.role ==="student" ? (
                <div className="course-progress-section">
                    <h2 className="course-progress-heading"> Course Progress </h2>
                    <div className="course-progress-grid">{availableCourses.map((course,index)=>(
                        <div key={index} className="course-card">
                            <img src={course.image} alt={course.title}className="course-image" />
                            <h3 className="course-title"> {course.title} </h3>
                            <p className="course-instructor">{course.instructor}</p>
                            <CourseStudentActions
                            onResume={()=> console.log(`Resuming Course:${course.title}`)}/>
                        </div>
                    ))}
                    </div>
                </div>
            ):(
            <div>
                <TrainerCourses availableCourses={availableCourses}/>
            </div>
            // <div className="course-created-section">
            //     <UpdateCourseDisplay/>
            //     <h2 className="course-created-heading"> Courses Created by You </h2>
            //     <div className="course-created-grid">
            //         {availableCourses.map((course,index)=>(
            //             <div key={index} className="course-card">
            //                 <img src={course.image} alt={course.title}className="course-image" />
            //                 <h3 className="course-title"> {course.title} </h3>
            //                 <p className="course-instructor">{course.instructor}</p>
            //                 <CourseTrainerActions
            //                 onUpdate={() => console.log(`Course Title: ${course.title}, Course Trainer: ${course.instructor}`)}
            //                 onDelete={() => console.log(`Deleting Course ID: ${course.courseID}`)} 
            //              </div>   />
            //             </div>
            //         ))}
            //     </div>
            // </div>
            )}
            
            <div className="available-courses-section">
                <h2 className="available-courses-heading"> Trending Courses </h2>
                <div className="available-courses-grid">
                    {availableCourses.map((course, index) => (
                        <div key={index} className="course-card">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="course-image"
                            />
                            <h3 className="course-title"> {course.title} </h3>
                            <p className="course-instructor"> {course.instructor}</p>
                            <div className="course-card-buttons">
                                <button
                                    className="additional-details-button"
                                    onClick={() => toggleModal(course)}
                                >
                                    Additional Details
                                </button>
                                <button
                                    className="card-enroll-button"
                                    onClick={() => handleEnroll(course.id)} // Pass the course ID
                                >
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {isModalOpen && (
                    <CourseDetails course={selectedCourse} toggleModal={toggleModal} />
                )}
            </div>
        </div>
    );
};

export default AvailableCourses;
