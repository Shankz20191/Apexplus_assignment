import React from "react";
import { pages } from "../../static";
import "./Sidebar.css";

const Sidebar = ({ handleClick }) => {
  return (
    <>
      <ul>
        <li>
          <button className="sidebarButton" onClick={() => handleClick("home")}>
            Home
          </button>
        </li>
        <li>
          <button
            className="sidebarButton"
            onClick={() => handleClick("all_scenario")}
          >
            All Scenario
          </button>
        </li>
        <li>
          <button
            className="sidebarButton"
            onClick={() => handleClick("add_scenario")}
          >
            Add Scenario
          </button>
        </li>
        <li>
          <button
            className="sidebarButton"
            onClick={() => handleClick("add_vehicle")}
          >
            Add Vehicle
          </button>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
