// src/api/userApi.js

const USER_API_URL = "http://localhost:5000/api/users";

export const getUserByEmail = async (email) => {
  try {
    const response = await fetch(`${USER_API_URL}/getUserByEmail?email=${email}`);

    if (!response.ok) {
      // Handle HTTP errors (e.g., 404, 500)
      if (response.status === 404) {
        return null; // User not found 
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};


export const resetPassword = async (email, newPassword) => {
  try {
    const response = await fetch(`${USER_API_URL}/resetPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, newPassword }),
    });

    // if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.error || 'Failed to reset password.');
    // }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to reset password.');
  }
};

export const createUser = async (formData) => {
  const response = await fetch(`${USER_API_URL}/createUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    // console.log(response);
    throw new Error("Signup failed. Please check your details.");
  }

  return await response.json();
};

export const authenticateUser = async (username, password) => {
  const response = await fetch(`${USER_API_URL}/authUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed. Please check your credentials.");
  }

  return await response.json();
};


// User Details
// userApi.js
export const fetchUserDetails = async (userId) => {
  try {
    const response = await fetch(
      `${USER_API_URL}/getUserDetails/${userId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
