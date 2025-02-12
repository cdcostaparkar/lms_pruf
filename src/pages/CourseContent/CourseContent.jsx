import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModuleProvider } from "@/context/ModuleProvider"
import ModuleContentDisplay from "@/components/custom/ModuleContentDisplay"
import { useModule } from "@/context/ModuleProvider"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { getModules } from "@/api/moduleApi"

// Mock data for courses and modules
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
          title: "State Management",
          content: {
            heading: "Understanding State Management",
            paragraph: "This module focuses on managing state in applications...",
            video: "https://example.com/video2",
          },
        },
      ],
    },
  ],
}

const CourseContent = () => {
  // console.log("hi")
  const location = useLocation();
  const { course } = location.state || {};
  console.log("coursecontent",course)

  const {selectedModule, setSelectedModule} = useModule();

  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await getModules(course.enrollment.course_id._id);
        console.log(response)
        // Check if response is valid and has at least one module
        if (Array.isArray(response) && response.length > 0) {
          setSelectedModule(response[0].title);
          setModules(response);
        } else {
          console.warn("No modules found in the response.");
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    if (course) {
      fetchModules();
    }
  }, [course]);


  // console.log("selected",selectedModule)
  const breadcrumbTitle = selectedModule || (modules.length > 0 ? modules[0].title : null);
  // console.log("breadcrumbTitle:", breadcrumbTitle);
  // const breadcrumbTitle = modules.length > 0 ? modules[0].title : selectedModule;
  
  return (
    (
    <SidebarProvider>
      {modules.length > 0 && (
        <AppSidebar course={course} modules={modules}/>
      )}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* Breadcrumb to handle module no.(?) */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" onClick={(e) => e.preventDefault()}>
                    {course.enrollment.course_id.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{breadcrumbTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        
        {/* Content */}

        <ModuleContentDisplay modules={modules}/>
        {/* <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {selectedCourse &&
              selectedCourse.modules.map((module) => (
                <div
                  key={module.title}
                  className="aspect-video rounded-xl bg-muted/50 p-4"
                >
                  <h2 className="text-lg font-bold">{module.content.heading}</h2>
                  <p>{module.content.paragraph}</p>
                  <a href={module.content.video} target="_blank" rel="noopener noreferrer">
                    Watch Video
                  </a>
                </div>
              ))}
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div> */}
      </SidebarInset>
    </SidebarProvider>
    )
  );
}


export default function CoursePage() {
  return (
      <ModuleProvider>
          <CourseContent />
      </ModuleProvider>
  );
}