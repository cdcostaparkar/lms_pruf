import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./LandingPage.css";
import LPCourseDetails from "@/components/landingpage/LPCourseDetails";
import { getAllCourses } from "@/api/getCoursesApi";
import { useNavigate } from "react-router-dom";
import midsectionimage from '../../assets/LP_mid_section/mid_image.jpg'
import followusimage from '../../assets/LP_end_section/follow_us.jpg'
import LPCourses from "@/components/landingpage/LPCourses";

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
            <div className="landing-page-heading">
                {/* <h2>Easy Learning</h2> */}
                <div className="landing-page-body">

                    <div className="landing-page-mid-section">
                        <div className="mid-section-content">
                            <div className="mid-section-text">                        
                                <h1 className="landing-page-mid-section-heading"> 🎉 All the best courses you need in one place! 🎉</h1>
                                <p className="landing-page-mid-section-description"> From interpersonal skills to technical topics, learning made easy and fun.</p>
                            </div>
                            <img className="landing-page-mid-section-image" src={midsectionimage} />
                       </div>
                    </div>


                    {/* All Available Courses */}
                    <LPCourses courses={courses} />
            
                </div>


                <div className="landing-page-end-section">
                        <div className="end-section-content">
                            <div className="end-section-text">                        
                                <h1 className="landing-page-end-section-heading"> Join Our Community! </h1>
                                <p className="landing-page-end-section-description">  
                                Stay updated with the latest courses, exclusive content, and
                                learning tips. </p>
                                <p className="landing-page-end-section-description"> 
                                     Follow us on social media! </p>
                            </div>
                            <img className="landing-page-end-section-image" src={followusimage} alt="Follow us" />
                       </div>
                </div>
            </div>
            </div>
    );
}
