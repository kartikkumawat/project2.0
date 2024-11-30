import React, { useState } from "react";
import { storage, database, dbRef } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { set } from "firebase/database";
import "./css/uploadPaper.css";

function UploadPaper({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file || !title) {
      setError("Please provide both a file and title.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("userId"));
    if (!storedUser) {
      console.log("User not authenticated");
      setError("User not authenticated.");
      return;
    }
    const { userId } = storedUser;

    const fileType = file.name.split(".").pop().toLowerCase();
    const validFormats = ["pdf", "docx"];
    if (!validFormats.includes(fileType)) {
      setError("Unsupported file format. Please upload a PDF or DOCX file.");
      return;
    }

    const fileName = `${title}-${userId}`;
    const fileRef = ref(storage, `papers/${userId}/${fileName}`);

    setIsUploading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      // Save metadata including fileType
      await set(dbRef(database, `papers/${userId}/${fileName}`), {
        title,
        url,
        fileType, // Store file type
        createdAt: new Date().toISOString(),
      });

      setSuccessMessage("File uploaded successfully!");
      setFile(null);
      setTitle("");
      onUploadSuccess();
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-paper-container">
      {isUploading && <p className="upload-paper-message info">Uploading...</p>}
      {error && <p className="upload-paper-message error">{error}</p>}
      {successMessage && (
        <p className="upload-paper-message success">{successMessage}</p>
      )}
      <input
        className="upload-paper-input"
        type="text"
        placeholder="Paper title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="upload-paper-file-input"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        className="upload-paper-button"
        onClick={handleUpload}
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Upload Paper"}
      </button>
    </div>
  );
}

export default UploadPaper;
