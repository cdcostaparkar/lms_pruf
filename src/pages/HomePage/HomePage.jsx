import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./HomePage.css";
import midsectionimage from "../../assets/LP_mid_section/mid_image.jpg";
// import midsectionimage from "../../assets/LP_mid_section/woman-working-laptop-online-course.png";
import AvailableCourses from "@/components/homepage/AvailableCourses";
import { useAuth } from "@/context/AuthContext";
import followusimage from "../../assets/LP_end_section/follow_us.jpg";

export default function HomePage() {
  const { roleName } = useAuth();

  const companies = ["Google", "Microsoft", "Amazon", "Netflix"];

  let midSectionContent;

  if (roleName === "trainer") {
    midSectionContent = (
      <div className="mid-section-content">
        <div className="mid-section-text">
          <h1 className="landing-page-mid-section-heading">
            Welcome Trainer! Manage Your Courses Here. 🎉
          </h1>
          <p className="landing-page-mid-section-description">
            Create and update your courses to help learners achieve their goals.
          </p>
          {/* Add trainer-specific components or links here, e.g., a link to
              course management page */}
          {/* <Button>Manage Courses</Button> */}
        </div>
        {/* You can replace the image with a trainer-specific image if you have
            one */}
        <img
          className="landing-page-mid-section-image"
          src={midsectionimage}
          alt="Trainer view"
        />
      </div>
    );
  } else {
    midSectionContent = (
      <div className="mid-section-content">
        <div className="mid-section-text">
          <h1 className="landing-page-mid-section-heading">
            🎉 All the best courses you need in one place! 🎉
          </h1>
          <p className="landing-page-mid-section-description">
            From interpersonal skills to technical topics, learning made easy
            and fun.
          </p>
        </div>
        <img
          className="landing-page-mid-section-image sm:w-48 lg:w-64"
          src={midsectionimage}
          alt="hi"
        />
      </div>
    );
  }

  return (
    <div className="webpage-layout">
      <div className="webpage-heading">
        <div>
          <div className="landing-page-mid-section">{midSectionContent}</div>

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
