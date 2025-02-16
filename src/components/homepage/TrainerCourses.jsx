import * as React from "react";
import { deleteCourse } from "@/api/courseApi";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import convertMinutes from "@/lib/calcTime";

const TrainerCourses = ({ availableCourses, setAvailableCourses }) => {

    const handleDeleteCourse = async (courseTitle, courseId) => {
        toast(
            (t) => (
                <div>
                    <span>Delete {courseTitle}?</span>
                    <div style={{ marginTop: "8px" }}>
                        {" "}
                        {/* Add margin for spacing */}
                        <button
                            onClick={async () => {
                                try {
                                    await deleteCourse(courseId);
                                    setAvailableCourses((prevCourses) =>
                                        prevCourses.filter((course) => course._id !== courseId)
                                    );
                                    toast.success("Course deleted.");
                                } catch (error) {
                                    console.error(
                                        `Failed to delete course ID ${courseId}:`,
                                        error
                                    );
                                    toast.error("Failed to delete. Try again.", { id: t.id });
                                }
                            }}
                            style={{
                                backgroundColor: "red",
                                color: "white",
                                marginRight: "8px", // Add some spacing to the right
                            }}
                        >
                            Delete
                        </button>
                        <button onClick={() => toast.dismiss(t.id)}>Cancel</button>
                    </div>
                </div>
            ),
            {
                duration: 10000,
                id: "confirm-delete",
            }
        );
    };

    return (
        <div className="course-created-section">
            <h2 className="course-created-heading">
                Courses Created by You (
                <span className="text-purple-500">
                    {availableCourses.length}
                </span>
                )
            </h2>
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
                                        src={`data:image/jpeg;base64,${course.imageUrl}`}
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
                                                {/* <span>
                                                    Course By:{" "}
                                                    <span className="font-bold text-gray-700">
                                                        {course.name}
                                                    </span>
                                                </span> */}
                                                <span className="text-gray-500">
                                                    Duration:{" "}
                                                    <span className="font-bold text-gray-700">
                                                        {convertMinutes(course.duration)}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-4 space-x-4">
                                            <Button
                                                className="bg-red-500 text-white"
                                                onClick={() =>
                                                    handleDeleteCourse(course.title, course._id)
                                                }
                                            >
                                                Delete
                                            </Button>
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
