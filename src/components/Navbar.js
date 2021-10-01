import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand h1 mb-0">
            MyMusic
          </Link>
          <Link to="/Search" className="btn btn-primary">
            Search Song
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
