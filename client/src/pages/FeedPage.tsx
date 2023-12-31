import { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import PostComponent from "../components/Post";
import { makeRequest } from "../API";

interface Post {
  username: string;
  postId: number;
  title: string;
  timestamp: Date;
  content: string;
  usernamesWhoLiked: string[];
}

export default function FeedPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [createPostClicked, setCreatePostClicked] = useState(false);

  const getFeed = async () => {
    try {
      const { ok, data } = await makeRequest("/feed", "GET");

      if (ok && data) {
        setUsername(data.requestingUsername);
        const sortedPosts = data.posts.sort((a: Post, b: Post) => {
          const timeA = new Date(a.timestamp).getTime();
          const timeB = new Date(b.timestamp).getTime();
          return timeB - timeA;
        });
        setPosts(sortedPosts);
        setIsLoading(false);
      } else {
        console.log(data?.message || "Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const toggleCreatePost = () => {
    setCreatePostClicked((prev) => !prev);
  };

  if (isLoading) {
    return <p></p>;
  }

  return (
    <div className="feed">
      <h1>{username}'s Feed</h1>

      {!createPostClicked && (
        <button onClick={toggleCreatePost}>CREATE POST</button>
      )}
      {createPostClicked && (
        <>
          <CreatePost />
          <button onClick={toggleCreatePost}>CANCEL</button>
        </>
      )}
      <h2>Posts from users you follow:</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
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
        ))
      ) : (
        <h3>Follow users to see their posts!</h3>
      )}
    </div>
  );
}
