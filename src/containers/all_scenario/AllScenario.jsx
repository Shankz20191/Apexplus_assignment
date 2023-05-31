import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import "./AllScenario.css";

const AllScenario = ({ setComponentToShow }) => {
  const [allScenarios, setAllScenarios] = useState([]);
  useEffect(() => {
    const data = async () => {
      const res = await axios.get(
        "https://expensive-bustling-peace.glitch.me/scenarios"
      );
      setAllScenarios(res.data);
    };
    data();
  }, []);
  const renderItem = allScenarios.map((scenario, idx) => {
    return (
      <tr key={scenario.id}>
        <td>{idx + 1}</td>
        <td>{scenario.name}</td>
        <td>{scenario.time}</td>
        <td>{scenario?.vehicles.length}</td>
        <td>
          <FaPlusCircle />
        </td>
        <td>
          <FaEdit />
        </td>
        <td>
          <FaTrash />
        </td>
      </tr>
    );
  });

  const handleClick = (scenario) => {
    setComponentToShow(scenario);
  };

  const deleteAll = async () => {
    allScenarios.map(async (scenario) => {
      console.log(
        await axios.delete(
          `https://expensive-bustling-peace.glitch.me/scenarios/${scenario.id}`
        )
      );
    });
    setAllScenarios([]);
  };

  return (
    <div className="container">
      <div className="header">
        <h3 className="title">All Scenario</h3>
        <div className="header-button">
          <button
            style={{ backgroundColor: "#118ab2" }}
            onClick={() => handleClick("add_scenario")}
          >
            New Scenario
          </button>
          <button
            style={{ backgroundColor: "#06d6a0" }}
            onClick={() => handleClick("add_vehicle")}
          >
            Add Vehicle
          </button>
          <button style={{ backgroundColor: "#ef476f" }} onClick={deleteAll}>
            Delete All
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Scenario ID</th>
            <th>Name</th>
            <th>Time</th>
            <th>Number of Vehicles</th>
            <th>Add Vehicle</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{renderItem}</tbody>
      </table>
    </div>
  );
};

export default AllScenario;
