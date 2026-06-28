import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {
  SAKURA_FLOWER_URL,
  BRANCH_FLOWERS_URL,
} from "../blossomModels";
import { getBranchFlowerAnchors } from "../utils/enhanceTreeMaterials";

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function extractMeshData(scene) {
  const meshes = [];
  scene.traverse((child) => {
    if (child.isMesh) meshes.push(child);
  });
  if (!meshes.length) return null;

  const root = meshes.reduce((best, mesh) => {
    if (!best) return mesh;
    const a = new THREE.Box3().setFromObject(best);
    const b = new THREE.Box3().setFromObject(mesh);
    const as = a.getSize(new THREE.Vector3());
    const bs = b.getSize(new THREE.Vector3());
    const av = as.x * as.y * as.z;
    const bv = bs.x * bs.y * bs.z;
    return bv > av ? mesh : best;
  }, null);

  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z, 0.001);

  return {
    geometry: root.geometry.clone(),
    targetScale: 0.38 / maxDim,
  };
}

function jitterPlacement(p, i, amount = 0.22) {
  return {
    ...p,
    x: p.x + (seededRandom(i * 13.1) - 0.5) * amount,
    y: p.y + (seededRandom(i * 7.3) - 0.5) * amount * 0.6,
    z: p.z + (seededRandom(i * 19.7) - 0.5) * amount,
    rot: seededRandom(i * 3.71) * Math.PI * 2,
    tilt: (seededRandom(i * 5.31) - 0.5) * 0.5,
  };
}

function sampleCanopy(count, centerY, radiusXZ, radiusY, seed = 1) {
  const points = [];

  for (let i = 0; i < count; i++) {
    const u = seededRandom(i * 12.989 + seed);
    const v = seededRandom(i * 78.233 + seed);
    const w = seededRandom(i * 43.758 + seed);

    const theta = u * Math.PI * 2;
    const phi = Math.acos(2 * v - 1);
    const r = Math.pow(w, 0.48);

    points.push(
      jitterPlacement(
        {
          x: Math.cos(theta) * Math.sin(phi) * radiusXZ * r,
          y: centerY + Math.sin(phi) * radiusY * r,
          z: Math.cos(phi) * radiusXZ * r,
          scale:
            (0.85 + seededRandom(i * 9.17 + seed) * 0.65) * (0.9 + w * 0.25),
        },
        i,
        0.18
      )
    );
  }

  return points;
}

function InstancedFlowerModel({
  url,
  placements,
  targetHeight = 0.38,
  color = "#ffc8dc",
  emissive = "#e87898",
}) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { scene } = useGLTF(url);

  const meshData = useMemo(() => extractMeshData(scene), [scene]);
  const scaleFactor = meshData ? meshData.targetScale * (targetHeight / 0.38) : 1;

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh || !placements.length) return;

    const t = clock.elapsedTime;

    placements.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * 0.22 + i) * 0.015,
        p.y + Math.sin(t * 0.18 + i * 0.4) * 0.012,
        p.z + Math.cos(t * 0.2 + i) * 0.015
      );
      dummy.rotation.set(
        p.tilt ?? 0,
        (p.rot ?? 0) + t * 0.02,
        (p.tilt ?? 0) * 0.35
      );
      dummy.scale.setScalar((p.scale ?? 1) * scaleFactor);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  if (!meshData || !placements.length) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[meshData.geometry, undefined, placements.length]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.06}
        roughness={0.78}
        metalness={0}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

export default function BlossomCanopy({ canopyY, canopyRadius, treeObject }) {
  useEffect(() => {
    useGLTF.preload(SAKURA_FLOWER_URL);
    useGLTF.preload(BRANCH_FLOWERS_URL);
  }, []);

  const centerY = canopyY * 0.58;
  const rx = canopyRadius * 1.05;
  const ry = canopyRadius * 0.82;

  const branchClusters = useMemo(() => {
    if (!treeObject) return [];
    const anchors = getBranchFlowerAnchors(treeObject);
    const dense = [];

    anchors.forEach((anchor, i) => {
      dense.push(
        jitterPlacement({ ...anchor, scale: anchor.scale * 1.4 }, i, 0.12),
        jitterPlacement({ ...anchor, scale: anchor.scale * 1.1 }, i + 500, 0.28),
        jitterPlacement({ ...anchor, scale: anchor.scale * 0.95 }, i + 1000, 0.35)
      );
    });

    return dense;
  }, [treeObject]);

  const canopyFlowers = useMemo(
    () => sampleCanopy(480, centerY, rx, ry, 1),
    [centerY, rx, ry]
  );

  const outerFlowers = useMemo(
    () => sampleCanopy(200, centerY, rx * 1.12, ry * 1.05, 2),
    [centerY, rx, ry]
  );

  return (
    <group>
      <InstancedFlowerModel
        url={BRANCH_FLOWERS_URL}
        placements={branchClusters}
        targetHeight={0.62}
        color="#ffd0e4"
        emissive="#d86890"
      />
      <InstancedFlowerModel
        url={SAKURA_FLOWER_URL}
        placements={canopyFlowers}
        targetHeight={0.48}
        color="#ffc4d8"
        emissive="#d06088"
      />
      <InstancedFlowerModel
        url={SAKURA_FLOWER_URL}
        placements={outerFlowers}
        targetHeight={0.38}
        color="#ffe0ee"
        emissive="#c85880"
      />
    </group>
  );
}