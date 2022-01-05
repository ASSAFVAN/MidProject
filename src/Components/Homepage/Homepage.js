import React from "react";
import "./Homepage.css";

export default function Homepage() {
  return (
    <div className="homepage-container">
      <div className="homepage-preview">
        <h1 className="homepage-title">WELCOME TO MY BIRD APP</h1>
        <p className="homepage-about">
          Being a true birder means go outside and enjoy watching birds. Finding
          the birds location isn't a simple task. My app helps me to get
          information from other birders observations and also handle all my own
          observations, so it is easier to locate the birds the next time and
          getting a nice photographs of them.
        </p>
      </div>

      <div className="bird-container bird-container--one">
        <div className="bird bird--one"></div>
      </div>

      <div className="bird-container bird-container--two">
        <div className="bird bird--two"></div>
      </div>

      <div className="bird-container bird-container--three">
        <div className="bird bird--three"></div>
      </div>

      <div className="bird-container bird-container--four">
        <div className="bird bird--four"></div>
      </div>
    </div>
  );
}
