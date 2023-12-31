import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostComponent from "../components/Post";
import FollowUnfollowButton from "../components/FollowUnfollowButton";
import { makeRequest } from "../API";
import Post from "../../../server/src/Post";

export default function UserPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userFound, setUserFound] = useState(false);
  const [requestingUsername, setRequestingUsername] = useState("");

  const params = useParams();
  const username = params.username;

  const getUserInfo = async () => {
    try {
      const { ok, data } = await makeRequest(`/users/${username}/posts`, "GET");

      if (ok) {
        const posts: Post[] = data.posts;
        setRequestingUsername(data.requestingUsername);
        setPosts(posts);
        setUserFound(true);
      } else if (!ok && data.status === 404) {
        console.log(data.message);
        setUserFound(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setUserFound(false);
    getUserInfo();
  }, [params.username]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (userFound && posts.length > 0) {
    const sortedPosts = posts.sort((a: Post, b: Post) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeB - timeA;
    });

    return (
      <>
        <h1>User {username}'s page</h1>
        <FollowUnfollowButton
          requestedUsername={username!}
          requestingUsername={requestingUsername}
        />
        {sortedPosts.map((post: Post) => (
          <PostComponent
            key={post.postId}
            username={username!}
            postId={post.postId}
            title={post.title}
            timestamp={post.timestamp}
            content={post.content}
            numOfLikes={post.usernamesWhoLiked.length}
            didUserLikePost={post.usernamesWhoLiked.includes(
              requestingUsername
            )}
          />
        ))}
      </>
    );
  } else if (userFound && posts.length === 0) {
    return (
      <>
        <h1>User {username}'s page</h1>
        <FollowUnfollowButton
          requestedUsername={username!}
          requestingUsername={requestingUsername}
        />
        <h2>User has not made any posts yet.</h2>
      </>
    );
  } else {
    return (
      <>
        <h2>Error 404: User not found.</h2>
      </>
    );
  }
}
