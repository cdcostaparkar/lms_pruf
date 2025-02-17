import React, { useState, useEffect, useRef } from "react";
import "./AddToCartPage.css";
import { useAuth } from "@/context/AuthContext";
import { handleEnrollv2T } from "@/api/enrollApi";
import toast from "react-hot-toast";
import convertMinutes from "@/lib/calcTime";

const AddToCartPage = () => {
  const { user } = useAuth();
  const [enrollmentError, setEnrollmentError] = useState(null);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // useRef to track if the toast has already been shown
  const toastShown = useRef(false);

  useEffect(() => {
    if (cart.length === 0 && !toastShown.current) {
      toast("Your cart is empty. Start adding courses!", {
        duration: 3000,
      });
      toastShown.current = true; // Mark the toast as shown
    }
  }, [cart]); // Add cart as a dependency

  const removeFromCart = (courseId) => {
    const updatedCart = cart.filter((course) => course._id !== courseId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Course removed from cart!");
  };

  const enrollAllCourses = async () => {
    if (cart.length === 0) {
      toast("Your cart is empty. Add courses!🤌", {
        icon: "😢",
      });
      return;
    }
    let allEnrolled = true;

    toast.promise(
      new Promise(async (resolve, reject) => {
        setEnrollmentError(null); // Clear any previous errors

        for (const course of cart) {
          try {
            await handleEnrollv2T(user, course._id);
          } catch (error) {
            console.error(
              `Error enrolling in ${course.title}:`,
              error.message || error,
            );
            setEnrollmentError(
              `Failed to enroll in one or more courses. Please try again.`,
            );
            allEnrolled = false;
            reject(error);
            break;
          }
        }

        if (allEnrolled) {
          setCart([]);
          localStorage.removeItem("cart");
          resolve();
        } else {
          reject(new Error("Failed to enroll in all courses."));
        }
      }),
      {
        loading: "Enrolling in courses...",
        success: <b>Enrolled in all courses successfully!</b>,
        error: (error) => (
          <b>
            Enrollment failed:{" "}
            {enrollmentError || "Could not enroll in all courses."}
          </b>
        ),
      },
    );
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="add-to-cart-page">
      <div className="cart-header">
        <h1 className="cart-heading">
          Courses in Cart 🛒 <span className="text-purple-500">({cart.length})</span>
        </h1>
        <button className="enroll-all-courses-button" onClick={enrollAllCourses}>
          Enroll all courses
        </button>
      </div>
      {cart.length > 0 ? (
        <div className="cart-courses-grid">
          {cart.map((course, index) => (
            <div key={index} className="cart-course-card">
              <img
                src={`data:image/jpeg;base64,${course.imageUrl}`}
                alt={course.title}
                className="wishlist w-64 -course-image"
              />
              <div className="cart-course-content">
                <h3 className="cart-course-title">
                  <strong>{course.title}</strong>
                </h3>
                <p className="cart-course-instructor-duration">
                  <strong> Trainer: </strong> {course.trainer_id.name} |
                  <strong> Duration: </strong> {convertMinutes(course.duration)}
                </p>
                <p className="cart-course-description">{course.description}</p>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(course._id)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-cards"> No courses in cart. </p>
      )}
    </div>
  );
};

export default AddToCartPage;
