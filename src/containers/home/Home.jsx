import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [allScenarios, setAllScenarios] = useState([]);
  const [selectedScenarioID, setSelectedScenarioID] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/scenarios");
      setAllScenarios(res.data);
      setSelectedScenarioID(res.data[0].id);
    };
    fetchData();
  }, []);

  const scenarioDropdown = allScenarios.map((scenario) => {
    return (
      <option value={scenario.id} key={scenario.id}>
        {scenario.name}
      </option>
    );
  });

  const selectedScenario = allScenarios.find((scenario) => {
    return scenario.id === selectedScenarioID;
  });

  const renderTBody = selectedScenario?.vehicles.map((vehicle, idx) => {
    return (
      <tr key={vehicle.id}>
        <th>{idx + 1}</th>
        <th>{vehicle.vehicle_name}</th>
        <th>{vehicle.initial_position_x}</th>
        <th>{vehicle.initial_position_y}</th>
        <th>{vehicle.speed}</th>
        <th>{vehicle.time}</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    );
  });

  return (
    <div>
      <select onChange={(e) => setSelectedScenarioID(e.target.value)}>
        {scenarioDropdown}
      </select>
      <table>
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Vehicle Name</th>
            <th>Position X</th>
            <th>Position Y</th>
            <th>Speed</th>
            <th>Direction</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{renderTBody}</tbody>
      </table>
    </div>
  );
};

export default Home;
