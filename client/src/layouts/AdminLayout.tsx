import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { makeRequest } from "../API";

export default function AdminLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkIfAdmin = async () => {
    try {
      const { ok, data } = await makeRequest("/privileges", "GET");

      if (ok) {
        setIsAdmin(data.isAdmin);
      } else {
        setIsAdmin(false);
        console.log("An error occurred server side:", data.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsAdmin(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkIfAdmin();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
    return <p>Not an admin, cannot access admin privileges.</p>;
  }
}
