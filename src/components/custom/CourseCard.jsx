import * as React from "react";
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

// const inProgressCourses = [
//   { id: 1, name: "Data Structures and Algorithms", description: "Learn the fundamentals of data structures and algorithms.", progress: 70 },
//   { id: 2, name: "Web Development Bootcamp", description: "Build responsive websites using HTML, CSS, and JavaScript.", progress: 50 },
//   { id: 3, name: "Machine Learning Basics", description: "Introduction to machine learning concepts and techniques.", progress: 30 },
//   { id: 4, name: "Database Management Systems", description: "Understand the principles of database design and management.", progress: 90 },
//   { id: 5, name: "Operating Systems", description: "Explore the fundamentals of operating systems and their architecture.", progress: 20 },
// ];

// const completedCourses = [
//   { id: 1, name: "Introduction to Programming", description: "Learn the basics of programming using Python." },
//   { id: 2, name: "Computer Networks", description: "Understand the principles of computer networking." },
//   { id: 3, name: "Software Engineering", description: "Explore software development methodologies and practices." },
//   { id: 4, name: "Cybersecurity Fundamentals", description: "Learn about the basics of cybersecurity and best practices." },
//   { id: 5, name: "Cloud Computing", description: "Introduction to cloud computing and its services." },
// ];

const CourseCard = ({ courses, showProgress }) => {
  console.log("progress courses", courses);
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {courses.map((course) => (
          <CarouselItem key={course.enrollment.course_id._id} className="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4">
            <div className="p-2">
              <Card className="h-auto flex flex-col">
                <img
                  src={`https://picsum.photos/200?random=${course.enrollment.course_id._id}`}
                  alt={course.enrollment.course_id.title}
                  // width={400}
                  // height={225}
                  className="aspect-video object-cover rounded-md"
                />
                <CardContent className="flex flex-col justify-between p-6 space-y-4 flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold text-center mb-2">{course.enrollment.course_id.title}</h3>
                    <p className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                      {course.enrollment.course_id.description.length > 60 ? `${course.enrollment.course_id.description.substring(0, 60)}...` : course.description}
                    </p>
                  </div>
                  {showProgress && (
                    <div className="flex flex-col items-center mt-4"> 
                      <Progress value={course.progress} className="w-[80%]"/>
                      <span className="text-sm text-gray-500">{course.progress}%</span>
                      <ButtonWithIcon/>
                    </div>
                  )}
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
