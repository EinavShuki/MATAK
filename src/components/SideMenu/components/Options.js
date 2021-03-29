import React from "react";
import { ImAppleinc } from "react-icons/im";
import { FaSearch, FaMapMarked, FaHistory } from "react-icons/fa";
import { ROUTE_DETAILS_PAGE } from "../../../constants/pageConstants";
import { REPORTING_PAGE } from "../../../constants/pageConstants";
import {Link} from "react-router-dom";
import {BsBriefcase} from "react-icons/all";

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
        <FaMapMarked />
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
        <FaSearch />
        <li>Search Routes</li>
      </div>

      <div className="list-item">
        <FaHistory />
        <li>Routes History</li>
      </div>

      <div className="list-item">
        <ImAppleinc />
        <li>Status</li>
      </div>
        <Link to={`/routes-management`}>
           <div className="list-item">
              <BsBriefcase />
              <li>Route Management</li>
           </div>
        </Link>
    </ul>
  );
}

export default Options;
