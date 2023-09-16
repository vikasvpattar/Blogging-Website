import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  async function login(e) {
    e.preventDefault();
    await fetch("http://localhost:4000/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
  }
  return (
    <div>
      <form action="/login" className="login" onSubmit={login}>
        <h1>Login</h1>
        <input
          type="text"
          name=""
          id=""
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          name=""
          id=""
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
