import { useEffect, useMemo } from "react";
import { Instances, Instance, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { SAKURA_PETAL_URL } from "../blossomModels";
import { extractFirstMeshGeometry, getSceneMaxDimension } from "../utils/glbGeometry";

export default function GroundPetals({ origin, spread = 4.5, count = 280 }) {
  const { scene } = useGLTF(SAKURA_PETAL_URL);

  const geometry = useMemo(() => {
    const geo = extractFirstMeshGeometry(scene);
    if (!geo) return null;
    const scale = 0.12 / getSceneMaxDimension(scene);
    geo.scale(scale, scale, scale);
    return geo;
  }, [scene]);

  useEffect(() => {
    useGLTF.preload(SAKURA_PETAL_URL);
  }, []);

  const petals = useMemo(() => {
    const arr = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.pow(Math.random(), 0.65) * spread;

      arr.push({
        x: origin[0] + Math.cos(angle) * radius,
        z: origin[2] + Math.sin(angle) * radius,
        y: 0.015 + Math.random() * 0.01,
        rot: Math.random() * Math.PI * 2,
        tilt: 0.1 + Math.random() * 0.35,
        scale: 0.45 + Math.random() * 0.55,
        tone: Math.random() > 0.5 ? "#ffc0d2" : "#ffb2c8",
      });
    }

    return arr;
  }, [count, origin, spread]);

  if (!geometry) return null;

  return (
    <Instances limit={count} range={count} geometry={geometry}>
      <meshStandardMaterial
        color="#ffc4d6"
        emissive="#ff8fab"
        emissiveIntensity={0.08}
        roughness={0.95}
        transparent
        opacity={0.88}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
      {petals.map((p, i) => (
        <Instance
          key={i}
          position={[p.x, p.y, p.z]}
          rotation={[-Math.PI / 2 + p.tilt, 0, p.rot]}
          scale={p.scale}
          color={p.tone}
        />
      ))}
    </Instances>
  );
}