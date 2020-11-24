import React from "react";
import "./StatusElement.css";
function StatusElement({ color, name, open }) {
  console.log(open);
  return (
    <div
      style={{ backgroundColor: color }}
      className={"status-item " + (open ? "active" : "")}
    >
      {name}
    </div>
  );
}

export default StatusElement;
