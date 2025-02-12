import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./HomePage.css";
import midsectionimage from '../../assets/LP_mid_section/mid_image.jpg'
import AvailableCourses from "@/components/homepage/AvailableCourses";
import followusimage from '../../assets/LP_end_section/follow_us.jpg'
export default function HomePage() {
    const [search, setSearch] = useState("");
    const categories = ["Development", "Business", "IT & Software", "Design"];
    const companies = ["Google", "Microsoft", "Amazon", "Netflix"];
    // console.log(availableCourses);
    return (
        <div className="webpage-layout">
            <div className="webpage-heading">
                <div>
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

                    <div className="homepage-mid-section">
                        <div className="homepage-mid-section-content">
                            <div className="homepage-mid-section-text">                        
                                <h1 className="homepage-mid-section-heading"> 🎉 All the best courses you need in one place! 🎉</h1>
                                <p className="homepage-mid-section-description"> From interpersonal skills to technical topics, learning made easy and fun.</p>
                            </div>
                            <img className="homepage-mid-section-image" src={midsectionimage} alt="hi" />
                        </div>
                    </div>
                    

                    {/* Available Courses */}
                    <AvailableCourses />

                    {/* Companies Using Udemy 
                    <div className="companies-section">
                        <h2 className="companies-heading"> Trusted by Top Companies </h2>
                        <div className="companies-list">
                            {companies.map((company, index) => (
                                <span key={index} className="company-badge">
                                    {company}
                                </span>
                            ))}
                        </div>
                    </div> */}

                    <div className="homepage-end-section">
                        <div className="homepage-end-section-content">
                            <div className="homepage-end-section-text">                        
                                <h1 className="homepage-end-section-heading"> Join Our Community! </h1>
                                <p className="homepage-end-section-description">  
                                 Stay updated with the latest courses, exclusive content, and learning tips. </p>
                                <p className="homepage-end-section-description"> 
                                Follow us on social media! </p>
                            </div>
                            <img className="homepage-end-section-image" src={followusimage} alt="Follow us" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
