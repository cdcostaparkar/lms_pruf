import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { ButtonWithIcon } from "./ButtonWithIcon";
import { Heart, HeartOff } from "lucide-react"; // Import both icons
import { addToWishlist, removeFromWishlist } from "@/api/wishlistAPI";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import convertMinutes from "@/lib/calcTime";

const CourseCard = ({ courses, setCourses, showProgress }) => {
  const { user } = useAuth();

  const toggleBookmark = async (isWishlisted, courseId) => {
    
    let updatedCourses = [...courses]; // Create a copy of the courses array
    const courseIndex = updatedCourses.findIndex(
      (course) => course.enrollment.course_id._id === courseId
    );

    if (isWishlisted) {
      const response = await removeFromWishlist(user, courseId);
      if (response.success) {
        updatedCourses[courseIndex].isWishlisted = false; // Update the wishlist status
        toast('Removed from Wishlist!', {
          icon: '💔',
        });
      }
    } else {
      const response = await addToWishlist(user, courseId);
      if (response.success) {
        updatedCourses[courseIndex].isWishlisted = true; // Update the wishlist status
        toast('Added to Wishlist!', {
          icon: '💓',
        });
      }
    }

    // Update the state with the modified courses array
    // Assuming you have a way to set the courses state, e.g., via props or context
    setCourses(updatedCourses); // Uncomment this if you have a setCourses function
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {courses.map((course) => (
          <CarouselItem
            key={course.enrollment.course_id._id}
            className="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
          >
            <div className="p-2">
              <Card className="h-[28rem] flex flex-col">
                <div className="relative"> 
                  <img
                    src={`data:image/jpeg;base64,${course.enrollment.course_id.imageUrl}`}
                    // src={`https://picsum.photos/200?random=${course.enrollment.course_id._id}`}
                    alt={course.enrollment.course_id.title}
                    className="w-full h-auto aspect-video object-cover rounded-md"
                  />
                  <div className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md">
                    {course.isWishlisted ? (
                      <HeartOff
                        className="text-gray-700 hover:text-gray-900 cursor-pointer"
                        onClick={() => toggleBookmark(course.isWishlisted, course.enrollment.course_id._id)}
                      />
                    ) : (
                      <Heart
                        className="text-gray-700 hover:text-gray-900 cursor-pointer"
                        onClick={() => toggleBookmark(course.isWishlisted, course.enrollment.course_id._id)}
                      />
                    )}
                  </div>
                </div>
                <CardContent className="flex flex-col justify-between p-6 space-y-4 flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-left mb-2">
                      {course.enrollment.course_id.title}
                    </h3>
                    <div className="flex justify-between text-sm text-dark-gray">
                      <span>
                        Course By:{" "}
                        <span className="font-bold text-gray-700 block">
                          {course.enrollment.course_id.trainer_id.name}
                        </span>
                      </span>
                      <span className="text-gray-500">
                        Duration:{" "}
                        <span className="font-bold text-gray-700 block">
                          {convertMinutes(course.enrollment.course_id.duration)}
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Completed Modules: {course.enrollment.completed_modules}
                    </p>
                  </div>
                  {showProgress && (
                    <div className="flex flex-col items-center mt-4">
                      <Progress value={course.completionStatus} className="w-[90%]" />
                      <span className="text-sm text-gray-500">{course.completionStatus}%</span>
                      
                    </div>
                  )}
                  <ButtonWithIcon course={course} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 z-10" />
      <CarouselNext className="absolute right-0 z-10" />
    </Carousel>
  );
};

export default CourseCard;
