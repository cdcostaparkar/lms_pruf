import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./HomePage.css";
import homepageLaptopGirl from "@/assets/LP_mid_section/homepageLaptopGirl.jpg";
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
      <div className="bg-purple-300 py-8 px-4 rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg relative overflow-hidden">
        <div className="md:flex items-center justify-between">
          <div className="md:w-2/3 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-3xl text-gray-800 font-bold mb-4">
              Welcome Trainer! Manage Your Courses Here. 🎉
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Create and update your courses to help learners achieve their goals.
            </p>
          </div>
          <img
            className="hidden md:block md:w-1/3 h-auto rounded-xl"
            src={homepageLaptopGirl}
            alt="Trainer view"
          />
        </div>
        <div className="md:hidden flex justify-center">
          <img
            className="w-2/3 h-auto rounded-xl mt-4"
            src={homepageLaptopGirl}
            alt="Trainer view"
          />
        </div>
      </div>
    );
  } else {
    midSectionContent = (
      <div className="bg-purple-300 py-8 px-4 rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg relative overflow-hidden">
        <div className="md:flex items-center justify-between">
          <div className="md:w-2/3 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-bold mb-4">
              🎉 All the best courses you need in one place! 🎉
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              From interpersonal skills to technical topics, learning made easy
              and fun.
            </p>
          </div>
          <img
            className="hidden md:block md:w-1/3 h-auto rounded-xl"
            src={homepageLaptopGirl}
            alt="Laptop Girl"
          />
        </div>
        <div className="md:hidden flex justify-center">
          <img
            className="w-2/3 h-auto rounded-xl mt-4"
            src={homepageLaptopGirl}
            alt="Laptop Girl"
          />
        </div>
      </div>
    );
  }


  return (
    <div className="webpage-layout">
      <div className="webpage-heading">
        <div>
          {midSectionContent}

          {/* Available Courses */}
          <AvailableCourses />


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
