import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Tree() {
  const treeRef = useRef();

  useFrame(({ clock }) => {
    if (!treeRef.current) return;

    const t = clock.elapsedTime;

    // gentle wind sway
    treeRef.current.rotation.z =
      Math.sin(t * 0.6) * 0.02;

    treeRef.current.rotation.x =
      Math.sin(t * 0.4) * 0.01;
  });

  return (
    <group ref={treeRef}>
      {/* trunk */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 2]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>

      {/* blossom canopy */}
      <mesh position={[0, 3, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#ffb6c1" />
      </mesh>
    </group>
  );
}