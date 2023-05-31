import React, { useState } from "react";
import "./Main.css";
import Sidebar from "../components/sidebar/Sidebar";
import AllScenario from "./all_scenario/AllScenario";
import AddScenario from "./add_scenario/AddScenario";
import AddVehicle from "./add_vehicle/AddVehicle";
import Home from "./home/Home";

const Main = () => {
  const [componentToShow, setComponentToShow] = useState("home");
  const handleClick = (component) => {
    setComponentToShow(component);
  };

  const renderComponent = () => {
    if (componentToShow === "home") return <Home />;
    if (componentToShow === "all_scenario")
      return <AllScenario setComponentToShow={setComponentToShow} />;
    if (componentToShow === "add_scenario")
      return <AddScenario setComponentToShow={setComponentToShow} />;
    if (componentToShow === "add_vehicle")
      return <AddVehicle setComponentToShow={setComponentToShow} />;
  };
  return (
    <main className="row">
      <section className="left">
        <Sidebar handleClick={handleClick} />
      </section>
      <section className="right">{renderComponent()}</section>
    </main>
  );
};

export default Main;
