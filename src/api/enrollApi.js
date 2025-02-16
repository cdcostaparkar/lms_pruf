const ENROLL_API_URL = 'http://localhost:5000/api/enroll';

export const handleEnroll = async (userId, courseId) => {
    try {
        const response = await fetch(`${ENROLL_API_URL}/enrollCourse/${userId}/${courseId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Enrollment failed:", error);
        // Handle error (e.g., show a notification)
    }
};

export const handleEnrollv2T = async (userId, courseId) => {
    try {
        const response = await fetch(`${ENROLL_API_URL}/enrollCoursev2T/${userId}/${courseId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Enrollment failed:", error);
        // Handle error (e.g., show a notification)
    }
};
