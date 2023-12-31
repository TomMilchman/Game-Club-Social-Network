import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../API";

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
  const [unlikeEnabled, setUnlikeEnabled] = useState<boolean | null>(null);
  const [numOfLikes, setNumOfLikes] = useState(props.numOfLikes);
  const [userLikesPost, setUserLikesPost] = useState(props.didUserLikePost);

  const navigate = useNavigate();

  const handleLikeUnlikeClick = async (action: string) => {
    try {
      const { ok, data } = await makeRequest(
        `/posts/${props.username}/${action}/${props.postId}`,
        "PUT"
      );

      if (ok) {
        console.log(data.message);
        setNumOfLikes(data.updatedLikeNum);
        setUserLikesPost(action === "like");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkUnlikePrivileges = async () => {
    try {
      const { ok, data } = await makeRequest("/privileges", "GET");

      if (ok) {
        setUnlikeEnabled(data.isAdmin ? true : data.unlikeEnabled);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkUnlikePrivileges();
  }, []);

  const formattedTimestamp = format(
    new Date(props.timestamp),
    "dd/MM/yy HH:mm"
  );

  return (
    <div className="post-container">
      <div className="post-header">
        <h2 className="post-title">{props.title}</h2>
        <h3
          className="post-username"
          onClick={() => {
            navigate("/users/" + props.username);
          }}
        >
          User: {props.username}
        </h3>
        <h3 className="post-timestamp">{formattedTimestamp}</h3>
      </div>
      <div className="post-content-container">
        <h2 className="post-content">{props.content}</h2>
      </div>
      <div className="like-unlike-btn-container">
        {userLikesPost ? (
          <button
            className="unlike-btn"
            onClick={() => handleLikeUnlikeClick("unlike")}
            disabled={!unlikeEnabled}
          >
            UNLIKE
          </button>
        ) : (
          <button
            className="like-btn"
            onClick={() => handleLikeUnlikeClick("like")}
          >
            LIKE
          </button>
        )}
        <label className="num-of-likes">{numOfLikes}</label>
      </div>
    </div>
  );
}
