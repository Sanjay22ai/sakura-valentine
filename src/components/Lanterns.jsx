import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

export default function Lanterns() {
  const group = useRef();
  const count = 8;

  const lanterns = useMemo(() => {
    const arr = [];

    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * 3 + 2,
        z: (Math.random() - 0.5) * 8,
      });
    }

    return arr;
  }, []);

  useFrame(() => {
    if (!group.current) return;

    group.current.children.forEach((lantern, i) => {
      lantern.position.y += 0.01;

      if (lantern.position.y > 7) {
        lantern.position.y = 2;
      }

      lantern.position.x += Math.sin(i + performance.now() * 0.001) * 0.001;
    });
  });

  return (
    <group ref={group}>
      {lanterns.map((p, i) => (
        <group key={i} position={[p.x, p.y, p.z]}>
          <mesh>
            <boxGeometry args={[0.4, 0.6, 0.4]} />
            <meshStandardMaterial
              color="#ffb347"
              emissive="#ff8c42"
              emissiveIntensity={0.8}
            />
          </mesh>

          <pointLight intensity={0.8} distance={4} color="#ffd27f" />
        </group>
      ))}
    </group>
  );
}
