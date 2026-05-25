"use client";

import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

function buildTextureInput(textureSet) {
  const input = {};

  if (textureSet.color) input.map = textureSet.color;
  if (textureSet.normal) input.normalMap = textureSet.normal;
  if (textureSet.arm) input.armMap = textureSet.arm;
  if (textureSet.roughness) input.roughnessMap = textureSet.roughness;
  if (textureSet.metalness) input.metalnessMap = textureSet.metalness;
  if (textureSet.ao) input.aoMap = textureSet.ao;

  return input;
}

function cloneAndConfigureTexture(texture, key, repeat, anisotropy) {
  const clone = texture.clone();

  clone.wrapS = THREE.RepeatWrapping;
  clone.wrapT = THREE.RepeatWrapping;
  clone.repeat.set(repeat[0], repeat[1]);
  clone.anisotropy = anisotropy;
  clone.colorSpace =
    key === "map" ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  clone.needsUpdate = true;

  return clone;
}

export function usePbrTextureSet(textureSet, options = {}) {
  const { gl } = useThree();
  const repeatX = options.repeat?.[0] ?? 1;
  const repeatY = options.repeat?.[1] ?? 1;
  const maxAnisotropy = gl.capabilities?.getMaxAnisotropy?.() ?? 1;
  const anisotropy = Math.min(options.anisotropy ?? 8, maxAnisotropy);
  const textureInput = useMemo(() => buildTextureInput(textureSet), [textureSet]);
  const loadedTextures = useTexture(textureInput);

  const textures = useMemo(() => {
    const configured = {};

    Object.entries(loadedTextures).forEach(([key, texture]) => {
      if (!texture) return;
      configured[key] = cloneAndConfigureTexture(
        texture,
        key,
        [repeatX, repeatY],
        anisotropy,
      );
    });

    if (configured.armMap) {
      const armMap = configured.armMap;
      configured.aoMap = configured.aoMap ?? armMap;
      configured.roughnessMap = configured.roughnessMap ?? armMap;
      configured.metalnessMap = configured.metalnessMap ?? armMap;
      delete configured.armMap;
    }

    return configured;
  }, [loadedTextures, repeatX, repeatY, anisotropy]);

  useEffect(() => {
    return () => {
      const disposed = new Set();

      Object.values(textures).forEach((texture) => {
        if (!texture || disposed.has(texture)) return;
        texture.dispose();
        disposed.add(texture);
      });
    };
  }, [textures]);

  return textures;
}



export function findFirstMesh(object) {
  let found = null;

  object?.traverse?.((child) => {
    if (!found && child.isMesh && child.geometry) {
      found = child;
    }
  });

  return found;
}

export function prepareModelScene(scene, options = {}) {
  const clone = scene.clone(true);
  const color = options.color ? new THREE.Color(options.color) : null;

  const tuneMaterial = (material) => {
    if (!material) return material;

    const nextMaterial = material.clone();

    if (color) {
      nextMaterial.color?.lerp(color, options.colorMix ?? 0.35);
    }

    nextMaterial.roughness = Math.max(nextMaterial.roughness ?? 0.7, 0.72);
    nextMaterial.metalness = Math.max(nextMaterial.metalness ?? 0.2, 0.35);

    return nextMaterial;
  };

  clone.traverse((child) => {
    if (!child.isMesh) return;

    child.castShadow = Boolean(options.castShadow);
    child.receiveShadow = options.receiveShadow ?? true;

    if (child.material) {
      child.material = Array.isArray(child.material)
        ? child.material.map(tuneMaterial)
        : tuneMaterial(child.material);
    }
  });

  return clone;
}
