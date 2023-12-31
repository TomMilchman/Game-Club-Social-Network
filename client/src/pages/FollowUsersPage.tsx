import { useEffect, useState } from "react";
import FollowUnfollowButton from "../components/FollowUnfollowButton";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../API";

export default function FollowUsersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const [requestingUsername, setRequestingUsername] = useState<string>("");
  const navigate = useNavigate();

  const getFollowedUsers = async () => {
    try {
      const { ok, data } = await makeRequest("/users/following", "GET");

      if (ok && data) {
        setFollowedUsers(data.followedUsers);
        setRequestingUsername(data.requestingUsername);
        setIsLoading(false);
      } else {
        console.log(data?.message || "Error fetching data");
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
        <h1>Following Users</h1>
        <h2>Search for users:</h2>
        <SearchBar />
        <h1>You are not following any users</h1>
      </>
    );
  }

  return (
    <div className="following-container">
      <h1>Following Users</h1>
      <h2>Search for users:</h2>
      <SearchBar />
      <h2>Users you follow:</h2>
      <div className="followed-users-container">
        {followedUsers.map((followedUsername: string) => (
          <div
            className="followed-user-wrapper"
            key={`${followedUsername}-followed-user-wrapper`}
          >
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
    </div>
  );
}
