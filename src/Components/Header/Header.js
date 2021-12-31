import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <nav>
        <Link to="/">Homepage</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/myebird">My eBird</Link>
      </nav>
    </div>
  );
}
