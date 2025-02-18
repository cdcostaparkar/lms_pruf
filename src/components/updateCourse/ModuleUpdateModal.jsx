// ModuleUpdateModal.jsx

import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const ModuleUpdateModal = ({ isOpen, onClose, moduleId, modules, onSubmit }) => {
  const [moduleDetails, setModuleDetails] = useState({
    title: "",
    description: "",
    video_url: "",
    content: "",
    duration: "",
    durationUnit: "minutes",
  });

  const modalOverlayRef = useRef();

  useEffect(() => {
    if (moduleId && modules) {
      const module = modules.find((m) => m._id === moduleId);
      if (module) {
        setModuleDetails({
          title: module.title || "",
          description: module.description || "",
          video_url: module.video_url || "",
          content: module.content || "",
          duration: module.duration || "",
          durationUnit: module.durationUnit || "minutes",
        });
      }
    } else {
      // Reset the form when adding a new module
      setModuleDetails({
        title: "",
        description: "",
        video_url: "",
        content: "",
        duration: "",
        durationUnit: "minutes",
      });
    }
  }, [moduleId, modules]);

  const handleModuleURLChange = (e) => {
        const url = e.target.value;
        if (url.startsWith("https://youtu.be/")) {
            const videoId = url.substring("https://youtu.be/".length);
            setModuleDetails({
                ...moduleDetails,
                video_url: videoId,
            });
        } else {
            setModuleDetails({
                ...moduleDetails,
                video_url: url,
            });
        }
    };

  const handleModuleSubmit = () => {
    // Check if duration is empty before parsing
    const durationValue = moduleDetails.duration;

    if (durationValue === "") {
      toast.error("Duration cannot be empty");
      return;
    }

    onSubmit(moduleId, {
      ...moduleDetails,
      duration: parseInt(durationValue),
    });
  };

  const closeModalIfClickedOutside = (event) => {
    if (modalOverlayRef.current === event.target) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
      onClick={closeModalIfClickedOutside}
      ref={modalOverlayRef}
    >
      <div className="bg-white p-5 rounded-md w-4/5 max-w-[500px] max-h-[500px] shadow-md">
        <h2 className="font-bold mb-4 text-center text-lg">
          {moduleId ? "Update Module" : "Add New Module"}
        </h2>
        <div className="mb-2">
          <div>
            <div className="flex justify-between">
              <div className="w-[48%]">
                <label className="block mb-1 font-bold text-md">
                  Module Title:
                </label>
                <input
                  type="text"
                  placeholder="Module Name"
                  value={moduleDetails.title}
                  onChange={(e) =>
                    setModuleDetails({
                      ...moduleDetails,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md box-border text-md"
                />
              </div>
              <div className="w-[48%]">
                <label className="block mb-1 font-bold text-md">
                  Module Duration:
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    placeholder="Module Duration"
                    value={moduleDetails.duration}
                    min="0"
                    onChange={(e) =>
                      setModuleDetails({
                        ...moduleDetails,
                        duration: e.target.value,
                      })
                    }
                    className="w-[70px] p-2 border border-gray-300 rounded-md mr-1 text-md"
                  />
                  <select
                    value={moduleDetails.durationUnit}
                    onChange={(e) =>
                      setModuleDetails({
                        ...moduleDetails,
                        durationUnit: e.target.value,
                      })
                    }
                    className="p-2 border border-gray-300 rounded-md w-[120px] text-md"
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-bold text-md">
            Module Video: (Use Youtube URL)
          </label>
          <input
            type="text"
            placeholder="Module URL"
            value={moduleDetails.video_url}
            onChange={handleModuleURLChange}
            className="w-full p-2 border border-gray-300 rounded-md box-border text-md"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-bold text-md">Module Content:</label>
          <textarea
            placeholder="Module Content"
            value={moduleDetails.content}
            onChange={(e) =>
              setModuleDetails({
                ...moduleDetails,
                content: e.target.value,
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md box-border min-h-[60px] text-md"
          ></textarea>
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-bold text-md">
            Module Description:
          </label>
          <textarea
            placeholder="Module Description"
            value={moduleDetails.description}
            onChange={(e) =>
              setModuleDetails({
                ...moduleDetails,
                description: e.target.value,
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md box-border min-h-[60px] text-md"
          ></textarea>
        </div>

        <div className="text-right">
          <button
            onClick={handleModuleSubmit}
            className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-700 mr-2 text-md"
          >
            {moduleId ? "Update Module" : "Add Module"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 text-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleUpdateModal;