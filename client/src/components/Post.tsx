import { format } from "date-fns";
import { useState } from "react";

interface Props {
  username: string;
  title: string;
  timestamp: Date;
  content: string;
  numOfLikes: number;
}

export default function Post(props: Props) {
  const [likes, setLikes] = useState(props.numOfLikes);

  const handleLikeClick = async () => {
    // const response = await fetch(
    //   `http://localhost:3000/users/${params.username}`,
    //   {
    //     method: "GET",
    //     credentials: "include",
    //   }
    // );
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
      </div>
      <div className="post-content-container">
        <p className="post-content">{props.content}</p>
      </div>
      <div className="like-btn-container">
        <button className="like-btn" onClick={handleLikeClick}>
          LIKE
        </button>
        <label className="num-of-likes">{likes}</label>
      </div>
    </div>
  );
}
