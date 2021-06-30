import React from "react";
import notfound from "../../assets/notfound.png";

const NotFound = () => {
  return (
    <div
      className="w-100 d-flex align-items-center justify-content-center"
      style={{ height: "calc(100vh - 58px)" }}
    >
      <div className="card p-3">
        <h3>This page doesn't exist</h3>
        <div>
          <img className="d-block mx-auto" src={notfound} alt="" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
