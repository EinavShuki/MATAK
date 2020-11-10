import React, { useState } from "react";
import { CgCloseO } from "react-icons/cg";

function RouteDetails() {
  const [permanent, setPermanent] = useState(false);
  return (
    <>
      <h1>Create a New Route</h1>

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
    </>
  );
}

export default RouteDetails;
