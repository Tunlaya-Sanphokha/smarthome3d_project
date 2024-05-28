import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model } from "./Model.jsx";

const Scene = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <ambientLight />
    </>
  );
};

const App = () => {
  return (
    <Canvas>
      {/* OrbitControls provides rotation and zoom functionality */}
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true} 
        zoomSpeed={1.0} 
        rotateSpeed={1.0} 
        minDistance={5} 
        maxDistance={100} 
      />
      <Scene>

      </Scene>
    </Canvas>
  );
};

export default App;