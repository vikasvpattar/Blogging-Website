import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import Editor from "../Editor";

const EditPost = () => {
  const { id } = useParams();
  const [title, settitle] = useState("");
  const [summary, setsummary] = useState("");
  const [content, setcontent] = useState("");
  const [files, setFiles] = useState("");
  const [cover, setCover] = useState("");
  const [redirect, setRedirect] = useState(false);

  // the data of the post are fetched automatically when user clicks on edit button
  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/post/` + id).then(
      (response) => {
        response.json().then((postInfo) => {
          settitle(postInfo.title);
          setcontent(postInfo.content);
          setsummary(postInfo.summary);
        });
      }
    );
  }, []);
  // This function is invoked when update button is clicked
  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    // api is fetched data from the backend
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/post`,
      {
        method: "PUT",
        body: data,
        credentials: "include",
      }
    );
    if (response.ok) {
      setRedirect(true);
    }
  }
  // if redirect is true the user is moved to specific post
  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  return (
    <form action="" onSubmit={updatePost}>
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
      <button style={{ marginTop: "5px" }}>Update Post</button>
    </form>
  );
};

export default EditPost;
