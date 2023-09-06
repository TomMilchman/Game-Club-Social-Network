import { PORT, loggedInUsers } from "./server";
import adminRoutes from "./routes/adminRoutes";
import persist from "./persist";

const BASE_URL = `http://localhost:${PORT}`;

let tempPass: string;
let maxAge: number;
let numberOfTests = 0;
let numberOfTestsPassed = 0;

const getCookies = (response: Response) => {
  const cookies = response.headers.get("set-cookie");

  if (cookies) {
    tempPass = cookies.split(";")[0].split("=")[1];
    maxAge = parseInt(cookies.split(";")[1].split("=")[1]);
    console.log(`Cookies retrieved: tempPass: ${tempPass}, maxAge: ${maxAge}`);
  } else {
    console.log("No cookies retrieved");
  }
};

const signupTest = async (userData: {
  username: string;
  password: string;
  email: string;
  rememberMeChecked: boolean;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    getCookies(response);
    const responseData = await response.json();

    if (response.ok) {
      if (loggedInUsers.has(tempPass)) {
        console.log(`Signup test PASSED`);
        numberOfTestsPassed++;
      } else {
        console.log(`Signup test FAILED: ${responseData.message}`);
        console.log(
          "If the test failed because there is already a user called test123, delete the user from usersData.json and try again"
        );
      }
    }
  } catch (error) {
    console.error("Signup FAILED: Error during signup:", error.message);
  } finally {
    numberOfTests++;
  }
};

const createPostTest = async (postData: { title: string; content: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/createpost`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        cookie: `tempPass=${tempPass}; timeToLive=${maxAge}`,
      },
      body: JSON.stringify(postData),
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log(`Create post test PASSED`);
      numberOfTestsPassed++;
    } else {
      console.log(`Create post test FAILED: ${responseData.message}`);
    }
  } catch (error) {
    console.error("Create post FAILED: Error during create post:", error);
  } finally {
    numberOfTests++;
  }
};

const userPostsTest = async (username: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/posts`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        cookie: `tempPass=${tempPass}; timeToLive=${maxAge}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      let posts = responseData.posts;

      if (posts.length === 0) {
        console.log(`${username} has no posts`);
      } else {
        console.log(`${username}'s posts:`);
        for (let i = 0; i < posts.length; i++) {
          console.log(
            `Post ${i}: Title: ${posts[i].title}, Content: ${posts[i].content}`
          );
        }
      }

      console.log(`Get user posts test PASSED`);
      numberOfTestsPassed++;
    } else {
      console.log(`Get user posts test FAILED: ${responseData.message}`);
    }
  } catch (error) {
    console.error("Get user posts FAILED: Error during get user posts:", error);
  } finally {
    numberOfTests++;
  }
};

const followUnfollowUserTest = async (username: string, action: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/${action}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        cookie: `tempPass=${tempPass}; timeToLive=${maxAge}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      action === "follow"
        ? console.log(`Follow user test PASSED`)
        : console.log(`Unfollow user test PASSED`);
    } else {
      action === "follow"
        ? console.log(`Follow user test FAILED: ${responseData.message}`)
        : console.log(`Unfollow user test FAILED: ${responseData.message}`);
    }
  } catch (error) {
    action === "follow"
      ? console.error("Follow user FAILED: ", error.message)
      : console.error("Unfollow user FAILED: ", error.message);
  }
};

const followInfoTest = async (username: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/followinfo`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        cookie: `tempPass=${tempPass}; timeToLive=${maxAge}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log(responseData.message);
      console.log(`Follow info test PASSED`);
      numberOfTestsPassed++;
    } else {
      console.log(`Follow info test FAILED: ${responseData.message}`);
    }
  } catch (error) {
    console.error("Follow info FAILED: Error during follow info:", error);
  } finally {
    numberOfTests++;
  }
};

const privilegesTest = async (expectedPriveleges: {
  isAdmin: boolean;
  gamingTriviaEnabled: boolean;
  upcomingReleasesEnabled: boolean;
  unlikeEnabled: boolean;
  numOfFollowersEnabled: boolean;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/privileges`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        cookie: `tempPass=${tempPass}; timeToLive=${maxAge}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log(
        `Privileges: isAdmin: ${responseData.isAdmin}, 
        gamingTriviaEnabled: ${responseData.gamingTriviaEnabled}, 
        upcomingReleasesEnabled: ${responseData.upcomingReleasesEnabled}, 
        unlikeEnabled: ${responseData.unlikeEnabled}, 
        numOfFollowersEnabled: ${responseData.numOfFollowersEnabled}`
      );

      if (
        responseData.isAdmin === expectedPriveleges.isAdmin &&
        responseData.gamingTriviaEnabled ===
          expectedPriveleges.gamingTriviaEnabled &&
        responseData.upcomingReleasesEnabled ===
          expectedPriveleges.upcomingReleasesEnabled &&
        responseData.unlikeEnabled === expectedPriveleges.unlikeEnabled
      ) {
        console.log(`Privileges test PASSED`);
        numberOfTestsPassed++;
      } else {
        console.log(`Privileges test FAILED: ${responseData.message}`);
      }
    } else {
      console.log(`Privileges test FAILED: ${responseData.message}`);
    }
  } catch (error) {
    console.error("Privileges FAILED: Error during privileges:", error);
  } finally {
    numberOfTests++;
  }
};

const logoutTest = async () => {
  try {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        cookie: `tempPass=${tempPass}; timeToLive=${maxAge}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log(`Logout test PASSED`);
      numberOfTestsPassed++;
    } else {
      console.log(`Logout test FAILED: ${responseData.message}`);
    }
  } catch (error) {
    console.error("Logout FAILED: Error during logout:", error);
  } finally {
    numberOfTests++;
  }
};

const loginTest = async (userData: { username: string; password: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    getCookies(response);
    const responseData = await response.json();

    if (response.ok) {
      if (loggedInUsers.has(tempPass)) {
        console.log(`Login test PASSED`);
        numberOfTestsPassed++;
      } else {
        console.log(`Login test FAILED: ${responseData.message}`);
      }
    } else {
      console.log(`Login test FAILED: ${responseData.message}`);
    }
  } catch (error) {
    console.error("Login FAILED: Error during login:", error);
  } finally {
    numberOfTests++;
  }
};

const searchTest = async (searchTerm: string, expectedUsername: string) => {
  try {
    const response = await fetch(`${BASE_URL}/search/${searchTerm}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        cookie: `tempPass=${tempPass}; timeToLive=${maxAge}`,
      },
    });

    const responseData: string[] | string = await response.json();

    if (response.ok) {
      if (responseData.includes(expectedUsername)) {
        console.log(`Search test PASSED`);
      } else {
        console.log(`Search test FAILED: ${expectedUsername} not found`);
      }

      numberOfTestsPassed++;
    } else {
      console.log(`Search test FAILED: ${responseData}`);
    }
  } catch (error) {
    console.error("Search FAILED: Error during search:", error);
  } finally {
    numberOfTests++;
  }
};

const feedTest = async () => {
  try {
    const response = await fetch(`${BASE_URL}/feed`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        cookie: `tempPass=${tempPass}; timeToLive=${maxAge}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      let posts = responseData.posts;
      let requestingUsername = responseData.requestingUsername;

      if (posts.length === 0) {
        console.log(`No posts in admin's feed`);
      } else {
        console.log(`${requestingUsername}'s feed:`);
        for (let i = 0; i < posts.length; i++) {
          console.log(
            `User ${posts[i].username} post ${i}: Title: ${posts[i].title}, Content: ${posts[i].content}`
          );
        }
      }

      console.log(`Feed test PASSED`);
      numberOfTestsPassed++;
    } else {
      console.log(`Feed test FAILED: ${responseData.message}`);
    }
  } catch (error) {
    console.error("Feed FAILED: Error during feed:", error);
  } finally {
    numberOfTests++;
  }
};

const likeUnlikePostTest = async (
  username: string,
  postId: string,
  action: string
) => {
  try {
    const previousLikes =
      persist.usersData[username].posts[postId].usernamesWhoLiked.length;

    const response = await fetch(
      `${BASE_URL}/posts/${username}/${action}/${postId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          cookie: `tempPass=${tempPass}; timeToLive=${maxAge}`,
        },
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      const currentLikes = responseData.updatedLikeNum;

      if (action === "like") {
        if (currentLikes === previousLikes + 1) {
          console.log(`Like post test PASSED`);
          numberOfTestsPassed++;
        } else {
          console.log(`Like post test FAILED: likes not updated correctly`);
        }
      } else {
        if (currentLikes === previousLikes - 1) {
          console.log(`Unlike post test PASSED`);
          numberOfTestsPassed++;
        } else {
          console.log(`Unlike post test FAILED: likes not updated correctly`);
        }
      }
    } else {
      action === "like"
        ? console.log(`Like post test FAILED: ${responseData.message}`)
        : console.log(`Unlike post test FAILED: ${responseData.message}`);
    }
  } catch (error) {
    action === "like"
      ? console.error("Like post FAILED: ", error.message)
      : console.error("Unlike post FAILED: ", error.message);
  } finally {
    numberOfTests++;
  }
};

const followingTest = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/following`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        cookie: `tempPass=${tempPass}; timeToLive=${maxAge}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      let followedUsers = responseData.followedUsers;
      let requestingUser = responseData.requestingUser;

      if (followedUsers.length === 0) {
        console.log(`${requestingUser} is not following anyone`);
      } else {
        console.log(`${requestingUser} is following:`);
        for (let i = 0; i < followedUsers.length; i++) {
          console.log(`${followedUsers[i]}`);
        }
      }

      console.log(`Following test PASSED`);
      numberOfTestsPassed++;
    } else {
      console.log(`Following test FAILED: ${responseData.message}`);
    }
  } catch (error) {
    console.error("Following FAILED: Error during following:", error);
  } finally {
    numberOfTests++;
  }
};

const nonAdminTest = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/nonadmin`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        cookie: `tempPass=${tempPass}; timeToLive=${maxAge}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log(`Non admin usernames:`);
      responseData.usernames.forEach((username: string) => {
        console.log(username);
      });

      console.log(`Non admin test PASSED`);
      numberOfTestsPassed++;
    } else {
      console.log(`Non admin test FAILED: ${responseData.message}`);
    }
  } catch (error) {
    console.error("Non admin FAILED: Error during non admin:", error);
  } finally {
    numberOfTests++;
  }
};

const loginActivityTest = async () => {
  try {
    const response = await fetch(`${BASE_URL}/admin/loginactivity`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        cookie: `tempPass=${tempPass}; timeToLive=${maxAge}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log(`Login activity:`);
      responseData.loginActivity.forEach((login: string) => {
        console.log(login);
      });

      console.log(`Login activity test PASSED`);
      numberOfTestsPassed++;
    } else {
      console.log(`Login activity test FAILED: ${responseData.message}`);
    }
  } catch (error) {
    console.error("Login activity FAILED: Error during login activity:", error);
  } finally {
    numberOfTests++;
  }
};

const enableDisableFeatureTest = async (
  feature: string,
  action: string,
  expectedEnabled: boolean
) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/${action}/${feature}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        cookie: `tempPass=${tempPass}; timeToLive=${maxAge}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      if (adminRoutes.featureFlags[`${feature}Enabled`] === expectedEnabled) {
        console.log(`${feature} ${action} test PASSED`);
        numberOfTestsPassed++;
      } else {
        console.log(
          `${feature} ${action} test FAILED: ${feature} not updated correctly`
        );
      }
    } else {
      console.log(`${feature} ${action} test FAILED: ${responseData.message}`);
    }
  } catch (error) {
    console.error(
      `${feature} ${action} FAILED: Error during ${feature} ${action}:`,
      error
    );
  } finally {
    numberOfTests++;
  }
};

const deleteUserTest = async (username: string) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/deleteuser/${username}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        cookie: `tempPass=${tempPass}; timeToLive=${maxAge}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      if (!persist.usersData[username]) {
        for (let [key, value] of loggedInUsers) {
          if (value.username === username) {
            console.log(`Delete user test FAILED: ${username} still logged in`);
            return;
          }
        }
        console.log(`Delete user test PASSED`);
        numberOfTestsPassed++;
      } else {
        console.log(
          `Delete user test FAILED: ${username} wasn't deleted from usersData`
        );
      }
    } else {
      console.log(`Delete user test FAILED: ${responseData.message}`);
    }
  } catch (error) {
    console.error("Delete user FAILED: Error during delete user:", error);
  } finally {
    numberOfTests++;
  }
};

//Test start-------------------------------------------------------------------------
console.log("------------------------------");
console.log("Commencing tests...");
(async () => {
  console.log("------------------------------");
  await signupTest({
    username: "test123",
    password: "test123",
    email: "test@email.com",
    rememberMeChecked: false,
  });
  console.log("------------------------------");
  await createPostTest({
    title: "testing create post",
    content: "this is a test post",
  });
  console.log("------------------------------");
  await userPostsTest("admin");
  console.log("------------------------------");
  await followUnfollowUserTest("admin", "follow");
  console.log("------------------------------");
  await followInfoTest("admin");
  console.log("------------------------------");
  await followUnfollowUserTest("admin", "unfollow");
  console.log("------------------------------");
  await followInfoTest("admin");
  console.log("------------------------------");
  await privilegesTest({
    isAdmin: false,
    gamingTriviaEnabled: true,
    upcomingReleasesEnabled: true,
    unlikeEnabled: true,
    numOfFollowersEnabled: true,
  });
  console.log("------------------------------");
  await logoutTest();
  console.log("------------------------------");
  await loginTest({
    username: "admin",
    password: "admin",
  });
  console.log("------------------------------");
  await searchTest("t", "test123");
  console.log("------------------------------");
  await followUnfollowUserTest("test123", "follow");
  console.log("------------------------------");
  await feedTest();
  console.log("------------------------------");
  await likeUnlikePostTest("test123", "0", "like");
  await likeUnlikePostTest("test123", "0", "unlike");
  console.log("------------------------------");
  await followingTest();
  console.log("------------------------------");
  await followUnfollowUserTest("test123", "unfollow");
  await followingTest();
  console.log("------------------------------");
  await nonAdminTest();
  console.log("------------------------------");
  await loginActivityTest();
  console.log("------------------------------");
  await enableDisableFeatureTest("gamingtrivia", "enable", true);
  await enableDisableFeatureTest("gamingtrivia", "disable", false);
  console.log("------------------------------");
  await enableDisableFeatureTest("upcomingreleases", "enable", true);
  await enableDisableFeatureTest("upcomingreleases", "disable", false);
  console.log("------------------------------");
  await enableDisableFeatureTest("numoffollowers", "enable", true);
  await enableDisableFeatureTest("numoffollowers", "disable", false);
  console.log("------------------------------");
  await enableDisableFeatureTest("unlike", "enable", true);
  await enableDisableFeatureTest("unlike", "disable", false);
  console.log("------------------------------");
  await deleteUserTest("test123");
  console.log("------------------------------");
  await logoutTest();
  console.log("------------------------------");
  console.log(`Tests complete: ${numberOfTestsPassed}/${numberOfTests} passed`);
  console.log("------------------------------");
})();
//Test end---------------------------------------------------------------------------
