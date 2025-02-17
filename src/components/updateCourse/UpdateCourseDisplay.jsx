import React, { useState, useEffect } from "react";
import UpdateCourseModule from "./UpdateCourseModule";
import "./UpdateCourseDisplay.css";
import { useLocation, useParams } from "react-router-dom";
import { getModules, updateModule } from "@/api/moduleApi";

const UpdateCourseDisplay = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const course = location.state?.course;

  if (!course) {
    return <p>Error: Course data not found.</p>;
  }

  const [modules, setModules] = useState([]);
  const [error, setError] = useState(null);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const [courseTitle, setCourseTitle] = useState(course.title || "");
  const [courseDescription, setCourseDescription] = useState(
    course.description || ""
  );
  const [courseImageUrl, setCourseImageUrl] = useState(course.imageUrl || "");

  useEffect(() => {
    const fetchModules = async (courseId) => {
      try {
        const data = await getModules(courseId);
        setModules(data);
      } catch (error) {
        setError("Failed to fetch modules. Please try again later.");
      }
    };

    if (courseId) {
      fetchModules(courseId);
    }
  }, [courseId]);

  const handleCourseTitleChange = (e) => {
    setCourseTitle(e.target.value);
  };

  const handleCourseDescriptionChange = (e) => {
    setCourseDescription(e.target.value);
  };

  const handleCourseImageUrlChange = (e) => {
    setCourseImageUrl(e.target.value);
  };

  const handleCourseDetailsSubmit = () => {
    console.log("Updated Course Details:", {
      title: courseTitle,
      description: courseDescription,
      imageUrl: courseImageUrl,
    });
  };

  const openModuleModal = (moduleId) => {
    const module = modules.find((m) => m._id === moduleId);
    if (module) {
      setSelectedModule(module);
      setIsModuleModalOpen(true);
    } else {
      console.error("Module not found with ID:", moduleId);
    }
  };

  const closeModuleModal = () => {
    setIsModuleModalOpen(false);
    setSelectedModule(null);
  };

  const handleModuleDetailsSubmit = async (updatedModule) => {
    try {
      if (!selectedModule) {
        console.error("No module selected to update.");
        return;
      }

      await updateModule(
        selectedModule._id,
        updatedModule.title,
        updatedModule.description
      );

      setModules(
        modules.map((module) =>
          module._id === selectedModule._id
            ? { ...module, ...updatedModule }
            : module
        )
      );

      console.log("Updated Module Details:", updatedModule);
      closeModuleModal();
    } catch (error) {
      console.error("Error updating module:", error);
      setError("Failed to update module. Please try again.");
    }
  };

  return (
    <div className="uc-page-container">
      <div className="uc-heading">
        <p>Update Courses</p>
      </div>

      {error && <p className="error">{error}</p>}
      {modules.length === 0 && <p>No modules available.</p>}

      <section className="update-section">
        <h2>Update Course Details</h2>
        <div className="course-details-form-group">
          <label htmlFor="courseTitle">Course Title:</label>
          <input
            type="text"
            id="courseTitle"
            value={courseTitle}
            onChange={handleCourseTitleChange}
          />
        </div>
        <div className="course-details-form-group">
          <label htmlFor="courseDescription">Course Description:</label>
          <textarea
            id="courseDescription"
            value={courseDescription}
            onChange={handleCourseDescriptionChange}
          />
        </div>
        <div className="course-details-form-group">
          <label htmlFor="courseImageUrl">Image URL:</label>
          <input
            type="text"
            id="courseImageUrl"
            value={courseImageUrl}
            onChange={handleCourseImageUrlChange}
          />
        </div>
        <div>
          <button onClick={handleCourseDetailsSubmit} className="update-course-details-button">
            Update Course Details
          </button>
        </div>
      </section>

      <section className="update-module-section">
        {modules.length > 0 && (
          <button onClick={() => openModuleModal(modules[0]?._id)} 
          className="update-module-details-button">
            Update Module Details
          </button>
        )}
      </section>

      {/* <section className="update-course-container">
        <h2>Course Modules</h2>
        <div className="update-course-modules">
          {modules.map((module) => (
            <UpdateCourseModule
              key={module._id}
              module={module}
              onUpdate={openModuleModal}
            />
          ))}
        </div>
      </section> */}

      {isModuleModalOpen && selectedModule && (
        <ModuleDetailsModal
          isOpen={isModuleModalOpen}
          onClose={closeModuleModal}
          module={selectedModule}
          onSubmit={handleModuleDetailsSubmit}
        />
      )}
    </div>
  );
};

const ModuleDetailsModal = ({ isOpen, onClose, module, onSubmit }) => {
  const [title, setTitle] = useState(module.title || "");
  const [description, setDescription] = useState(module.description || "");
  const [duration, setDuration] = useState(module.duration || "");
  const [ModuleURL, setModuleURL] = useState(module.ModuleURL || "");
  const [content, setContent] = useState(module.content || ""); 
  const handleSubmit = () => {
    onSubmit({ title, description });
  };

  if (!isOpen) return null;

  return (
    <div className="module-modal-overlay">
      <div className="module-modal">
        <h2>Update Module Details</h2>
        <div className="form-group">
          <label htmlFor="moduleName">Module Name:</label>
          <input
            type="text"
            id="moduleName"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="moduleDescription">Module Description:</label>
          <textarea
            id="moduleDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="module-modal-buttons">
          <button onClick={handleSubmit}>Update Module</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourseDisplay;
