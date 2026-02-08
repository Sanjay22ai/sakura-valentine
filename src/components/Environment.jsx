export default function Environment() {
  return (
    <group>
      {/* bench silhouette */}
      <group position={[4, 0, -1]}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[2.5, 0.15, 0.6]} />
          <meshStandardMaterial color="#3a2e2e" />
        </mesh>

        <mesh position={[-1, 0.25, 0]}>
          <boxGeometry args={[0.15, 0.5, 0.6]} />
          <meshStandardMaterial color="#3a2e2e" />
        </mesh>

        <mesh position={[1, 0.25, 0]}>
          <boxGeometry args={[0.15, 0.5, 0.6]} />
          <meshStandardMaterial color="#3a2e2e" />
        </mesh>
      </group>

      {/* stone cluster */}
      <mesh position={[-2, 0.1, 1]}>
        <sphereGeometry args={[0.5, 12, 12]} />
        <meshStandardMaterial color="#2e2e3f" />
      </mesh>

      <mesh position={[-2.6, 0.1, 0.4]}>
        <sphereGeometry args={[0.35, 12, 12]} />
        <meshStandardMaterial color="#2e2e3f" />
      </mesh>

      {/* shrubs */}
      <mesh position={[1.5, 0.2, 2]}>
        <sphereGeometry args={[0.8, 12, 12]} />
        <meshStandardMaterial color="#1c2e2a" />
      </mesh>
    </group>
  );
}
