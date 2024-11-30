import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCogs,
  faUpload,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";

const Services = () => {
  return (
    <section id="services" className="services">
      <div className="containers">
        <h2>Our Services</h2>
        <div className="service-grid">
          <div className="service-item">
            <FontAwesomeIcon icon={faCogs} className="service-icon" />{" "}
            {/* Using FontAwesomeIcon */}
            <h3>Paper Creation</h3>
            <p>Generate structured papers for various exam levels.</p>
          </div>
          <div className="service-item">
            <FontAwesomeIcon icon={faUpload} className="service-icon" />
            <h3>Import Questions</h3>
            <p>
              Import questions from CSV or create new ones with advanced
              formatting.
            </p>
          </div>
          <div className="service-item">
            <FontAwesomeIcon icon={faMobileAlt} className="service-icon" />
            <h3>Responsive Layouts</h3>
            <p>Your papers are optimized for printing in A4 and other sizes.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
