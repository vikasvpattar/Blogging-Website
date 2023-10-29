import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContexr";

const Header = () => {
  const { setuserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/profile`, {
      credentials: "include",
    })
      .then((response) => {
        response.json();
      })
      .then((userInfo) => {
        setuserInfo(userInfo);
      });
  }, []);

  function logout() {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setuserInfo(null);
  }

  const username = userInfo?.username;
  return (
    <header className="header">
      <Link to="/" className="logo">
        Dev Blog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="create">Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="login">
              login
            </Link>
            <Link to="/register" className="register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
