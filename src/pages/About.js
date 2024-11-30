import React from "react";
const About = () => {
  return (
    <section id="about">
      <div className="containers about">
        <div className="about-image">
          <img
            src="https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="About Us"
          />
        </div>
        <div className="about-text">
          <h2>About Us</h2>
          <p>
            We are a leading online platform helping educators and institutions
            create, customize, and distribute exam papers with ease.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
