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
          <CarouselItem
            key={course.enrollment.course_id._id}
            className="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
          >
            <div className="p-2">
              <Card className="h-auto flex flex-col">
                <img
                  src={`https://picsum.photos/200?random=${course.enrollment.course_id._id}`}
                  alt={course.enrollment.course_id.title}
                  className="aspect-video object-cover rounded-md"
                />
                <CardContent className="flex flex-col justify-between p-6 space-y-4 flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-left mb-2">
                      {course.enrollment.course_id.title}
                    </h3>
                    {/* <p className="text-sm text-gray-600 text-left mb-2 max-w-full">
                      {course.enrollment.course_id.description.length > 60
                        ? `${course.enrollment.course_id.description.substring(0, 60)}...`
                        : course.enrollment.course_id.description}
                    </p> */}
                    <div className="flex justify-between text-sm text-dark-gray">
                      <span>
                        Course By:{" "}
                        <span className="font-bold text-gray-700">
                          {course.enrollment.course_id.trainer_id.name}
                        </span>
                      </span>
                      <span className="text-gray-500">
                        Duration:{" "}
                        <span className="font-bold text-gray-700">
                          {course.enrollment.course_id.duration} hours
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Completed Modules: {course.enrollment.completed_modules}
                    </p>
                  </div>
                  {showProgress && (
                    <div className="flex flex-col items-center mt-4">
                      <Progress value={course.progress} className="w-[90%]" />
                      <span className="text-sm text-gray-500">{course.progress}%</span>
                      <ButtonWithIcon course={course} />
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
