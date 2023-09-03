import { useEffect, useState } from "react";

export default function DeleteUserPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [usernames, setUsernames] = useState<string[]>([]);

  const getUsernames = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/nonadmin`, {
        method: "GET",
        credentials: "include",
      });

      const responseData = await response.json();
      if (response.ok) {
        setUsernames(responseData.usernames);
      } else {
        console.log(responseData.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getUsernames();
  }, []);

  const deleteUser = async (usernameToDelete: string) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete the user ${usernameToDelete}?`
    );

    if (confirmation) {
      try {
        const response = await fetch(
          `http://localhost:3000/admin/deleteuser/${usernameToDelete}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        const responseData = await response.json();
        if (response.ok) {
          const updatedUsernames = usernames.filter(
            (username) => username !== usernameToDelete
          );
          setUsernames(updatedUsernames);
          console.log(responseData.message);
          alert(responseData.message);
        } else {
          console.log(responseData.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
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
