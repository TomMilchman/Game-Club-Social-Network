import Post from "./Post";

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
}

export { User, LoginActivityType };
