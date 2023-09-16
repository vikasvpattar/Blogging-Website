import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        <Link to="/login" className="login">
          login
        </Link>
        <Link to="/register" className="register">
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;
