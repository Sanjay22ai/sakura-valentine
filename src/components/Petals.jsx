import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Petals() {
  const ref = useRef();
  const count = 220;

  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = 2 + (Math.random() - 0.5) * 2;
    positions[i * 3 + 1] = 3 + Math.random() * 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
  }

  useFrame((_, delta) => {
    const pos = ref.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      pos.array[i * 3 + 1] -= delta * 1.2;

      if (pos.array[i * 3 + 1] < 0) {
        pos.array[i * 3 + 1] = 3 + Math.random() * 2;
      }
    }

    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffb6c1" size={0.12} />
    </points>
  );
}
