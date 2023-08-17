import User from "./Post";

class Post {
  private _postId: number;
  private _content: string;
  private _timestamp: Date;
  private _likes: User[];

  constructor(postId: number, content: string, timestamp: Date) {
    this._postId = postId;
    this._content = content;
    this._timestamp = timestamp;
    this._likes = [];
  }

  likePost(user: User) {
    this._likes.push(user);
  }

  numOfLikes() {
    return this._likes.length;
  }
}

export default Post;
