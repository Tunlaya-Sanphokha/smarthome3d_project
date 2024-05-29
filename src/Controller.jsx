import React, { useState } from "react";

const Controller = () => {
  const [activeTab, setActiveTab] = useState("LivingRoom");
  const [selectedDivDoor, setSelectedDivDoor] = useState("");
  const [selectedDivPlug, setSelectedDivPlug] = useState("");
  const [selectedDivFan, setSelectedDivFan] = useState("");
  const [selectedDivWP, setSelectedDivWP] = useState("");
  const [sensor, setSensor] = useState("");

  const room = (room) => {
    setActiveTab(room);
  };

  return (
    <div className="ui">
      <div className="tab">
        <button
          className={`tablinks ${activeTab === "LivingRoom" ? "active" : ""}`}
          onClick={() => room("LivingRoom")}
        >
          LivingRoom
        </button>

        <button
          className={`tablinks ${activeTab === "BathRoom" ? "active" : ""}`}
          onClick={() => room("BathRoom")}
        >
          BathRoom
        </button>

        <button
          className={`tablinks ${activeTab === "OutSide" ? "active" : ""}`}
          onClick={() => room("OutSide")}
        >
          OutSide
        </button>
        
      </div>

      <div id="LivingRoom" className={`tabcontent ${activeTab === "LivingRoom" ? "show" : "hide"}`}>
          <table>
            <tr>
              <td>
                <h3>Door lock: </h3>
              </td>
              <td>
                <div className="button-container">
                  <button className="button buttonONdoor" onClick={() => setSelectedDivDoor("ON")}>ON</button>
                  <button className="button buttonOFFdoor" onClick={() => setSelectedDivDoor("OFF")}>OFF</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h3>Plug: </h3>
              </td>
              <td>
                <div className="button-container">
                  <button className="button buttonONplug" onClick={() => setSelectedDivPlug("ON")}>ON</button>
                  <button className="button buttonOFFplug" onClick={() => setSelectedDivPlug("OFF")}>OFF</button>
                </div>
              </td>
            </tr>
          </table>
      </div>

      <div id="BathRoom" className={`tabcontent ${activeTab === "BathRoom" ? "show" : "hide"}`}>
        <table>
          <tr>
            <td>
              <h3>Fan: </h3>
            </td>
            <td>
              <div className="button-container">
                <button className="button buttonONplug" onClick={() => setSelectedDivFan("ON")}>ON</button>
                <button className="button buttonOFFplug" onClick={() => setSelectedDivFan("OFF")}>OFF</button>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <div id="OutSide" className={`tabcontent ${activeTab === "OutSide" ? "show" : "hide"}`}>
      <table>
          <tr>
            <td>
              <h3>Water pump: </h3>
            </td>
            <td>
              <div className="button-container">
                <button className="button buttonONplug" onClick={() => setSelectedDivWP("ON")}>ON</button>
                <button className="button buttonOFFplug" onClick={() => setSelectedDivWP("OFF")}>OFF</button>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <div id="LivingRoom" className={`tabcontentDisplay ${activeTab === "LivingRoom" ? "show" : "hide"}`}>
        {<h3>Door lock : {selectedDivDoor}</h3>}
        {<h3>Plug : {selectedDivPlug}</h3>}
        {<h3>Sensor : {sensor}</h3>}
      </div>

      <div id="BathRoom" className={`tabcontentDisplay ${activeTab === "BathRoom" ? "show" : "hide"}`}>
        {<h3>Fan : {selectedDivFan}</h3>}
        {<h3>Sensor : {sensor}</h3>}
      </div>

      <div id="OutSide" className={`tabcontentDisplay ${activeTab === "OutSide" ? "show" : "hide"}`}>
        {<h3>Water Pump : {selectedDivWP}</h3>}
        {<h3>Sensor : {sensor}</h3>}
      </div>


    </div>
  );
};

export default Controller;
