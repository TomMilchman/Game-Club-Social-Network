import { format, set } from "date-fns";
import { useState } from "react";

interface Props {
  username: string;
  postId: number;
  title: string;
  timestamp: Date;
  content: string;
  numOfLikes: number;
  didUserLikePost: boolean;
}

export default function Post(props: Props) {
  const [numOfLikes, setNumOfLikes] = useState(props.numOfLikes);
  const [userLikesPost, setUserLikesPost] = useState(props.didUserLikePost);

  const handleLikeUnlikeClick = async (action: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/posts/${props.username}/${action}/${props.postId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData.message);
        setNumOfLikes(responseData.updatedLikeNum);
        if (action === "like") {
          setUserLikesPost(true);
        } else {
          setUserLikesPost(false);
        }
      } else {
        console.log(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLikeClick = () => {
    handleLikeUnlikeClick("like");
  };

  const handleUnlikeClick = () => {
    handleLikeUnlikeClick("unlike");
  };

  const formattedTimestamp = format(
    new Date(props.timestamp),
    "dd/MM/yy HH:mm"
  );

  return (
    <div className="post-container">
      <div className="post-top">
        <h2 className="post-title">{props.title}</h2>
        <h3 className="post-username">{props.username}</h3>
        <h4 className="post-timestamp">{formattedTimestamp}</h4>
        <h5 className="post-post-id">Post ID: {props.postId}</h5>
      </div>
      <div className="post-content-container">
        <p className="post-content">{props.content}</p>
      </div>
      <div className="like-unlike-btn-container">
        {userLikesPost ? (
          <button className="unlike-btn" onClick={handleUnlikeClick}>
            UNLIKE
          </button>
        ) : (
          <button className="like-btn" onClick={handleLikeClick}>
            LIKE
          </button>
        )}
        <label className="num-of-likes">{numOfLikes}</label>
      </div>
    </div>
  );
}
