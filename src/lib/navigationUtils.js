import { useNavigate } from "react-router-dom";

export const handleResumeClick = (course) => {
  const navigate = useNavigate(); 

  return () => {
    navigate(`/courses/${course.enrollment.course_id._id}`, {
      state: { course }, // Pass the course data as state
    });
  };
};
