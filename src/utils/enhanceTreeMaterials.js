import * as THREE from "three";

const BARK_HINTS = ["bark", "trunk", "branch", "wood", "stingray", "pbs"];
const BLOSSOM_HINTS = ["blossom", "flower", "petal", "sakura", "initial"];

function isBlossomBillboard(meshName = "") {
  return /object_1[0-3]/i.test(meshName);
}

function isBarkMesh(material, meshName = "") {
  const label = `${material?.name || ""} ${meshName}`.toLowerCase();
  if (BLOSSOM_HINTS.some((hint) => label.includes(hint))) return false;
  if (BARK_HINTS.some((hint) => label.includes(hint))) return true;
  return true;
}

function polishTexture(texture) {
  if (!texture) return;
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
}

function polishMaps(material) {
  [
    "map",
    "normalMap",
    "roughnessMap",
    "metalnessMap",
    "aoMap",
    "emissiveMap",
  ].forEach((key) => {
    const map = material[key];
    if (!map) return;
    if (key === "map" || key === "emissiveMap") {
      polishTexture(map);
    } else {
      map.anisotropy = 8;
      map.minFilter = THREE.LinearMipmapLinearFilter;
      map.magFilter = THREE.LinearFilter;
      map.needsUpdate = true;
    }
  });

  if (material.normalMap) {
    material.normalScale = new THREE.Vector2(1.35, 1.35);
  }
}

function toStandardMaterial(material) {
  if (material instanceof THREE.MeshStandardMaterial) {
    polishMaps(material);
    return material;
  }

  const standard = new THREE.MeshStandardMaterial({
    map: material.map || null,
    normalMap: material.normalMap || null,
    roughnessMap: material.roughnessMap || null,
    metalnessMap: material.metalnessMap || null,
    aoMap: material.aoMap || null,
    color: material.color?.clone() ?? new THREE.Color("#ffffff"),
    roughness: material.roughness ?? 0.65,
    metalness: material.metalness ?? 0,
    transparent: material.transparent,
    opacity: material.opacity ?? 1,
    side: material.side,
    alphaTest: material.alphaTest ?? 0.35,
  });

  polishMaps(standard);
  material.dispose?.();
  return standard;
}

function toBarkMaterial(standard) {
  const color = standard.color.clone().lerp(new THREE.Color("#1c1612"), 0.78);

  const physical = new THREE.MeshPhysicalMaterial({
    map: standard.map,
    normalMap: standard.normalMap,
    normalScale: new THREE.Vector2(1.85, 1.85),
    roughnessMap: standard.roughnessMap,
    metalnessMap: standard.metalnessMap,
    aoMap: standard.aoMap,
    color,
    roughness: 0.92,
    metalness: 0.01,
    envMapIntensity: 0.18,
    clearcoat: 0.01,
    clearcoatRoughness: 0.9,
    emissive: new THREE.Color("#0a0604"),
    emissiveIntensity: 0.02,
  });

  polishMaps(physical);
  standard.dispose();
  return physical;
}

function toBlossomMaterial(standard) {
  const color = standard.color.clone().lerp(new THREE.Color("#f2a0be"), 0.58);

  const physical = new THREE.MeshPhysicalMaterial({
    map: standard.map,
    normalMap: standard.normalMap,
    normalScale: new THREE.Vector2(1.1, 1.1),
    roughnessMap: standard.roughnessMap,
    color,
    roughness: 0.68,
    metalness: 0,
    transparent: true,
    opacity: 0.98,
    alphaTest: 0.04,
    depthWrite: false,
    side: THREE.DoubleSide,
    envMapIntensity: 0.55,
    sheen: 0.55,
    sheenRoughness: 0.5,
    sheenColor: new THREE.Color("#ffe8f2"),
    emissive: new THREE.Color("#ff6b9d"),
    emissiveIntensity: 0.28,
  });

  polishMaps(physical);
  standard.dispose();
  return physical;
}

export function enhanceTreeMaterials(root) {
  root.traverse((child) => {
    if (!child.isMesh) return;

    child.castShadow = true;
    child.receiveShadow = true;

    if (child.geometry) {
      child.geometry.computeVertexNormals();
    }

    const blossomCard = isBlossomBillboard(child.name);

    if (blossomCard) {
      child.visible = false;
      return;
    }

    const applyMaterial = (material) => {
      const standard = toStandardMaterial(material);
      if (!isBarkMesh(standard, child.name)) return toBlossomMaterial(standard);
      return toBarkMaterial(standard);
    };

    if (Array.isArray(child.material)) {
      child.material = child.material.map(applyMaterial);
    } else {
      child.material = applyMaterial(child.material);
    }
  });
}

export function getBranchFlowerAnchors(treeRoot) {
  const anchors = [];
  const box = new THREE.Box3();
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  treeRoot.traverse((child) => {
    if (!child.isMesh || isBlossomBillboard(child.name)) return;

    box.setFromObject(child);
    box.getSize(size);
    box.getCenter(center);

    if (size.y < 0.25) return;

    const heights = size.y > 1.2 ? [0.55, 0.72, 0.86, 0.96] : [0.78, 0.92];

    heights.forEach((t, hi) => {
      const spread = size.y * 0.06 * hi;
      anchors.push({
        x: center.x + (hi % 2 === 0 ? spread : -spread * 0.6),
        y: box.min.y + size.y * t,
        z: center.z + (hi % 3 === 0 ? spread * 0.5 : -spread * 0.4),
        scale: THREE.MathUtils.clamp(0.7 + size.y * 0.09, 0.65, 1.6),
      });
    });
  });

  return anchors;
}

export function fitTreeToHeight(root, targetHeight) {
  const initial = new THREE.Box3().setFromObject(root);
  const size = initial.getSize(new THREE.Vector3());
  const scale = targetHeight / Math.max(size.y, 0.001);

  root.scale.setScalar(scale);
  root.updateMatrixWorld(true);

  const fitted = new THREE.Box3().setFromObject(root);
  const center = fitted.getCenter(new THREE.Vector3());

  root.position.x -= center.x;
  root.position.z -= center.z;
  root.position.y -= fitted.min.y;

  root.updateMatrixWorld(true);
  const finalBox = new THREE.Box3().setFromObject(root);
  const finalSize = finalBox.getSize(new THREE.Vector3());

  return {
    scale,
    canopyY: finalBox.max.y * 0.9,
    canopyMinY: finalBox.min.y + finalSize.y * 0.34,
    canopyMaxY: finalBox.max.y * 0.92,
    canopyRadius: Math.max(finalSize.x, finalSize.z) * 0.44,
  };
}