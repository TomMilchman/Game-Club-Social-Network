import { useEffect, useState } from "react";
import { format } from "date-fns";
import { makeRequest } from "../API";

export default function LoginActivityPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loginActivity, setLoginActivity] = useState([]);

  interface Activity {
    username: string;
    timestamp: string;
    type: number;
  }

  const getLoginActivity = async () => {
    try {
      const { ok, data } = await makeRequest("/admin/loginactivity", "GET");

      if (ok) {
        setLoginActivity(data.loginActivity);
      } else {
        console.log(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getLoginActivity();
  }, []);

  const translateType = (type: number) => {
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

  const formattedTimestamp = (timestamp: string) => {
    return format(new Date(timestamp), "dd/MM/yy HH:mm");
  };

  if (loginActivity.length === 0) {
    return <p>No login activity to show.</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Login Activity</h1>
      {loginActivity.map((activity: Activity, index) => (
        <div key={`activity-${index}`}>
          <p>Username: {activity.username}</p>
          <p>Time: {formattedTimestamp(activity.timestamp)}</p>
          <p>Type: {translateType(activity.type)}</p>
          <br />
        </div>
      ))}
    </>
  );
}
