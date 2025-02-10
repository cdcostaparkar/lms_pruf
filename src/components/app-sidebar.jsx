import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import { useModule } from "@/context/ModuleProvider"

// // Store the modified courses in local storage
// localStorage.setItem('courses', JSON.stringify(coursesWithActiveFlag));

// // To retrieve it later
// const storedCourses = JSON.parse(localStorage.getItem('courses'));
// console.log(storedCourses);

const courseData = {
  courses: [
    {
      title: "Building Your Application",
      modules: [
        {
          title: "Data Fetching",
          isActive: false,
        },
        {
          title: "State",
          isActive: false,
        },
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  const { course, modules } = props;
  console.log("appsidebar-course", course)

  const modulesFlag = modules.map(module => ({
    ...module,
    isActive: false, // Set the default value for isActive
  }));

  // console.log("blah",course)
  // console.log("mods2", modulesFlag)
  const { selectedModule, setSelectedModule } = useModule();
  const handleModuleSelect = (module) => {
    console.log("sewlected module", module.title)
    setSelectedModule(module.title);
    modulesFlag.forEach(mod => {
      // console.log("foreach", mod)
      mod.isActive = false;
      // module.forEach(mod => {
      //   mod.isActive = false;
      // });
    });
    module.isActive = true; // Update the module's active state
    // Optionally, you can fetch the module data here
  };

  return (
    (<Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">
                    {course.enrollment?.course_id?.title || "Course Title"}
                  </span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {/* <h1>Hi</h1> */}
            {courseData.courses.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {course.enrollment.course_id.title}
                  </a>
                </SidebarMenuButton>
                {modulesFlag?.length ? (
                  <SidebarMenuSub>
                    {modulesFlag.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive} onClick={() => handleModuleSelect(item)}>
                          <a href={item.url}>
                            {item.title.length > 25
                              ? `${item.title.substring(0, 20)}...`
                              : item.title}
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>)
  );
}
