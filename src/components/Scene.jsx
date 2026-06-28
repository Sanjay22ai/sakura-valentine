import { useState, useCallback, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Sparkles,
  Sky,
} from "@react-three/drei";
import * as THREE from "three";

import SakuraTreeGLB from "./SakuraTreeGLB";
import Petals from "./Petals";
import GroundPetals from "./GroundPetals";
import ImmersiveEnvironment from "./ImmersiveEnvironment";
import CanopyShadow from "./CanopyShadow";
import RealisticGround from "./RealisticGround";
import BlossomMound from "./BlossomMound";
import PostEffects from "./PostEffects";
import { LanternField } from "./SkyLanterns";
import {
  TREE_ORIGIN,
  CANOPY_CENTER,
  CANOPY_RADIUS,
} from "../sceneConfig";
import { SUN_POSITION, COZY_EVENING } from "../lightingConfig";

function TwilightFill() {
  const sun = useMemo(
    () => SUN_POSITION.clone().multiplyScalar(28),
    []
  );

  return (
    <directionalLight
      position={sun.toArray()}
      intensity={0.22}
      color="#c9a0b8"
    />
  );
}

function GroundLanternPool() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[TREE_ORIGIN[0], 0.03, TREE_ORIGIN[2]]}
    >
      <circleGeometry args={[20, 64]} />
      <meshBasicMaterial color="#ffbc6a" transparent opacity={0.14} />
    </mesh>
  );
}

function GardenLampGlow() {
  const lamps = [
    [-2.8, 1.1, 4.8],
    [5.2, 1.0, 3.8],
    [1.2, 0.95, -3.5],
    [-4.5, 0.9, 1.8],
    [3.2, 0.85, 5.2],
    [-1.2, 0.8, 6.2],
  ];

  return (
    <group>
      {lamps.map((pos, i) => (
        <pointLight
          key={i}
          position={pos}
          intensity={1.2}
          color="#ffb85a"
          distance={6.5}
          decay={2}
        />
      ))}
    </group>
  );
}

export default function Scene() {
  const [canopy, setCanopy] = useState({
    center: CANOPY_CENTER,
    radius: CANOPY_RADIUS,
    minY: CANOPY_CENTER[1] * 0.42,
    maxY: CANOPY_CENTER[1],
  });

  const handleCanopyReady = useCallback((metrics) => {
    if (!metrics) return;
    setCanopy({
      center: [
        TREE_ORIGIN[0],
        TREE_ORIGIN[1] + (metrics.canopyMinY + metrics.canopyMaxY) * 0.5,
        TREE_ORIGIN[2],
      ],
      radius: metrics.canopyRadius,
      minY: TREE_ORIGIN[1] + metrics.canopyMinY,
      maxY: TREE_ORIGIN[1] + metrics.canopyMaxY,
    });
  }, []);

  const sunPosition = useMemo(() => SUN_POSITION.toArray(), []);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: COZY_EVENING.exposure,
      }}
      camera={{
        position: [-5.8, 5.2, 13.2],
        fov: 40,
        near: 0.1,
        far: 200,
      }}
    >
      <color attach="background" args={[COZY_EVENING.background]} />

      <Sky
        distance={450000}
        sunPosition={sunPosition}
        {...COZY_EVENING.sky}
      />

      <fog attach="fog" args={COZY_EVENING.fog} />

      <hemisphereLight args={["#5c4868", "#2a221c", 0.38]} />
      <ambientLight intensity={0.07} color="#4a3540" />

      <TwilightFill />

      <GardenLampGlow />

      <Environment preset="sunset" environmentIntensity={0.22} />

      <Sparkles
        count={18}
        scale={[canopy.radius * 1.6, canopy.radius * 0.9, canopy.radius * 1.4]}
        position={[TREE_ORIGIN[0], canopy.center[1] * 0.72, TREE_ORIGIN[2]]}
        size={1.2}
        speed={0.02}
        opacity={0.12}
        color="#ffd8e8"
      />

      <RealisticGround />
      <GroundLanternPool />
      <CanopyShadow radius={canopy.radius * 0.85} />

      <ImmersiveEnvironment />

      <group position={TREE_ORIGIN}>
        <SakuraTreeGLB onCanopyReady={handleCanopyReady} />
      </group>

      <BlossomMound origin={TREE_ORIGIN} radius={canopy.radius} />

      <LanternField origin={TREE_ORIGIN} />

      <ContactShadows
        position={[TREE_ORIGIN[0], 0.01, TREE_ORIGIN[2]]}
        opacity={0.14}
        scale={20}
        blur={2}
        far={9}
        color="#4a3848"
      />

      <Petals
        canopyCenter={canopy.center}
        canopyRadius={canopy.radius}
        canopyMinY={canopy.minY}
        canopyMaxY={canopy.maxY}
        count={420}
      />
      <GroundPetals origin={TREE_ORIGIN} spread={canopy.radius * 1.15} count={420} />

      <PostEffects />

      <OrbitControls
        enablePan={false}
        enableRotate={false}
        enableZoom
        minDistance={8}
        maxDistance={20}
        target={[TREE_ORIGIN[0], canopy.center[1] * 0.38, TREE_ORIGIN[2]]}
      />
    </Canvas>
  );
}