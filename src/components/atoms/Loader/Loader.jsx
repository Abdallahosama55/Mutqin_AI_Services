import React from "react";
import "./Loader.css";

export const Loader = ({ fontSmall }) => {
  return (
    <div className="text-center">
      <div
        className={`${fontSmall && "fontSize"} spinner-border`}
        role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
