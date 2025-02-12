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
import { ButtonWithIcon } from "../custom/ButtonWithIcon";
import CourseCard from "../custom/CourseCard";
import { Card, CardContent } from "@/components/ui/card";

import LPCourseDetails from "../landingpage/LPCourseDetails";

// Lucide
import { ShoppingCart, BookOpenText } from "lucide-react";
import { Button } from "../ui/button";


const AvailableCourses = () => {
    const { user, roleName } = useAuth();

    // State for student courses
    const [studentEnrolledCourses, setStudentEnrolledCourses] = useState([]);
    const [studentNotEnrolledCourses, setStudentNotEnrolledCourses] = useState([]);

    // State for trainer courses
    const [trainerCourses, setTrainerCourses] = useState([]);
    // const [trainerNotCourses, setTrainerNotCourses] = useState([]);

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
                    console.log("hi",enrolled, notEnrolled)
                } else if (roleName === "trainer") {
                    // Fetch courses for trainer
                    const trainerCourses = await getTrainerCourses(user);
                    setTrainerCourses(trainerCourses);
                    console.log("trainerCourses",trainerCourses);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        if (user) {
            fetchCourses();
        }
    }, [user, roleName, enrollmentChange]);

    // const CourseStudentActions = ({ onResume }) => {
    //     return (
            
    //         <div className="course-actions">
    //             <button className="button resume-button" onClick={onResume}>
    //                 Resume
    //             </button>
    //         </div>
    //     );
    // };

    const toggleModal = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(!isModalOpen);
    };

    const handleEnrollCourse = async (user, courseId) => {
        try {
            // store
            

            console.log("enrolling")
            console.log(user, courseId)
            await handleEnroll(user, courseId); // Call the original handleEnroll
            setEnrollmentChange((prev) => prev + 1); // Update enrollmentChange
        } catch (error) {
            setError(error.message);
        }
    };

    const handleAddCart = (newCourse) => {

        // if(!isLoggedIn){
        //     navigate('/login');
        //     return;
        // }

        // if (userRole === 'student'){
        //     const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

        //     if(!currentCart.some(course => course.id === courseId)) {
        //         const courseToAdd = courses.find(course => course.id === courseId);
        //         currentCart.push(courseToAdd);
        //         localStorage.setItem("cart", JSON.stringify(currentCart));
        //         alert("Course added to cart");
        //         console.log("Course added to cart:", courseToAdd);
        //     }else{
        //         console.log("Course already in the cart");
        //     }
        //     navigate("/cart");
        // }else if(userRole === 'trainer'){
        //     alert("Error: Trainer cannot enroll in courses.");
        // }


        console.log("Adding to cart: ",newCourse);
        // handleEnrollTrack(navigate, courseId);

        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

        if(!currentCart.some(course => course._id === newCourse._id)){
            const courseToAdd = studentNotEnrolledCourses.find(course => course._id === newCourse._id);

            currentCart.push(courseToAdd);

            localStorage.setItem("cart", JSON.stringify(currentCart));
            alert("Course added to cart!")
            console.log("Course added to cart:", courseToAdd);
        }else{
            alert("Course already in cart!")
            console.log("Course already in cart");
        }
    };


    return (
        <div>
            {roleName === "student" ? (
                <div>
                    <h2 className="course-progress-heading"> Course Progress </h2>
                    <CourseCard courses={studentEnrolledCourses} setCourses={setStudentEnrolledCourses} showProgress={true} />
                    {/* <div className="course-progress-section">
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
                                    <ButtonWithIcon course={course}/>
                                </div>
                            ))}
                        </div>
                    </div> */}
                    {/* Available courses */}
                    {/* <div className="available-courses-section"> */}

                    {/* Add wishlisht and in a different component */}
                        <h2 className="available-courses-heading">Available Courses</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {studentNotEnrolledCourses.map((course, index) => (
                            <div key={index} className="p-2">
                                <Card className="h-auto flex flex-col">
                                <div className="relative">
                                    <img
                                    src={`https://picsum.photos/200?random=${course._id}`}
                                    alt={course.title}
                                    className="w-full h-auto aspect-video object-cover rounded-md"
                                    />
                                </div>
                                <CardContent className="flex flex-col justify-between p-6 space-y-4 flex-grow">
                                    <div>
                                    <h3 className="text-xl font-bold text-left mb-2">
                                        {course.title}
                                    </h3>
                                    <div className="flex justify-between text-sm text-dark-gray">
                                        <span>
                                            Course By:{" "}
                                            <span className="font-bold text-gray-700">
                                                {course.trainer_id.name}
                                            </span>
                                        </span>
                                        <span className="text-gray-500">
                                            Duration:{" "}
                                            <span className="font-bold text-gray-700">
                                                {course.duration} hours
                                            </span>
                                        </span>
                                    </div>
                                    </div>
                                    <div className="flex justify-center space-x-4 mt-4">
                                        <Button className="bg-gray-900 text-white py-2 px-4 rounded" onClick={() => toggleModal(course)}>
                                            Details
                                            <BookOpenText/>
                                        </Button>
                                        <Button className="bg-purple-600 text-white py-2 px-4 rounded" onClick={() => handleAddCart(course)}>
                                            Add 
                                            <ShoppingCart/>
                                        </Button>
                                    </div>
                                </CardContent>
                                </Card>
                            </div>
                            ))}
                        {/* </div> */}
                        
                        {isModalOpen && (
                            <LPCourseDetails course={selectedCourse} toggleModal={toggleModal}/>
                        )}
                    </div>
                </div>
            ) : roleName === "trainer" ? (
                <div>
                    {/* Render TrainerCourses and available courses for trainers */}
                    <TrainerCourses availableCourses={trainerCourses} setAvailableCourses={setTrainerCourses}/>

                </div>
            ) : null}
        </div>
    );
};

export default AvailableCourses;
