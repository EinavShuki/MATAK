import React, { useState } from "react";
import "./RouteDetails.css";
import { CgCloseO } from "react-icons/cg";

function RouteDetails() {
  const [permanent, setPermanent] = useState(false);

  return (
    <div className="frosted route-details-window">
      <span id="close-button">
        <CgCloseO />
      </span>

      <div id="routeDetails-div">
        <h2 className="pb-2">Create New Route</h2>
        <button
          className={permanent ? "permanent-btn active" : "permanent-btn"}
          onClick={(e) => setPermanent(!permanent)}
        >
          Permanent
        </button>
        <button className="routeD-btn">Add a Line Route</button>
        <button className="routeD-btn">Add a Polygone Route</button>
        <button className="routeD-btn">Add a Point</button>
        <h4 className="pt-5">Add Manually:</h4>
        <label className="routeD-label" htmlFor="lat">
          Latitude:
        </label>
        <input type="text" name="lat" />
        <label htmlFor="lng">Longitude:</label>
        <input type="text" name="lng" />
        <button className="routeD-btn routeD-next">Next</button>
      </div>
    </div>
  );
}

export default RouteDetails;
