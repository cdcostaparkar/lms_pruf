import { useState } from "react";
import { GalleryVerticalEnd } from "lucide-react";

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
} from "@/components/ui/sidebar";

import { useModule } from "@/context/ModuleProvider";

export function AppSidebar({ ...props }) {
  const { course, modules } = props;
  
  // Initialize modulesFlag with isActive: false
  const [modulesFlag, setModulesFlag] = useState(() => {
    if (modules && modules.length > 0) {
      return modules.map((module, index) => ({
        ...module,
        isActive: index === 0, // Set first module to active
      }));
    }
    return []; // Return an empty array if modules is empty or undefined
  });

  const { selectedModule, setSelectedModule } = useModule();

  const handleModuleSelect = (selectedModule) => {
    setSelectedModule(selectedModule.module_id.title);

    setModulesFlag((prevModules) =>
      prevModules.map((module) =>
        module.module_id.title === selectedModule.module_id.title
          ? { ...module, isActive: true } // Set clicked module to active
          : { ...module, isActive: false } // Set other modules to inactive
      )
    );
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
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
            <SidebarMenuItem key={course.enrollment.course_id.title}>
              <SidebarMenuButton asChild>
                <a
                  href="#"
                  className="font-medium"
                  onClick={(e) => e.preventDefault()}
                >
                  {course.enrollment.course_id.title}
                </a>
              </SidebarMenuButton>
              {modulesFlag?.length ? (
                <SidebarMenuSub>
                  {modulesFlag.map((item) => (
                    <SidebarMenuSubItem key={item.module_id.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={item.isActive}
                        onClick={() => handleModuleSelect(item)}
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            // handleModuleSelect(item);
                          }}
                        >
                          {item.module_id.title.length > 25
                            ? `${item.module_id.title.substring(0, 20)}...`
                            : item.module_id.title}
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
