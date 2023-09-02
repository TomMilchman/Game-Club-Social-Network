import { useEffect, useState } from "react";

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
      const response = await fetch(`http://localhost:3000/privileges`, {
        method: "GET",
        credentials: "include",
      });

      const responseData = await response.json();
      if (response.ok) {
        setGamingTriviaEnabled(responseData.gamingTriviaEnabled);
        setUpcomingReleasesEnabled(responseData.upcomingReleasesEnabled);
        setUnlikeEnabled(responseData.unlikeEnabled);
        setNumOfFollowersEnabled(responseData.numOfFollowersEnabled);
      } else {
        console.log(responseData.message);
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
      const response = await fetch(
        `http://localhost:3000/admin/${type}/${action}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        if (type === "gamingtrivia") {
          if (action === "enable") {
            setGamingTriviaEnabled(true);
          } else {
            setGamingTriviaEnabled(false);
          }
        } else if (type === "upcomingreleases") {
          if (action === "enable") {
            setUpcomingReleasesEnabled(true);
          } else {
            setUpcomingReleasesEnabled(false);
          }
        } else if (type === "unlike") {
          if (action === "enable") {
            setUnlikeEnabled(true);
          } else {
            setUnlikeEnabled(false);
          }
        } else if (type === "numoffollowers") {
          if (action === "enable") {
            setNumOfFollowersEnabled(true);
          } else {
            setNumOfFollowersEnabled(false);
          }
        }

        console.log(responseData.message);
      } else {
        console.log(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) {
    return <p></p>;
  }

  return (
    <div>
      <h1>Enable/Disable Features</h1>
      <h2>Gaming Trivia: </h2>
      {gamingTriviaEnabled ? (
        <button
          onClick={() => {
            enableDisableFeature("disable", "gamingtrivia");
          }}
        >
          DISABLE
        </button>
      ) : (
        <button
          onClick={() => {
            enableDisableFeature("enable", "gamingtrivia");
          }}
        >
          ENABLE
        </button>
      )}
      <h2>Upcoming Releases: </h2>
      {upcomingReleasesEnabled ? (
        <button
          onClick={() => {
            enableDisableFeature("disable", "upcomingreleases");
          }}
        >
          DISABLE
        </button>
      ) : (
        <button
          onClick={() => {
            enableDisableFeature("enable", "upcomingreleases");
          }}
        >
          ENABLE
        </button>
      )}
      <h2>Unlike Post: </h2>
      {unlikeEnabled ? (
        <button
          onClick={() => {
            enableDisableFeature("disable", "unlike");
          }}
        >
          DISABLE
        </button>
      ) : (
        <button
          onClick={() => {
            enableDisableFeature("enable", "unlike");
          }}
        >
          ENABLE
        </button>
      )}
      <h2>Number of Followers: </h2>
      {numOfFollowersEnabled ? (
        <button
          onClick={() => {
            enableDisableFeature("disable", "numoffollowers");
          }}
        >
          DISABLE
        </button>
      ) : (
        <button
          onClick={() => {
            enableDisableFeature("enable", "numoffollowers");
          }}
        >
          ENABLE
        </button>
      )}
    </div>
  );
}
