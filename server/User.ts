import Post from "./Post";
import persist from "./persist";

enum LoginActivityType {
  LOGIN,
  LOGOUT,
}

class User {
  public username: string;
  public password: string;
  public email: string;
  public isAdmin: boolean;
  public following: User[];
  public followers: User[];
  public posts: Post[];
  public currentPostId: number; //When a new post is created, this will be its id
  public loginActivity: { type: LoginActivityType; timestamp: Date }[]; //An array holding the activity of the user

  constructor(
    username: string,
    password: string,
    email: string,
    isAdmin: boolean,
    following: User[],
    followers: User[],
    posts: Post[],
    currentPostId: number,
    loginActivity: { type: LoginActivityType; timestamp: Date }[]
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.isAdmin = isAdmin;
    this.following = following;
    this.followers = followers;
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

  addFollower(user: User) {
    this.followers.push(user);
  }

  removeFollower(user: User) {
    this.followers.filter((follower) => follower.username != user.username);
  }

  addFollowing(user: User) {
    this.following.push(user);
  }

  removeFollowing(user: User) {
    this.following.filter((following) => following.username != user.username);
  }

  async addLogin() {
    this.loginActivity.push({
      type: LoginActivityType.LOGIN,
      timestamp: new Date(),
    });
    await persist.saveUsersData();
  }

  async addLogout() {
    this.loginActivity.push({
      type: LoginActivityType.LOGOUT,
      timestamp: new Date(),
    });
    await persist.saveUsersData();
  }
}

export { User, LoginActivityType };
