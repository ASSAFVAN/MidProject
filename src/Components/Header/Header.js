import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <nav className="navbar">
      <div className="navbar--left">
        <Link to="/">Homepage</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/myobs">My Observations</Link>
      </div>
    </nav>
  );
}
