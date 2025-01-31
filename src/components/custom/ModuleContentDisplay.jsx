import { useModule } from '@/context/ModuleProvider';
import React from 'react';

const courseData = {
  courses: [
    {
      title: "Building Your Application",
      modules: [
        {
          title: "Data Fetching",
          content: {
            heading: "Data Fetching Overview",
            paragraph: "In this module, we will cover how to fetch data...",
            video: "https://example.com/video1",
          },
        },
        {
          title: "State",
          content: {
            heading: "Understanding State Management",
            paragraph: "This module focuses on managing state in applications...",
            video: "https://example.com/video2",
          },
        },
      ],
    },
  ],
};

const ModuleContentDisplay = () => {
    const { selectedModule } = useModule();
    const defaultModule = courseData.courses[0].modules[0].title; // Default to first module
    const currentModule = selectedModule?.title || defaultModule;

    const selectedCourse = courseData.courses.find(course =>
        course.modules.find(module => module.title === currentModule)
    );

    let selectedModule1 = null;
    if (selectedCourse) {
        selectedModule1 = selectedCourse.modules.find(module => 
            module.title === currentModule
        );
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            {selectedModule1 ? (
                <div className="aspect-video rounded-xl bg-muted/50 p-4">
                    <h2 className="text-lg font-bold">{selectedModule1.content.heading}</h2>
                    <p>{selectedModule1.content.paragraph}</p>
                    <a href={selectedModule1.content.video} target="_blank" rel="noopener noreferrer">
                        Watch Video
                    </a>
                </div>
            ) : (
                <p>No module selected.</p>
            )}
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
    );
};

export default ModuleContentDisplay;
