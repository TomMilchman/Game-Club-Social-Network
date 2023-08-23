import { ChangeEvent, useState } from "react";

export default function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const maxCharCount = 300;

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputContent = event.target.value;
    if (inputContent.length <= maxCharCount) {
      setContent(event.target.value);
    } else {
      setContent(inputContent.slice(0, maxCharCount));
    }
  };

  const handlePostSubmit = async () => {
    const post = {
      title: title,
      content: content,
    };

    if (title === "" || content === "") {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/posts/createpost", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      const responseData = await response.json();
      if (response.ok) {
        console.log("Post created:", responseData.message);
        alert("Post created successfully!");
      } else {
        console.error("Post creation failed:", responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create a post:</h2>
      <div className="title-container">
        <label htmlFor="post-title">Title:</label>
        <input
          type="text"
          id="post-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="post-content-container">
        <label htmlFor="post-input-content">
          Post content (300 character limit):
        </label>
        <textarea
          id="post-input-content"
          value={content}
          onChange={handleContentChange}
          placeholder="Share a gaming experience..."
          rows={1}
          style={{ resize: "none" }}
        ></textarea>
      </div>
      <button className="submit-post-button" onClick={handlePostSubmit}>
        SUBMIT
      </button>
    </div>
  );
}
