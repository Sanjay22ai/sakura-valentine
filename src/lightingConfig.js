import * as THREE from "three";

/** Low sun — cozy evening, not night */
export const SUN_POSITION = new THREE.Vector3(-6, 0.12, -11).normalize();

export const COZY_EVENING = {
  sky: {
    turbidity: 12,
    rayleigh: 1.1,
    mieCoefficient: 0.008,
    mieDirectionalG: 0.9,
    inclination: 0.44,
    azimuth: 0.16,
  },
  /** Warm plum haze — soft, not horror-dark */
  fog: ["#3a2e42", 16, 58],
  background: "#221c2e",
  exposure: 0.78,
};