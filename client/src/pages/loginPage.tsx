import { useState } from "react";
import { Link } from "react-router-dom";
import GameClubLogo from "../images/GameClubLogo.png"; // Import your logo image

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userData = {
      username,
      password,
      rememberMeChecked: false, //CHANGE!!!
    };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      if (response.ok) {
        // Successfully logged in
        localStorage.setItem("active-user", username);
        console.log("Logged in:", responseData);
      } else {
        // Error handling if login failed
        console.error("Login failed:", responseData);
        alert(`Error signing in: ${responseData.message}, please try again.`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <img src={GameClubLogo} width={90} height={57} alt="Logo" />
      <h2>Login</h2>
      <div className="input-container">
        <label>Username:</label>
        <input
          id="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Password:</label>
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Remember me</label>
        <input className="checkbox-input" type="checkbox" />
      </div>
      <button type="submit" id="login-btn">
        LOGIN
      </button>
      <div id="other-option-container">
        <p>Or sign up instead:</p>
        <Link to="../signup">
          <button className="other-option-btn" id="redirect-to-signup-btn">
            SIGN UP
          </button>
        </Link>
      </div>
    </form>
  );
}
