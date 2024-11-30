import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faDownload,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

const Features = () => {
  return (
    <section id="features" className="features">
      <div className="containers">
        <h2>Our Features</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <FontAwesomeIcon icon={faFileAlt} className="feature-icon" />
            <h3>Customizable Templates</h3>
            <p>
              Choose from a variety of templates for exams, quizzes, and more.
            </p>
          </div>
          <div className="feature-item">
            <FontAwesomeIcon icon={faDownload} className="feature-icon" />
            <h3>Download Formats</h3>
            <p>Download papers in PDF, DOCX, or Excel formats easily.</p>
          </div>
          <div className="feature-item">
            <FontAwesomeIcon icon={faEdit} className="feature-icon" />
            <h3>Edit Questions</h3>
            <p>
              Edit, delete, and rearrange questions with a smooth interface.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
