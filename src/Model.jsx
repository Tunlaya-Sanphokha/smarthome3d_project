import React, { useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';



export function Model({ fanRotation, room }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/Model.glb');
  const { actions } = useAnimations(animations, group);
  useGLTF.preload('/Model.glb');

  
  // Reference for the fan mesh
  const fanRef = useRef();
  const sensorDoorLivingRef = useRef();


  // Use useFrame to rotate the fan
  useFrame(() => {
    if (fanRotation) {
      fanRef.current.rotation.z += 0.4; 
    }
  });



  materials.floor.color.set('#36454F');

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">

        <group name="fan" ref={fanRef} position={[8.819, 9.283, -22.805]} scale={0.967}>
          <mesh geometry={nodes.fan.geometry} material={materials.fan} />
        </group>

        <group name="AreaLightBed" position={[-7.663, 12.009, -16.475]} scale={1.106}>
          <spotLight
            name="AreaLightBed_Orientation"
            intensity={1}
            angle={Math.PI / 0.5}
            penumbra={0.15}
            decay={2}
            color="#fff8e2"
          />
        </group>
        <group name="AreaLightBath" position={[6.797, 12.065, -16.627]} scale={1.09}>
          <spotLight
            name="AreaLightBath_Orientation"
            intensity={1}
            angle={Math.PI / 0.5}
            penumbra={0.15}
            decay={2}
            color="#fff8e2"
          />
        </group>
        <group name="AreaLightLiving" position={[6.723, 12.17, -3.627]} scale={1.878}>
          <spotLight
            name="AreaLightLiving_Orientation"
            intensity={1}
            angle={Math.PI / 3 }
            penumbra={0.15}
            decay={2}
            color="#fff8e2"
          />
        </group>

        <mesh name="Cylinder" geometry={nodes.Cylinder.geometry} material={materials.toilet} position={[5.135, 1.127, -20.145]} scale={[0.894, 0.74, 0.903]} />
        <mesh name="Circle" geometry={nodes.Circle.geometry} material={materials.fan} position={[8.793, 9.288, -22.976]} rotation={[Math.PI / 2, 0, 0]} scale={1.687} />
        <mesh name="Cube003" geometry={nodes.Cube003.geometry} material={materials.floor1} position={[18.606, 0, -9.193]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, -0.251]} />
        <mesh name="wall" geometry={nodes.wall.geometry} material={materials.floor} position={[-1.204, 6.243, 5.765]} />
        <mesh name="doorLiving" geometry={nodes.doorLiving.geometry} material={materials.door} position={[3.306, 8.323, 3.889]} />
        <mesh name="doorBath" geometry={nodes.doorBath.geometry} material={materials.door} position={[-3.98, 8.319, -12.261]} />
        <mesh name="doorBed" geometry={nodes.doorBed.geometry} material={materials.door} position={[-9.854, 8.323, -12.332]} />
        <mesh name="sofa" geometry={nodes.sofa.geometry} material={materials.sofa} position={[2.25, 1.185, -1.387]} />
        <group name="Cube023" position={[-11.368, 3.542, -6.087]} scale={0.074}>
          <mesh name="Cube" geometry={nodes.Cube.geometry} material={materials.kitchen4} />
          <mesh name="Cube_1" geometry={nodes.Cube_1.geometry} material={materials.kitchen2} />
        </group>
        <group name="Cube028" position={[-11.516, 1.647, -2.81]} scale={0.071}>
          <mesh name="Cube030" geometry={nodes.Cube030.geometry} material={materials.kitchen4} />
          <mesh name="Cube030_1" geometry={nodes.Cube030_1.geometry} material={materials.kitchen1} />
          <mesh name="Cube030_2" geometry={nodes.Cube030_2.geometry} material={materials.kitchen} />
        </group>
        <mesh name="fence" geometry={nodes.fence.geometry} material={materials.wood} position={[14.54, 1.304, -23.696]} rotation={[Math.PI / 2, 0, 3.107]} scale={[0.573, 1, 1.304]} />
        <mesh name="lightBed" geometry={nodes.lightBed.geometry} material={materials.lightbulb} position={[-7.999, 11.487, -16.31]} scale={[1.883, 0.999, 1.883]} />
        <mesh name="LightBath" geometry={nodes.LightBath.geometry} material={materials.lightbulb} position={[6.774, 11.487, -16.31]} scale={[1.883, 0.999, 1.883]} />
        <mesh name="lightLiving" geometry={nodes.lightLiving.geometry} material={materials.lightbulb} position={[0.88, 11.487, -3.674]} scale={[1.883, 0.999, 1.883]} />
        <group name="tree1" position={[18.19, 2.591, -9.058]} rotation={[1.334, -0.896, 0.498]}>
          <mesh name="BezierCurve007" geometry={nodes.BezierCurve007.geometry} material={materials.tree} />
          <mesh name="BezierCurve007_1" geometry={nodes.BezierCurve007_1.geometry} material={materials.leaf} />
          <mesh name="BezierCurve007_2" geometry={nodes.BezierCurve007_2.geometry} material={materials.pot} />
          <mesh name="BezierCurve007_3" geometry={nodes.BezierCurve007_3.geometry} material={materials.soil} />
        </group>
        <group name="Cube009" position={[-11.954, 10.509, -6.779]} scale={0.071}>
          <mesh name="Cube032" geometry={nodes.Cube032.geometry} material={materials.kitchen4} />
          <mesh name="Cube032_1" geometry={nodes.Cube032_1.geometry} material={materials.kitchen1} />
        </group>
        <group name="tree2" position={[18.19, 2.591, -12.048]} rotation={[1.334, -0.896, 0.498]}>
          <mesh name="BezierCurve009" geometry={nodes.BezierCurve009.geometry} material={materials.tree} />
          <mesh name="BezierCurve009_1" geometry={nodes.BezierCurve009_1.geometry} material={materials.leaf} />
          <mesh name="BezierCurve009_2" geometry={nodes.BezierCurve009_2.geometry} material={materials.pot} />
          <mesh name="BezierCurve009_3" geometry={nodes.BezierCurve009_3.geometry} material={materials.soil} />
        </group>
        <group name="tree3" position={[18.19, 2.591, -15.317]} rotation={[1.334, -0.896, 0.498]}>
          <mesh name="BezierCurve010" geometry={nodes.BezierCurve010.geometry} material={materials.tree} />
          <mesh name="BezierCurve010_1" geometry={nodes.BezierCurve010_1.geometry} material={materials.leaf} />
          <mesh name="BezierCurve010_2" geometry={nodes.BezierCurve010_2.geometry} material={materials.pot} />
          <mesh name="BezierCurve010_3" geometry={nodes.BezierCurve010_3.geometry} material={materials.soil} />
        </group>
        <group name="tree4" position={[18.19, 2.591, -18.558]} rotation={[1.334, -0.896, 0.498]}>
          <mesh name="BezierCurve011" geometry={nodes.BezierCurve011.geometry} material={materials.tree} />
          <mesh name="BezierCurve011_1" geometry={nodes.BezierCurve011_1.geometry} material={materials.leaf} />
          <mesh name="BezierCurve011_2" geometry={nodes.BezierCurve011_2.geometry} material={materials.pot} />
          <mesh name="BezierCurve011_3" geometry={nodes.BezierCurve011_3.geometry} material={materials.soil} />
        </group>
        <group name="tree8" position={[21.13, 2.591, -18.558]} rotation={[1.334, -0.896, 0.498]}>
          <mesh name="BezierCurve012" geometry={nodes.BezierCurve012.geometry} material={materials.tree} />
          <mesh name="BezierCurve012_1" geometry={nodes.BezierCurve012_1.geometry} material={materials.leaf} />
          <mesh name="BezierCurve012_2" geometry={nodes.BezierCurve012_2.geometry} material={materials.pot} />
          <mesh name="BezierCurve012_3" geometry={nodes.BezierCurve012_3.geometry} material={materials.soil} />
        </group>
        <group name="tree7" position={[21.13, 2.591, -15.402]} rotation={[1.334, -0.896, 0.498]}>
          <mesh name="BezierCurve013" geometry={nodes.BezierCurve013.geometry} material={materials.tree} />
          <mesh name="BezierCurve013_1" geometry={nodes.BezierCurve013_1.geometry} material={materials.leaf} />
          <mesh name="BezierCurve013_2" geometry={nodes.BezierCurve013_2.geometry} material={materials.pot} />
          <mesh name="BezierCurve013_3" geometry={nodes.BezierCurve013_3.geometry} material={materials.soil} />
        </group>
        <group name="tree6" position={[21.13, 2.591, -12.179]} rotation={[1.334, -0.896, 0.498]}>
          <mesh name="BezierCurve014" geometry={nodes.BezierCurve014.geometry} material={materials.tree} />
          <mesh name="BezierCurve014_1" geometry={nodes.BezierCurve014_1.geometry} material={materials.leaf} />
          <mesh name="BezierCurve014_2" geometry={nodes.BezierCurve014_2.geometry} material={materials.pot} />
          <mesh name="BezierCurve014_3" geometry={nodes.BezierCurve014_3.geometry} material={materials.soil} />
        </group>
        <group name="tree5" position={[21.13, 2.591, -8.888]} rotation={[1.334, -0.896, 0.498]}>
          <mesh name="BezierCurve015" geometry={nodes.BezierCurve015.geometry} material={materials.tree} />
          <mesh name="BezierCurve015_1" geometry={nodes.BezierCurve015_1.geometry} material={materials.leaf} />
          <mesh name="BezierCurve015_2" geometry={nodes.BezierCurve015_2.geometry} material={materials.pot} />
          <mesh name="BezierCurve015_3" geometry={nodes.BezierCurve015_3.geometry} material={materials.soil} />
        </group>
        <mesh name="plug" geometry={nodes.plug.geometry} material={materials.plug} position={[8.326, 4.467, -9.857]} scale={[0.544, 0.794, 0.286]} />
        <group name="bed" position={[-12.088, 0.736, -17.964]} scale={[4.678, 4.832, 5.123]}>
          <mesh name="Cube006" geometry={nodes.Cube006.geometry} material={materials.door} />
          <mesh name="Cube006_1" geometry={nodes.Cube006_1.geometry} material={materials.bed1} />
          <mesh name="Cube006_2" geometry={nodes.Cube006_2.geometry} material={materials.bed} />
        </group>

        {/*<mesh
          ref={sensorDoorLivingRef}
          name="sensorDoorLiving"
          geometry={nodes.sensorDoorLiving.geometry}
          material={materials.doorsensor}
          position={[10.746, 8.156, 6.248]}
          scale={[0.666, 0.243, 0.142]}
        />*/}
        <mesh
          name="sensorDoorLiving"
          geometry={nodes.sensorDoorLiving.geometry}
          material={materials.doorsensor}
          position={[10.746, 8.156, 6.248]}
          scale={[0.666, 0.243, 0.142]}
          onClick={() => room("DoorLock")} // Add this line
        />
        <mesh
          name="sensorLiving"
          geometry={nodes.sensorLiving.geometry}
          material={materials.sensor}
          position={[8.759, 8.59, -9.795]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.405, 0.837]}
          onClick={() => room("LivingRoom")} // click mesh
        />
        <mesh
          name="sensorBath"
          geometry={nodes.sensorBath.geometry}
          material={materials.sensor}
          position={[3.439, 9.881, -22.772]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.405, 0.837]}
          onClick={() => room("BathRoom")} // click mesh
        />
        <mesh
          name="sensorFarm"
          geometry={nodes.sensorFarm.geometry}
          material={materials.sensor}
          position={[14.366, 8.053, -10.674]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[1, 0.405, 0.837]}
          onClick={() => room("OutSide")} // click mesh
        />
      </group>
    </group>
  );
}

