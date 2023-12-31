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
}

export default Post;
