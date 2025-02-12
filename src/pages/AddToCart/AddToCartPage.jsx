import React, {useState, useEffect}from "react";
import "./AddToCartPage.css";

const AddToCartPage = () => {

    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });
    
    const removeFromCart = (courseId) => {
        const updatedCart = cart.filter(course => course._id !== courseId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        // console.log("hi");
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return(
        <div className="add-to-cart-page">
            <h1 className="cart-heading"> Courses in Cart 🛒 </h1>
            {cart.length > 0 ? (
                <div className="cart-courses-grid">
                    {cart.map((course,index) => (
                        <div key={index} className="cart-course-card">
                            <img src={`https://picsum.photos/200?random=${course._id}`} alt={course.title} className="cart-course-image" />
                            <div className="cart-course-content">
                            <h3 className="cart-course-title"><strong>{course.title}</strong></h3> 
                            <p className="cart-course-instructor-duration">{course.trainer_id.name} |<strong> Duration: </strong> {course.duration} </p>
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
            ):(
                <p className="no-cards"> No courses in cart. </p>
            )}
        </div>
    );
};

export default AddToCartPage;