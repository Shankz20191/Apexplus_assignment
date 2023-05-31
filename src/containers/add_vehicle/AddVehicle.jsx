import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import "./AddVehicle.css";

const AddVehicle = ({ setComponentToShow }) => {
  const [allScenarios, setAllScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleSpeed, setVehicleSpeed] = useState("");
  const [vehiclePositionX, setVehiclePositionX] = useState("");
  const [vehiclePositionY, setVehiclePositionY] = useState("");
  const [vehicleDirection, setVehicleDirection] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://expensive-bustling-peace.glitch.me/scenarios"
      );
      setAllScenarios(res.data);
      setSelectedScenario(res.data[0].id);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const tempVehicle = {
      id: uuidv4(),
      vehicle_name: vehicleName,
      initial_position_x: vehiclePositionX,
      initial_position_y: vehiclePositionY,
      speed: vehicleSpeed,
      direction: vehicleDirection,
    };

    const addVehicle = async () => {
      const res = await axios.get(
        `https://expensive-bustling-peace.glitch.me/scenarios/${selectedScenario}`
      );

      console.log(res.data.vehicles);
      const updatedScenario = {
        ...res.data,
        vehicles: [...res.data.vehicles, tempVehicle],
      };

      await axios.patch(
        `https://expensive-bustling-peace.glitch.me/scenarios/${selectedScenario}`,
        updatedScenario
      );
    };
    addVehicle();
  };

  const handleReset = () => {
    setSelectedScenario(allScenarios[0].id);
    setVehicleName("");
    setVehicleSpeed("");
    setVehiclePositionX("");
    setVehiclePositionY("");
    setVehicleDirection("");
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Add Vehicle</h2>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="add-vehicle-input-container">
            <select onChange={(e) => setSelectedScenario(e.target.value)}>
              {scenarioDropdown}
            </select>
            <input
              type="text"
              placeholder="Vehicle Name"
              onChange={(e) => setVehicleName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Vehicle Speed"
              onChange={(e) => setVehicleSpeed(e.target.value)}
            />
            <input
              type="number"
              placeholder="Position X"
              onChange={(e) => setVehiclePositionX(e.target.value)}
            />
            <input
              type="number"
              placeholder="Position Y"
              onChange={(e) => setVehiclePositionY(e.target.value)}
            />
            <select onChange={(e) => setVehicleDirection(e.target.value)}>
              <option>Upward</option>
              <option>Downward</option>
              <option>Forward</option>
              <option>Backward</option>
            </select>
          </div>
          <div className="button-container">
            <button type="submit" style={{ backgroundColor: "#06d6a0" }}>
              Add Vehicle
            </button>
            <button
              type="button"
              style={{ backgroundColor: "#ef476f" }}
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              onClick={() => setComponentToShow("home")}
              type="button"
              style={{ backgroundColor: "#118ab2" }}
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
