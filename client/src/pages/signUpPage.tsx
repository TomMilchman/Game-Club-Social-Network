import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameClubLogo from "../images/GameClubLogo.png";
import { makeRequest } from "../API";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userData = {
      username,
      password,
      email,
      rememberMeChecked,
    };

    try {
      const { ok, data } = await makeRequest("/signup", "POST", userData);

      if (ok) {
        // Successfully registered
        console.log("Registered:", data.message);
        navigate("/", { replace: true });
      } else {
        // Error handling if registration failed
        console.error("Registration failed:", data.message);
        alert(`Error signing up: ${data.message}, please try again.`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error signing up: ${error}, please try again later.`);
    }
  };

  return (
    <div className="form-container">
      <img src={GameClubLogo} alt="Game Club Logo" />
      <form id="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="input-container">
          <label htmlFor="username-input">Username: </label>
          <input
            id="username-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password-input">Password: </label>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="email-input">Email: </label>
          <input
            id="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Remember me </label>
          <input
            className="remember-me-input"
            type="checkbox"
            checked={rememberMeChecked}
            onChange={(e) => setRememberMeChecked(e.target.checked)}
          />
        </div>
        <button type="submit" id="signup-btn">
          SIGN UP
        </button>
        <div id="other-option-container">
          <p>Or log in instead: </p>
          <Link to="../login">
            <button className="other-option-btn" id="redirect-to-login-btn">
              LOGIN
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
