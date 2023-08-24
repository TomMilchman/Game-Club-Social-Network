import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import GameClubLogo from "../images/GameClubLogo.png";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkIfAdmin = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin", {
        method: "GET",
        credentials: "include",
      });

      const responseData = await response.json();
      if (response.ok) {
        setIsAdmin(true);
        console.log(responseData.message);
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
    checkIfAdmin();
  }, []);

  return authenticated ? (
    <div className="root-layout">
      <div id="navbar">
        <img src={GameClubLogo} width={90} height={57} />
        <SearchBar />
        <Link to="/">
          <button>USER FEED</button>
        </Link>
        {isAdmin && (
          <Link to="/admin">
            <button>ADMIN PAGE</button>
          </Link>
        )}
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
}
