import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import SceneProp from "./SceneProp";
import { SCENE_PROPS } from "../sceneAssets";

export default function ImmersiveEnvironment() {
  useEffect(() => {
    SCENE_PROPS.forEach((prop) => useGLTF.preload(prop.url));
  }, []);

  return (
    <group>
      {SCENE_PROPS.map((prop) => (
        <SceneProp
          key={prop.id}
          url={prop.url}
          position={prop.position}
          rotation={prop.rotation}
          targetHeight={prop.targetHeight}
          scale={prop.scale}
        />
      ))}
    </group>
  );
}