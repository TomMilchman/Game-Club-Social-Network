import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import GameClubLogo from "../images/GameClubLogo.png";

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();

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
      localStorage.removeItem("active-user");
      console.log(responseData.message);
      navigate("../login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/feed");
    }
  }, []);

  return (
    <div className="root-layout">
      <div id="navbar">
        <img src={GameClubLogo} width={90} height={57} />
        <p>This is the root</p>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
      <Outlet />
    </div>
  );
}
