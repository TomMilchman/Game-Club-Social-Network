import { useEffect, useState } from "react";
import { makeRequest } from "../API";

export default function DeleteUserPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [usernames, setUsernames] = useState<string[]>([]);

  useEffect(() => {
    const getUsernames = async () => {
      const { ok, data } = await makeRequest("/users/nonadmin", "GET");

      if (ok) {
        setUsernames(data.usernames);
      }

      setIsLoading(false);
    };

    getUsernames();
  }, []);

  const deleteUser = async (usernameToDelete: string) => {
    const { ok, data } = await makeRequest(
      `/admin/deleteuser/${usernameToDelete}`,
      "DELETE"
    );

    if (ok) {
      const updatedUsernames = usernames.filter(
        (username) => username !== usernameToDelete
      );
      setUsernames(updatedUsernames);
      console.log(data.message);
      alert(data.message);
    }
  };

  if (isLoading) {
    return <p></p>;
  }

  if (usernames.length === 0) {
    return <p>No users to show.</p>;
  } else {
    usernames.sort();

    return (
      <>
        <h1>Delete Users</h1>
        <div className="delete-user-container">
          {usernames.map((username) => (
            <h3 key={username}>
              <label>{username}</label>
              <br />
              <button
                className="delete-user-btn"
                onClick={() => deleteUser(username)}
              >
                DELETE
              </button>
            </h3>
          ))}
        </div>
      </>
    );
  }
}
