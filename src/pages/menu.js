import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./css/menu.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <a href="/">CreatePaper</a>
        </div>
        <div
          className="menu-toggle"
          id="mobile-menu"
          onClick={handleToggleMenu}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`} id="nav-links">
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="/signin">Sign In</a>
          </li>
          <li>
            <a href="/signup">Sign Up</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
