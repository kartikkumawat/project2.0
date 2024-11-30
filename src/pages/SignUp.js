import React, { useState } from "react";
import { database, dbRef, set, get } from "./firebase";
import bcrypt from "bcryptjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./css/home.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => setMenuOpen(!menuOpen);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userId = email.replace(/[@.]/g, "_");
    const userRef = dbRef(database, `users/${userId}`);

    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        alert("User already exists!");
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await set(userRef, { name, email, password: hashedPassword });
      alert("User signed up successfully!");
      localStorage.setItem("userId", userId);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <a href="/">Create Paper</a>
          </div>
          <div className="menu-toggle" onClick={handleToggleMenu}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/signin">Sign In</a>
            </li>
          </ul>
        </div>
      </nav>
      <section className="sign-up">
        <div className="signup-box">
          <h2>Sign Up</h2>
          <form className="auth-form" onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
