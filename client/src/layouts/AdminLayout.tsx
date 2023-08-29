import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkIfAdmin = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/admin/checkprivileges",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        setIsAdmin(responseData.isAdmin);
      } else if (response.status === 401) {
        setIsAdmin(false);
      } else {
        setIsAdmin(false);
        console.log("An error occurred server side:", responseData.message);
      }
      console.log(responseData.message);
    } catch (error) {
      setIsAdmin(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkIfAdmin();
  }, []);

  if (isAdmin) {
    return (
      <>
        <h1>Admin Page</h1>
        <Link to="/admin/login-activity">
          <button>LOGIN ACTIVITY</button>
        </Link>
        <Link to="/admin/enable-disable-features">
          <button>DISABLE/ENABLE FEATURES</button>
        </Link>
        <Link to="/admin/delete-user">
          <button>DELETE USERS</button>
        </Link>
        <Outlet />
      </>
    );
  } else {
    return <p>Not an admin, cannot access admin privleges.</p>;
  }
}
