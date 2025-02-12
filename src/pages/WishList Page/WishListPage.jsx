import React, { useState, useEffect } from "react";
import "./WishListPage.css";
import { useAuth } from "@/context/AuthContext";
import { handleEnroll } from "@/api/enrollApi";

const WishListPage = () => {
    //const { user } = useAuth();

    //const [enrollmentError, setEnrollmentError] = useState(null);

    // const [wishlist, setWishList] = useState()
          // Mock data for wishlist courses
    const mockWishlist = [
        {
          _id: "1",
          title: "Introduction to React",
          trainer_id: { name: "John Doe" },
          duration: "8 weeks",
          description:
            "Learn the basics of React and build your first web application.",
          isEnrolled: false,
        },
        {
          _id: "2",
          title: "Advanced JavaScript Concepts",
          trainer_id: { name: "Jane Smith" },
          duration: "6 weeks",
          description:
            "Dive deep into advanced JavaScript concepts and improve your coding skills.",
          isEnrolled: true,
        },
      ];

        
    const removeFromWishlist = (courseId) => {
        console.log("")
        // const updatedWishlist = wishlist.filter(course => course._id !== courseId);
        // setCart(updatedWishlist);
        // // localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    
    };

    const addToCart = (course) => {
        localStorage.setItem("cart", JSON.stringify(course));
    };

    // useEffect(() => {
    //     localStorage.setItem("wishlist", JSON.stringify(wishlist));
    // }, [wishlist]);

    return (
        <div className="wishlist-page">
            <div className="wishlist-header">
                <h1 className="wishlist-heading"> Courses in Wishlist ♡ </h1>
            </div>
            {mockWishlist.length > 0 ? (
                <div className="wishlist-courses-grid">
                    {mockWishlist.map((course, index) => (
                        <div key={index} className="wishlist-course-card">
                            {course.isEnrolled && (
                                <div className="already-enrolled"> Already Enrolled </div>
                            )}
                            <img 
                            src={`https://picsum.photos/200?random=${course._id}`} 
                            alt={course.title} 
                            className="wishlist -course-image" 
                            />

                            <div className="wishlist-course-content">
                                <h3 className="wishlist-course-title">
                                    <strong>{course.title}</strong>
                                </h3>
                                <p className="wishlist-course-instructor-duration">
                                <strong> Trainer: </strong> {course.trainer_id.name} | <strong> Duration: </strong> {course.duration} </p>
                                <p className="wishlist-course-description">
                                    {course.description}
                                </p>
                                <div className="buttons">
                                <button
                                    className="wishlist-remove-button"
                                    onClick={() => {removeFromWishlist(course._id); console.log(`Removing course with ID: ${course._id}`);}}
                                >
                                    Remove from Wishlist
                                </button>


                                {!course.isEnrolled && (                       
                                <button
                                    className="wishlist-add-to-cart-button"
                                    onClick={() => {addToCart(course); console.log(`Adding to cart: ${JSON.stringify(course, null,2)}`
                                    );
                                }}
                                >
                                    Add To Cart 
                                </button>
                                )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-cards"> No courses in wishlist. </p>
            )}
        </div>
    );
};

export default WishListPage;