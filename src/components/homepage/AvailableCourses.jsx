import CourseDetails from "@/pages/CourseDetails/CourseDetails";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TrainerCourses from "./TrainerCourses";
import { useAuth } from "@/context/AuthContext";
import { 
    getAllEnrolledCourses, 
    getAllNotEnrolledCourses, 
    getTrainerCourses, 
    getNotTrainerCourses 
} from "@/api/getCoursesApi";
import { handleEnroll } from "@/api/enrollApi";


const AvailableCourses = () => {
    const { user, roleName } = useAuth();

    // State for student courses
    const [studentEnrolledCourses, setStudentEnrolledCourses] = useState([]);
    const [studentNotEnrolledCourses, setStudentNotEnrolledCourses] = useState([]);

    // State for trainer courses
    const [trainerCourses, setTrainerCourses] = useState([]);
    const [trainerNotCourses, setTrainerNotCourses] = useState([]);

    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
   
    const [enrollmentChange, setEnrollmentChange] = useState(0);

    useEffect(() => { 
        const fetchCourses = async () => {
            try {
                if (roleName === "student") {
                    // Fetch enrolled courses for student
                    const enrolled = await getAllEnrolledCourses(user);
                    setStudentEnrolledCourses(enrolled);

                    // Fetch not enrolled courses for student
                    const notEnrolled = await getAllNotEnrolledCourses(user);
                    setStudentNotEnrolledCourses(notEnrolled);
                    console.log(enrolled, notEnrolled)
                } else if (roleName === "trainer") {
                    // Fetch courses for trainer
                    const trainerCourses = await getTrainerCourses(user);
                    setTrainerCourses(trainerCourses);

                    // Fetch not trainer courses
                    const notTrainerCourses = await getNotTrainerCourses(user);
                    setTrainerNotCourses(notTrainerCourses);
                    console.log(trainerCourses, notTrainerCourses);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        if (user) {
            fetchCourses();
        }
    }, [user, roleName, enrollmentChange]);

    const CourseStudentActions = ({ onResume }) => {
        return (
            <div className="course-actions">
                <button className="button resume-button" onClick={onResume}>
                    Resume
                </button>
            </div>
        );
    };

    const toggleModal = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(!isModalOpen);
    };

    const handleEnrollCourse = async (user, courseId) => {
        try {
            // store
            


            // await handleEnroll(user, courseId); // Call the original handleEnroll
            setEnrollmentChange((prev) => prev + 1); // Update enrollmentChange
        } catch (error) {
            setError(error.message);
        }
    };

    // const handleEnroll = async (courseId) => {
    //     try {
    //         console.log(`Enrolling in course: ${courseId}`);
    //         const response = await enrollInCourse(courseId); // Call the API
    //         if (response.success) {
    //             // Redirect to the course details page with the course ID
    //             navigate(`/courses/${courseId}`);
    //         }
    //     } catch (error) {
    //         console.error("Enrollment failed:", error);
    //         // Handle error (e.g., show a notification)
    //     }
    // };

    return (
        <div>
            {roleName === "student" ? (
                <div>
                    <div className="course-progress-section">
                        <h2 className="course-progress-heading"> Course Progress </h2>
                        <div className="course-progress-grid">
                            {studentEnrolledCourses.map((course, index) => (
                                <div key={index} className="course-card">
                                    <img
                                        src={`https://picsum.photos/200?random=${course.enrollment.course_id._id}`}
                                        alt={course.enrollment.course_id.title}
                                        className="course-image"
                                    />
                                    <h3 className="course-title"> {course.enrollment.course_id.title} </h3>
                                    <p className="course-instructor">{course.enrollment.course_id.trainer_id.name}</p>
                                    <CourseStudentActions
                                        onResume={() => console.log(`Resuming Course:${course.enrollment.course_id._id}`)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Available courses */}
                    <div className="available-courses-section">
                        <h2 className="available-courses-heading"> Available Courses </h2>
                        <div className="available-courses-grid">
                            {studentNotEnrolledCourses.map((course, index) => (
                                <div key={index} className="course-card">
                                    <img
                                        src={`https://picsum.photos/200?random=${course._id}`}
                                        alt={course.title}
                                        className="course-image"
                                    />
                                    <h3 className="course-title"> {course.title} </h3>
                                    <p className="course-instructor"> {course.trainer_id.name}</p>
                                    <div className="course-card-buttons">
                                        <button
                                            className="additional-details-button"
                                            onClick={() => toggleModal(course)}
                                        >
                                            Additional Details
                                        </button>
                                        <button
                                            className="card-enroll-button"
                                            onClick={() => handleEnrollCourse(user, course._id)} // Pass the course ID
                                        >
                                            Enroll Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {isModalOpen && (
                            <CourseDetails course={selectedCourse} toggleModal={toggleModal} roleName={roleName} handleEnroll={handleEnrollCourse}/>
                        )}
                    </div>
                </div>
            ) : roleName === "trainer" ? (
                <div>
                    {/* Render TrainerCourses and available courses for trainers */}
                    <TrainerCourses availableCourses={trainerCourses} setAvailableCourses={setTrainerCourses}/>

                    <div className="available-courses-section">
                        <h2 className="available-courses-heading"> Trending Courses </h2>
                        <div className="available-courses-grid">
                            {trainerNotCourses.map((course, index) => (
                                <div key={index} className="course-card">
                                    <img
                                        src={`https://picsum.photos/200?random=${course._id}`}
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
                                    </div>
                                </div>
                            ))}
                        </div>

                        {isModalOpen && (
                            <CourseDetails course={selectedCourse} toggleModal={toggleModal} roleName={roleName} />
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default AvailableCourses;
