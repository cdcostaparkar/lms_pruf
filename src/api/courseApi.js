const COURSE_API_URL = "http://localhost:5000/api/courses";

export async function deleteCourse(courseId) {
    try {
        const response = await fetch(`${COURSE_API_URL}/deleteCourse/${courseId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
    }
}

export async function createCourse(userId, courseData) {
    try {
        const response = await fetch(`${COURSE_API_URL}/createCourse/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData),
        });

        if (!response.ok) {
            throw new Error('Failed to create course');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
}