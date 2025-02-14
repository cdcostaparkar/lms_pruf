import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { BookOpenText } from "lucide-react";
import toast from "react-hot-toast";
import LPCourseDetails from "./LPCourseDetails";
import { useNavigate } from "react-router-dom";

import convertMinutes from "@/lib/calcTime";

const LPCourses = ({ courses }) => {
    const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(!isModalOpen);
    };

    const handleEnrollClick = () => {
        toast("Please log in to enroll!", {
            icon: "🔑",
        });
        navigate("/login");
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {courses.map((course, index) => (
                <div key={index} className="p-2">
                    <Card className="h-auto flex flex-col">
                        <div className="relative">
                            <img
                                src={`data:image/jpeg;base64,${course.imageUrl}`}
                                // src={`https://picsum.photos/200?random=${course._id}`}
                                alt={course.title}
                                className="w-full h-auto aspect-video object-cover rounded-md"
                            />
                        </div>

                        <CardContent className="flex flex-col justify-between p-6 space-y-4 flex-grow">
                            <div>
                                <h3 className="text-xl font-bold text-left mb-2">
                                    {course.title}
                                </h3>
                                <div className="flex justify-between text-sm text-dark-gray">
                                    <span>
                                        Course By:{" "}
                                        <span className="font-bold text-gray-700">
                                            {course.trainer_id.name}
                                        </span>
                                    </span>
                                    <span className="text-gray-500">
                                        Duration:{" "}
                                        <span className="font-bold text-gray-700">
                                            {convertMinutes(course.duration)} 
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-center space-x-4 mt-4">
                                <Button
                                    className="bg-gray-900 text-white py-2 px-4 rounded"
                                    onClick={() => toggleModal(course)}
                                >
                                    Details
                                    <BookOpenText />
                                </Button>
                                <Button
                                    className="bg-purple-600 text-white py-2 px-4 rounded"
                                    onClick={() => handleEnrollClick()}
                                >
                                    Enroll Now
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ))}

            {isModalOpen && (
                <LPCourseDetails
                    course={selectedCourse}
                    toggleModal={toggleModal}
                />
            )}
        </div>
    );
};

export default LPCourses;
