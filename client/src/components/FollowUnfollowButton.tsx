import { useEffect, useState } from "react";

interface Props {
  requestedUsername: string;
  requestingUsername: string;
}

export default function FollowUnfollowButton(props: Props) {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [numOfFollowers, setNumOfFollowers] = useState<number | null>(null);

  const handleFollowUnfollowClick = async (action: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${props.requestedUsername}/${action}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData.message);
        if (action === "follow") {
          setIsFollowing(true);
          setNumOfFollowers(numOfFollowers! + 1);
        } else {
          setIsFollowing(false);
          setNumOfFollowers(numOfFollowers! - 1);
        }
      } else {
        console.log(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFollowClick = () => {
    handleFollowUnfollowClick("follow");
  };

  const handleUnfollowClick = () => {
    handleFollowUnfollowClick("unfollow");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${props.requestedUsername}/followinfo`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const responseData = await response.json();
        if (response.ok) {
          setIsFollowing(responseData.isFollowing);
          setNumOfFollowers(responseData.numOfFollowers);
        } else {
          console.log(responseData.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [props.requestedUsername]);

  if (props.requestingUsername === props.requestedUsername) {
    return (
      <>
        <button disabled title="You cannot follow/unfollow yourself!">
          FOLLOW
        </button>
        <label>{numOfFollowers}</label>
      </>
    );
  } else {
    if (isFollowing) {
      return (
        <>
          <button onClick={handleUnfollowClick}>UNFOLLOW</button>
          <label>{numOfFollowers}</label>
        </>
      );
    } else {
      return (
        <>
          <button onClick={handleFollowClick}>FOLLOW</button>
          <label>{numOfFollowers}</label>
        </>
      );
    }
  }
}
