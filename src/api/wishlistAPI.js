// wishlistAPI.js
const WISHLIST_API_URL = 'http://localhost:5000/api/wishlist'; // Adjust this URL based on your backend setup

// Add to Wishlist
export const addToWishlist = async (userId, courseId) => {
    const response = await fetch(`${WISHLIST_API_URL}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, courseId }),
    });
    return response.json();
};

// Remove from Wishlist
export const removeFromWishlist = async (userId, courseId) => {
    const response = await fetch(`${WISHLIST_API_URL}/remove`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, courseId }),
    });
    return response.json();
};
