import React from "react";
import { ImAppleinc } from "react-icons/im";
import { ROUTE_DETAILS_PAGE } from "../../../constants/pageConstants";
import { REPORTING_PAGE } from "../../../constants/pageConstants";

function Options({ setPage }) {
  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      <div
        onClick={() =>
          setPage({
            open: ROUTE_DETAILS_PAGE,
          })
        }
        className="list-item"
      >
        <ImAppleinc />
        <li>New Route Request</li>
      </div>

      <div
        onClick={() =>
          setPage({
            open: REPORTING_PAGE,
          })
        }
        className="list-item"
      >
        <ImAppleinc />
        <li>Show Reports</li>
      </div>

      <div className="list-item">
        <ImAppleinc />
        <li>Routes History</li>
      </div>

      <div className="list-item">
        <ImAppleinc />
        <li>Status</li>
      </div>
    </ul>
  );
}

export default Options;
