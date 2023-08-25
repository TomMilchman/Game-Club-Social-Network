import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostComponent from "../components/Post";
import PostClass from "../../../server/Post";
import FollowUnfollowButton from "../components/FollowUnfollowButton";

export default function UserPage() {
  const [posts, setPosts] = useState<PostClass[]>([]);
  const [userFound, setUserFound] = useState(false);
  const [requestingUsername, setRequestingUsername] = useState("");

  const params = useParams();
  const username = params.username;

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${username}/posts`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        const posts: PostClass[] = responseData.posts;
        setRequestingUsername(responseData.requestingUsername);
        setPosts(posts);
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

  if (userFound && posts.length > 0) {
    const sortedPosts = posts.sort((a: PostClass, b: PostClass) => {
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
        {sortedPosts.map((post: PostClass) => (
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
    return <p>Error 404: user not found</p>;
  }
}
