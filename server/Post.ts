import User from "./Post";

class Post {
  public postId: number;
  public content: string;
  public timestamp: Date;
  public likes: User[];

  constructor(postId: number, content: string, timestamp: Date) {
    this.postId = postId;
    this.content = content;
    this.timestamp = timestamp;
    this.likes = [];
  }

  likePost(user: User) {
    this.likes.push(user);
  }

  numOfLikes() {
    return this.likes.length;
  }
}

export default Post;
