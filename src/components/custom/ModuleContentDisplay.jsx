import { useModule } from "@/context/ModuleProvider";
import React, { useEffect } from "react";
import updateModulePercentage from "@/api/moduleCompletionApi";

const ModuleContentDisplay = ({ modules }) => {
  console.log("md", modules);
  const { selectedModule } = useModule();

  // Default to the first module if none is selected
  const defaultModule = modules.length > 0 ? modules[0].module_id.title : null;
  const currentModule = selectedModule || defaultModule;

  // Find the selected module based on the currentModule
  const selectedModuleContent = modules.find(
    (module) => module.module_id.title === currentModule,
  );

  console.log("select", selectedModuleContent);
  // const hardcodedVideoId = "vrQWhFysPKY"; // Hardcoded video ID
  const hardcodedVideoId = "oIIxlgcuQRU";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedModuleContent) {
        const moduleId = selectedModuleContent.module_id._id;

        const shouldUpdatePercentage = modules.some((module, index) => {
          return (
            module.module_id._id === moduleId && module.percentage !== 1
          );
        });

        if (shouldUpdatePercentage) {
          const updatePercentage = async () => {
            try {
              const data = await updateModulePercentage(
                selectedModuleContent.enrollment_id,
                selectedModuleContent.module_id._id,
              );
              console.log("Module percentage updated:", data);
            } catch (error) {
              console.error("Failed to update module percentage:", error);
            }
          };

          updatePercentage();
        }
      }
    }, 10000); // 10000 milliseconds = 10 seconds

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [selectedModuleContent, modules]);

  
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {selectedModuleContent ? (
        <div className="aspect-video rounded-xl bg-muted/50 p-4">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            {selectedModuleContent.module_id.title}
          </h2>
          <p className="text-muted-foreground">
            {selectedModuleContent.module_id.description}
          </p>

          {/* Conditionally render video if video_url is present */}
          {selectedModuleContent.module_id.video_url && (
            <div className="aspect-w-16 aspect-h-9 mx-auto">
              <iframe
                src={`https://www.youtube.com/embed/${selectedModuleContent.module_id.video_url}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-md"
              />
            </div>
          )}

          <div className="mt-4 space-y-2">
            <p>
              <strong className="font-medium">Duration:</strong>{" "}
              {selectedModuleContent.module_id.duration} hour
              {selectedModuleContent.module_id.duration > 1 ? "s" : ""}
            </p>
            <div>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
                Content Overview
              </h3>
              <p className="text-muted-foreground">
                {selectedModuleContent.module_id.content}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground">No module selected or available.</p>
      )}
      {/* Blob */}
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
};

export default ModuleContentDisplay;
