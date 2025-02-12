import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./HomePage.css";
import midsectionimage from '../../assets/LP_mid_section/mid_image.jpg'
import AvailableCourses from "@/components/homepage/AvailableCourses";

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

                    <div className="landing-page-mid-section">
                        <div className="mid-section-content">
                            <div className="mid-section-text">                        
                                <h1 className="landing-page-mid-section-heading"> 🎉 All the best courses you need in one place! 🎉</h1>
                                <p className="landing-page-mid-section-description"> From interpersonal skills to technical topics, learning made easy and fun.</p>
                            </div>
                            <img className="landing-page-mid-section-image" src={midsectionimage} alt="hi" />
                        </div>
                    </div>
                    

                    {/* Available Courses */}
                    <AvailableCourses />

                    {/* Companies Using Udemy  */}
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
                </div>
            </div>
        </div>
    );
}
