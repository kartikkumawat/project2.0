import React, { useState, useEffect } from "react";
import "./css/paper.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun, BorderStyle } from "docx";
import { storage, uploadBytes, getDownloadURL, storageRef } from "./firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Paper() {
  const [schoolName, setSchoolName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [time, setTime] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newQuestionMarks, setNewQuestionMarks] = useState("");
  const [newOptions, setNewOptions] = useState([]);
  const [optionText, setOptionText] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [newInstruction, setNewInstruction] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editInstructionIndex, setEditInstructionIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Load questions and instructions from localStorage
    const savedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    setQuestions(savedQuestions);

    const savedInstructions =
      JSON.parse(localStorage.getItem("instructions")) || [];
    setInstructions(savedInstructions);
  }, []);

  useEffect(() => {
    // Save questions and instructions in localStorage
    localStorage.setItem("questions", JSON.stringify(questions));
    localStorage.setItem("instructions", JSON.stringify(instructions));
  }, [questions, instructions]);

  const addQuestion = () => {
    const question = {
      text: newQuestion,
      marks: newQuestionMarks,
      options: newOptions,
    };
    const updatedQuestions =
      editIndex !== null
        ? questions.map((q, index) => (index === editIndex ? question : q))
        : [...questions, question];

    setQuestions(updatedQuestions);
    resetForm();
  };

  const resetForm = () => {
    setNewQuestion("");
    setNewQuestionMarks("");
    setNewOptions([]);
    setOptionText("");
    setEditIndex(null);
  };

  const addOption = () => {
    setNewOptions([...newOptions, optionText]);
    setOptionText("");
  };

  const deleteOption = (index) => {
    setNewOptions(newOptions.filter((_, optIndex) => optIndex !== index));
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, qIndex) => qIndex !== index));
  };

  const editQuestion = (index) => {
    setEditIndex(index);
    setNewQuestion(questions[index].text);
    setNewQuestionMarks(questions[index].marks);
    setNewOptions(questions[index].options);
  };

  const addInstruction = () => {
    if (editInstructionIndex !== null) {
      const updatedInstructions = instructions.map((inst, index) =>
        index === editInstructionIndex ? newInstruction : inst
      );
      setInstructions(updatedInstructions);
      setEditInstructionIndex(null);
    } else {
      setInstructions([...instructions, newInstruction]);
    }
    setNewInstruction("");
  };

  const deleteInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const uploadToFirebase = async (fileBlob, fileName) => {
    // Get userId from localStorage
    const storedUser = JSON.parse(localStorage.getItem("userId"));
    if (!storedUser || !storedUser.userId) {
      console.log("User not authenticated or userId is missing");
      return;
    }

    const { userId } = storedUser;

    // Create a storage reference
    const fileRef = storageRef(storage, `papers/${userId}/${fileName}`);
    await uploadBytes(fileRef, fileBlob);
    const downloadURL = await getDownloadURL(fileRef);
    console.log("File available at: ", downloadURL);
  };

  const generateFileName = () => {
    const now = new Date();
    const dateTimeString = now
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");
    return `${subject}_${schoolName}_${dateTimeString}`;
  };

  const handleDownloadPDF = () => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((btn) => (btn.style.display = "none"));

    const input = document.getElementById("question-paper");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      const pdfBlob = pdf.output("blob");
      const fileName = generateFileName() + ".pdf";
      pdf.save(fileName);
      uploadToFirebase(pdfBlob, fileName);

      buttons.forEach((btn) => (btn.style.display = "inline-block"));
    });
  };

  const handleDownloadDOCX = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: schoolName,
              alignment: "center",
              bold: true,
              size: 32,
            }),
            new Paragraph({ text: `Marks: ${marks}`, alignment: "center" }),
            new Paragraph({ text: `Time: ${time}`, alignment: "center" }),
            new Paragraph({
              border: { bottom: { style: BorderStyle.SINGLE, size: 2 } },
            }),
            ...instructions.map((inst) => new Paragraph({ text: inst })),
            ...questions.map(
              (q, index) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${index + 1}. ${q.text} (${q.marks} marks)`,
                    }),
                    ...q.options.map(
                      (opt, optIndex) =>
                        new TextRun({
                          text: `\t${String.fromCharCode(
                            97 + optIndex
                          )}. ${opt}`,
                        })
                    ),
                  ],
                })
            ),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      const fileName = generateFileName() + ".docx";
      saveAs(blob, fileName);
      uploadToFirebase(blob, fileName);
    });
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <a href="/">Create Paper</a>
          </div>
          <div
            className="menu-toggle"
            id="mobile-menu"
            onClick={handleToggleMenu}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <h1>Question Paper Generator</h1>
        <div className="input-group">
          <label>School Name:</label>
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder="Enter school name"
          />
        </div>
        <div className="input-group">
          <label>Total Marks:</label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="Enter total marks"
          />
        </div>
        <div className="input-group">
          <label>Time:</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time allowed"
          />
        </div>
        <div className="input-group">
          <label>Instructions:</label>
          <input
            type="text"
            value={newInstruction}
            onChange={(e) => setNewInstruction(e.target.value)}
            placeholder="Enter an instruction"
          />
          <button className="paperBtn" onClick={addInstruction}>
            {editInstructionIndex !== null
              ? "Update Instruction"
              : "Add Instruction"}
          </button>
          <ul>
            {instructions.map((inst, index) => (
              <li key={index}>
                {inst}
                <button
                  className="paperBtn"
                  onClick={() => editInstruction(index)}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>
                <button
                  className="paperBtn"
                  onClick={() => deleteInstruction(index)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="input-group">
          <label>Question:</label>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter a question"
          />
        </div>
        <div className="input-group">
          <label>Marks:</label>
          <input
            type="number"
            value={newQuestionMarks}
            onChange={(e) => setNewQuestionMarks(e.target.value)}
            placeholder="Enter marks for this question"
          />
        </div>
        <div className="input-group">
          <label>Options:</label>
          <input
            type="text"
            value={optionText}
            onChange={(e) => setOptionText(e.target.value)}
            placeholder="Enter an option"
          />
          <button className="paperBtn" onClick={addOption}>
            Add Option
          </button>
          <ul>
            {newOptions.map((option, index) => (
              <li key={index}>
                {String.fromCharCode(97 + index)}. {option}
                <button
                  className="paperBtn"
                  onClick={() => deleteOption(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button className="paperBtn" onClick={addQuestion}>
          {editIndex !== null ? "Update Question" : "Add Question"}
        </button>
        <ol className="questions-list">
          {questions.map((q, index) => (
            <li key={index} className="question-item">
              <div className="question">
                <p className="question-text">
                  {index + 1}. {q.text}
                </p>
                <p>({q.marks} marks)</p>
              </div>
              <ol className="options-list">
                {q.options.map((opt, optIndex) => (
                  <li key={optIndex}>{opt}</li>
                ))}
              </ol>
              <button className="paperBtn" onClick={() => editQuestion(index)}>
                Edit
              </button>
              <button
                className="paperBtn"
                onClick={() => deleteQuestion(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ol>
        <div className="question-paper-preview" id="question-paper">
          <h2 style={{ textAlign: "center" }}>{schoolName}</h2>
          <p style={{ textAlign: "center" }}>Marks: {marks}</p>
          <p style={{ textAlign: "center" }}>Time: {time}</p>
          <hr />
          {instructions.length > 0 && (
            <>
              <ul className="lower-alpha">
                {instructions.map((inst, index) => (
                  <li key={index}>{inst}</li>
                ))}
              </ul>
              <hr />
            </>
          )}
          <ol className="questions-list">
            {questions.map((q, index) => (
              <li key={index} className="question-item">
                <div className="question">
                  <p className="question-text">
                    {index + 1}. {q.text}
                  </p>
                  <p>({q.marks} marks)</p>
                </div>
                <ol className="options-list">
                  {q.options.map((opt, optIndex) => (
                    <li key={optIndex}>
                      {String.fromCharCode(97 + optIndex)}. {opt}
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </div>
        <div className="marks-time">
          <button className="paperBtn" onClick={handleDownloadPDF}>
            Download PDF
          </button>
          <button className="paperBtn" onClick={handleDownloadDOCX}>
            Download DOCX
          </button>
        </div>
      </div>
    </>
  );
}

export default Paper;
