import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function groundAlign(object) {
  const box = new THREE.Box3().setFromObject(object);
  object.position.y -= box.min.y;
}

function scaleToHeight(object, targetHeight) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const factor = targetHeight / Math.max(size.y, 0.001);
  object.scale.setScalar(factor);
}

function prepareProp(scene, { targetHeight, scale = 1, castShadow = true }) {
  const clone = scene.clone(true);

  clone.traverse((child) => {
    if (!child.isMesh) return;
    child.castShadow = castShadow;
    child.receiveShadow = true;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    materials.forEach((material) => {
      if (!material) return;
      material.envMapIntensity = 0.85;
      if ("emissive" in material && material.emissive) {
        material.emissiveIntensity = Math.min(
          material.emissiveIntensity ?? 0,
          0.35
        );
      }
    });
  });

  if (targetHeight) {
    scaleToHeight(clone, targetHeight);
  } else if (scale !== 1) {
    clone.scale.setScalar(scale);
  }

  groundAlign(clone);
  return clone;
}

export default function SceneProp({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  targetHeight,
  scale = 1,
  castShadow = true,
}) {
  const { scene } = useGLTF(url);

  const object = useMemo(
    () => prepareProp(scene, { targetHeight, scale, castShadow }),
    [scene, targetHeight, scale, castShadow]
  );

  return (
    <group position={position} rotation={rotation}>
      <primitive object={object} />
    </group>
  );
}