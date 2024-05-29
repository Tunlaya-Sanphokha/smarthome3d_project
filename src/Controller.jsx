import React, { useState } from "react";

const Controller = () => {
  const [activeTab, setActiveTab] = useState("LivingRoom");

  const openCity = (cityName) => {
    setActiveTab(cityName);
  };

  return (
    <div className="ui">
      <div className="tab">
        <button
          className={`tablinks ${activeTab === "LivingRoom" ? "active" : ""}`}
          onClick={() => openCity("LivingRoom")}
        >
          LivingRoom
        </button>
        <button
          className={`tablinks ${activeTab === "BedRooom" ? "active" : ""}`}
          onClick={() => openCity("BedRooom")}
        >
          BedRooom
        </button>
        <button
          className={`tablinks ${activeTab === "BathRoom" ? "active" : ""}`}
          onClick={() => openCity("BathRoom")}
        >
          BathRoom
        </button>
        <button
          className={`tablinks ${activeTab === "OutSide" ? "active" : ""}`}
          onClick={() => openCity("OutSide")}
        >
          OutSide
        </button>
      </div>

      <div id="LivingRoom" className={`tabcontent ${activeTab === "LivingRoom" ? "show" : "hide"}`}>
        <h3>LivingRoom</h3>
        <p>London is the capital city of England.</p>
      </div>

      <div id="BedRooom" className={`tabcontent ${activeTab === "BedRooom" ? "show" : "hide"}`}>
        <h3>BedRooom</h3>
        <p>Paris is the capital of France.</p>
      </div>

      <div id="BathRoom" className={`tabcontent ${activeTab === "BathRoom" ? "show" : "hide"}`}>
        <h3>BathRoom</h3>
        <p>Tokyo is the capital of Japan.</p>
      </div>

      <div id="OutSide" className={`tabcontent ${activeTab === "OutSide" ? "show" : "hide"}`}>
        <h3>OutSide</h3>
        <p>Tokyo is the capital of Japan.</p>
      </div>
    </div>
  );
};

export default Controller;
