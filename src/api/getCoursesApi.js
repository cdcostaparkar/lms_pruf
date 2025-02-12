// src/api/enrollApi.js

const ENROLL_API_URL = "http://localhost:5000/api/enroll";
const COURSE_API_URL = "http://localhost:5000/api/courses";

export const getAllCourses = async (userId) => {
  const response = await fetch(`${COURSE_API_URL}/getAllCourses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all courses.");
  }

  return await response.json();
};

export const getAllEnrolledCourses = async (userId) => {
  const response = await fetch(`${ENROLL_API_URL}/getAllEnrolledCourses/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch enrolled courses.");
  }

  return await response.json();
};


export const getAllNotEnrolledCourses = async (userId) => {
    const response = await fetch(`${ENROLL_API_URL}/getAllNotEnrolledCourses/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch not enrolled courses.");
    }
  
    return await response.json();
};

// const COURSES_API_URL = "http://localhost:5000/api/courses";

export const getTrainerCourses = async (userId) => {
    const response = await fetch(`${COURSES_API_URL}/getTrainerCourses/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch trainer courses.");
    }

    return await response.json();
};

export const getNotTrainerCourses = async (userId) => {
    const response = await fetch(`${COURSES_API_URL}/getNotTrainerCourses/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch not trainer courses.");
    }

    return await response.json();
};