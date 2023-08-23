import User from "./Post";

class Post {
  public postId: number;
  public title: string;
  public content: string;
  public timestamp: Date;
  public usernamesWhoLiked: string[];

  constructor(postId: number, title: string, content: string, timestamp: Date) {
    this.postId = postId;
    this.title = title;
    this.content = content;
    this.timestamp = timestamp;
    this.usernamesWhoLiked = [];
  }

  likePost(usernameToAdd: string) {
    this.usernamesWhoLiked.push(usernameToAdd);
  }

  unlikePost(usernameToRemove: string) {
    this.usernamesWhoLiked.filter((username) => username !== usernameToRemove);
  }

  numOfLikes(): number {
    return this.usernamesWhoLiked.length;
  }
}

export default Post;
