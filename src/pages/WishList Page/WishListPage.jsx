import React, { useState, useEffect, useRef } from "react";
import "./WishListPage.css";
import { useAuth } from "@/context/AuthContext";
import { getAllWishlistedCourses, removeFromWishlist } from "@/api/wishlistAPI";
import toast from "react-hot-toast";
import convertMinutes from "@/lib/calcTime";
import { Link } from "react-router-dom";

const WishListPage = () => {
    const { user } = useAuth();
    const [wishlistedCourses, setWishlistedCourses] = useState([]);
    const hasFetched = useRef(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Load cart from localStorage on component mount
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        const fetchWishlistedCourses = async () => {
            try {
                const courses = await getAllWishlistedCourses(user);
                setWishlistedCourses(courses);

                if (courses.length === 0 && !hasFetched.current) {
                    toast("Your wishlist is empty. Start adding courses!", {
                        // icon: "💔",
                        duration: 4000,
                    });
                    hasFetched.current = true;
                }
            } catch (err) {
                toast.error("Failed to retrieve courses");
            }
        };

        if (user) {
            fetchWishlistedCourses();
        }
    }, [user]);

    const removeWishlist = async (courseId) => {
        try {
            await removeFromWishlist(user, courseId);
            toast("Removed from Wishlist!", {
                icon: "💔",
            });

            // Update the wishlist courses after successful removal
            const updatedWishlist = wishlistedCourses.filter(
                (course) => course._id !== courseId
            );
            setWishlistedCourses(updatedWishlist);
        } catch (err) {
            toast.error("Couldn't remove from wishlist");
        }
    };

    // Adding course to cart
    const handleAddCart = (newCourse) => {
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

        if (!currentCart.some((course) => course._id === newCourse._id)) {
            const courseToAdd = wishlistedCourses.find(
                (course) => course._id === newCourse._id
            );

            currentCart.push(courseToAdd);

            localStorage.setItem("cart", JSON.stringify(currentCart));
            setCart(currentCart); // Update the cart state
            toast("Course Added to Cart!", {
                icon: "🛒",
            });
        } else {
            toast("Course Already in Cart!", {
                icon: "😊",
            });
        }
    };

    const isInCart = (courseId) => {
        return cart.some((course) => course._id === courseId);
    };

    return (
        <div className="wishlist-page">
            <div className="wishlist-header">
                <h1 className="wishlist-heading">
                    Courses in Wishlist ♡❤️♡{" "}
                    <span className="text-purple-500">
                        ({wishlistedCourses.length})
                    </span>
                </h1>
            </div>
            {wishlistedCourses.length > 0 ? (
                <div className="wishlist-courses-grid">
                    {wishlistedCourses.map((course, index) => (
                        <div key={index} className="wishlist-course-card">
                            {course.isEnrolled && (
                                <div className="already-enrolled"> Already Enrolled </div>
                            )}
                            <img
                                src={course.imageUrl}
                                // src={`https://picsum.photos/200?random=${course._id}`}
                                alt={course.title}
                                className="wishlist w-64 -course-image"
                            />

                            <div className="wishlist-course-content">
                                <h3 className="wishlist-course-title">
                                    <strong>{course.title}</strong>
                                </h3>
                                <p className="wishlist-course-instructor-duration">
                                    <strong> Trainer: </strong> {course.trainer_id.name} |{" "}
                                    <strong> Duration: </strong> {convertMinutes(course.duration)}{" "}
                                </p>
                                <p className="wishlist-course-description">
                                    {course.description}
                                </p>
                                <div className="buttons">
                                    <button
                                        className="wishlist-remove-button"
                                        onClick={() => {
                                            removeWishlist(course._id);
                                        }}
                                    >
                                        Remove from Wishlist
                                    </button>

                                    {!course.isEnrolled &&
                                        (isInCart(course._id) ? (
                                            <Link to="/cart">
                                                <button className="wishlist-add-to-cart-button">
                                                    Go to Cart 🛒
                                                </button>
                                            </Link>
                                        ) : (
                                            <button
                                                className="wishlist-add-to-cart-button"
                                                onClick={() => {
                                                    handleAddCart(course);
                                                }}
                                            >
                                                Add To Cart
                                            </button>
                                        ))}
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
