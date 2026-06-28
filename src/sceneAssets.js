/**
 * CC0 / open-license GLB props for the sakura scene.
 * More assets: see RECOMMENDED_ASSETS at the bottom.
 */
const PM =
  "https://raw.githubusercontent.com/ToxSam/cc0-models-Polygonal-Mind/main/projects";

export const SCENE_PROPS = [
  {
    id: "shrine",
    url: `${PM}/tomb-chaser-2/Shrine_Art.glb`,
    position: [-5.5, 0, -7],
    rotation: [0, 0.45, 0],
    targetHeight: 5.8,
    credit: "Polygonal Mind / ToxSam (CC0)",
  },
  {
    id: "bench",
    url: `${PM}/MomusPark/Bench_01_Art.glb`,
    position: [6.5, 0, 1.5],
    rotation: [0, -0.55, 0],
    targetHeight: 1.05,
    credit: "Polygonal Mind / ToxSam (CC0)",
  },
  {
    id: "path",
    url: `${PM}/MomusPark/Path_01_Art.glb`,
    position: [0.5, 0, 8],
    rotation: [0, 0.1, 0],
    targetHeight: 0.12,
    credit: "Polygonal Mind / ToxSam (CC0)",
  },
  {
    id: "lamp-left",
    url: `${PM}/lunar-year/OutterLamp.glb`,
    position: [-2.8, 0, 4.8],
    rotation: [0, 0.35, 0],
    targetHeight: 1.35,
    credit: "Polygonal Mind / ToxSam (CC0)",
  },
  {
    id: "lamp-right",
    url: `${PM}/lunar-year/OutterLamp.glb`,
    position: [5.2, 0, 3.8],
    rotation: [0, -0.8, 0],
    targetHeight: 1.25,
    credit: "Polygonal Mind / ToxSam (CC0)",
  },
  {
    id: "lamp-back",
    url: `${PM}/lunar-year/Lamp01.glb`,
    position: [1.2, 0, -3.5],
    rotation: [0, 0.15, 0],
    targetHeight: 1.1,
    credit: "Polygonal Mind / ToxSam (CC0)",
  },
  {
    id: "lamp-front",
    url: `${PM}/lunar-year/Lamp02.glb`,
    position: [-4.5, 0, 1.8],
    rotation: [0, 0.9, 0],
    targetHeight: 1.05,
    credit: "Polygonal Mind / ToxSam (CC0)",
  },
  {
    id: "rock-a",
    url: `${PM}/lunar-year/Rock01.glb`,
    position: [-1.5, 0, 3.2],
    rotation: [0, 1.1, 0],
    targetHeight: 0.55,
    credit: "Polygonal Mind / ToxSam (CC0)",
  },
  {
    id: "rock-b",
    url: `${PM}/lunar-year/Rock02.glb`,
    position: [4.2, 0, 5.5],
    rotation: [0, -0.4, 0],
    targetHeight: 0.42,
    credit: "Polygonal Mind / ToxSam (CC0)",
  },
  {
    id: "flowers-a",
    url: `${PM}/MomusPark/Flower_01_a.glb`,
    position: [3.2, 0, 4.8],
    rotation: [0, 0.2, 0],
    targetHeight: 0.35,
    credit: "Polygonal Mind / ToxSam (CC0)",
  },
  {
    id: "flowers-b",
    url: `${PM}/MomusPark/Flower_02_a_Art.glb`,
    position: [-0.8, 0, 5.8],
    rotation: [0, -0.6, 0],
    targetHeight: 0.32,
    credit: "Polygonal Mind / ToxSam (CC0)",
  },
];

/** Extra models worth adding manually — download links for your gift scene */
export const RECOMMENDED_ASSETS = [
  {
    name: "Torii Gate (Quaternius, CC0)",
    url: "https://poly.pizza/m/7SyXZ62xR5",
    note: "Clean low-poly torii; download GLTF from Poly Pizza.",
  },
  {
    name: "Japanese Garden Bench (CC Attribution)",
    url: "https://sketchfab.com/3d-models/japanese-garden-bench-df71b965d0ba4a9596375133ac785e21",
    note: "Polished bench alternative to the MomusPark bench.",
  },
  {
    name: "Japanese Stone Lamp (CC Attribution)",
    url: "https://poly.pizza/m/5gZfOZIW92k",
    note: "Classic tōrō stone lantern for garden paths.",
  },
  {
    name: "Lantern 01 (Poly Haven, CC0)",
    url: "https://polyhaven.com/a/Lantern_01",
    note: "High-quality PBR vintage lantern; GLTF download.",
  },
  {
    name: "Stylized Nature MegaKit (Quaternius, CC0)",
    url: "https://poly.pizza/bundle/Stylized-Nature-MegaKit-T34GZFA0fm",
    note: "Trees, rocks, flowers — Ghibli-style nature pack.",
  },
  {
    name: "Tomb Chaser 2 — full pagoda set (CC0)",
    url: "https://github.com/ToxSam/cc0-models-Polygonal-Mind/tree/main/projects/tomb-chaser-2",
    note: "Temple roofs, columns, shrine — neonwave Japanese architecture.",
  },
  {
    name: "Lunar New Year pack (CC0)",
    url: "https://github.com/ToxSam/cc0-models-Polygonal-Mind/tree/main/projects/lunar-year",
    note: "Lamps, rocks, fences, festive Asian props.",
  },
];

