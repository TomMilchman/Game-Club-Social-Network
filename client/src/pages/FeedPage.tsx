import { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";

export default function FeedPage() {
  const [username, setUsername] = useState("");
  const [createPostClicked, setCreatePostClicked] = useState(false);

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
        console.log(responseData.message);
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
      <h1>{username}'s Feed</h1>
      {!createPostClicked && (
        <button onClick={() => setCreatePostClicked(true)}>CREATE POST</button>
      )}
      {createPostClicked && (
        <>
          <CreatePost />
          <button onClick={() => setCreatePostClicked(false)}>CANCEL</button>
        </>
      )}
    </div>
  );
}
