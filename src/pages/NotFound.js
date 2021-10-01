import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container">
      <div className="row">
        <div className="col text-center py-5">
          <h1>Oops!</h1>
          <h2>404 Not Found</h2>
          <p>Sorry, an error has occured, Requested page not found!</p>
          <div className="py-2">
            <Link to="/" className="btn btn-primary">
              <i className="fa-solid fa-house pe-3" />
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
