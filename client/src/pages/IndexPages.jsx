import React, { useEffect, useState } from "react";
import Post from "../Post";

const IndexPages = () => {
  const [posts, setPosts] = useState([]);
  // The post data is automatically fetched when the page is loaded
  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/post`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {/* if posts are there then they are displayed */}
      {posts.length > 0 &&
        posts.map((post, index) => <Post key={index} {...post} />)}
      {posts.length <= 0 && <div>No Posts yet</div>}
    </>
  );
};

export default IndexPages;
