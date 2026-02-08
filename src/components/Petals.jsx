import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export default function Petals() {
  const pointsRef = useRef();
  const burstTimer = useRef(0);

  const count = 300;
  const canopyY = 3;
  const canopyRadius = 2;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * canopyRadius;

      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = canopyY + Math.random() * canopyRadius * 0.8;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }

    return arr;
  }, []);

  /* Listen for burst trigger */
  useEffect(() => {
    const triggerBurst = () => {
      burstTimer.current = 1.5; // seconds
    };

    window.addEventListener("petal-burst", triggerBurst);
    return () =>
      window.removeEventListener("petal-burst", triggerBurst);
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position;

    burstTimer.current -= delta;

    for (let i = 0; i < count; i++) {
      if (burstTimer.current > 0) {
        // outward burst
        pos.array[i * 3] +=
          Math.sin(i * 2) * 0.04;
        pos.array[i * 3 + 2] +=
          Math.cos(i * 2) * 0.04;
      }

      // falling
      pos.array[i * 3 + 1] -= 0.02;

      // slight drift
      pos.array[i * 3] +=
        Math.sin(i + performance.now() * 0.001) * 0.001;

      // respawn in canopy
      if (pos.array[i * 3 + 1] < 0.2) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * canopyRadius;

        pos.array[i * 3] = Math.cos(angle) * radius;
        pos.array[i * 3 + 1] =
          canopyY + Math.random() * canopyRadius * 0.8;
        pos.array[i * 3 + 2] = Math.sin(angle) * radius;
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

      <pointsMaterial color="#ffb6c1" size={0.08} />
    </points>
  );
}
