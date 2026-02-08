export default function CanopyShadow() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[2, 0.02, 0]} // align with tree base
    >
      <circleGeometry args={[3, 32]} />

      <meshBasicMaterial
        color="#1a1c2e"
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}
