import { ChangeEvent, useState } from "react";
import { makeRequest } from "../API";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const maxContentCharCount = 300;
  const maxTitleCharCount = 50;

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputContent = event.target.value;
    if (inputContent.length <= maxTitleCharCount) {
      setTitle(event.target.value);
    } else {
      setTitle(inputContent.slice(0, maxTitleCharCount));
    }
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputContent = event.target.value;
    if (inputContent.length <= maxContentCharCount) {
      setContent(event.target.value);
    } else {
      setContent(inputContent.slice(0, maxContentCharCount));
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
      const { ok, data } = await makeRequest("/posts/createpost", "POST", post);

      if (ok) {
        console.log("Post created:", data.message);
        alert("Post created successfully!");
      } else {
        console.error("Post creation failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTitle("");
      setContent("");
    }
  };

  return (
    <>
      <h2>Create a post:</h2>
      <div className="create-post-container">
        <div className="title-container">
          <label htmlFor="post-title">Title (50 character limit):</label>
          <br />
          <input
            type="text"
            className="post-title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title..."
            required
          />
        </div>
        <div className="post-content-container">
          <label htmlFor="post-input-content">
            Post content (300 character limit):
          </label>
          <br />
          <textarea
            className="post-input-content"
            value={content}
            onChange={handleContentChange}
            placeholder="Share a gaming experience..."
            rows={6}
            cols={50}
            style={{ resize: "none" }}
          ></textarea>
        </div>
        <button className="submit-post-button" onClick={handlePostSubmit}>
          SUBMIT
        </button>
      </div>
    </>
  );
}
