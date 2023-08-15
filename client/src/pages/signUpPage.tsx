import { Link } from "react-router-dom"
import GameClubLogo from "../images/GameClubLogo.png"

export default function SignUpPage() {
    return(
        <form id="signup-form">
            <img src={GameClubLogo} width={90} height={57} />
            <h2>Sign Up</h2>
            <div className="input-container">
                <label>Username:</label>
                <input id="username-input"></input>
            </div>
            <div className="input-container">
                <label>Password:</label>
                <input id="password-input"></input>
            </div>
            <div className="input-container">
                <label>Email:</label>
                <input id="email-input"></input>
            </div>
            <div className="input-container">
                <label>Remember me</label>
                <input type="checkbox"></input>
            </div>
            <button type="submit" id="signup-btn">SIGN UP</button>
            <div id="other-option-container">
                <p>Or log in instead:</p>
                <Link to="../login">
                    <button className="other-option-btn" 
                    id="redirect-to-login-btn">LOGIN</button>
                </Link>
            </div>
        </form>
    )
}