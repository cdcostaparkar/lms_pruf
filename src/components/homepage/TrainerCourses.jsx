import * as React from "react";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "@/api/courseApi";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const TrainerCourses = ({ availableCourses, setAvailableCourses }) => {
    const navigate = useNavigate();
    console.log("a", availableCourses);

    const handleDeleteCourse = async (courseId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course?"
        );
        if (confirmDelete) {
            try {
                await deleteCourse(courseId);
                setAvailableCourses((prevCourses) =>
                    prevCourses.filter((course) => course._id !== courseId)
                );
                console.log(`Course ID ${courseId} deleted successfully.`);
            } catch (error) {
                console.error(`Failed to delete course ID ${courseId}:`, error);
            }
        }
    };

    return (
        <div className="course-created-section">
            <h2 className="course-created-heading">Courses Created by You</h2>
            <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {availableCourses.map((course) => (
                        <CarouselItem
                            key={course._id}
                            className="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
                        >
                            <div className="p-2">
                                <Card className="h-auto flex flex-col">
                                    <img
                                        src={`https://picsum.photos/200?random=${course._id}`}
                                        alt={course.title}
                                        className="aspect-video object-cover rounded-md"
                                    />
                                    <CardContent className="flex flex-col justify-between p-6 space-y-4 flex-grow">
                                        <div>
                                            <h3 className="text-xl font-bold text-left mb-2">
                                                {course.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 text-left mb-2 max-w-full">
                                                {course.description.length > 60
                                                    ? `${course.description.substring(0, 60)}...`
                                                    : course.description}
                                            </p>
                                            <div className="flex justify-between text-sm text-dark-gray">
                                                <span>
                                                    Course By:{" "}
                                                    <span className="font-bold text-gray-700">
                                                        {course.name}
                                                    </span>
                                                </span>
                                                <span className="text-gray-500">
                                                    Duration:{" "}
                                                    <span className="font-bold text-gray-700">
                                                        {course.duration} hours
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-4 space-x-4">
                                            <button
                                                className="button update-button"
                                                onClick={() =>
                                                    navigate(`/courses/update/${course._id}`)
                                                }
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="button delete-button bg-red-500 text-white"
                                                onClick={() => handleDeleteCourse(course._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 z-10" />
                <CarouselNext className="absolute right-0 z-10" />
            </Carousel>
        </div>
    );
};

export default TrainerCourses;
