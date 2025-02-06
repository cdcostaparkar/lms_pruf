import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./HomePage.css";
import AvailableCourses from "@/components/homepage/AvailableCourses";

export default function HomePage() {
    const [search, setSearch] = useState("");
    const categories = ["Development", "Business", "IT & Software", "Design"];
    

    const companies = ["Google", "Microsoft", "Amazon", "Netflix"];
    // console.log(availableCourses);
    return (
        <div className="webpage-layout">
            <div className="webpage-heading">
                <h2>Easy Learning </h2>
                <div>
                    {/* Search Bar */}
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search for courses..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                        <Button className="search-button"> Search </Button>
                    </div>

                    {/* Categories */}

                    <div className="course-categories-grid">
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
