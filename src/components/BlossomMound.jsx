import { useMemo } from "react";
import * as THREE from "three";
import { createBlossomPuffTexture } from "../utils/blossomPuffTexture";

export default function BlossomMound({ origin, radius }) {
  const texture = useMemo(() => createBlossomPuffTexture("edge"), []);

  return (
    <group position={[origin[0], 0.025, origin[2]]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius * 0.95, 64]} />
        <meshBasicMaterial
          map={texture}
          color="#f8c8d8"
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <circleGeometry args={[radius * 0.55, 48]} />
        <meshBasicMaterial
          color="#e890ad"
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}