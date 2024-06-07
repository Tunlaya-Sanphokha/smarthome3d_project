import React, { useState, useEffect } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './Model.jsx';
import mqtt from 'mqtt';



const Controller = () => {
  const [activeTab, setActiveTab] = useState("LivingRoom");
  const [selectedDivDoor, setSelectedDivDoor] = useState("OFF");
  const [selectedDivPlug1, setSelectedDivPlug1] = useState("OFF");
  const [selectedDivPlug2, setSelectedDivPlug2] = useState("OFF");
  const [selectedDivWP, setSelectedDivWP] = useState("OFF");
  const [fanValue, setFanValue] = useState("OFF");
  const [fanRotation, setFanRotation] = useState(false);

  
  /////////// Livingroom
  const [sensorTemp, setSensorTemp] = useState("0");
  const [sensorHumidityLiving, setSensorHumiLiving] = useState("0");
  const [sensorDustPM, setSensorDustPM] = useState("0");
  const [sensorDustPM10, setSensorDustPM10] = useState("0");
  const [sensorDustPM2_5, setSensorDustPM12_5] = useState("0");

  /////////Bathroom
  const [sensorTempBath, setSensorTempBath] = useState("0");
  const [sensorHumiditybath, setSensorHumidityBath] = useState("0");
  const [sensorSmoke, setSensorSmoke] = useState("0");
  
  //////// Outside
  const [sensorMoisture, setSensorMoisture] = useState("0");

  ////////displaypopup
  const [displayPopUp, setDisplayPopup] = useState("");
  const [showPopup, setShowPopUp] = useState("");

  useEffect(() => {
    const mqttClient = mqtt.connect('ws://192.168.192.251:9001/mqtt', {
      username: 'homeassistant', 
      password: 'de2454reki'  
    });

    
    mqttClient.on('connect', () => {
      console.log('MQTT connection success');
      setDisplayPopup('MQTT connection success');
      setShowPopUp("success");

      // Subscribe to topics to receive sensor data

      //--------------Livingroom-----------------
      mqttClient.subscribe('myhome/groundfloor/livingroom/Door');
      mqttClient.subscribe('myhome/groundfloor/livingroom/Plug1');
      mqttClient.subscribe('myhome/groundfloor/livingroom/Plug2');
      mqttClient.subscribe('myhome/groundfloor/livingroom/humid');
      mqttClient.subscribe('myhome/groundfloor/livingroom/PM/1');
      mqttClient.subscribe('myhome/groundfloor/livingroom/PM/2_5');
      mqttClient.subscribe('myhome/groundfloor/livingroom/PM/10');

      //---------------Bath---------------------
      mqttClient.subscribe('myhome/groundfloor/Bathroom/temp');
      mqttClient.subscribe('myhome/groundfloor/Bathroom/humid');
      mqttClient.subscribe('myhome/groundfloor/Bathroom/smoke');
      mqttClient.subscribe('myhome/groundfloor/Bathroom/fan');

      //--------------Outside------------------
      mqttClient.subscribe('myhome/groundfloor/garden/Moisture');
      mqttClient.subscribe('myhome/groundfloor/garden/Mrelay');
    });

    mqttClient.on('message', (topic, message) => {
      const value = JSON.parse(message.toString());
      switch (topic) {
        case 'myhome/groundfloor/livingroom/Door':
          setSelectedDivDoor(value.Door_Relay);
          break;
        case 'myhome/groundfloor/livingroom/Plug1':
          setSelectedDivPlug1(value.PLUG1);
          break;
        case 'myhome/groundfloor/livingroom/Plug2':
          setSelectedDivPlug2(value.PLUG2);
          break;  
        case 'myhome/groundfloor/livingroom/temp':
          setSensorTemp(value.LR_TEMP);
          break;
        case 'myhome/groundfloor/livingroom/humid':
          setSensorHumiLiving(value.LR_HUMID);
          break;
        case 'myhome/groundfloor/livingroom/PM/1':
          setSensorDustPM(value.PM10m);
          break;
        case 'myhome/groundfloor/livingroom/PM/2_5':
          setSensorDustPM12_5(value.PM25m);
          break;
        case 'myhome/groundfloor/livingroom/PM/10':
          setSensorDustPM10(value.PM100m);
          break;
        case 'myhome/groundfloor/Bathroom/temp':
          setSensorTempBath(value.BR_TEMP);
          break;
        case 'myhome/groundfloor/Bathroom/humid':
          setSensorHumidityBath(value.BR_HUMID);
          break;
        case 'myhome/groundfloor/Bathroom/smoke':
          setSensorSmoke(value.BR_MQ2);
          break;
        case 'myhome/groundfloor/Bathroom/fan':
          setFanValue(value.BR_FAN);
          break;       
        case 'myhome/groundfloor/garden/Moisture':
          // Assuming value is an object, you can convert it to string for display
          setSensorMoisture(value.Soil_Moisture);
          break;
        case 'myhome/groundfloor/garden/Mrelay':
          // Assuming value is an object, you can convert it to string for display
          setSelectedDivWP(value.M_Relay);
          break;
        default:
          break;
      }
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  const publishMQTTMessage = (topic, message) => {
    const mqttClient = mqtt.connect('ws://192.168.192.251:9001/mqtt');

    const connectionTimeout = setTimeout(() => {
      console.warn('MQTT connection Time Out');
      setDisplayPopup("MQTT connection time out");
      setShowPopUp("timeout");
      mqttClient.end();
    }, 10000);

    mqttClient.on('connect', () => {
      clearTimeout(connectionTimeout);
      mqttClient.publish(topic, message, {}, (error) => {
        if (error) {
          console.error('MQTT message sending failed:', error);
          setDisplayPopup("MQTT message sending failed:" + error);
          setShowPopUp("alert");
        } else {
          console.log("succesfully connect");
          console.log(`Send MQTT message to ${topic}: ${message}`);
        }
        mqttClient.end();
      });
    });

    mqttClient.on('error', (error) => {
      console.error('MQTT connection error:', error);
      setDisplayPopup("MQTT connection error");
      setShowPopUp("alert");
      mqttClient.end();
    });
  };

  const handleDoorLock = (state) => {
    setSelectedDivDoor(state);
    publishMQTTMessage('myhome/groundfloor/livingroom/door', state);
  };

  const handlePlug1 = (state) => {
    setSelectedDivPlug1(state);
    publishMQTTMessage('myhome/groundfloor/livingroom/plug1', state);
  };

  const handlePlug2 = (state) => {
    setSelectedDivPlug2(state);
    publishMQTTMessage('myhome/groundfloor/livingroom/plug2', state);
  };


  const handleFan = (state) => {
    setFanValue(state);
    setFanRotation(state === "ON");
    publishMQTTMessage('myhome/groundfloor/bathroom/fan', state);
  };

  const handleWaterPump = (state) => {
    setSelectedDivWP(state);
    publishMQTTMessage('myhome/groundfloor/garden/mrelay', state);
  };

  const room = (roomName) => {
    setActiveTab(roomName);
  };

  const showPopUp = (showPopUp) => {
    setShowPopUp(showPopUp);
  };

  return (
    <>
      <Canvas camera={{ position: [0, 0, 50], fov: 80 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <Model rotation={[0, Math.PI / 2, 0]} fanRotation={fanRotation} room={room} />
      </Canvas>
     
      <div className="ui">
        
        <div className ={`${showPopup === "alert" ? "alert" : "none"}`}>
          {displayPopUp}
          <span className = {`${showPopup}`} 
          onClick={() => showPopUp("none")}>&times;</span> 
        </div>

        <div className ={`${showPopup === "success" ? "success" : "none"}`}>
          {displayPopUp}
          <span className = {`${showPopup}`} 
          onClick={() => showPopUp("none")}>&times;</span> 
        </div>

        <div className ={`${showPopup === "timeout" ? "timeout" : "none"}`}>
          {displayPopUp}
          <span className = {`${showPopup}`} 
          onClick={() => showPopUp("none")}>&times;</span> 
        </div>

        <div className="tab">
          <button
            className={`tablinks ${activeTab === "LivingRoom" ? "active" : ""}`}
            onClick={() => room("LivingRoom")}
          >
            LivingRoom
          </button>

          <button
            className={`tablinks ${activeTab === "DoorLock" ? "active" : ""}`}
            onClick={() => room("DoorLock")}
          >
            DoorLock
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
            <tbody>
              <tr>
                <td>
                  <h3>Plug1: </h3>
                </td>
                <td>
                  <div className="button-container">
                    <button className="button buttonONplug1" onClick={() => handlePlug1("ON")}>ON</button>
                    <button className="button buttonOFFplug1" onClick={() => handlePlug1("OFF")}>OFF</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Plug: </h3>
                </td>
                <td>
                  <div className="button-container">
                    <button className="button buttonONplug" onClick={() => handlePlug2("ON")}>ON</button>
                    <button className="button buttonOFFplug" onClick={() => handlePlug2("OFF")}>OFF</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="DoorLock" className={`tabcontent ${activeTab === "DoorLock" ? "show" : "hide"}`}>
          <table>
            <tbody>
              <tr>
                <td>
                  <h3>DoorLock </h3>
                </td>
                <td>
                  <div className="button-container">
                    <button className="button buttonONdoor" onClick={() => handleDoorLock("ON")}>ON</button>
                    <button className="button buttonOFFdoor" onClick={() => handleDoorLock("OFF")}>OFF</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        
        <div id="BathRoom" className={`tabcontent ${activeTab === "BathRoom" ? "show" : "hide"}`}>
          <table>
            <tbody>
              <tr>
                <td>
                  <h3>Fan: </h3>
                </td>
                <td>
                  <div className="button-container">
                    <button className="button buttonONbath" onClick={() => handleFan("ON")}>ON</button>
                    <button className="button buttonOFFbath" onClick={() => handleFan("OFF")}>OFF</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="OutSide" className={`tabcontent ${activeTab === "OutSide" ? "show" : "hide"}`}>
          <table>
            <tbody>
              <tr>
                <td>
                  <h3>Water pump: </h3>
                </td>
                <td>
                  <div className="button-container">
                    <button className="button buttonONoutside" onClick={() => handleWaterPump("ON")}>ON</button>
                    <button className="button buttonOFFoutside" onClick={() => handleWaterPump("OFF")}>OFF</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="LivingRoom" className={`tabcontentDisplay ${activeTab === "LivingRoom" ? "show" : "hide"}`}>
          <h3>Plug1 : {selectedDivPlug1}</h3>
          <h3>Plug2 : {selectedDivPlug2}</h3>
          <h3>Temperature  : {sensorTemp} C</h3>
          <h3>Humidity : {sensorHumidityLiving} %</h3>
          <h3>Sensor DustPM1 : {sensorDustPM}  µg/m³</h3>
          <h3>Sensor DustPM2.5 : {sensorDustPM2_5}  µg/m³</h3>
          <h3>Sensor DustPM10 : {sensorDustPM10}  µg/m³</h3>

        </div>

        <div id="Doorlock" className={`tabcontentDisplay ${activeTab === "DoorLock" ? "show" : "hide"}`}>
          <h3>Door lock : {selectedDivDoor}</h3>
        </div>

        <div id="BathRoom" className={`tabcontentDisplay ${activeTab === "BathRoom" ? "show" : "hide"}`}>
          <h3>Fan : {fanValue}</h3>
          <h3>Temperature : {sensorTempBath} C</h3>
          <h3>Hunidity : {sensorHumiditybath} %</h3>
          <h3>Smoke Sensor : {sensorSmoke} %</h3>
        </div>

        <div id="OutSide" className={`tabcontentDisplay ${activeTab === "OutSide" ? "show" : "hide"}`}>
          <h3>Water Pump : {selectedDivWP}</h3>
          {/* Ensure sensorMoisture is rendered correctly */}
          <h3>Moisture Sensor : {sensorMoisture} %</h3>
        </div>
      </div>

    </>
  );
};

export default Controller;