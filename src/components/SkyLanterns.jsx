import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TREE_ORIGIN } from "../sceneConfig";

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function SkyLanterns({
  origin = TREE_ORIGIN,
  count = 90,
  spreadX = 28,
  spreadZ = 22,
  minY = 2.5,
  maxY = 16,
  minScale = 0.72,
  maxScale = 1.22,
  riseMin = 0.08,
  riseMax = 0.24,
  lightPool = 28,
  maxHeight = 22,
}) {
  const meshRef = useRef();
  const lightsRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const lanterns = useMemo(() => {
    const arr = [];

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i * 17.3);
      const r2 = seededRandom(i * 41.9);
      const r3 = seededRandom(i * 73.2);

      arr.push({
        x: origin[0] + (r1 - 0.5) * spreadX,
        z: origin[2] + (r2 - 0.5) * spreadZ,
        y: minY + r3 * (maxY - minY),
        rise: riseMin + seededRandom(i * 5.7) * (riseMax - riseMin),
        sway: seededRandom(i * 11.4) * Math.PI * 2,
        scale: minScale + seededRandom(i * 2.3) * (maxScale - minScale),
        spin: seededRandom(i * 8.1) * 0.4,
      });
    }

    return arr;
  }, [count, origin, spreadX, spreadZ, minY, maxY, minScale, maxScale, riseMin, riseMax]);

  const lightStep = Math.max(1, Math.ceil(count / lightPool));

  useFrame(({ clock }, delta) => {
    const mesh = meshRef.current;
    const lights = lightsRef.current;
    if (!mesh) return;

    const t = clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const lantern = lanterns[i];
      lantern.y += lantern.rise * delta;

      if (lantern.y > maxHeight) {
        lantern.y = minY + seededRandom(i + t) * (maxY - minY) * 0.35;
      }

      const x = lantern.x + Math.sin(t * 0.25 + lantern.sway) * 0.5;
      const y = lantern.y;
      const z = lantern.z + Math.cos(t * 0.22 + lantern.sway) * 0.45;

      dummy.position.set(x, y, z);
      dummy.rotation.set(
        Math.sin(t * 0.15 + lantern.sway) * 0.08,
        lantern.spin + Math.sin(t * 0.1 + i) * 0.12,
        Math.cos(t * 0.18 + lantern.sway) * 0.06
      );
      dummy.scale.setScalar(lantern.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      if (lights && i % lightStep === 0) {
        const lightIndex = Math.floor(i / lightStep);
        const light = lights.children[lightIndex];
        if (light) {
          light.position.set(x, y, z);
          light.intensity =
            0.75 + Math.sin(t * 1.4 + lantern.sway) * 0.14;
        }
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <cylinderGeometry args={[0.14, 0.2, 0.38, 10, 1, true]} />
        <meshStandardMaterial
          color="#ffd080"
          emissive="#ffaa44"
          emissiveIntensity={3.4}
          roughness={0.38}
          metalness={0}
          transparent
          opacity={0.96}
          side={THREE.DoubleSide}
        />
      </instancedMesh>

      <group ref={lightsRef}>
        {Array.from({ length: lightPool }).map((_, i) => (
          <pointLight
            key={i}
            color="#ffc870"
            intensity={0.82}
            distance={7.5}
            decay={2}
          />
        ))}
      </group>
    </group>
  );
}

export function LanternField({ origin = TREE_ORIGIN }) {
  return (
    <>
      <SkyLanterns
        origin={origin}
        count={110}
        spreadX={32}
        spreadZ={26}
        minY={3}
        maxY={18}
        lightPool={34}
        maxHeight={24}
      />
      <SkyLanterns
        origin={origin}
        count={55}
        spreadX={16}
        spreadZ={14}
        minY={0.9}
        maxY={5.5}
        minScale={0.52}
        maxScale={0.82}
        riseMin={0.05}
        riseMax={0.14}
        lightPool={14}
        maxHeight={8}
      />
    </>
  );
}