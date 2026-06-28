import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createBlossomPuffTexture } from "../utils/blossomPuffTexture";

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function samplePuffs(count, centerY, radiusXZ, radiusY, seed, sizeRange) {
  const puffs = [];

  for (let i = 0; i < count; i++) {
    const u = seededRandom(i * 12.989 + seed);
    const v = seededRandom(i * 78.233 + seed);
    const w = seededRandom(i * 43.758 + seed);

    const theta = u * Math.PI * 2;
    const phi = Math.acos(2 * v - 1);
    const r = Math.pow(w, 0.55);

    const size =
      sizeRange[0] + seededRandom(i * 6.17 + seed) * (sizeRange[1] - sizeRange[0]);

    puffs.push({
      x: Math.cos(theta) * Math.sin(phi) * radiusXZ * r,
      y: centerY + Math.sin(phi) * radiusY * r,
      z: Math.cos(phi) * radiusXZ * r,
      size,
      drift: seededRandom(i * 3.31 + seed) * Math.PI * 2,
    });
  }

  return puffs;
}

function PuffLayer({ puffs, texture, opacity = 0.88 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1), []);

  useFrame(({ clock, camera }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = clock.elapsedTime;

    puffs.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * 0.22 + p.drift) * 0.04,
        p.y + Math.sin(t * 0.18 + i * 0.3) * 0.03,
        p.z + Math.cos(t * 0.2 + p.drift) * 0.04
      );
      dummy.scale.setScalar(p.size);
      dummy.lookAt(camera.position);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  if (!puffs.length) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, puffs.length]}
      frustumCulled={false}
    >
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.NormalBlending}
        side={THREE.DoubleSide}
        color="#fff0f6"
        toneMapped={false}
      />
    </instancedMesh>
  );
}

export default function FluffyCanopy({ canopyY, canopyRadius }) {
  const textures = useMemo(
    () => ({
      soft: createBlossomPuffTexture("soft"),
      core: createBlossomPuffTexture("core"),
      edge: createBlossomPuffTexture("edge"),
    }),
    []
  );

  const centerY = canopyY * 0.58;
  const rx = canopyRadius * 1.22;
  const ry = canopyRadius * 0.92;

  const corePuffs = useMemo(
    () => samplePuffs(220, centerY, rx * 0.88, ry * 0.88, 11, [1.4, 2.6]),
    [centerY, rx, ry]
  );

  const midPuffs = useMemo(
    () => samplePuffs(280, centerY, rx, ry, 23, [1.0, 2.1]),
    [centerY, rx, ry]
  );

  const edgePuffs = useMemo(
    () => samplePuffs(160, centerY, rx * 1.08, ry * 1.05, 37, [0.7, 1.5]),
    [centerY, rx, ry]
  );

  return (
    <group>
      <PuffLayer puffs={corePuffs} texture={textures.core} opacity={0.9} />
      <PuffLayer puffs={midPuffs} texture={textures.soft} opacity={0.82} />
      <PuffLayer puffs={edgePuffs} texture={textures.edge} opacity={0.72} />
    </group>
  );
}