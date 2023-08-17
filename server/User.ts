import Post from "./Post";

class User {
  private _username: string;
  private _password: string;
  private _email: string;
  private _isAdmin: boolean;
  private _following: User[];
  private _followers: User[];
  private _posts: Post[];

  constructor(username, password, email) {
    this._username = username;
    this._password = password;
    this._email = email;
    this._isAdmin = false;
    this._following = [];
    this._followers = [];
    this._posts = [];
    //this.lastLogin = lastLogin;
  }

  get username(): string {
    return this.username;
  }

  get password(): string {
    return this.password;
  }

  set password(newPassword: string) {
    this.password = newPassword;
  }

  addPost(post: Post) {
    this._posts.push(post);
  }

  deletePost(postId: number) {
    this._posts.splice(postId, 1);
  }
}

export default User;
