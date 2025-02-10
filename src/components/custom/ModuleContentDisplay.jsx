import { useModule } from "@/context/ModuleProvider";
import React from "react";

const ModuleContentDisplay = ({ modules }) => {
  const { selectedModule } = useModule();
  console.log(modules);
  console.log("sM", selectedModule);

  // Default to the first module if none is selected
  const defaultModule = modules.length > 0 ? modules[0].title : null;
  const currentModule = selectedModule || defaultModule;

  // Find the selected module based on the currentModule
  const selectedModuleContent = modules.find(
    (module) => module.title === currentModule
  );
  console.log("sMC",selectedModuleContent)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {selectedModuleContent ? (
        <div className="aspect-video rounded-xl bg-muted/50 p-4">
          <h2 className="text-lg font-bold">
            {selectedModuleContent.title}
          </h2>
          <p>{selectedModuleContent.description}</p>
          <p>
            <strong>Duration:</strong> {selectedModuleContent.duration} hour
            {selectedModuleContent.duration > 1 ? "s" : ""}
          </p>
          <h3 className="text-lg font-semibold">
            Content Overview
          </h3>
          <p>{selectedModuleContent.content}</p>
          {selectedModuleContent.video_url && (
            <a
              href={selectedModuleContent.video_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Video
            </a>
          )}
        </div>
      ) : (
        <p>No module selected or available.</p>
      )}
      {/* Blob */}
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
};

export default ModuleContentDisplay;
