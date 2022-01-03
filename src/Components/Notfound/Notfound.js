import React from "react";
import { Link } from "react-router-dom";
import "./Notfound.css";

export default function Notfound() {
  return (
    <div className="not-found">
      <div className="not-found-wrap">
        <div>
          <i className="far fa-frown sad-icon"></i>
        </div>
        <div className="not-found--number">404</div>
        <h1>Page Not Found</h1>
        <p className="not-found--info">
          The page you are looking for doesn't exist or an other error occurred.
        </p>
        <Link to="/" className="not-found--link">
          Click here to go back to the Homepage
        </Link>
      </div>
    </div>
  );
}
