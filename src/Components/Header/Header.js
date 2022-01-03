import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import "./Header.css";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar--left">
        <Link to="/">Homepage</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/myobs">My Observation</Link>
      </div>
      <Logout />
      {/* {isLoggedIn && <Logout />} */}
    </nav>
  );
}
