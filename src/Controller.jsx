import React, { useState, useEffect } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './Model.jsx';
import mqtt from 'mqtt';

const Controller = () => {
  const [activeTab, setActiveTab] = useState("LivingRoom");
  const [selectedDivDoor, setSelectedDivDoor] = useState("");
  const [selectedDivPlug, setSelectedDivPlug] = useState("");
  const [selectedDivWP, setSelectedDivWP] = useState("");
  const [fanRotation, setFanRotation] = useState(false);
  

  /////////// Livingroom
  const [sensorTemp, setSensorTemp] = useState("");
  const [sensorHumidityLiving, setSensorHumiLiving] = useState("");
  const [sensorDustPM, setSensorDustPM] = useState("");
  const [sensorDustPM10, setSensorDustPM10] = useState("");
  const [sensorDustPM2_5, setSensorDustPM12_5] = useState("");

  /////////Bathroom
  const [sensorTempBath, setSensorTempBath] = useState("");
  const [sensorHumiditybath, setSensorHumidityBath] = useState("");
  const [sensorSmoke, setSensorSmoke] = useState("");
  const [fanValue, setFanValue] = useState("");
  
  //////// Outside
  const [sensorMoisture, setSensorMoisture] = useState("");

  ////////displaypopup
  const [displayPopUp, setDisplayPopup] = useState("");
  const [showPopup, setShowPopUp] = useState("");

  useEffect(() => {
    const mqttClient = mqtt.connect('ws://192.168.143.251:9001/mqtt', {
      username: 'homeassistant', 
      password: 'de2454reki'  
    });

    
    mqttClient.on('connect', () => {
      console.log('MQTT connection success');
      setDisplayPopup('MQTT connection success')
      setShowPopUp("success");

      // Subscribe to topics to receive sensor data

      //--------------Livingroom-----------------
      mqttClient.subscribe('myhome/groundfloor/livingroom/temp');
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
    });

    mqttClient.on('message', (topic, message) => {
      const value = JSON.parse(message.toString());
      switch (topic) {
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
          setSensorMoisture(value);
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
    const mqttClient = mqtt.connect('ws://192.168.143.251:9001/mqtt');
    mqttClient.on('connect', () => {
      mqttClient.publish(topic, message, {}, (error) => {
        if (error) {
          console.error('MQTT message sending failed:', error);
          setDisplayPopup("MQTT message sending failed:" + error)
          setShowPopUp("alert");
        } else {
          console.log("succesfully connect")
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

  const handlePlug = (state) => {
    setSelectedDivPlug(state);
    publishMQTTMessage('myhome/groundfloor/livingroom/plug', state);
  };

  const handleFan = (state) => {
    setFanValue(state);
    setFanRotation(state === "ON");
    publishMQTTMessage('myhome/groundfloor/bathroom/fan', state);
  };

  const handleWaterPump = (state) => {
    setSelectedDivWP(state);
    publishMQTTMessage('myhome/groundfloor/garden/waterpump', state);
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
            <tbody>
              <tr>
                <td>
                  <h3>Door lock: </h3>
                </td>
                <td>
                  <div className="button-container">
                    <button className="button buttonONdoor" onClick={() => handleDoorLock("ON")}>ON</button>
                    <button className="button buttonOFFdoor" onClick={() => handleDoorLock("OFF")}>OFF</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Plug: </h3>
                </td>
                <td>
                  <div className="button-container">
                    <button className="button buttonONplug" onClick={() => handlePlug("ON")}>ON</button>
                    <button className="button buttonOFFplug" onClick={() => handlePlug("OFF")}>OFF</button>
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
          <h3>Door lock : {selectedDivDoor}</h3>
          <h3>Plug : {selectedDivPlug}</h3>
          <h3>Temperature  : {sensorTemp}</h3>
          <h3>Humidity : {sensorHumidityLiving}</h3>
          <h3>Sensor DustPM : {sensorDustPM}</h3>
          <h3>Sensor DustPM10 : {sensorDustPM10}</h3>
          <h3>Sensor DustPM2_5 : {sensorDustPM2_5}</h3>
        </div>

        <div id="BathRoom" className={`tabcontentDisplay ${activeTab === "BathRoom" ? "show" : "hide"}`}>
          <h3>Fan : {fanValue}</h3>
          <h3>Temperature : {sensorTempBath}</h3>
          <h3>Hunidity : {sensorHumiditybath}</h3>
          <h3>Smoke Sensor : {sensorSmoke}</h3>
        </div>

        <div id="OutSide" className={`tabcontentDisplay ${activeTab === "OutSide" ? "show" : "hide"}`}>
          <h3>Water Pump : {selectedDivWP}</h3>
          <h3>Moisture Sensor : {sensorMoisture}</h3>
        </div>
      </div>

    </>
  );
};

export default Controller;
