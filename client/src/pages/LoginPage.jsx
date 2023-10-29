import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContexr";

const LoginPage = () => {
  // To store the username
  const [username, setUserName] = useState("");
  // To store the password
  const [password, setPassword] = useState("");
  const [redirect, setredirect] = useState(false);
  const { setuserInfo } = useContext(UserContext);
  // this function is invoked when login button is clicked
  async function login(e) {
    e.preventDefault();
    // backend data is fetched
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/login`,
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    if (response.ok) {
      response.json().then((userInfo) => {
        setuserInfo(userInfo);
        setredirect(true);
      });
    } else {
      alert("wrong credentials");
    }
  }
  // If redirect is true then user is rendered to home page
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <form action="/login" className="login" onSubmit={login}>
        <h1>Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
