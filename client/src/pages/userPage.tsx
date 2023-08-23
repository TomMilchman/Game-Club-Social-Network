import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UserPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [numOfFollowing, setNumOfFollowing] = useState(0);
  const [numOfFollowers, setNumOfFollowers] = useState(0);
  const [posts, setPosts] = useState([]);
  const [userFound, setUserFound] = useState(false);

  const params = useParams();

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${params.username}/data`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        setUsername(responseData.username);
        setEmail(responseData.email);
        setNumOfFollowing(responseData.following.length);
        setNumOfFollowers(responseData.followers.length);
        setPosts(responseData.posts);
        setUserFound(true);
      } else if (response.status === 404) {
        console.log(responseData.message);
        setUserFound(false);
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
