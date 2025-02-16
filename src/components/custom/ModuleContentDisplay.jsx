import { useModule } from "@/context/ModuleProvider";
import React, { useEffect } from "react";
import updateModulePercentage from "@/api/moduleCompletionApi";
import convertMinutes from "@/lib/calcTime";

const ModuleContentDisplay = ({ modules }) => {
  const { selectedModule } = useModule();

  // Default to the first module if none is selected
  const defaultModule = modules.length > 0 ? modules[0].module_id.title : null;
  const currentModule = selectedModule || defaultModule;

  // Find the selected module based on the currentModule
  const selectedModuleContent = modules.find(
    (module) => module.module_id.title === currentModule,
  );

  // Hardcoded video ID for testing
  // const hardcodedVideoId = "vrQWhFysPKY"; 
  // const hardcodedVideoId = "oIIxlgcuQRU";

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
    <div className="flex flex-1 flex-col gap-8 p-6">
      {selectedModuleContent ? (
        <div className="rounded-xl bg-muted/50 p-6">
          <h2 className="scroll-m-20 pb-4 text-4xl font-semibold tracking-tight transition-colors first:mt-0">
            {selectedModuleContent.module_id.title}
          </h2>
          <p>
            <strong className="font-medium">Duration:</strong>{" "}
            {convertMinutes(selectedModuleContent.module_id.duration)}
          </p>
          <p className="text-muted-foreground text-lg mt-4 my-4">
            {selectedModuleContent.module_id.description}
          </p>
          {/* Conditionally render video if video_url is present */}
          {selectedModuleContent.module_id.video_url && (
            <div className="relative pt-[56.25%]">
              {/* 16:9 aspect ratio (9 / 16 = 0.5625) */}
              <iframe
                className="absolute top-0 left-0 w-5/6 h-full rounded-md"
                src={`https://www.youtube.com/embed/${selectedModuleContent.module_id.video_url}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}
          <div className="mt-10 space-y-4">
            <div className="mt-6">
              <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                Content Overview
              </h3>
              <p className="text-muted-foreground text-lg mt-4">
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
