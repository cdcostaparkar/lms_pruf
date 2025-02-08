import React, { useEffect, useState } from 'react';
import CourseCard from '@/components/custom/CourseCard';
import { getAllEnrolledCourses } from '@/api/getCoursesApi';
import { useAuth } from '@/context/AuthContext';
// export const getAllEnrolledCourses = async (userId) => {
//   const response = await fetch(`${ENROLL_API_URL}/getAllEnrolledCourses/${userId}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch enrolled courses.");
//   }

//   return await response.json();
// };

const CoursesProgress = () => {
    const { user } = useAuth();

    const [inProgressCourses, setInProgressCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const courses = await getAllEnrolledCourses(user);
                console.log("to be filtered", courses);
                const inProgress = courses.filter(course => course.progress < 100);
                const completed = courses.filter(course => course.progress === 100);

                setInProgressCourses(inProgress);
                setCompletedCourses(completed);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourses();
    }, [user]);

    return (
        <>
            <h1 className="text-3xl font-bold text-left my-4 pl-4">Courses In Progress</h1>
            <CourseCard courses={inProgressCourses} showProgress={true} />
            <br />
            <h1 className="text-3xl font-bold text-left my-4 pl-4">Courses Completed</h1>
            <CourseCard courses={completedCourses} showProgress={false} />
        </>
    );
};

export default CoursesProgress;
