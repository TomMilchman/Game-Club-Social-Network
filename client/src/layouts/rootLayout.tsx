import { Outlet, useNavigate, useLocation } from "react-router-dom";
import GameClubLogo from "../images/GameClubLogo.png";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

export default function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [authenticated, setAuthenticated] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      console.log(responseData.message);
      setAuthenticated(false); // Update authentication status
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/authentication", {
  //         method: "GET",
  //         credentials: "include",
  //       });

  //       if (response.status === 200) {
  //         setAuthenticated(true);
  //       } else if (response.status === 401) {
  //         setAuthenticated(false);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       setAuthenticated(false);
  //     }
  //   };

  //   if (!authenticated) {
  //     navigate("/login", { replace: true });
  //     return;
  //   }

  //   checkAuth();
  // }, [location.pathname]);

  // console.log("Authenticated:", authenticated);

  return (
    <div className="root-layout">
      <div id="navbar">
        <img src={GameClubLogo} width={90} height={57} />
        <SearchBar />
        <p>This is the root</p>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
      <Outlet />
    </div>
  );
}
