import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { BookOpenText } from "lucide-react";
import toast from "react-hot-toast";
import LPCourseDetails from "./LPCourseDetails";
import { useNavigate } from "react-router-dom";

import convertMinutes from "@/lib/calcTime";

const LPCourses = ({ courses, search }) => {
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

    // Function to highlight the search term in the course title
    const highlightText = (text, search) => {
        if (!search) {
            return text;
        }

        const regex = new RegExp(`(${search})`, "gi");
        const parts = text.split(regex);

        return (
            <>
                {parts.map((part, index) =>
                    regex.test(part) ? (
                        <mark key={index} className="bg-pink-300">
                            {part}
                        </mark>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="flex items-center bg-gray-100 rounded-md py-2 px-4 mb-8">
                <svg
                    className="-ml-1 mr-1.5 h-6 w-6 text-purple-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.06 0l4.123-5.75a.75.75 0 00-.882-1.214z"
                        clipRule="evenodd"
                    />
                </svg>
                <h3 className="text-lg font-semibold text-gray-800">
                    Explore {courses.length}+ Courses
                </h3>
            </div>

            {filteredCourses.length === 0 ? (
                <div className="text-center text-gray-500 text-2xl py-8">
                    <span role="img" aria-label="sad face">
                        😞
                    </span>{" "}
                    No courses found.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredCourses.map((course, index) => (
                        <div key={index} className="p-2">
                            <Card className="h-96 flex flex-col">
                                <div className="relative">
                                    <img
                                        src={course.imageUrl}
                                        alt={course.title}
                                        className="w-full h-auto aspect-video object-cover rounded-md"
                                    />
                                </div>

                                <CardContent className="flex flex-col justify-between p-6 space-y-4 flex-grow">
                                    <div>
                                        <h3 className="text-xl font-bold text-left mb-2">
                                            {highlightText(course.title, search)}
                                        </h3>
                                        <div className="flex justify-between text-sm text-dark-gray">
                                            <span>
                                                Course By:
                                                <span className="font-bold text-gray-700 block">
                                                    {course.trainer_id.name}
                                                </span>
                                            </span>
                                            <span className="text-gray-500 ">
                                                Duration:
                                                <span className="font-bold text-gray-700 block">
                                                    {convertMinutes(course.duration)}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-center space-x-4 mt-4">
                                        <Button
                                            className="bg-gray-900 text-white py-2 px-4 rounded text-sm md:text-base"
                                            onClick={() => toggleModal(course)}
                                        >
                                            {/* <Button
                                                className="bg-gray-900 text-white py-2 px-4 rounded text-sm md:text-base sm:py-1 sm:px-2 sm:text-xs"
                                                onClick={() => toggleModal(course)}
                                            > */}
                                            Details
                                            <BookOpenText />
                                        </Button>
                                        <Button
                                            className="bg-purple-600 text-white py-2 px-4 rounded text-sm md:text-base"
                                            onClick={() => handleEnrollClick()}
                                        >
                                            Enroll Now
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            )}

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
