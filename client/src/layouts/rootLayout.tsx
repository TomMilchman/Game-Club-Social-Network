import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import GameClubLogo from "../images/GameClubLogo.png";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [upcomingReleasesPrivileges, setUpcomingReleasesPrivileges] =
    useState(false);
  const [gamingTriviaPrivileges, setGamingTriviaPrivileges] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "PATCH",
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

  const authenticate = async () => {
    try {
      const response = await fetch("http://localhost:3000/authentication", {
        method: "GET",
        credentials: "include",
      });

      const responseData = await response.json();
      if (response.ok) {
        setAuthenticated(true);
      } else if (response.status === 401) {
        setAuthenticated(false);
        console.log(responseData.message);
      } else {
        console.log("An error occurred server side:", responseData.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkNavbarPrivileges = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/admin/checkprivileges",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        setIsAdmin(responseData.isAdmin);

        if (responseData.isAdmin) {
          setUpcomingReleasesPrivileges(true);
          setGamingTriviaPrivileges(true);
        } else {
          setUpcomingReleasesPrivileges(responseData.upcomingReleasesEnabled);
          setGamingTriviaPrivileges(responseData.gamingTriviaEnabled);
        }

        console.log(
          `isAdmin: ${isAdmin}, upcomingReleasesPrivileges: ${upcomingReleasesPrivileges}, gamingTriviaPrivileges: ${gamingTriviaPrivileges}`
        );
      } else if (response.status === 401) {
        setIsAdmin(false);
        console.log(responseData.message);
      } else {
        console.log("An error occurred server side:", responseData.message);
      }
    } catch (error) {
      setIsAdmin(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    authenticate();
    checkNavbarPrivileges();
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
          <button>USER FEED</button>
        </Link>
        <Link to="/following">
          <button>FOLLOWING</button>
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
