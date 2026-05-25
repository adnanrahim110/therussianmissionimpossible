import * as THREE from "three";



export function createDustSpriteTexture() {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 96;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(48, 48, 0, 48, 48, 48);
  gradient.addColorStop(0, "rgba(255,232,196,0.5)");
  gradient.addColorStop(0.22, "rgba(255,220,180,0.2)");
  gradient.addColorStop(0.55, "rgba(255,210,170,0.052)");
  gradient.addColorStop(1, "rgba(255,210,170,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return texture;
}

export function createSoftShadowTexture() {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(1, 0.48);

  const shadow = ctx.createRadialGradient(0, 0, 0, 0, 0, 118);
  shadow.addColorStop(0, "rgba(0,0,0,0.72)");
  shadow.addColorStop(0.36, "rgba(0,0,0,0.34)");
  shadow.addColorStop(0.72, "rgba(0,0,0,0.08)");
  shadow.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.arc(0, 0, 118, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return texture;
}

export function createStencilTexture(title, subtitle = "") {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(185,24,35,0.22)";
  ctx.fillRect(22, 30, canvas.width - 44, canvas.height - 60);

  ctx.strokeStyle = "rgba(255,255,255,0.32)";
  ctx.lineWidth = 5;
  ctx.strokeRect(28, 36, canvas.width - 56, canvas.height - 72);

  ctx.fillStyle = "rgba(255,238,218,0.86)";
  ctx.font = "900 64px ui-monospace, Menlo, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(title, canvas.width / 2, subtitle ? 105 : 128);

  if (subtitle) {
    ctx.fillStyle = "rgba(255,220,190,0.72)";
    ctx.font = "700 28px ui-monospace, Menlo, monospace";
    ctx.fillText(subtitle, canvas.width / 2, 160);
  }

  for (let i = 0; i < 900; i += 1) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.5})`;
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 4,
      Math.random() * 4,
    );
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}
