import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import GameClubLogo from "../images/GameClubLogo.png";
import { makeRequest } from "../API";

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
      const { data } = await makeRequest("/logout", "PUT");
      console.log(data.message);
      setAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const privileges = async () => {
    try {
      const { ok, data } = await makeRequest("/privileges", "GET");

      if (ok) {
        setAuthenticated(true);
        setUsername(data.username);
        setIsAdmin(data.isAdmin);

        if (data.isAdmin) {
          setUpcomingReleasesPrivileges(true);
          setGamingTriviaPrivileges(true);
        } else {
          setUpcomingReleasesPrivileges(data.upcomingReleasesEnabled);
          setGamingTriviaPrivileges(data.gamingTriviaEnabled);
        }
      } else if (!ok && data && data.status === 401) {
        setAuthenticated(false);
        console.log(data.message);
      } else {
        console.log("An error occurred server side:", data.message);
      }
    } catch (error) {
      setAuthenticated(false);
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    privileges();
  }, [navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
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
