import React from "react";
import { useState } from "react";

const RegisterPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  async function register(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("Registration sucessful");
    } else {
      alert("Registration fail");
    }
  }
  return (
    <div>
      <form action="" onSubmit={register} className="register">
        <h1>Register</h1>
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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
