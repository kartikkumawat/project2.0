import React, { useState } from "react";
import { database, dbRef, get } from "./firebase";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./css/home.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => setMenuOpen(!menuOpen);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const userId = email.replace(/[@.]/g, "_");
    const userRef = dbRef(database, `users/${userId}`);

    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (passwordMatch) {
          localStorage.setItem(
            "userId",
            JSON.stringify({ userId, timestamp: Date.now() })
          );
          alert("User  signed in successfully!");
          setEmail("");
          setPassword("");
          navigate("/dashboard");
        } else {
          setError("Incorrect password");
        }
      } else {
        setError("User  not found");
      }
    } catch (error) {
      setError("An error occurred while signing in");
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
              <a href="/signup">Sign Up</a>
            </li>
          </ul>
        </div>
      </nav>
      <section className="sign-in">
        <div className="signin-box">
          <h2>Sign In</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form className="auth-form" onSubmit={handleSignIn}>
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
            <button type="submit">Sign In</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignIn;
