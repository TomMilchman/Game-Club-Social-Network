import { Outlet, useNavigate } from "react-router-dom";
import GameClubLogo from "../images/GameClubLogo.png";
import SearchBar from "../components/SearchBar";

export default function RootLayout() {
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
      console.log(responseData.message);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
