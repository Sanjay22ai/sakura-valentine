export default function SakuraTree() {
  return (
    <group position={[2, 0, 0]}>
      
      {/* trunk */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.35, 0.5, 2.5, 16]} />
        <meshStandardMaterial color="#6b4f3a" />
      </mesh>

      {/* canopy */}
      <mesh position={[0, 3, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#ffc6d5" />
      </mesh>

    </group>
  );
}
