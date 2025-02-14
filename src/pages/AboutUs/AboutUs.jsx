import React from "react";
import "./AboutUs.css"; // Create this CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Our Learning Platform</h1>
          <p>
            We believe that education should be accessible to everyone,
            everywhere. Our platform is designed to provide high-quality,
            engaging learning experiences that empower individuals to achieve
            their personal and professional goals.
          </p>
        </div>
        <div className="hero-image">
          <img
            src="/images/about-us-hero.jpg" // Replace with your image
            alt="People learning together"
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
              src="/images/team-member-1.jpg" // Replace with your image
              alt="Team Member 1"
            />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img
              src="/images/team-member-2.jpg" // Replace with your image
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
