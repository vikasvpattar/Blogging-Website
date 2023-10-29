import React from "react";
import { useState } from "react";

const RegisterPage = () => {
  // To store username
  const [username, setUserName] = useState("");
  // To store password
  const [password, setPassword] = useState("");
  // when register button is clicked, this function is invoked
  async function register(e) {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/register`,
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status === 200) {
      alert("Registration successful");
    } else {
      alert("Registration failed");
    }
  }
  return (
    <div>
      <form action="" onSubmit={register} className="register">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
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
