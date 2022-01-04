import React, { useState } from "react";
import "./Homepage.css";
// import Login from "../Login/Login";
// import Logout from "../Logout/Logout";

export default function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="homepage-container">
      <div className="homepage-about">WELCOME TO MY BIRD APP</div>
      {/* <Login /> */}
    </div>
  );
}
