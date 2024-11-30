import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBook,
  faClipboardList,
  faCog,
  faFile,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./css/sidebar.css";

function Sidebar({ sidebarOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <ul className="sidebar-menu">
        <li>
          <a href="/">
            <FontAwesomeIcon icon={faHome} /> Home
          </a>
        </li>
        {/* <li>
          <a href="/question-bank">
            <FontAwesomeIcon icon={faBook} /> Question Bank
          </a>
        </li>
        <li>
          <a href="/quiz">
            <FontAwesomeIcon icon={faClipboardList} /> Quiz
          </a>
        </li>
        <li>
          <a href="/settings">
            <FontAwesomeIcon icon={faCog} /> Settings
          </a>
        </li>
        <li>
          <a href="/papers">
            <FontAwesomeIcon icon={faFile} /> Papers
          </a>
        </li> */}
        <li className="logout">
          <a href="/" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
