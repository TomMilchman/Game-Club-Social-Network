import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostComponent from "../components/Post";
import PostClass from "../../../server/Post";

export default function UserPage() {
  const [posts, setPosts] = useState<PostClass[]>([]);
  const [userFound, setUserFound] = useState(false);

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
        const posts: PostClass[] = responseData;
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
        {sortedPosts.map((post: PostClass) => (
          <PostComponent
            key={post.postId}
            username={username!}
            title={post.title}
            timestamp={post.timestamp}
            content={post.content}
            numOfLikes={post.usernamesWhoLiked.length}
          />
        ))}
      </>
    );
  } else if (userFound && posts.length === 0) {
    return <h2>User has not made any posts yet.</h2>;
  } else {
    return <p>Error 404: user not found</p>;
  }
}
