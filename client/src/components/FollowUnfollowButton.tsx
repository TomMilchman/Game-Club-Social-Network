import { useEffect, useState } from "react";
import { makeRequest } from "../API";

interface Props {
  requestedUsername: string;
  requestingUsername: string;
}

export default function FollowUnfollowButton(props: Props) {
  const [followInfo, setFollowInfo] = useState<{
    isFollowing: boolean | null;
    numOfFollowers: number | null;
  }>({
    isFollowing: null,
    numOfFollowers: null,
  });
  const [numOfFollowersEnabled, setNumOfFollowersEnabled] = useState<
    boolean | null
  >(null);

  const handleFollowUnfollowClick = async (action: string) => {
    try {
      const { ok, data } = await makeRequest(
        `/users/${props.requestedUsername}/${action}`,
        "PUT"
      );

      if (ok) {
        console.log(data.message);
        setFollowInfo((prevInfo) => ({
          ...prevInfo,
          isFollowing: action === "follow",
          numOfFollowers:
            action === "follow"
              ? prevInfo.numOfFollowers! + 1
              : prevInfo.numOfFollowers! - 1,
        }));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { ok, data } = await makeRequest(
          `/users/${props.requestedUsername}/followinfo`,
          "GET"
        );

        if (ok) {
          setFollowInfo({
            isFollowing: data.isFollowing,
            numOfFollowers: data.numOfFollowers,
          });
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [props.requestedUsername]);

  useEffect(() => {
    async function checkNumOfFollowersPrivileges() {
      try {
        const { ok, data } = await makeRequest("/privileges", "GET");

        if (ok) {
          setNumOfFollowersEnabled(
            data.isAdmin ? true : data.numOfFollowersEnabled
          );
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    checkNumOfFollowersPrivileges();
  }, []);

  if (props.requestingUsername === props.requestedUsername) {
    return (
      <>
        <button disabled title="You cannot follow/unfollow yourself!">
          FOLLOW
        </button>
        {numOfFollowersEnabled && <label>{followInfo.numOfFollowers}</label>}
      </>
    );
  } else {
    return (
      <>
        <button
          onClick={() =>
            handleFollowUnfollowClick(
              followInfo.isFollowing ? "unfollow" : "follow"
            )
          }
        >
          {followInfo.isFollowing ? "UNFOLLOW" : "FOLLOW"}
        </button>
        {numOfFollowersEnabled && <label>{followInfo.numOfFollowers}</label>}
      </>
    );
  }
}
