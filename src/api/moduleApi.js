const MODULES_API_URL = 'http://localhost:5000/api/modules';

export const getModules = async (courseId) => {
    try {
        const response = await fetch(`${MODULES_API_URL}/getModules/${courseId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching modules:', error);
        throw error;
    }
};

export const updateModule = async (
    moduleId,
    title,
    description,
    video_url,
    content,
    durationInMinutes
) => {
    try {
        console.log("midapi",moduleId);
        const response = await fetch(
            `${MODULES_API_URL}/updateModule/${moduleId}`, // Corrected URL
            {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    video_url,
                    content,
                    duration: durationInMinutes, // Corrected field name
                }),
            }
        );

        if (!response.ok) {
            // Improved error handling:  Include status code in error message
            const errorData = await response.json(); // Try to get error message from the server
            throw new Error(
                `HTTP error! Status: ${response.status}, Message: ${errorData?.error || "Unknown error"
                }`
            );
        }

        const updatedModule = await response.json();
        return updatedModule; // Return the updated module
    } catch (error) {
        console.error("Error updating module:", error);
        throw error; // Re-throw the error to be handled by the calling component
    }
};


export async function createModule(courseId, moduleData) {
    try {
        const response = await fetch(`${MODULES_API_URL}/createModule/${courseId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(moduleData),
        });


        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating module:', error);
        throw error;
    }
}

export async function deleteModuleById(moduleId) {
    try {
        const response = await fetch(`${MODULES_API_URL}/deleteModuleById/${moduleId}`, {
            method: "DELETE",
        },
        );

        if (!response.ok) {
            // Handle non-successful responses (e.g., 404, 500)
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting module:", error);
        throw error;
    }
}

