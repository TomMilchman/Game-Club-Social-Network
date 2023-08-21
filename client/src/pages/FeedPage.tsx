import { useEffect, useState } from "react";

export default function FeedPage() {
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

  return (
    <div className="feed">
      <p>This is the feed for user {username}</p>
    </div>
  );
}
