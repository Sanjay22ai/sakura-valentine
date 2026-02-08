import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

/* deterministic pseudo random generator */
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function Petals() {
  const pointsRef = useRef();
  const count = 350;

  /* IMPORTANT: match tree position */
  const canopyCenterX = 2;   // tree x position
  const canopyCenterY = 3;   // canopy height
  const canopyCenterZ = 0;

  const canopyRadius = 2;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i * 12.989);
      const r2 = seededRandom(i * 78.233);

      const angle = r1 * Math.PI * 2;
      const radius = r2 * canopyRadius;

      arr[i * 3] = canopyCenterX + Math.cos(angle) * radius;
      arr[i * 3 + 1] = canopyCenterY + r2 * 1.5;
      arr[i * 3 + 2] = canopyCenterZ + Math.sin(angle) * radius;
    }

    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      // vertical fall
      pos.array[i * 3 + 1] -= 1.2 * delta;

      // subtle wind drift
      pos.array[i * 3] += Math.sin(i + time * 0.8) * 0.0006;
      pos.array[i * 3 + 2] += Math.cos(i + time * 0.8) * 0.0006;

      // respawn at tree canopy
      if (pos.array[i * 3 + 1] < 0.15) {
        const r1 = seededRandom(i * 33.1 + time);
        const r2 = seededRandom(i * 91.7 + time);

        const angle = r1 * Math.PI * 2;
        const radius = r2 * canopyRadius;

        pos.array[i * 3] = canopyCenterX + Math.cos(angle) * radius;
        pos.array[i * 3 + 1] = canopyCenterY + r2 * 1.5;
        pos.array[i * 3 + 2] = canopyCenterZ + Math.sin(angle) * radius;
      }
    }

    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffb6c1"
        size={0.08}
        sizeAttenuation
      />
    </points>
  );
}
