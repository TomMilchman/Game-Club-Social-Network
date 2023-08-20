import User from "./Post";

class Post {
  public postId: number;
  public content: string;
  public timestamp: Date;
  public usernamesWhoLiked: string[];

  constructor(postId: number, content: string, timestamp: Date) {
    this.postId = postId;
    this.content = content;
    this.timestamp = timestamp;
    this.usernamesWhoLiked = [];
  }

  likePost(username: string) {
    this.usernamesWhoLiked.push(username);
  }

  unlikePost(usernameToRemove: string) {
    this.usernamesWhoLiked.filter((username) => username !== usernameToRemove);
  }

  numOfLikes() {
    return this.usernamesWhoLiked.length;
  }
}

export default Post;
