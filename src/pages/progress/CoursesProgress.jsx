import React, { useEffect, useState, useRef } from 'react';
import CourseCard from '@/components/custom/CourseCard';
import { getAllEnrolledCourses } from '@/api/getCoursesApi';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const CoursesProgress = () => {
  const { user } = useAuth();

  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);

  const toastId = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (!toastId.current) {
          toastId.current = toast.loading('Loading courses...');
        }

        const courses = await getAllEnrolledCourses(user);
        
        const inProgress = courses.filter(
          (course) => course.completionStatus < 100,
        );
        const completed = courses.filter(
          (course) => course.completionStatus === 100,
        );

        setInProgressCourses(inProgress);
        setCompletedCourses(completed);

        toast.success('Courses loaded!', { id: toastId.current });
      } catch (error) {
        console.error(error);
        toast.error('Failed to load courses.', { id: toastId.current });
      } finally {
        if (toastId.current) {
          toast.dismiss(toastId.current);
          toastId.current = null;
        }
      }
    };

    fetchCourses();

    return () => {
      if (toastId.current) {
        toast.dismiss(toastId.current);
        toastId.current = null;
      }
    };
  }, [user]);

  const totalCourses = inProgressCourses.length + completedCourses.length;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-left my-4 pl-4">My Learning</h1>
        <div className="mr-4">
          <p className="text-2xl font-semibold">
            Total courses:
            <span className="text-purple-500 ml-1">{totalCourses}</span>
          </p>
        </div>
      </div>
      {(inProgressCourses.length > 0 || completedCourses.length > 0) ? (
        <>
          {inProgressCourses.length > 0 && (
            <div className="mb-4">
              <h2 className="bg-gray-200 bg-opacity-60 rounded-full p-4 text-left text-l font-bold inline-block ml-4 opacity-75">
                In Progress
              </h2>
              <CourseCard
                courses={inProgressCourses}
                setCourses={setInProgressCourses}
                showProgress={true}
              />
            </div>
          )}
          {completedCourses.length > 0 && (
            <div className="mb-4">
              <h2 className="bg-gray-200 bg-opacity-70 rounded-full p-4 text-left text-l font-bold inline-block ml-4 opacity-75">
                Completed
              </h2>
              <CourseCard
                courses={completedCourses}
                setCourses={setCompletedCourses}
                showProgress={false}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-lg text-gray-500">
          You have not enrolled in any courses yet.
        </div>
      )}
    </div>
  );
};

export default CoursesProgress;
