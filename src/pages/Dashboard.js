import React, { useState, useEffect } from "react";
import UploadPaper from "./UploadPaper";
import MyPapers from "./MyPapers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import "./css/dashboard.css";

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userId"));
    if (storedUser) {
      const { timestamp } = storedUser;
      const now = new Date().getTime();
      if (now - timestamp > 48 * 60 * 60 * 1000) {
        localStorage.removeItem("userId");
        console.log("Session expired after 2 days");
      }
    }
  }, []);

  const handleToggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    console.log("User signed out");
  };

  const refreshPapers = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <a href="/">CreatePaper</a>
          </div>
          <div className="user-profile">
            <div className="dashboard-menu-toggle" onClick={handleToggleMenu}>
              <FontAwesomeIcon
                className="dashboard-toggle-icon"
                icon={faBars}
              />
            </div>
            {/* <FontAwesomeIcon icon={faUserCircle} /> */}
          </div>
        </div>
      </nav>

      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={handleToggleMenu} />

      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
        <button
          className="create-paper-button"
          onClick={() => (window.location.href = "/paper")}
        >
          Create Paper
        </button>
        <UploadPaper onUploadSuccess={refreshPapers} />
        <MyPapers key={refreshKey} />
      </div>
    </>
  );
}

export default Dashboard;
