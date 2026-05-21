import * as THREE from "three";

export function createPipeTexture() {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 2048;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const base = ctx.createLinearGradient(0, 0, canvas.width, 0);
  base.addColorStop(0, "#0b0705");
  base.addColorStop(0.13, "#321f16");
  base.addColorStop(0.34, "#614335");
  base.addColorStop(0.5, "#775547");
  base.addColorStop(0.68, "#3a241a");
  base.addColorStop(0.87, "#1d120d");
  base.addColorStop(1, "#080504");

  ctx.fillStyle = base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y += 3) {
    const alpha = Math.random() * 0.12;

    ctx.strokeStyle =
      Math.random() > 0.54
        ? `rgba(255,230,200,${alpha})`
        : `rgba(0,0,0,${alpha + 0.045})`;

    ctx.lineWidth = Math.random() * 1.5 + 0.2;
    ctx.beginPath();
    ctx.moveTo(Math.random() * 40, y);
    ctx.lineTo(
      canvas.width - Math.random() * 40,
      y + (Math.random() - 0.5) * 4,
    );
    ctx.stroke();
  }

  for (let y = 0; y < canvas.height; y += 220) {
    ctx.fillStyle = "rgba(0,0,0,0.52)";
    ctx.fillRect(0, y - 4, canvas.width, 9);

    ctx.fillStyle = "rgba(255,230,190,0.065)";
    ctx.fillRect(0, y + 6, canvas.width, 1);
  }

  for (let i = 0; i < 190; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const length = 28 + Math.random() * 240;

    const drip = ctx.createLinearGradient(x, y, x, y + length);
    drip.addColorStop(0, `rgba(8,10,12,${0.22 + Math.random() * 0.25})`);
    drip.addColorStop(0.55, `rgba(18,18,18,${0.1 + Math.random() * 0.17})`);
    drip.addColorStop(1, "rgba(18,18,18,0)");

    ctx.strokeStyle = drip;
    ctx.lineWidth = 0.7 + Math.random() * 2.8;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 8, y + length);
    ctx.stroke();
  }

  for (let i = 0; i < 120; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 26 + Math.random() * 170;

    const stain = ctx.createRadialGradient(x, y, 0, x, y, r);
    stain.addColorStop(0, "rgba(145,48,25,0.25)");
    stain.addColorStop(0.48, "rgba(75,28,18,0.15)");
    stain.addColorStop(1, "rgba(75,28,18,0)");

    ctx.fillStyle = stain;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  for (let i = 0; i < 32; i += 1) {
    const x = 90 + Math.random() * (canvas.width - 180);
    const y = Math.random() * canvas.height;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((Math.random() - 0.5) * 0.2);
    ctx.fillStyle = `rgba(190,24,35,${0.09 + Math.random() * 0.12})`;
    ctx.fillRect(-35, -3, 70 + Math.random() * 60, 5 + Math.random() * 5);
    ctx.restore();
  }

  for (let i = 0; i < 8500; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const a = Math.random() * 0.11;

    ctx.fillStyle =
      Math.random() > 0.55
        ? `rgba(255,255,255,${a * 0.48})`
        : `rgba(0,0,0,${a})`;

    ctx.fillRect(x, y, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3.5, 14);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

export function createWetBottomTexture() {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 2048;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#090808";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const center = ctx.createLinearGradient(0, 0, canvas.width, 0);
  center.addColorStop(0, "rgba(0,0,0,0)");
  center.addColorStop(0.5, "rgba(38,46,48,0.46)");
  center.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = center;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 26; i += 1) {
    const x = canvas.width * 0.5 + (Math.random() - 0.5) * canvas.width * 0.5;
    const y = Math.random() * canvas.height;
    const rx = 12 + Math.random() * 64;
    const ry = 24 + Math.random() * 140;

    const puddle = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry));
    puddle.addColorStop(0, "rgba(120,145,150,0.07)");
    puddle.addColorStop(0.5, "rgba(25,33,36,0.12)");
    puddle.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = puddle;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 10);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

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
