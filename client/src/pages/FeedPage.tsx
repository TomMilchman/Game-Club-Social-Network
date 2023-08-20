import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function FeedPage() {
  const [authenticated, setAuthenticated] = useState(true);
  const [username, setUsername] = useState("");

  const getFeed = async () => {
    try {
      const response = await fetch("http://localhost:3000/feed", {
        method: "GET",
        credentials: "include",
      });

      const responseData = await response.json();
      if (response.ok) {
        setUsername(responseData.username);
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

  useEffect(() => {
    getFeed();
  }, []);

  return authenticated ? (
    <div className="feed">
      <p>This is the feed for user {username}</p>
    </div>
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
