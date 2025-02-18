import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./LandingPage.css";
import LPCourseDetails from "@/components/landingpage/LPCourseDetails";
import { getAllCourses } from "@/api/getCoursesApi";
import { useNavigate } from "react-router-dom";
import homepageLaptopGirl from "@/assets/LP_mid_section/homepageLaptopGirl.jpg";
import midsectionimage from "../../assets/LP_mid_section/mid_image.jpg";
import followusimage from "../../assets/LP_end_section/follow_us.jpg";
import LPCourses from "@/components/landingpage/LPCourses";
import toast from "react-hot-toast";

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

  const [loading, setLoading] = useState(false); // Track loading state
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const fetchCourses = async () => {
        if (loading) return; // Prevent multiple fetches
        setLoading(true);
        toast.promise(
          getAllCourses(),
          {
            loading: "Fetching courses...",
            success: <b>Courses loaded!</b>,
            error: <b>Could not load courses.</b>,
          },
          {
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
          }
        )
          .then((courses) => {
            setCourses(courses);
          })
          .catch((error) => {
            console.error("Error fetching courses:", error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      };

      fetchCourses();
    }
  }, []);

  return (
    <div className="landing-page-layout">
      <div className="landing-page-heading">
        {/* <h2>Easy Learning</h2> */}
        <div className="landing-page-body">
          <div className="bg-purple-300 py-8 px-4 rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg relative overflow-hidden">
            <div className="md:flex items-center justify-between">
              <div className="md:w-2/3 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl lg:text-3xl text-gray-800 font-bold mb-4">
                  🎉 All the best courses you need in one place! 🎉
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  From interpersonal skills to technical topics, learning made
                  easy and fun.
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
          {/* All Available Courses */}
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight my-10">
            🔥 Top Courses Just For You! 🔥
          </h2>
          <input
            type="text"
            placeholder=" 🔍 Search for courses...."
            className="w-[60%] px-3 py-2 mb-8 bg-white text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 bg-transparent border border-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <LPCourses courses={courses} search={search} />
        </div>
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="rounded-lg bg-white p-8 shadow-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
                    Join Our Community!
                  </h1>
                  <p className="mt-4 text-gray-600">
                    Stay updated with the latest courses, exclusive content,
                    and learning tips.
                  </p>
                  <p className="mt-2 text-gray-600">
                    Follow us on social media!
                  </p>
                </div>
                <img
                  className="mx-auto w-full rounded-lg shadow-md md:max-w-md"
                  src={followusimage}
                  alt="Follow us"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
