import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SakuraTree from "./SakuraTree";
import Petals from "./Petals";
import GroundPetals from "./GroundPetals";

/* Ground */
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#b7c8b3" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [-6, 5, 16], fov: 45 }}>
      
      {/* morning sky */}
      <color attach="background" args={["#cfe8ff"]} />

      {/* sunlight */}
      <hemisphereLight intensity={1.2} />
      <directionalLight position={[6, 10, 5]} intensity={1.8} />

      <Ground />

      {/* stable sakura */}
      <SakuraTree />

      {/* falling petals */}
      <Petals />

      {/* ground petals */}
      <GroundPetals />

      <OrbitControls enableRotate={false} />
    </Canvas>
  );
}
