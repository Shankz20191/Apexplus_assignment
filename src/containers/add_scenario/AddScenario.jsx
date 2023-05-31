import React, { useState } from "react";
import Form from "../../components/form/Form";
import "./AddScenario.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const AddScenario = ({ setComponentToShow }) => {
  const [scenarioName, setScenarioName] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newScenario = {
      id: uuidv4(),
      name: scenarioName,
      time: time,
      vehicles: [],
    };

    axios.post(
      "https://expensive-bustling-peace.glitch.me/scenarios",
      newScenario
    );
    setScenarioName("");
    setTime("");
    console.log(e);
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Add Scenario</h2>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="input-label">
              <label>Scenario Name</label>
              <input
                onChange={(e) => setScenarioName(e.target.value)}
                placeholder="Scenario Name"
                value={scenarioName}
                type="text"
                required
              />
            </div>
            <div className="input-label">
              <label>Scenario Time(Seconds)</label>
              <input
                onChange={(e) => setTime(e.target.value)}
                value={time}
                placeholder="Time"
                type="number"
                name="Time"
                required
              />
            </div>
          </div>
          <div className="button-container">
            <button
              className="formButton"
              type="submit"
              style={{ backgroundColor: "#06d6a0" }}
            >
              Add Scenario
            </button>
            <button
              style={{ backgroundColor: "#ef476f" }}
              type="button"
              onClick={() => {
                setScenarioName("");
                setTime("");
              }}
            >
              Reset
            </button>
            <button
              type="button"
              style={{ backgroundColor: "#118ab2" }}
              onClick={() => setComponentToShow("home")}
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScenario;
