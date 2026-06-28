import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function PostEffects() {
  return (
    <EffectComposer multisampling={8}>
      <Bloom
        intensity={0.62}
        luminanceThreshold={0.52}
        luminanceSmoothing={0.18}
        mipmapBlur
      />
      <Vignette
        offset={0.42}
        darkness={0.1}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}