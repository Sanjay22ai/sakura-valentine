import * as THREE from "three";

export function extractFirstMeshGeometry(scene) {
  let geometry = null;
  scene.traverse((child) => {
    if (child.isMesh && !geometry) geometry = child.geometry.clone();
  });
  return geometry;
}

export function getSceneMaxDimension(scene) {
  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  return Math.max(size.x, size.y, size.z, 0.001);
}
