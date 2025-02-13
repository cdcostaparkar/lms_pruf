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
// import { getModules } from "@/api/moduleApi"
import { getModuleCompletion } from "@/api/moduleCompletionApi"

const CourseContent = () => {
  // console.log("hi")
  const location = useLocation();
  const { course } = location.state || {};

  const {selectedModule, setSelectedModule} = useModule();

  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await getModuleCompletion(
          course.enrollment.course_id._id,
          course.enrollment._id
        );
        console.log("mdoule completion", response)
        // Check if response is valid and has at least one module
        if (Array.isArray(response) && response.length > 0) {
          setSelectedModule(response[0].module_id.title);
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

  // console.log("m w c",modules);
  // console.log("e and c",course);
  // console.log("s",selectedModule);


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