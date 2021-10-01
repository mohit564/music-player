import React from "react";

function Loader() {
  return (
    <div className="position-fixed top-50 start-50 translate-middle">
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5 className="py-3">Loading...</h5>
      </div>
    </div>
  );
}

export default Loader;
