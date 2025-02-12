import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./LandingPage.css";
// import AvailableCourses from "@/components/homepage/AvailableCourses";
import LPCourseDetails from "@/components/landingpage/LPCourseDetails";
import { getAllCourses } from "@/api/getCoursesApi";
// import { handleEnrollTrack } from "@/lib/enrollCourseTrack";
import { useNavigate } from "react-router-dom";
import midsectionimage from '../../assets/LP_mid_section/mid_image.jpg'

import { useAuth } from "@/context/AuthContext"; // Import useAuth

export default function LandingPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(!isModalOpen);
    };
    // const categories = ["Development", "Business", "IT & Software", "Design"];
    const companies = ["Google", "Microsoft", "Amazon", "Netflix"];

    const { isLoggedIn, userRole} =useAuth();

    const handleEnroll = (courseId) => {

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


        console.log("Adding to cart: ",courseId);
        // handleEnrollTrack(navigate, courseId);

        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

        if(!currentCart.some(course => course._id === courseId)){
            const courseToAdd = courses.find(course => course._id === courseId);

            currentCart.push(courseToAdd);

            localStorage.setItem("cart", JSON.stringify(currentCart));
            alert("Course added to cart!")
            console.log("Course added to cart:", courseToAdd);
        }else{
            console.log("Course already in cart");
        }
    };

    useEffect(() => { 
        console.log("Fetching courses...");
        const fetchCourses = async () => {
            try {
                const courses = await getAllCourses();
                setCourses(courses);
            } catch (error) {
                console.error("Error fetching courses:", error.message);
            }
        };
        fetchCourses();
    }, []);

    console.log(courses);

    return (
        <div className="landing-page-layout">
            {/* <div className="landing-page-heading"> */}
                {/* <h2>Easy Learning</h2> */}
                <div className="landing-page-body">
                    {/* Search Bar */}
                    {/* <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search for courses..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                        <Button className="search-button"> Search </Button>
                    </div> */}
                    {/* Categories */}
                    {/* <div className="course-categories-grid">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                variant="outline"
                                className="course-category-button"
                            >
                                {" "}
                                {category}{" "}
                            </button>
                        ))}
                    </div> */}

                    <div className="landing-page-mid-section">
                        <div className="mid-section-content">
                            <div className="mid-section-text">                        
                                <h1 className="landing-page-mid-section-heading"> 🎉 All the best courses you need in one place! 🎉</h1>
                                <p className="landing-page-mid-section-description"> From interpersonal skills to technical topics, learning made easy and fun.</p>
                            </div>
                            <img className="landing-page-mid-section-image" src={midsectionimage} />
                       </div>
                    </div>


                    {/* Available Courses */}
                    <div className="available-courses-section">
                        <h2 className="available-courses-heading"> Available Courses </h2>
                        <div className="available-courses-grid">
                            {courses.map((course, index) => (
                                <div key={index} className="course-card">
                                    <img
                                        src={`https://picsum.photos/200?random=${course._id}`}
                                        alt={course.title}
                                        className="course-image"
                                    />
                                    <h3 className="course-title"> <strong>{course.title}</strong></h3>
                                    <p className="course-instructor"> {course.trainer_id.name}</p>
                                    <p className="course-duration"><strong> Duration: </strong> {course.duration} hours</p>
                                    <div className="course-card-buttons">
                                        <button
                                            className="additional-details-button"
                                            onClick={() => toggleModal(course)}
                                        >
                                            Additional Details
                                        </button>
                                        <button
                                            className="card-enroll-button"
                                            onClick={() => handleEnroll(course._id)} // Pass the course ID
                                        >
                                            Add to Cart 🛒
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {isModalOpen && (
                            <LPCourseDetails course={selectedCourse} toggleModal={toggleModal} />
                        )}
                    </div>
                </div>

                    {/* Companies Using Udemy */}
                    <div className="companies-section">
                        <h2 className="companies-heading"> Trusted by Top Companies </h2>
                        <div className="companies-list">
                            {companies.map((company, index) => (
                                <span key={index} className="company-badge">
                                    {company}
                                </span>
                            ))}
                        </div>
                    </div>
                {/* </div> */}
            </div>
    );
}
