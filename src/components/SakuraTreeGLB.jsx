import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import sakuraModel from "../assets/models/sakura.glb?url";
import { registerSpecularGlossiness } from "../utils/gltfSpecularGlossiness";
import {
  enhanceTreeMaterials,
  fitTreeToHeight,
} from "../utils/enhanceTreeMaterials";
import BlossomCanopy from "./BlossomCanopy";
import { TARGET_TREE_HEIGHT } from "../sceneConfig";

useGLTF.preload(sakuraModel, true, true, registerSpecularGlossiness);

function TreeLanternLighting({ canopyY }) {
  return (
    <group>
      <directionalLight
        position={[1.5, canopyY * 0.85, 5]}
        intensity={0.28}
        color="#fff4f8"
      />
      <pointLight
        position={[0, canopyY * 0.62, 2.8]}
        intensity={0.55}
        color="#ffe8f0"
        distance={12}
        decay={2}
      />
      <pointLight
        position={[0, canopyY * 0.72, 1.2]}
        intensity={0.7}
        color="#ffc878"
        distance={14}
        decay={2}
      />
      <pointLight
        position={[-2.2, canopyY * 0.45, 2]}
        intensity={0.55}
        color="#ff9058"
        distance={9}
        decay={2}
      />
      <pointLight
        position={[2.5, canopyY * 0.38, -1.2]}
        intensity={0.45}
        color="#ffb8a0"
        distance={8}
        decay={2}
      />
      <spotLight
        position={[0, canopyY * 0.9, 4]}
        angle={0.55}
        penumbra={0.9}
        intensity={0.65}
        color="#ffd090"
        distance={16}
        decay={2}
      />
    </group>
  );
}

export default function SakuraTreeGLB({ onCanopyReady }) {
  const group = useRef();
  const { scene } = useGLTF(sakuraModel, true, true, registerSpecularGlossiness);

  const tree = useMemo(() => {
    const clone = scene.clone(true);
    enhanceTreeMaterials(clone);
    const metrics = fitTreeToHeight(clone, TARGET_TREE_HEIGHT);
    return { object: clone, metrics };
  }, [scene]);

  useEffect(() => {
    onCanopyReady?.(tree.metrics);
  }, [tree.metrics, onCanopyReady]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.z = Math.sin(t * 0.45) * 0.01;
    group.current.rotation.x = Math.sin(t * 0.32) * 0.005;
  });

  return (
    <group ref={group}>
      <primitive object={tree.object} />
      <BlossomCanopy
        canopyY={tree.metrics.canopyY}
        canopyRadius={tree.metrics.canopyRadius}
        treeObject={tree.object}
      />
      <TreeLanternLighting canopyY={tree.metrics.canopyY} />
    </group>
  );
}