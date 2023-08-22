import { useEffect, useState } from "react";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkIfAdmin = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        setIsAdmin(true);
      } else if (response.status === 401) {
        setIsAdmin(false);
      } else {
        console.log("An error occurred server side:", responseData.message);
      }
      console.log(responseData.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkIfAdmin();
  }, []);

  if (isAdmin) {
    return <p>Admin Page</p>;
  } else {
    return <p>Not an admin</p>;
  }
}
