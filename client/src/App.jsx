import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPages from "./pages/IndexPages";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContext, UserContextProvider } from "./UserContexr";
import CreatePost from "./pages/CreatePost";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPages />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreatePost />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
