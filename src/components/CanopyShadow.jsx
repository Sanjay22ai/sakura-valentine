import { useMemo } from "react";
import * as THREE from "three";
import { TREE_ORIGIN } from "../sceneConfig";

export default function CanopyShadow({ radius = 4 }) {
  const material = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(128, 128, 16, 128, 128, 128);
    gradient.addColorStop(0, "rgba(255, 176, 96, 0.12)");
    gradient.addColorStop(0.55, "rgba(120, 80, 100, 0.06)");
    gradient.addColorStop(1, "rgba(80, 60, 90, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[TREE_ORIGIN[0], 0.018, TREE_ORIGIN[2]]}
    >
      <circleGeometry args={[radius, 64]} />
      <meshBasicMaterial
        map={material}
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </mesh>
  );
}