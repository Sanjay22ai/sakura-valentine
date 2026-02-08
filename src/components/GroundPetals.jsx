import { useMemo } from "react";

export default function GroundPetals() {
  const count = 200;

  const petals = useMemo(() => {
    const arr = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 3;

      arr.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        rot: Math.random() * Math.PI
      });
    }

    return arr;
  }, []);

  return (
    <group>
      {petals.map((p, i) => (
        <mesh
          key={i}
          position={[p.x, 0.02, p.z]}
          rotation={[-Math.PI / 2, 0, p.rot]}
        >
          <circleGeometry args={[0.08, 6]} />
          <meshStandardMaterial color="#ffb6c1" />
        </mesh>
      ))}
    </group>
  );
}
