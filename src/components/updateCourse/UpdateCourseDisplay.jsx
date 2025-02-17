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
  const [courseImageUrl, setCourseImageUrl] = useState(course?.imageUrl || ""); // Use optional chaining
  const [newImage, setNewImage] = useState(null);

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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setNewImage(URL.createObjectURL(selectedFile));
      setCourseImageUrl(URL.createObjectURL(selectedFile)); // Update immediately
    }
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
        updatedModule.description,
        updatedModule.duration,
        updatedModule.ModuleURL,
        updatedModule.content
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
      setError("Failed to update module. Please try again later.");
    }
  };

  const handleSubmitUpdates = () => {
    const updatedCourseInfo = {
      title: courseTitle,
      description: courseDescription,
      imageUrl: courseImageUrl,
    };

    const updatedModulesInfo = modules.map((module) => ({
      id: module._id,
      title: module.title,
      description: module.description,
      duration: module.duration,
      ModuleURL: module.ModuleURL,
      content: module.content,
    }));

    console.log("Final Updated Course Info:", updatedCourseInfo);
    console.log("Final Updated Modules Info:", updatedModulesInfo);
  };

  return (
    <div className="uc-page-container">
      <div className="uc-heading">
        <p>Update Course</p>
        <button className="submit-updates-button" onClick={handleSubmitUpdates}>
          Submit Updates
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {modules.length === 0 && <p>No modules available.</p>}

      <div className="sections-container">
        <section className="update-course-details-section">
          {/* <h2>Update Course Details</h2> */}
          <div className="course-details-form-group">
            <label htmlFor="courseTitle">Course Title:</label>
            <input
              type="text"
              value={courseTitle}
              onChange={handleCourseTitleChange}
              className="course-details-input"
            />
          </div>
          <div className="course-details-form-group">
            <label htmlFor="courseDescription">Course Description:</label>
            <textarea
              className="course-details-input"
              value={courseDescription}
              onChange={handleCourseDescriptionChange}
            />
          </div>
          <div className="course-details-form-group">
            <label htmlFor="courseImageUrl">Image:</label>
            {courseImageUrl && (
              <img
                src={courseImageUrl}
                alt="Course Preview"
                className="course-image-preview"
              />
            )}
          </div>
          <div className="course-details-form-group">
            <label htmlFor="newImage">Replace Image:</label>
            <input
              type="file"
              id="newImage"
              onChange={handleImageChange}
              className="course-details-input"
            />
          </div>
          <div>
            <button
              onClick={handleCourseDetailsSubmit}
              className="update-course-details-button"
            >
              Update Course Details
            </button>
          </div>
        </section>

        <section className="modules-in-course-section">
          <h2>Modules in Course</h2>
          <div className="modules-in-course-container">
            {modules.map((module) => (
              <div className="module-box" key={module._id}>
                <h3>
                  <strong> Module Name:</strong> {module.title}
                </h3>
                <button
                  className="update-module-details-button"
                  onClick={() => openModuleModal(module._id)}
                >
                  Update Module Details
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="update-module-section"></section>

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
    onSubmit({ title, description, duration, ModuleURL, content });
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("update-module-details-modal-overlay")) {
      onClose();
    }
  };

  return (
    <div
      className="update-module-details-modal-overlay"
      onClick={handleOverlayClick}
    >
      <div className="update-module-details-modal">
        <h2>Update Module Details</h2>
        <div className="form-group">
          <label>Module Name:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Module Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Module Duration:</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Module URL:</label>
          <input
            type="text"
            value={ModuleURL}
            onChange={(e) => setModuleURL(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Module Content:</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
