import React from "react";
import CommonAddIcon from "./CommonAddIcon";

const CommonButton = ({ name, type }) => {
  return (
    <a href="add-ipo.html">
      <button className="btn btn-primary" type={type}>
        <span class="svg-icon svg-icon-2">
          <CommonAddIcon />
        </span>
        {name}
      </button>
    </a>
  );
};

export default CommonButton;
