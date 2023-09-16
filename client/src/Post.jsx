import React from "react";

const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt=""
        />
      </div>
      <div className="texts">
        <h2>What's a Blog & Why You Need One</h2>
        <p className="info">
          <a href="" className="author">
            Vikas V Pattar
          </a>
          <time>2023-09-15 16:55</time>
        </p>
        <p className="summary">
          Even if you‘re not sure what a blog is, you’ve no doubt come across
          one at some point in time. Perhaps you‘ve stumbled across a blog when
          you’ve searched “healthy dinner recipes”. In fact, if you're reading
          this, guess what? You're on a blog. (Very meta, I know.)
        </p>
      </div>
    </div>
  );
};

export default Post;
