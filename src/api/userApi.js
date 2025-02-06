// src/api/userApi.js

const USER_API_URL = "http://localhost:5000/api/users";

export const createUser = async (formData) => {
  const response = await fetch(`${USER_API_URL}/createUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
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
        `http://localhost:5000/api/users/getUserDetails/${userId}`
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
  