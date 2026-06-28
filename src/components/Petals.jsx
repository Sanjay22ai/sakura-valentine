import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { SAKURA_PETAL_URL } from "../blossomModels";
import { extractFirstMeshGeometry, getSceneMaxDimension } from "../utils/glbGeometry";

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function Petals({
  canopyCenter,
  canopyRadius,
  canopyMinY,
  canopyMaxY,
  count = 520,
}) {
  const meshRef = useRef();
  const burstRef = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { scene } = useGLTF(SAKURA_PETAL_URL);

  const spawnBand = useMemo(() => {
    const top = canopyMaxY ?? canopyCenter[1];
    const bottom = canopyMinY ?? top * 0.42;
    return { bottom, top, height: Math.max(top - bottom, 0.5) };
  }, [canopyCenter, canopyMinY, canopyMaxY]);

  const petalGeometry = useMemo(() => {
    const geometry = extractFirstMeshGeometry(scene);
    if (!geometry) return null;
    const scale = 0.14 / getSceneMaxDimension(scene);
    geometry.scale(scale, scale, scale);
    return geometry;
  }, [scene]);

  const particles = useMemo(() => {
    const data = [];

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i * 12.989);
      const r2 = seededRandom(i * 78.233);
      const r3 = seededRandom(i * 45.164);

      const spawnY = spawnBand.bottom + r3 * spawnBand.height;

      data.push({
        angle: r1 * Math.PI * 2,
        radius: r2 * canopyRadius * 0.92,
        spawnY,
        phase: seededRandom(i * 31.4) * spawnY,
        spin: seededRandom(i * 9.17) * Math.PI * 2,
        spinSpeed: 0.4 + seededRandom(i * 3.7) * 1.4,
        fallSpeed: 0.55 + seededRandom(i * 5.3) * 0.9,
        drift: seededRandom(i * 2.1) * Math.PI * 2,
      });
    }

    return data;
  }, [count, canopyRadius, spawnBand]);

  useEffect(() => {
    useGLTF.preload(SAKURA_PETAL_URL);
    const onBurst = () => {
      burstRef.current = 1;
    };
    window.addEventListener("petal-burst", onBurst);
    return () => window.removeEventListener("petal-burst", onBurst);
  }, []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const time = state.clock.elapsedTime;
    const burst = burstRef.current;

    if (burst > 0) {
      burstRef.current = Math.max(0, burst - delta * 0.55);
    }

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const cycle = Math.max(p.spawnY - 0.05, 0.4);
      const traveled = (time * p.fallSpeed + p.phase) % cycle;
      let y = p.spawnY - traveled;

      if (burst > 0) {
        y += burst * 1.2;
      }

      const wind = Math.sin(time * 0.7 + p.drift) * 0.35;
      const x =
        canopyCenter[0] +
        Math.cos(p.angle + time * 0.08) * p.radius +
        wind * 0.25;
      const z =
        canopyCenter[2] +
        Math.sin(p.angle + time * 0.08) * p.radius +
        Math.cos(time * 0.5 + p.drift) * 0.2;

      dummy.position.set(x, y, z);
      dummy.rotation.set(
        Math.sin(time * p.spinSpeed + p.spin) * 0.8,
        p.spin + time * p.spinSpeed,
        Math.cos(time * 0.8 + p.spin) * 0.6
      );

      const scale = 0.55 + seededRandom(i) * 0.45;
      dummy.scale.setScalar(scale * (1 + burst * 0.35));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  if (!petalGeometry) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeometry, undefined, count]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color="#ffc4d6"
        emissive="#ff8fb0"
        emissiveIntensity={0.18}
        roughness={0.72}
        metalness={0}
        transparent
        opacity={0.92}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </instancedMesh>
  );
}