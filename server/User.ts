import Post from "./Post";
import persist from "./persist";

enum LoginActivityType {
  LOGIN,
  LOGOUT,
  NEWPOST,
}

class User {
  public username: string;
  public password: string;
  public email: string;
  public isAdmin: boolean;
  public followedUsernames: string[];
  public followersUsernames: string[];
  public posts: Post[];
  public currentPostId: number; //When a new post is created, this will be its id
  public loginActivity: { type: LoginActivityType; timestamp: Date }[]; //An array holding the activity of the user

  constructor(
    username: string,
    password: string,
    email: string,
    isAdmin: boolean,
    following: string[],
    followers: string[],
    posts: Post[],
    currentPostId: number,
    loginActivity: { type: LoginActivityType; timestamp: Date }[]
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.isAdmin = isAdmin;
    this.followedUsernames = following;
    this.followersUsernames = followers;
    this.posts = posts;
    this.currentPostId = currentPostId;
    this.loginActivity = loginActivity;
  }

  addPost(post: Post) {
    this.posts.push(post);
  }

  deletePostById(postId: number) {
    this.posts.filter((post) => post.postId != postId);
  }

  addFollower(usernameToAdd: string) {
    this.followersUsernames.push(usernameToAdd);
  }

  removeFollower(userToRemove: string) {
    this.followersUsernames = this.followersUsernames.filter(
      (follower) => follower !== userToRemove
    );
  }

  addFollowing(usernameToAdd: string) {
    this.followedUsernames.push(usernameToAdd);
  }

  removeFollowing(usernameToRemove: string) {
    this.followedUsernames = this.followedUsernames.filter(
      (following) => following !== usernameToRemove
    );
  }

  async addLoginActivity() {
    this.loginActivity.push({
      type: LoginActivityType.LOGIN,
      timestamp: new Date(),
    });
    await persist.saveUsersData();
  }

  async addLogoutActivity() {
    this.loginActivity.push({
      type: LoginActivityType.LOGOUT,
      timestamp: new Date(),
    });
    await persist.saveUsersData();
  }

  async addNewPostActivity() {
    this.loginActivity.push({
      type: LoginActivityType.NEWPOST,
      timestamp: new Date(),
    });
    await persist.saveUsersData();
  }
}

export { User, LoginActivityType };
