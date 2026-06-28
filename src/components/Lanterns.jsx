import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

function Lantern({ position }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.08, 12]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.8} metalness={0.2} />
      </mesh>

      <mesh castShadow>
        <boxGeometry args={[0.34, 0.48, 0.34]} />
        <meshStandardMaterial
          color="#ff9f43"
          emissive="#ff6b1a"
          emissiveIntensity={1.4}
          roughness={0.35}
          metalness={0.05}
          transparent
          opacity={0.92}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.28, 0.4, 0.28]} />
        <meshStandardMaterial
          color="#fff2cc"
          emissive="#ffd27a"
          emissiveIntensity={2.2}
          roughness={0.2}
          transparent
          opacity={0.75}
        />
      </mesh>

      <pointLight intensity={1.6} distance={5.5} decay={2} color="#ffbf66" />
      <pointLight
        position={[0, -0.2, 0]}
        intensity={0.35}
        distance={3}
        decay={2}
        color="#ff8f4f"
      />
    </group>
  );
}

export default function Lanterns({ origin, count = 10 }) {
  const group = useRef();

  const lanterns = useMemo(() => {
    const arr = [];

    for (let i = 0; i < count; i++) {
      arr.push({
        x: origin[0] + (Math.random() - 0.5) * 14,
        y: Math.random() * 2.8 + 2.2,
        z: origin[2] + (Math.random() - 0.5) * 10,
        phase: Math.random() * Math.PI * 2,
      });
    }

    return arr;
  }, [count, origin]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;

    group.current.children.forEach((lantern, i) => {
      const data = lanterns[i];
      lantern.position.y = data.y + Math.sin(t * 0.35 + data.phase) * 0.35;
      lantern.position.x = data.x + Math.sin(t * 0.22 + data.phase) * 0.45;
      lantern.position.z = data.z + Math.cos(t * 0.18 + data.phase) * 0.35;
      lantern.rotation.y = Math.sin(t * 0.3 + data.phase) * 0.25;
    });
  });

  return (
    <group ref={group}>
      {lanterns.map((p, i) => (
        <Lantern key={i} position={[p.x, p.y, p.z]} />
      ))}
    </group>
  );
}