import { PORT, loggedInUsers } from "./server";
import Post from "./Post";

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

const signup = async (userData: {
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
      }
    }
  } catch (error) {
    console.error("Signup FAILED: Error during signup:", error.message);
  } finally {
    numberOfTests++;
  }
};

const createPost = async (postData: { title: string; content: string }) => {
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

const userPosts = async (username: string) => {
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
      let posts: Post[] = responseData.posts;

      if (posts.length === 0) {
        console.log(`${username} has no posts`);
      } else {
        posts.map((post: Post) => {
          return {
            title: post.title,
            content: post.content,
          };
        });

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

const followUnfollowUser = async (username: string, action: string) => {
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

const followInfo = async (username: string) => {
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

const logout = async () => {
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

const login = async (userData: { username: string; password: string }) => {
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

const search = async (searchTerm: string, expectedUsername: string) => {
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

const deleteUser = async (username: string) => {
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
      console.log(`Delete user test PASSED`);
      numberOfTestsPassed++;
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
  await signup({
    username: "test123",
    password: "test123",
    email: "test@email.com",
    rememberMeChecked: false,
  });
  console.log("------------------------------");
  await createPost({
    title: "testing create post",
    content: "this is a test post",
  });
  console.log("------------------------------");
  await userPosts("admin");
  console.log("------------------------------");
  await followUnfollowUser("admin", "follow");
  console.log("------------------------------");
  await followInfo("admin");
  console.log("------------------------------");
  await followUnfollowUser("admin", "unfollow");
  console.log("------------------------------");
  await followInfo("admin");
  console.log("------------------------------");
  await logout();
  console.log("------------------------------");
  await login({
    username: "admin",
    password: "genericpass123",
  });
  console.log("------------------------------");
  await search("t", "test123");
  console.log("------------------------------");
  await deleteUser("test123");
  console.log("------------------------------");
  console.log(`Tests complete: ${numberOfTestsPassed}/${numberOfTests} passed`);
  console.log("------------------------------");
})();
//Test end---------------------------------------------------------------------------
