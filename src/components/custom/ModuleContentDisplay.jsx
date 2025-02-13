import { useModule } from "@/context/ModuleProvider";
import React from "react";

const ModuleContentDisplay = ({ modules }) => {
  const { selectedModule } = useModule();

  // Default to the first module if none is selected
  const defaultModule = modules.length > 0 ? modules[0].title : null;
  const currentModule = selectedModule || defaultModule;

  // Find the selected module based on the currentModule
  const selectedModuleContent = modules.find(
    (module) => module.title === currentModule,
  );

  const hardcodedVideoId = "vrQWhFysPKY"; // Hardcoded video ID

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {selectedModuleContent ? (
        <div className="aspect-video rounded-xl bg-muted/50 p-4">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            {selectedModuleContent.title}
          </h2>
          <p className="text-muted-foreground">{selectedModuleContent.description}</p>

          {/* Conditionally render video if video_url is present */}
          {selectedModuleContent.video_url && (
            <div className="aspect-w-16 aspect-h-9 mx-auto">
              <iframe
                src={`https://www.youtube.com/embed/${hardcodedVideoId}`}
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
              {selectedModuleContent.duration} hour
              {selectedModuleContent.duration > 1 ? "s" : ""}
            </p>
            <div>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
                Content Overview
              </h3>
              <p className="text-muted-foreground">{selectedModuleContent.content}</p>
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
