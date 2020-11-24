import React from "react";
import "./StatusElement.css";
function StatusElement({ color, name, open }) {
  //   function hexToRGBA(hex, opacity) {
  //     return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }).concat(isFinite(opacity) ? opacity : 1).join(',') + ')';
  // }
  return (
    <div
      style={{ backgroundColor: `${color}CC` }}
      className={"status-item " + (open ? "active" : "")}
    >
      {name}
    </div>
  );
}

export default StatusElement;
