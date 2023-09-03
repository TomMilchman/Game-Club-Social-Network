import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameClubLogo from "../images/GameClubLogo.png";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userData = {
      username,
      password,
      rememberMeChecked,
    };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      if (response.ok) {
        // Successfully logged in
        console.log("Logged in:", responseData.message);
        navigate("/", { replace: true });
        return null;
      } else {
        // Error handling if login failed
        console.error("Login failed:", responseData.message);
        alert(`Error signing in: ${responseData.message}, please try again.`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error signing in: ${error}, please try again later.`);
    }
  };

  return (
    <div className="form-container">
      <img src={GameClubLogo} />
      <form id="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
          <label>Remember me </label>
          <input
            className="remember-me-input"
            type="checkbox"
            checked={rememberMeChecked}
            onChange={(e) => setRememberMeChecked(e.target.checked)}
          />
        </div>
        <button type="submit" id="login-btn">
          LOGIN
        </button>
        <div id="other-option-container">
          <p>Or sign up instead: </p>
          <Link to="/signup">
            <button className="other-option-btn" id="redirect-to-signup-btn">
              SIGN UP
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
