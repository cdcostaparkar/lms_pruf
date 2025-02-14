import React, { useState, useEffect } from "react";
import "./AddCourses.css";

// APIs
import { createCourse } from "@/api/courseApi";
import { createModule } from "@/api/moduleApi";
import { useAuth } from "@/context/AuthContext";
import convertMinutes from "@/lib/calcTime";

const AddCourses = () => {
  const { user } = useAuth();
  // const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modules, setModules] = useState([]);
  const [courseDetails, setCourseDetails] = useState({
    title: "AI",
    description: "Artificial Intelligence",
    duration: "", // Initialize duration to empty string
    image: null, 
  });
  const [moduleDetails, setModuleDetails] = useState({
    title: "",
    video_url: "",
    content: "",
    duration: "",
    durationUnit: "minutes", // Default unit
    description: "",
  });

  // useEffect to calculate total course duration whenever modules change
  useEffect(() => {
    const calculateTotalDuration = () => {
      let totalDurationInMinutes = 0;
      modules.forEach((module) => {
        let duration = parseInt(module.duration, 10);
        if (isNaN(duration) || duration < 1) {
          return; // Skip invalid durations
        }

        let durationInMinutes = duration;

        if (module.durationUnit === "hours") {
          durationInMinutes = duration * 60;
        } else if (module.durationUnit === "days") {
          durationInMinutes = duration * 60 * 24;
        } else if (module.durationUnit === "weeks") {
          durationInMinutes = duration * 60 * 24 * 7;
        }

        totalDurationInMinutes += durationInMinutes;
      });

      // Update course duration state
      setCourseDetails((prevDetails) => ({
        ...prevDetails,
        duration: convertMinutes(totalDurationInMinutes), // Use the function
      }));

      console.log("Total course duration in minutes:", totalDurationInMinutes);
    };

    calculateTotalDuration();
  }, [modules]);

  const handleModuleAdd = () => {
    if (
      !moduleDetails.title ||
      !moduleDetails.content ||
      !moduleDetails.duration ||
      !moduleDetails.description
    ) {
      alert("Please fill in all fields for the module.");
      return;
    }

    // Validate duration
    const duration = parseInt(moduleDetails.duration, 10);
    if (isNaN(duration) || duration < 1) {
      alert("Duration must be a number greater than 0.");
      return;
    }

    if (modules.length >= 3) {
      setShowModal(false);
      document.getElementById("module-alert").style.display = "block";
      setTimeout(() => {
        document.getElementById("module-alert").style.display = "none";
      }, 2000);
      return;
    }

    // Add module_order based on the current length of modules
    const newModule = {
      ...moduleDetails,
      duration: duration, // Store the original duration
      durationUnit: moduleDetails.durationUnit, // Store the unit
      module_order: modules.length, // This will be the order index
    };

    setModules([...modules, newModule]);
    setModuleDetails({
      title: "",
      video_url: "",
      content: "",
      duration: "",
      durationUnit: "minutes", // Reset to default
      description: "",
    });
    setShowModal(false);
  };

  const handleCourseDetailChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      image: file,
    }));

    // Log the file details to the console
    console.log("Uploaded image file:", file);

    // Optionally, you can read the file as a data URL to display a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("Image data URL:", reader.result); // Base64 encoded image
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const closeModalIfClickedOutside = (e) => {
    if (e.target.classList.contains("add-module-modal-overlay")) {
      setShowModal(false);
    }
  };

  const truncateContent = (content, maxLength = 50) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    }
    return content;
  };

  const openModuleModal = () => {
    if (modules.length >= 3) {
      setShowModal(false);
      document.getElementById("module-alert").style.display = "block";
      setTimeout(() => {
        document.getElementById("module-alert").style.display = "none";
      }, 2000);
      return;
    }
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      // module length check(dont allow if zero)
      if (modules.length === 0) {
        alert("Please add at least one module before submitting.");
        return;
      }

      console.log(courseDetails);
      // const createdCourse = await createCourse(user, courseDetails);
      // const courseId = createdCourse._id;

      console.log(modules);
      // for (const module of modules) {
      //   await createModule(courseId, module);
      // }

      alert("Course and modules created successfully!");
      // Reset the form or redirect as needed
    } catch (error) {
      console.error("Error submitting course and modules:", error);
      alert("Failed to create course and modules.");
    }
  };

  const handleDeleteModule = (indexToDelete) => {
    setModules((prevModules) =>
      prevModules.filter((_, index) => index !== indexToDelete)
    );
  };

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
        video_url: url, // Store the whole URL if it doesn't match the pattern
      });
    }
  };

  return (
    <div className="page-container">
      <div className="module-alert" id="module-alert">
        Can't add more than 3 modules
      </div>
      <div className="header-container">
        <div className="header-content">
          <h1 className="page-heading">Add New Course</h1>
          <div className="button-container">
            <button className="submit-course-button" onClick={handleSubmit}>
              Submit
            </button>
            <button className="add-module-button" onClick={openModuleModal}>
              Add Module
            </button>
          </div>
        </div>
      </div>
      <div className="complete-container">
        <h2 className="course-heading">Course Details</h2>
        <div className="form-modules-container">
          <section className="form-container">
            <div className="form-group">
              <label className="form-label">Course Title:</label>
              <input
                type="text"
                name="title"
                placeholder="Course Title"
                className="input-field"
                value={courseDetails.title}
                onChange={handleCourseDetailChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Small Description:</label>
              <input
                type="text"
                name="description"
                placeholder="Small Description"
                className="input-field"
                value={courseDetails.description}
                onChange={handleCourseDetailChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label"> Course Duration:</label>
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                className="input-field"
                value={courseDetails.duration}
                readOnly // Make it read-only to prevent manual input
              />
            </div>
            <div className="form-group">
              <label className="form-label">Upload Image:</label>
              <input
                type="file"
                name="image"
                className="input-field"
                onChange={handleImageUpload}
              />
            </div>
          </section>
          <section className="added-modules-container">
            {modules.length > 0 && (
              <>
                <h2 className="added-modules-heading">Added Modules</h2>
                <ul className="modules-list">
                  {modules.map((module, index) => (
                    <li key={index} className="module-item">
                      <div className="module-title">{module.title}</div>
                      <div className="module-duration">
                        Duration: {module.duration} {module.durationUnit}
                      </div>
                      <div className="module-description">
                        Description: {truncateContent(module.description)}
                      </div>
                      <div className="module-description">
                        {truncateContent(module.content)}
                      </div>
                      <button
                        className="delete-module-button"
                        onClick={() => handleDeleteModule(index)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>

        {showModal && (
          <div
            className="add-module-modal-overlay"
            onClick={closeModalIfClickedOutside}
          >
            <div className="add-module-modal-content ">
              <h2 className="add-module-modal-heading">Add Module</h2>
              <div className="add-module-form-group">
                <div>
                  <div className="add-module-input-group">
                    <div>
                      <label>Module Title:</label>
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
                      />
                    </div>
                    <div>
                      <label>Module Duration:</label>
                      <div className="duration-input-group">
                        <input
                          type="number"
                          placeholder="Module Duration"
                          value={moduleDetails.duration}
                          min="0" // Prevent negative numbers
                          onChange={(e) =>
                            setModuleDetails({
                              ...moduleDetails,
                              duration: e.target.value,
                            })
                          }
                        />
                        <select
                          value={moduleDetails.durationUnit}
                          onChange={(e) =>
                            setModuleDetails({
                              ...moduleDetails,
                              durationUnit: e.target.value,
                            })
                          }
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
              <div className="add-module-form-group">
                <label>Module URL:</label>
                <input
                  type="text"
                  placeholder="Module URL"
                  value={moduleDetails.video_url}
                  onChange={handleModuleURLChange}
                />
              </div>
              <div className="add-module-form-group">
                <label>Module Content:</label>
                <textarea
                  placeholder="Module Content"
                  value={moduleDetails.content}
                  onChange={(e) =>
                    setModuleDetails({
                      ...moduleDetails,
                      content: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="add-module-form-group">
                <label>Module Description:</label>
                <textarea
                  placeholder="Module Description"
                  value={moduleDetails.description}
                  onChange={(e) =>
                    setModuleDetails({
                      ...moduleDetails,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="add-module-form-actions">
                <button onClick={handleModuleAdd}>Add New Module</button>
                <button onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCourses;
