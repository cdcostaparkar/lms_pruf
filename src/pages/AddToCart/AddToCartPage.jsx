import React, { useState, useEffect } from "react";
import "./AddToCartPage.css";
import { useAuth } from "@/context/AuthContext";
import { handleEnrollv2T } from "@/api/enrollApi";
import toast from "react-hot-toast";

const AddToCartPage = () => {
  const { user } = useAuth();

  const [enrollmentError, setEnrollmentError] = useState(null);

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const removeFromCart = (courseId) => {
    const updatedCart = cart.filter(course => course._id !== courseId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Course removed from cart!");
    // console.log("hi");
  };

  const enrollAllCourses = async () => {
    if (cart.length === 0) {
      toast("Your cart is empty. Add courses!🤌", {
        icon: '😢',
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
            // await enrollUserInCourse(userId, course._id);
            console.log(
              `Enrolled user ${user} in course ${course._id}: ${course.title}`,
            );
          } catch (error) {
            console.error(
              `Error enrolling in ${course.title}:`,
              error.message || error,
            );
            setEnrollmentError(
              `Failed to enroll in one or more courses. Please try again.`,
            );
            allEnrolled = false;
            reject(error); // Reject the promise on error
            break; // Stop enrolling if one fails
          }
        }

        if (allEnrolled) {
          setCart([]); // Clear the cart if all enrollments were successful
          localStorage.removeItem("cart"); // Remove cart from localStorage
          resolve(); // Resolve the promise on success
        } else {
          reject(new Error("Failed to enroll in all courses.")); // Reject if not all enrolled
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
        <h1 className="cart-heading"> Courses in Cart 🛒 </h1>
        <button className="enroll-all-courses-button" onClick={enrollAllCourses}> Enroll all courses </button>
      </div>
      {cart.length > 0 ? (
        <div className="cart-courses-grid">
          {cart.map((course, index) => (
            <div key={index} className="cart-course-card">
              {/* <img src={`https://picsum.photos/200?random=${course._id}`} alt={course.title} className="cart-course-image" /> */}
              <img
                src={`data:image/jpeg;base64,${course.imageUrl}`}
                alt={course.title}
                className="wishlist w-64 -course-image"
              />
              <div className="cart-course-content">
                <h3 className="cart-course-title"><strong>{course.title}</strong></h3>
                <p className="cart-course-instructor-duration"> <strong> Trainer: </strong> {course.trainer_id.name} |<strong> Duration: </strong> {course.duration} </p>
                <p className="cart-course-description">
                  {course.description}
                </p>
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