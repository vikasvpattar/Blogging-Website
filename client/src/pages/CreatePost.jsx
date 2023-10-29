import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  // To store the title
  const [title, settitle] = useState("");
  // To store the summary
  const [summary, setsummary] = useState("");
  // To store the content
  const [content, setcontent] = useState("");
  // To store the thumbnail
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  // on form submission this function is invoked
  async function createNewPost(e) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    e.preventDefault();

    // api is fetched from backend to sore the data
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/post`,
      {
        method: "POST",
        body: data,
        credentials: "include",
      }
    );
    if (response.ok) {
      setRedirect(true);
    }
  }
  // after submitting the data, user will be navigated to home page
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form action="" onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => settitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setsummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <Editor onChange={setcontent} value={content} />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
};

export default CreatePost;
