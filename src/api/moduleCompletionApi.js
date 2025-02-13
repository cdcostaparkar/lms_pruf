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
