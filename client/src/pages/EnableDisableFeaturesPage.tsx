import { useEffect, useState } from "react";
import { makeRequest } from "../API";

export default function EnableDisableFeaturesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [gamingTriviaEnabled, setGamingTriviaEnabled] = useState<
    boolean | null
  >(null);
  const [upcomingReleasesEnabled, setUpcomingReleasesEnabled] = useState<
    boolean | null
  >(null);
  const [unlikeEnabled, setUnlikeEnabled] = useState<boolean | null>(null);
  const [numOfFollowersEnabled, setNumOfFollowersEnabled] = useState<
    boolean | null
  >(null);

  const checkAllPrivileges = async () => {
    try {
      const { ok, data } = await makeRequest("/privileges", "GET");

      if (ok) {
        setGamingTriviaEnabled(data.gamingTriviaEnabled);
        setUpcomingReleasesEnabled(data.upcomingReleasesEnabled);
        setUnlikeEnabled(data.unlikeEnabled);
        setNumOfFollowersEnabled(data.numOfFollowersEnabled);
      } else {
        console.log(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkAllPrivileges();
  }, []);

  const enableDisableFeature = async (action: string, type: string) => {
    try {
      const { ok, data } = await makeRequest(`/admin/${action}/${type}`, "PUT");

      if (ok) {
        switch (type) {
          case "gamingtrivia":
            setGamingTriviaEnabled(action === "enable");
            break;
          case "upcomingreleases":
            setUpcomingReleasesEnabled(action === "enable");
            break;
          case "unlike":
            setUnlikeEnabled(action === "enable");
            break;
          case "numoffollowers":
            setNumOfFollowersEnabled(action === "enable");
            break;
          default:
            break;
        }

        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Enable/Disable Features</h1>
      <h2>Gaming Trivia: </h2>
      {gamingTriviaEnabled ? (
        <button onClick={() => enableDisableFeature("disable", "gamingtrivia")}>
          DISABLE
        </button>
      ) : (
        <button onClick={() => enableDisableFeature("enable", "gamingtrivia")}>
          ENABLE
        </button>
      )}
      <h2>Upcoming Releases: </h2>
      {upcomingReleasesEnabled ? (
        <button
          onClick={() => enableDisableFeature("disable", "upcomingreleases")}
        >
          DISABLE
        </button>
      ) : (
        <button
          onClick={() => enableDisableFeature("enable", "upcomingreleases")}
        >
          ENABLE
        </button>
      )}
      <h2>Unlike Post: </h2>
      {unlikeEnabled ? (
        <button onClick={() => enableDisableFeature("disable", "unlike")}>
          DISABLE
        </button>
      ) : (
        <button onClick={() => enableDisableFeature("enable", "unlike")}>
          ENABLE
        </button>
      )}
      <h2>Number of Followers: </h2>
      {numOfFollowersEnabled ? (
        <button
          onClick={() => enableDisableFeature("disable", "numoffollowers")}
        >
          DISABLE
        </button>
      ) : (
        <button
          onClick={() => enableDisableFeature("enable", "numoffollowers")}
        >
          ENABLE
        </button>
      )}
    </div>
  );
}
