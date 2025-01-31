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

// This is sample.
// const data = {
//   navMain: [
//     {
//       title: "Getting Started",
//       url: "#",
//       items: [
//         {
//           title: "Installation",
//           url: "#",
//         },
//         {
//           title: "Project Structure",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Community",
//       url: "#",
//       items: [
//         {
//           title: "Contribution Guide",
//           url: "#",
//         },
//       ],
//     },
//   ],
// }


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
  const { selectedModule, setSelectedModule } = useModule();
  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    courseData.courses.forEach(course => {
      course.modules.forEach(mod => {
        mod.isActive = false;
      });
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
                  <span className="font-semibold">Documentation</span>
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
            {courseData.courses.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.modules?.length ? (
                  <SidebarMenuSub>
                    {item.modules.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive} onClick={() => handleModuleSelect(item)}>
                          <a href={item.url}>{item.title}</a>
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
