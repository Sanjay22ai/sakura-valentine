import * as THREE from "three";

function drawPuff(ctx, size, inner, mid, outer) {
  const cx = size / 2;
  const grad = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.42, mid);
  grad.addColorStop(1, outer);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
}

export function createBlossomPuffTexture(variant = "soft") {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (variant === "core") {
    drawPuff(
      ctx,
      size,
      "rgba(255, 210, 228, 0.98)",
      "rgba(245, 150, 185, 0.82)",
      "rgba(230, 120, 165, 0)"
    );
  } else if (variant === "edge") {
    drawPuff(
      ctx,
      size,
      "rgba(255, 240, 248, 0.92)",
      "rgba(255, 200, 220, 0.55)",
      "rgba(255, 180, 210, 0)"
    );
  } else {
    drawPuff(
      ctx,
      size,
      "rgba(255, 228, 240, 0.96)",
      "rgba(255, 175, 205, 0.72)",
      "rgba(255, 155, 190, 0)"
    );
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}