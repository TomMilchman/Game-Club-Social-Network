import { useState } from "react";

export default function FeedPage() {
  const [username, setUsername] = useState("");

  const getFeed = async () => {
    try {
      const response = await fetch("http://localhost:3000/feed", {
        method: "GET",
        credentials: "include",
      });

      const responseData = await response.json();
      setUsername(responseData.username);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  getFeed();

  return (
    <div className="feed">
      <p>This is the feed for user {username}</p>
    </div>
  );
}
