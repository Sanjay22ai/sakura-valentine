import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

import SakuraTree from "./SakuraTree";
import Petals from "./Petals";
import GroundPetals from "./GroundPetals";
import Lanterns from "./Lanterns";
import Environment from "./Environment";
import CanopyShadow from "./CanopyShadow";

/* ---------- Ground Base (terrain-ready) ---------- */
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial
        color="#1f2235"
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

/* ---------- Subtle elevation zone under tree ---------- */
function TerrainBump() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 0.05, 0]}>
      <circleGeometry args={[18, 64]} />
      <meshStandardMaterial
        color="#2e3353"
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

/* ---------- Ground fog for depth ---------- */
function GroundFog() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 0.03, 0]}>
      <circleGeometry args={[36, 64]} />
      <meshBasicMaterial
        color="#2e294e"
        transparent
        opacity={0.22}
      />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas
      shadows
      camera={{
        position: [-6, 4.5, 14],
        fov: 45
      }}
    >
      {/* ---------- SKY ---------- */}
      <color attach="background" args={["#3a2c63"]} />

      {/* ---------- LIGHTING ARCHITECTURE ---------- */}

      {/* ambient sky bounce */}
      <hemisphereLight
        skyColor={"#7a6ccf"}
        groundColor={"#2a2540"}
        intensity={0.5}
      />


      {/* moon light */}
      <directionalLight
        position={[10, 14, 6]}
        intensity={0.8}
        color={"#e2dcff"}
        castShadow
      />


      {/* blossom canopy fill */}
      <pointLight
        position={[2, 5, 1]}
        intensity={1.2}
        color={"#ffb7c5"}
      />

      {/* lantern bounce */}
      <pointLight
        position={[-2, 3, 3]}
        intensity={0.8}
        color={"#ffd6a5"}
      />

      {/* ground bounce */}
      <pointLight
        position={[2, 0.5, 0]}
        intensity={0.35}
        color={"#2e294e"}
      />

      {/* ---------- SKY DETAIL ---------- */}
      <Stars radius={80} depth={40} count={2000} factor={2} />

      {/* ---------- TERRAIN STACK ---------- */}
      <Ground />
      <TerrainBump />
      <GroundFog />
      <CanopyShadow />

      {/* ---------- ENVIRONMENT OBJECTS ---------- */}
      <Environment />

      {/* ---------- MAIN TREE ---------- */}
      <group position={[2, 0, 0]}>
        <SakuraTree />
      </group>

      {/* ---------- PARTICLES ---------- */}
      <Petals />
      <GroundPetals />

      {/* ---------- LANTERNS ---------- */}
      <Lanterns />

      {/* ---------- CAMERA CONTROL ---------- */}
      <OrbitControls
        enablePan={false}
        enableRotate={false}
        enableZoom={true}
        minDistance={7}
        maxDistance={18}
        target={[2, 2.5, 0]}
      />
    </Canvas>
  );
}
