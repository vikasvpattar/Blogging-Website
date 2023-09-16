import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPages from "./pages/IndexPages";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <main>
                <IndexPages />
              </main>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
