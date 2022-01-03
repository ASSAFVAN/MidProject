import React, { useState } from "react";
import Login from "../Login/Login";
// import Logout from "../Logout/Logout";

export default function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <div>WELCOME TO MY BIRD APP</div>
      <Login />
    </div>
  );
}
