import { Link } from "react-router-dom"
import GameClubLogo from "../images/GameClubLogo.png"

export default function LoginPage() {
    return (
        <form id="login-form">
            <img src={GameClubLogo} width={90} height={57} />
            <h2>Login</h2>
            <div className="input-container">
                <label>Username:</label>
                <input id="username-input"></input>
            </div>
            <div className="input-container">
                <label>Password:</label>
                <input id="password-input"></input>
            </div>
            <div className="input-container">
                <label>Remember me</label>
                <input type="checkbox"></input>
            </div>
            <button type="submit" id="login-btn">LOGIN</button>
            <div id="other-option-container">
                <p>Or sign up instead:</p>
                <Link to="../signup">
                    <button className="other-option-btn"
                    id="redirect-to-signup-btn">SIGN UP</button>
                </Link>
            </div>
        </form>
    )
}