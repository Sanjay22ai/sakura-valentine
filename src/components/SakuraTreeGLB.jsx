// SakuraTreeGLB.jsx
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

/**
 * Safe GLB loader:
 * - DOES NOT replace materials
 * - toggles safe flags (double side / vertexColors) when appropriate
 * - sets castShadow/receiveShadow
 * - calls onLoaded(scene) so parent can inspect geometry
 */
export default function SakuraTreeGLB({ onLoaded }) {
  const { scene } = useGLTF("/assets/models/sakura.glb");

  useEffect(() => {
    if (!scene) return;

    // safe traversal — do minimal, non-destructive changes
    scene.traverse((child) => {
      if (!child.isMesh) return;

      // enable shadows
      child.castShadow = true;
      child.receiveShadow = true;

      // if geometry has vertex colors ensure material can use them
      // (do NOT replace material, just set flags)
      try {
        const mat = child.material;
        if (mat) {
          // many exported materials expect double sided faces
          if (mat.side === undefined) mat.side = THREE.DoubleSide;

          // if geometry contains color attribute, allow vertex colors
          if (child.geometry && child.geometry.attributes && child.geometry.attributes.color) {
            mat.vertexColors = true;
          }

          // ensure material writes depth (avoid disappearing)
          mat.depthWrite = true;

          // request a refresh
          mat.needsUpdate = true;
        }
      } catch (e) {
        // safe no-op: if any exotic material triggers, ignore and continue
        // we don't want this to crash the whole scene
        // console.warn("Material tweak fail", e);
      }
    });

    // notify parent
    if (onLoaded) onLoaded(scene);
  }, [scene, onLoaded]);

  // render the GLB exactly as exported (no replacements)
  return (
    <primitive object={scene} scale={[0.35, 0.35, 0.35]} position={[2, -2.6, 0]} />
  );
}

useGLTF.preload("/assets/models/sakura.glb");
