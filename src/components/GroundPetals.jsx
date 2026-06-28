export default function GroundPetals() {
  const petals = [];

  for (let i = 0; i < 120; i++) {
    petals.push(
      <mesh
        key={i}
        rotation={[-Math.PI / 2, 0, Math.random()]}
        position={[
          2 + (Math.random() - 0.5) * 3,
          0.01,
          (Math.random() - 0.5) * 3
        ]}
      >
        <circleGeometry args={[0.07, 8]} />
        <meshStandardMaterial color="#ffb6c1" />
      </mesh>
    );
  }

  return <group>{petals}</group>;
}
