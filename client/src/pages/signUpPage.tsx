import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameClubLogo from "../images/GameClubLogo.png";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userData = {
      username,
      password,
      email,
      rememberMeChecked: false, //CHANGE!!!
    };

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      if (response.ok) {
        // Successfully registered
        console.log("Registered:", responseData.message);
        navigate("/", { replace: true });
      } else {
        // Error handling if registration failed
        console.error("Registration failed:", responseData.message);
        alert(`Error signing up: ${responseData.message}, please try again.`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form id="signup-form" onSubmit={handleSubmit}>
      <img src={GameClubLogo} width={90} height={57} />
      <h2>Sign Up</h2>
      <div className="input-container">
        <label>Username:</label>
        <input
          id="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <div className="input-container">
        <label>Password:</label>
        <input
          id="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div className="input-container">
        <label>Email:</label>
        <input
          id="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className="input-container">
        <label>Remember me</label>
        <input type="checkbox"></input>
      </div>
      <button type="submit" id="signup-btn">
        SIGN UP
      </button>
      <div id="other-option-container">
        <p>Or log in instead:</p>
        <Link to="../login">
          <button className="other-option-btn" id="redirect-to-login-btn">
            LOGIN
          </button>
        </Link>
      </div>
    </form>
  );
}
