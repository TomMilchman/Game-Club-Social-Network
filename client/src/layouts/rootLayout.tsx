import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import GameClubLogo from "../images/GameClubLogo.png";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [upcomingReleasesPrivileges, setUpcomingReleasesPrivileges] =
    useState(false);
  const [gamingTriviaPrivileges, setGamingTriviaPrivileges] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      console.log(responseData.message);
      setAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const privileges = async () => {
    try {
      const response = await fetch("http://localhost:3000/privileges", {
        method: "GET",
        credentials: "include",
      });

      const responseData = await response.json();
      if (response.ok) {
        setAuthenticated(true);
        setUsername(responseData.username);
        setIsAdmin(responseData.isAdmin);

        if (responseData.isAdmin) {
          setUpcomingReleasesPrivileges(true);
          setGamingTriviaPrivileges(true);
        } else {
          setUpcomingReleasesPrivileges(responseData.upcomingReleasesEnabled);
          setGamingTriviaPrivileges(responseData.gamingTriviaEnabled);
        }
      } else if (response.status === 401) {
        setAuthenticated(false);
        console.log(responseData.message);
      } else {
        console.log("An error occurred server side:", responseData.message);
      }
    } catch (error) {
      setAuthenticated(false);
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    privileges();
  }, [<Outlet />]);

  if (isLoading) {
    return <p></p>;
  }

  return authenticated ? (
    <div className="root-layout">
      <div id="navbar">
        <img id="game-club-logo-layout" src={GameClubLogo} />
        <br />
        <Link to="/">
          <button>{username.toUpperCase()}'S FEED</button>
        </Link>
        <Link to="/following">
          <button>SEARCH & FOLLOW</button>
        </Link>
        <Link to="/upcoming-releases">
          <button disabled={!upcomingReleasesPrivileges}>
            UPCOMING RELEASES
          </button>
        </Link>
        <Link to="/gaming-trivia">
          <button disabled={!gamingTriviaPrivileges}>GAMING TRIVIA</button>
        </Link>
        {isAdmin && (
          <Link to="/admin">
            <button>ADMIN PAGE</button>
          </Link>
        )}
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
      <div className="root-child">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
}
