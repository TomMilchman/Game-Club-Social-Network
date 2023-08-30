import { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import PostComponent from "../components/Post";

export default function FeedPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [createPostClicked, setCreatePostClicked] = useState(false);

  const getFeed = async () => {
    try {
      const response = await fetch("http://localhost:3000/feed", {
        method: "GET",
        credentials: "include",
      });

      const responseData = await response.json();
      if (response.ok) {
        setUsername(responseData.requestingUsername);
        const posts = responseData.posts;
        setPosts(posts);
        setIsLoading(false);
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

  if (isLoading) {
    return <p></p>;
  }

  if (posts.length > 0) {
    const sortedPosts = posts.sort((a: any, b: any) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeB - timeA;
    });

    return (
      <div className="feed">
        <h1>{username}'s Feed</h1>

        {!createPostClicked && (
          <button onClick={() => setCreatePostClicked(true)}>
            CREATE POST
          </button>
        )}
        {createPostClicked && (
          <>
            <CreatePost />
            <button onClick={() => setCreatePostClicked(false)}>CANCEL</button>
          </>
        )}
        <h2>Posts from users you follow:</h2>
        {sortedPosts.map((post: any) => (
          <PostComponent
            key={`${post.username}-${post.postId}`}
            username={post.username}
            postId={post.postId}
            title={post.title}
            timestamp={post.timestamp}
            content={post.content}
            numOfLikes={post.usernamesWhoLiked.length}
            didUserLikePost={post.usernamesWhoLiked.includes(username)}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="feed">
        <h1>{username}'s Feed</h1>

        {!createPostClicked && (
          <button onClick={() => setCreatePostClicked(true)}>
            CREATE POST
          </button>
        )}
        {createPostClicked && (
          <>
            <CreatePost />
            <button onClick={() => setCreatePostClicked(false)}>CANCEL</button>
          </>
        )}
        <h2>Posts from users you follow:</h2>
        <h3>Follow users to see their posts!</h3>
      </div>
    );
  }
}
