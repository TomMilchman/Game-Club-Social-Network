import { useEffect, useState } from "react";
import { format } from "date-fns";
import { LoginActivityType } from "../../../server/src/User";

interface UserActivity {
  username: string;
  type: LoginActivityType;
  timestamp: Date;
}

export default function LoginActivityPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loginActivity, setLoginActivity] = useState<UserActivity[]>([]);

  const getLoginActivity = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/loginactivity`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        setLoginActivity(responseData.loginActivity);
      } else {
        console.log(responseData.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getLoginActivity();
  }, []);

  const translateType = (type: LoginActivityType) => {
    switch (type) {
      case 0:
        return "Logged in";
      case 1:
        return "Logged out";
      case 2:
        return "Created a new post";
      default:
        return "Unknown";
    }
  };

  const formattedTimestamp = (timestamp: Date) => {
    return format(new Date(timestamp), "dd/MM/yy HH:mm");
  };

  if (loginActivity.length === 0) {
    return <p>No login activity to show.</p>;
  } else {
    const sortedActivities = loginActivity.sort(
      (a: UserActivity, b: UserActivity) => {
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        return timeB - timeA;
      }
    );

    if (isLoading) {
      return <p></p>;
    }

    return (
      <>
        <h1>Login Activity</h1>
        {sortedActivities.map((loginActivity, index) => (
          <div key={`activity-${index}`}>
            <p>Username: {loginActivity.username}</p>
            <p>Time: {formattedTimestamp(loginActivity.timestamp)}</p>
            <p>Type: {translateType(loginActivity.type)}</p>
            <br />
          </div>
        ))}
      </>
    );
  }
}
