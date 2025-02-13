const MODULE_COMPLETION_API_URL = 'http://localhost:5000/api/moduleCompletion';

export const getModuleCompletion = async (courseId, enrollmentId) => {
  try {
    const response = await fetch(
      `${MODULE_COMPLETION_API_URL}/getModuleCompletionRecords`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          enrollment_id: enrollmentId,
          course_id: courseId,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching module completions:', error);
    throw error;
  }
};


const updateModulePercentage = async (
  enrollment_id,
  module_id,
  percentage = 1,
) => {
  try {
    const response = await fetch(`${MODULE_COMPLETION_API_URL}/updateModulePercentage`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        enrollment_id,
        module_id,
        percentage,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to update module percentage",
      );
    }


    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating module percentage:", error);
    throw error;
  }
};

export default updateModulePercentage;
