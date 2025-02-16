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

export const updateModule = async (moduleId, title, description) => {
    try {
        const response = await fetch(`${MODULES_API_URL}/updateModule/${moduleId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const updatedModule = await response.json();
        
    } catch (error) {
        console.error("Error updating module:", error);
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
