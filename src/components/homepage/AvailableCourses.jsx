import CourseDetails from "@/pages/CourseDetails/CourseDetails";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TrainerCourses from "./TrainerCourses";
import { useAuth } from "@/context/AuthContext";
import {
  getAllEnrolledCourses,
  getAllNotEnrolledCourses,
  getTrainerCourses,
  getNotTrainerCourses,
} from "@/api/getCoursesApi";
import CourseCard from "../custom/CourseCard";
import { Card, CardContent } from "@/components/ui/card";

import LPCourseDetails from "../landingpage/LPCourseDetails";

// Lucide
import { ShoppingCart, BookOpenText, HeartOff, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { addToWishlist, removeFromWishlist } from "@/api/wishlistAPI";

import toast from "react-hot-toast";

const AvailableCourses = () => {
  const { user, roleName } = useAuth();

  // State for student courses
  const [studentEnrolledCourses, setStudentEnrolledCourses] = useState([]);
  const [studentNotEnrolledCourses, setStudentNotEnrolledCourses] =
    useState([]);

  // State for trainer courses
  const [trainerCourses, setTrainerCourses] = useState([]);

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
          console.log("hi", enrolled, notEnrolled);
        } else if (roleName === "trainer") {
          // Fetch courses for trainer
          const trainerCourses = await getTrainerCourses(user);
          setTrainerCourses(trainerCourses);
          console.log("trainerCourses", trainerCourses);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user, roleName, enrollmentChange]);

  const toggleModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(!isModalOpen);
  };

  const toggleBookmark = async (isWishlisted, courseId) => {
    console.log(user, courseId);
    let updatedCourses = [...studentNotEnrolledCourses]; // Create a copy of the courses array
    const courseIndex = updatedCourses.findIndex(
      (course) => course._id === courseId,
    );

    if (isWishlisted) {
      const response = await removeFromWishlist(user, courseId);
      if (response.success) {
        updatedCourses[courseIndex].isWishlisted = false; // Update the wishlist status
        toast("Removed from Wishlist!", {
          icon: "💔",
        });
      }
    } else {
      const response = await addToWishlist(user, courseId);
      if (response.success) {
        updatedCourses[courseIndex].isWishlisted = true; // Update the wishlist status
        toast("Added to Wishlist!", {
          icon: "💓",
        });
      }
    }

    // Update the state with the modified courses array
    setStudentNotEnrolledCourses(updatedCourses); 
  };

  // Adding course to cart
  const handleAddCart = (newCourse) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!currentCart.some((course) => course._id === newCourse._id)) {
      const courseToAdd = studentNotEnrolledCourses.find(
        (course) => course._id === newCourse._id,
      );

      currentCart.push(courseToAdd);

      localStorage.setItem("cart", JSON.stringify(currentCart));
      toast("Course Added to Cart!", {
        icon: "🛒",
      });
      // console.log("Course added to cart:", courseToAdd);
    } else {
      toast("Course Already in Cart!", {
        icon: "😊",
      });
    }
  };

  return (
    <div>
      {roleName === "student" ? (
        <div>
          {studentEnrolledCourses.length > 0 ? (
            <>
              <h2 className="course-progress-heading"> Continue Learning </h2>
              <CourseCard
                courses={studentEnrolledCourses}
                setCourses={setStudentEnrolledCourses}
                showProgress={true}
              />
            </>
          ) : (
            <h2 className="flex flex-col items-center justify-center p-4 text-2xl font-bold text-purple-600">
              Enroll to View Your Courses
            </h2>
          )}

          {/* Available courses */}
          {/* <div className="available-courses-section"> */}
          {/* Add wishlisht and in a different component */}
          <h2 className="available-courses-heading">Available Courses</h2>
          {studentNotEnrolledCourses.length === 0 ? (
            <h2 className="flex flex-col items-center justify-center p-4 text-2xl font-bold text-purple-600">
                No more courses to enroll.
            </h2>
          ) : (
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
                      <div className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md">
                        {course.isWishlisted ? (
                          <HeartOff
                            className="text-gray-700 hover:text-gray-900 cursor-pointer"
                            onClick={() =>
                              toggleBookmark(course.isWishlisted, course._id)
                            }
                          />
                        ) : (
                          <Heart
                            className="text-gray-700 hover:text-gray-900 cursor-pointer"
                            onClick={() =>
                              toggleBookmark(course.isWishlisted, course._id)
                            }
                          />
                        )}
                      </div>
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
                        <Button
                          className="bg-gray-900 text-white py-2 px-4 rounded"
                          onClick={() => toggleModal(course)}
                        >
                          Details
                          <BookOpenText />
                        </Button>
                        <Button
                          className="bg-purple-600 text-white py-2 px-4 rounded"
                          onClick={() => handleAddCart(course)}
                        >
                          Add
                          <ShoppingCart />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
              {/* </div> */}

              {isModalOpen && (
                <LPCourseDetails
                  course={selectedCourse}
                  toggleModal={toggleModal}
                />
              )}
            </div>
          )}
        </div>
      ) : roleName === "trainer" ? (
        <div>
          {trainerCourses.length > 0 ? (
            <TrainerCourses
              availableCourses={trainerCourses}
              setAvailableCourses={setTrainerCourses}
            />
          ) : (
            <h2 className="flex flex-col items-center justify-center p-4 text-2xl font-bold text-purple-600">
                No courses created yet.
            </h2>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AvailableCourses;
