const COURSES_API_URL = "http://localhost:5000/api/courses";

export async function deleteCourse(courseId) {
    try {
        const response = await fetch(`${COURSES_API_URL}/deleteCourse/${courseId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
    }
}

// export async function createCourse(userId, courseData) {
//     try {
//         const response = await fetch(`${COURSES_API_URL}/createCourse/${userId}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(courseData),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to create course');
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error creating course:', error);
//         throw error;
//     }
// }

export async function createCourse(userId, formData) {
    try {
      const response = await fetch(`${COURSES_API_URL}/createCourse/${userId}`, {
        method: "POST",
        body: formData, // Don't set Content-Type, FormData handles it
      });
  
      if (!response.ok) {
        throw new Error("Failed to create course");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  }
  

// update Course

export async function updateCourse(userId, courseId, formData) {
  try {
    const response = await fetch(
      `${COURSES_API_URL}/updateCourse/${courseId}?userId=${userId}`,
      {
        method: "PATCH",
        body: formData, // Send FormData
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedCourse = await response.json();
    return updatedCourse;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
}