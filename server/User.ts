import Post from "./Post";

class User {
  public username: string;
  public password: string;
  public email: string;
  public isAdmin: boolean;
  public following: User[];
  public followers: User[];
  public posts: Post[];
  public currentPostId: number; //When a new post is created, this will be its id

  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.isAdmin = false;
    this.following = [];
    this.followers = [];
    this.posts = [];
    this.currentPostId = 0;
    //this.lastLogin = lastLogin;
  }

  addPost(post: Post) {
    this.posts.push(post);
  }

  deletePost(postId: number) {
    this.posts.filter((post) => post.postId != postId);
  }
}

export default User;
