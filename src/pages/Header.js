import React from "react";
const Header = () => {
  return (
    <header className="landing" id="home">
      <div className="overlay"></div>
      <div className="header-content">
        <h1>Create Exam Papers with Ease</h1>
        <p>
          Generate and customize your exam papers within minutes using our
          modern, user-friendly tools.
        </p>
        <a href="/signin" className="cta-btn">
          Get Started
        </a>
      </div>
    </header>
  );
};

export default Header;
