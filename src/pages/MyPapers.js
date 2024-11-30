import React, { useState, useEffect } from "react";
import { database, dbRef, get } from "./firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileWord,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import "./css/myPapers.css";

function MyPapers() {
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("userId"));
        if (!storedUser || !storedUser.userId) {
          console.log("User not authenticated or userId is missing");
          return;
        }

        const { userId } = storedUser;
        const userPapersRef = dbRef(database, `papers/${userId}`);
        const snapshot = await get(userPapersRef);

        if (snapshot.exists()) {
          const fetchedPapers = Object.entries(snapshot.val()).map(
            ([key, value]) => ({ id: key, ...value })
          );
          fetchedPapers.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPapers(fetchedPapers);
        } else {
          setError("No papers found for this user.");
        }
      } catch (err) {
        console.error("Error fetching papers:", err);
        setError(
          "An error occurred while fetching papers. Please try again later."
        );
      }
    };

    fetchPapers();
  }, []);

  const inferFileType = (url) => {
    const extension = url.split(".").pop().toLowerCase();
    if (extension === "pdf") return "pdf";
    if (["docx", "doc"].includes(extension)) return "docx";
    return "unknown";
  };

  const validateFileFormat = (fileType) => {
    return ["pdf", "docx"].includes(fileType);
  };

  return (
    <div className="my-papers-container">
      <h2 className="my-papers-title">My Papers</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="my-papers-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>File Type</th>
            <th>Date Created</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {papers.length > 0 ? (
            papers.map((paper) => {
              if (!validateFileFormat(paper.fileType)) {
                return (
                  <tr key={paper.id}>
                    <td>{paper.title}</td>
                    <td>Unsupported file format</td>
                    <td>{new Date(paper.createdAt).toLocaleDateString()}</td>
                    <td>—</td>
                  </tr>
                );
              }

              return (
                <tr key={paper.id}>
                  <td>{paper.title}</td>
                  <td>
                    {paper.fileType === "pdf" ? (
                      <FontAwesomeIcon icon={faFilePdf} className="icon-pdf" />
                    ) : (
                      <FontAwesomeIcon
                        icon={faFileWord}
                        className="icon-docx"
                      />
                    )}
                  </td>
                  <td>{new Date(paper.createdAt).toLocaleDateString()}</td>
                  <td>
                    <a
                      href={paper.url}
                      download={paper.title}
                      className="download-icon"
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </a>
                  </td>
                </tr>
              );
            })
          ) : !error ? (
            <tr>
              <td colSpan="4">No papers uploaded yet.</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export default MyPapers;
