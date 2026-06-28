import { Color, LinearSRGBColorSpace, MeshStandardMaterial, SRGBColorSpace } from "three";

class GLTFSpecularGlossinessExtension {
  constructor() {
    this.name = "KHR_materials_pbrSpecularGlossiness";
  }

  getMaterialType() {
    return MeshStandardMaterial;
  }

  extendParams(materialParams, materialDef, parser) {
    const sg = materialDef.extensions?.KHR_materials_pbrSpecularGlossiness;
    if (!sg) return Promise.resolve();

    const pending = [];

    materialParams.color = new Color(1, 1, 1);
    materialParams.opacity = 1;
    materialParams.metalness = 0;
    materialParams.roughness = 0.55;

    if (Array.isArray(sg.diffuseFactor)) {
      const [r, g, b, a = 1] = sg.diffuseFactor;
      materialParams.color.setRGB(r, g, b, LinearSRGBColorSpace);
      materialParams.opacity = a;
    }

    if (sg.diffuseTexture !== undefined) {
      pending.push(
        parser.assignTexture(materialParams, "map", sg.diffuseTexture, SRGBColorSpace)
      );
    }

    if (sg.specularGlossinessTexture !== undefined) {
      pending.push(
        parser.assignTexture(
          materialParams,
          "roughnessMap",
          sg.specularGlossinessTexture
        )
      );
    }

    if (sg.glossinessFactor !== undefined) {
      materialParams.roughness = Math.max(
        0.12,
        1 - sg.glossinessFactor * 0.92
      );
    }

    if (Array.isArray(sg.specularFactor)) {
      const spec =
        (sg.specularFactor[0] + sg.specularFactor[1] + sg.specularFactor[2]) /
        3;
      materialParams.metalness = Math.min(spec * 0.2, 0.12);
    }

    return Promise.all(pending);
  }
}

export function registerSpecularGlossiness(loader) {
  loader.register(() => new GLTFSpecularGlossinessExtension());
}