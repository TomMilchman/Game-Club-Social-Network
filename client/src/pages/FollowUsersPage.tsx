import { useEffect, useState } from "react";
import FollowUnfollowButton from "../components/FollowUnfollowButton";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

export default function FollowUsersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const [requestingUsername, setRequestingUsername] = useState("");
  const navigate = useNavigate();

  const getFollowedUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/following`, {
        method: "GET",
        credentials: "include",
      });

      const responseData = await response.json();
      if (response.ok) {
        setFollowedUsers(responseData.followedUsers);
        setRequestingUsername(responseData.requestingUsername);
        setIsLoading(false);
      } else {
        console.log(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getFollowedUsers();
  }, []);

  if (isLoading) {
    return <p></p>;
  }

  if (followedUsers.length === 0) {
    return (
      <>
        <SearchBar />
        <h1>You are not following any users</h1>
      </>
    );
  } else {
    return (
      <div className="following-container">
        <h1>Following Users</h1>
        <SearchBar />
        <h2>Users you follow:</h2>
        {followedUsers.map((followedUsername: string) => (
          <div key={`${followedUsername}-followed-user-wrapper`}>
            <h3
              className="followed-user"
              onClick={() => navigate("/users/" + followedUsername)}
              key={followedUsername}
            >
              {followedUsername}
            </h3>
            <FollowUnfollowButton
              key={`${followedUsername}-follow-button`}
              requestedUsername={followedUsername}
              requestingUsername={requestingUsername}
            />
          </div>
        ))}
      </div>
    );
  }
}
