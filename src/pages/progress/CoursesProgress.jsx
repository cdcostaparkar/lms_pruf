import React, { useEffect, useState } from 'react';
import CourseCard from '@/components/custom/CourseCard';
import { getAllEnrolledCourses } from '@/api/getCoursesApi';
import { useAuth } from '@/context/AuthContext';

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
        <div className="p-6"> {/* Added padding here */}
            <h1 className="text-4xl font-bold text-left my-4 pl-4">My Learning</h1>
            <div className="mb-4">
                <h2 className="bg-gray-200 bg-opacity-60 rounded-full p-4 text-left text-l font-bold inline-block ml-4 opacity-75">
                    In Progress
                </h2>
                <CourseCard courses={inProgressCourses} showProgress={true} />
            </div>
            <div className="mb-4">
                <h2 className="bg-gray-200 bg-opacity-70 rounded-full p-4 text-left text-l font-bold inline-block ml-4 opacity-75">
                    Completed
                </h2>
                <CourseCard courses={completedCourses} showProgress={false} />
            </div>
        </div>
    );
};

export default CoursesProgress;
