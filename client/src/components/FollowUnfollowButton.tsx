import { useEffect, useState } from "react";

interface Props {
  requestedUsername: string;
  requestingUsername: string;
}

export default function FollowUnfollowButton(props: Props) {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [numOfFollowersEnabled, setNumOfFollowersEnabled] = useState<
    boolean | null
  >(null);
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

  useEffect(() => {
    async function checkNumOfFollowersPrivileges() {
      try {
        const response = await fetch(
          "http://localhost:3000/admin/checkprivileges",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const responseData = await response.json();
        if (response.ok) {
          if (responseData.isAdmin) {
            setNumOfFollowersEnabled(true);
          } else {
            setNumOfFollowersEnabled(responseData.numOfFollowersEnabled);
          }
        } else {
          console.log(responseData.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    checkNumOfFollowersPrivileges();
  }, []);

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
        {numOfFollowersEnabled && <label>{numOfFollowers}</label>}
      </>
    );
  } else {
    if (isFollowing) {
      return (
        <>
          <button onClick={() => handleFollowUnfollowClick("unfollow")}>
            UNFOLLOW
          </button>
          {numOfFollowersEnabled && <label>{numOfFollowers}</label>}
        </>
      );
    } else {
      return (
        <>
          <button onClick={() => handleFollowUnfollowClick("follow")}>
            FOLLOW
          </button>
          {numOfFollowersEnabled && <label>{numOfFollowers}</label>}
        </>
      );
    }
  }
}
