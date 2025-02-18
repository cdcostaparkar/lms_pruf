import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
  } from "react";
  import { getCourse, updateCourse } from "../../api/courseApi";
  import {
    getModulesByCourseId,
    updateModule,
  } from "../../api/moduleApi";
  import { useAuth } from "../../context/AuthContext";
  import toast from "react-hot-toast";
  import { useParams } from "react-router-dom";
  
  const UpdateCoursePage = () => {
    const { user } = useAuth();
    const { courseId } = useParams();
  
    const [courseDetails, setCourseDetails] = useState({
      title: "",
      description: "",
      image: null,
    });
    const [modules, setModules] = useState([]);
    const [selectedModuleIndex, setSelectedModuleIndex] = useState(null);
    const [moduleDetails, setModuleDetails] = useState({
      title: "",
      video_url: "",
      content: "",
      description: "",
      duration: "",
      durationUnit: "minutes",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    // useRef for debouncing
    const debounceTimeout = useRef(null);
  
    const fetchCourseDetails = useCallback(
      async (courseId) => {
        setIsLoading(true);
        try {
          const course = await getCourse(courseId);
          if (course.error) {
            toast.error(course.error);
            return;
          }
          setCourseDetails({
            title: course.title,
            description: course.description,
            image: course.image,
          });
        } catch (error) {
          console.error("Error fetching course details:", error);
          toast.error("Failed to fetch course details.");
        } finally {
          setIsLoading(false);
        }
      },
      [getCourse]
    );
  
    const fetchModules = useCallback(
      async (courseId) => {
        setIsLoading(true);
        try {
          const modules = await getModulesByCourseId(courseId);
          setModules(modules);
        } catch (error) {
          console.error("Error fetching modules:", error);
          toast.error("Failed to fetch modules.");
        } finally {
          setIsLoading(false);
        }
      },
      [getModulesByCourseId]
    );
  
    useEffect(() => {
      if (courseId) {
        fetchCourseDetails(courseId);
        fetchModules(courseId);
      }
    }, [courseId, fetchCourseDetails, fetchModules]);
  
    const handleCourseDetailChange = (e) => {
      const { name, value } = e.target;
      setCourseDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    };
  
    const handleModuleDetailChange = (e) => {
      const { name, value } = e.target;
      setModuleDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    };
  
    const handleModuleURLChange = (e) => {
      const url = e.target.value;
      // More robust YouTube URL extraction using regex
      const youtubeRegex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/;
      const match = url.match(youtubeRegex);
      const videoId = match ? match[1] : url; // Use the whole URL if regex fails
  
      setModuleDetails((prevDetails) => ({
        ...prevDetails,
        video_url: videoId,
      }));
    };
  
    const handleUpdateModule = async () => {
      if (selectedModuleIndex === null) {
        toast.error("No module selected for update.");
        return;
      }
  
      setIsSubmitting(true);
      try {
        const duration = parseInt(moduleDetails.duration, 10);
        if (isNaN(duration) || duration < 1) {
          toast.error("Duration must be a number greater than 0.");
          return;
        }
  
        let durationInMinutes = duration;
  
        if (moduleDetails.durationUnit === "hours") {
          durationInMinutes = duration * 60;
        } else if (moduleDetails.durationUnit === "days") {
          durationInMinutes = duration * 60 * 24;
        } else if (moduleDetails.durationUnit === "weeks") {
          durationInMinutes = duration * 60 * 24 * 7;
        }
  
        const updatedModule = {
          ...moduleDetails,
          duration: durationInMinutes,
        };
  
        await updateModule(modules[selectedModuleIndex]._id, updatedModule);
        toast.success("Module updated successfully!");
        fetchModules(courseId); // Refresh modules
      } catch (error) {
        console.error("Error updating module:", error);
        toast.error("Failed to update module.");
      } finally {
        setIsSubmitting(false);
      }
    };
  
    const handleSubmit = () => {
      // Basic form validation
      if (!courseDetails.title || !courseDetails.description) {
        toast.error("Course title and description are required.");
        return;
      }
  
      if (selectedModuleIndex !== null) {
        if (
          !moduleDetails.title ||
          !moduleDetails.content ||
          !moduleDetails.description ||
          !moduleDetails.duration
        ) {
          toast.error("All module fields are required.");
          return;
        }
      }
  
      setIsSubmitting(true);
      handleUpdateModule();
      setIsSubmitting(false);
    };
  
    const handleSelectModule = (index) => {
      setSelectedModuleIndex(index);
      setModuleDetails(modules[index]);
    };
  
    return (
      <div className="page-container">
        <div className="header-container">
          <div className="header-content">
            <h1 className="page-heading">Update Course Details</h1>
            <div className="button-container">
              <button
                className="submit-course-button"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Update"}
              </button>
            </div>
          </div>
        </div>
  
        <div className="complete-container">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h2 className="course-heading">Course Information</h2>
              <div className="form-modules-container">
                <section className="form-container">
                  <div className="form-group">
                    <label className="form-label" htmlFor="courseTitle">
                      Course Title:
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="courseTitle"
                      className="input-field"
                      value={courseDetails.title}
                      onChange={handleCourseDetailChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="courseImage">
                      Course Image:
                    </label>
                    <input
                      type="text" // Assuming you're updating the image URL
                      name="image"
                      id="courseImage"
                      className="input-field"
                      value={courseDetails.image || ""}
                      onChange={handleCourseDetailChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="courseDescription">
                      Course Description:
                    </label>
                    <textarea
                      name="description"
                      id="courseDescription"
                      className="input-field"
                      value={courseDetails.description}
                      onChange={handleCourseDetailChange}
                    />
                  </div>
                </section>
  
                <section className="form-container">
                  <h2 className="course-heading">Update Module Details</h2>
                  {modules.length > 0 ? (
                    <>
                      <label className="form-label" htmlFor="moduleSelect">
                        Select Module:
                      </label>
                      <select
                        id="moduleSelect"
                        onChange={(e) =>
                          handleSelectModule(parseInt(e.target.value))
                        }
                        value={
                          selectedModuleIndex === null ? "" : selectedModuleIndex
                        }
                      >
                        <option value="" disabled>
                          Select a module
                        </option>
                        {modules.map((module, index) => (
                          <option key={index} value={index}>
                            {module.title}
                          </option>
                        ))}
                      </select>
                      {selectedModuleIndex !== null && (
                        <>
                          <div className="form-group">
                            <label className="form-label" htmlFor="moduleName">
                              Module Name:
                            </label>
                            <input
                              type="text"
                              name="title"
                              id="moduleName"
                              className="input-field"
                              value={moduleDetails.title}
                              onChange={handleModuleDetailChange}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label" htmlFor="moduleURL">
                              Module URL:
                            </label>
                            <input
                              type="text"
                              name="video_url"
                              id="moduleURL"
                              className="input-field"
                              value={moduleDetails.video_url || ""}
                              onChange={handleModuleURLChange}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label" htmlFor="moduleContent">
                              Module Content:
                            </label>
                            <textarea
                              name="content"
                              id="moduleContent"
                              className="input-field"
                              value={moduleDetails.content}
                              onChange={handleModuleDetailChange}
                            />
                          </div>
                          <div className="form-group">
                            <label
                              className="form-label"
                              htmlFor="moduleDescription"
                            >
                              Module Description:
                            </label>
                            <textarea
                              name="description"
                              id="moduleDescription"
                              className="input-field"
                              value={moduleDetails.description}
                              onChange={handleModuleDetailChange}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label" htmlFor="moduleDuration">
                              Module Duration:
                            </label>
                            <div className="duration-input-group">
                              <input
                                type="number"
                                placeholder="Module Duration"
                                value={moduleDetails.duration}
                                min="0"
                                name="duration"
                                id="moduleDuration"
                                onChange={handleModuleDetailChange}
                              />
                              <select
                                value={moduleDetails.durationUnit}
                                name="durationUnit"
                                onChange={handleModuleDetailChange}
                              >
                                <option value="minutes">Minutes</option>
                                <option value="hours">Hours</option>
                                <option value="days">Days</option>
                                <option value="weeks">Weeks</option>
                              </select>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <p>No modules available for this course.</p>
                  )}
                </section>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default UpdateCoursePage;
  