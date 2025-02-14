import React from "react";
import "./AboutUs.css"; // Create this CSS file for styling
 
const AboutUs = () => {
  return (
    <div className="about-us-container">
      <section className="hero-section">
        <div className="hero-content">
        <div className="hero-text">
          <h1>About Our Learning Platform</h1>
          <p>
            We believe that education should be accessible to everyone,
            everywhere. Our platform is designed to provide high-quality,
            engaging learning experiences that empower individuals to achieve
            their personal and professional goals.
          </p>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNxXGat6iZe3xgvllyyUBr0cG9cu9yXxpL_Q&s" // Replace with your image
            alt="People learning together"
            className="hero-image"
          />
        </div>
      </section>
 
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to democratize education by providing affordable,
          flexible, and effective learning solutions. We strive to create a
          community of lifelong learners who are passionate about knowledge and
          personal growth.
        </p>
      </section>
 
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <h3>Accessibility</h3>
            <p>
              We are committed to making education accessible to learners of all
              backgrounds and abilities.
            </p>
          </div>
          <div className="value-item">
            <h3>Quality</h3>
            <p>
              We are dedicated to providing high-quality content and learning
              experiences that meet the needs of our learners.
            </p>
          </div>
          <div className="value-item">
            <h3>Innovation</h3>
            <p>
              We embrace innovation and continuously seek new ways to improve
              our platform and learning methodologies.
            </p>
          </div>
          <div className="value-item">
            <h3>Community</h3>
            <p>
              We foster a supportive and collaborative learning community where
              learners can connect, share, and grow together.
            </p>
          </div>
        </div>
      </section>
 
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img
              src="data:image/jpeg;base64,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" // Replace with your image
              alt="Team Member 1"
            />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img
              src="data:image/jpeg;base64,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" // Replace with your image
              alt="Team Member 2"
            />
            <h3>Jane Smith</h3>
            <p>Head of Curriculum</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>
 
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>
          Have questions or feedback? We'd love to hear from you! Contact us
          at <a href="mailto:support@example.com">support@example.com</a>.
        </p>
      </section>
    </div>
  );
};
 
export default AboutUs;
 