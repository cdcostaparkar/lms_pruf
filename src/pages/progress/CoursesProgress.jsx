import { CourseCard, inProgressCourses, completedCourses } from '@/components/custom/CourseCard';


const CoursesProgress = () => {
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