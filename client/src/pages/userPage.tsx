import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UserPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userFound, setUserFound] = useState(false);
  const params = useParams();

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${params.username}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        setUsername(responseData.username);
        setEmail(responseData.email);
        setUserFound(true);
      } else {
        setUserFound(false); // Set error state to true
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    setUserFound(false);
    getUserInfo();
  }, [params.username]);

  return (
    <>
      {userFound ? (
        <p>
          This is user {username}'s page, email: {email}
        </p>
      ) : (
        <p>Error 404: user not found</p>
      )}
    </>
  );
}
