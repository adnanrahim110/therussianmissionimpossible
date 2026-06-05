import * as THREE from "three";

export const SOOT_WALL_TEXTURE_VERSION = 4;



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

export function createSootWallTexture() {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  let seed = 5519;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  ctx.fillStyle = "#111416";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.lineCap = "round";

  for (let i = 0; i < 420; i += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const length = 50 + random() * 340;
    const angle = -0.18 + random() * 0.36;
    const alpha = 0.035 + random() * 0.11;

    ctx.strokeStyle =
      random() > 0.66
        ? `rgba(105,118,123,${alpha * 0.62})`
        : `rgba(0,0,0,${alpha})`;
    ctx.lineWidth = 1.2 + random() * 5.2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.stroke();
  }

  for (let i = 0; i < 120; i += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const width = 8 + random() * 34;
    const length = 90 + random() * 460;
    const alpha = 0.055 + random() * 0.13;

    const gradient = ctx.createLinearGradient(x, y, x, y + length);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(0.16, `rgba(0,0,0,${alpha})`);
    gradient.addColorStop(0.76, `rgba(0,0,0,${alpha * 0.58})`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, width, length);
  }

  for (let i = 0; i < 11200; i += 1) {
    const alpha = 0.025 + random() * 0.17;
    ctx.fillStyle =
      random() > 0.14
        ? `rgba(0,0,0,${alpha})`
        : `rgba(132,144,148,${alpha * 0.45})`;
    ctx.fillRect(
      random() * canvas.width,
      random() * canvas.height,
      2 + random() * 8,
      2 + random() * 8,
    );
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1, 1);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

export function createWallGrimeTexture() {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let seed = 2197;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < 34; i += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const rx = 18 + random() * 74;
    const ry = 14 + random() * 58;
    const opacity = 0.07 + random() * 0.18;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((random() - 0.5) * Math.PI);
    ctx.scale(1, 0.48 + random() * 0.9);

    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    gradient.addColorStop(0, `rgba(2,4,5,${opacity})`);
    gradient.addColorStop(0.45, `rgba(20,24,26,${opacity * 0.55})`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  for (let i = 0; i < 1400; i += 1) {
    const alpha = random() * 0.09;
    ctx.fillStyle = `rgba(0,0,0,${alpha})`;
    ctx.fillRect(
      random() * canvas.width,
      random() * canvas.height,
      1 + random() * 3,
      1 + random() * 3,
    );
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

export function createRunoffStreakTexture() {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 384;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let seed = 3863;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < 18; i += 1) {
    const x = 12 + random() * 72;
    const width = 1.5 + random() * 6;
    const length = 130 + random() * 230;
    const start = random() * 52;

    const gradient = ctx.createLinearGradient(0, start, 0, start + length);
    gradient.addColorStop(0, "rgba(18,10,6,0)");
    gradient.addColorStop(0.12, `rgba(2,4,5,${0.14 + random() * 0.16})`);
    gradient.addColorStop(0.7, `rgba(2,4,5,${0.06 + random() * 0.08})`);
    gradient.addColorStop(1, "rgba(2,4,5,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(x, start, width, length);
  }

  for (let i = 0; i < 260; i += 1) {
    ctx.fillStyle = `rgba(0,0,0,${random() * 0.08})`;
    ctx.fillRect(
      random() * canvas.width,
      random() * canvas.height,
      1 + random() * 2,
      4 + random() * 20,
    );
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
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
