import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import SakuraTree from "./SakuraTree";
import Petals from "./Petals";
import GroundPetals from "./GroundPetals";
import Lanterns from "./Lanterns";


function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#161625" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 4, 12], fov: 45 }}>
      {/* Stronger dusk purple sky */}
      <color attach="background" args={["#2a1f4f"]} />

      {/* evening ambient */}
      <ambientLight intensity={0.35} />

      {/* cool moonlight */}
      <directionalLight
        position={[6, 10, 6]}
        intensity={0.7}
        color="#bfc9ff"
      />

      {/* warm glow around blossoms */}
      <pointLight
        position={[0, 5, 0]}
        intensity={1.3}
        color="#ff9fb3"
      />

      {/* subtle stars */}
      <Stars radius={80} depth={40} count={2000} factor={2} />

      <Ground />
      <SakuraTree />
      <Petals />
      <GroundPetals />
      <Lanterns />

      <OrbitControls
        enablePan={false}
        enableRotate={false}
        enableZoom={true}
        target={[0, 2, 0]}
      />
    </Canvas>
  );
}
