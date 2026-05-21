const TEXTURE_ROOT = "/assets/tunnel/textures";
const MODEL_ROOT = "/assets/tunnel/models";
const HDRI_ROOT = "/assets/tunnel/hdri";

export const TUNNEL_TEXTURES = {
  pipeRust: {
    color:
      `${TEXTURE_ROOT}/rusty-metal-sheet/textures/rusty_metal_sheet_diff_2k.jpg`,
    normal:
      `${TEXTURE_ROOT}/rusty-metal-sheet/textures/rusty_metal_sheet_nor_gl_2k.png`,
    arm:
      `${TEXTURE_ROOT}/rusty-metal-sheet/textures/rusty_metal_sheet_arm_2k.jpg`,
    displacement:
      `${TEXTURE_ROOT}/rusty-metal-sheet/textures/rusty_metal_sheet_disp_2k.png`,
  },
  mud: {
    color: `${TEXTURE_ROOT}/muddy-tracks/textures/muddy_tracks_diff_2k.jpg`,
    normal: `${TEXTURE_ROOT}/muddy-tracks/textures/muddy_tracks_nor_gl_2k.png`,
    arm: `${TEXTURE_ROOT}/muddy-tracks/textures/muddy_tracks_arm_2k.jpg`,
    displacement: `${TEXTURE_ROOT}/muddy-tracks/textures/muddy_tracks_disp_2k.png`,
  },
  aerialMud: {
    color: `${TEXTURE_ROOT}/aerial-mud-1/textures/aerial_mud_1_diff_2k.jpg`,
    normal: `${TEXTURE_ROOT}/aerial-mud-1/textures/aerial_mud_1_nor_gl_2k.png`,
    arm: `${TEXTURE_ROOT}/aerial-mud-1/textures/aerial_mud_1_arm_2k.jpg`,
    displacement:
      `${TEXTURE_ROOT}/aerial-mud-1/textures/aerial_mud_1_disp_2k.png`,
  },
  corrugatedIron: {
    color:
      `${TEXTURE_ROOT}/rusty-corrugated-iron/textures/rusty_corrugated_iron_diff_2k.jpg`,
    normal:
      `${TEXTURE_ROOT}/rusty-corrugated-iron/textures/rusty_corrugated_iron_nor_gl_2k.png`,
    arm:
      `${TEXTURE_ROOT}/rusty-corrugated-iron/textures/rusty_corrugated_iron_arm_2k.jpg`,
    displacement:
      `${TEXTURE_ROOT}/rusty-corrugated-iron/textures/rusty_corrugated_iron_disp_2k.png`,
  },
  darkRust: {
    color: `${TEXTURE_ROOT}/metal-025/Metal025_2K-JPG_Color.jpg`,
    normal: `${TEXTURE_ROOT}/metal-025/Metal025_2K-JPG_NormalGL.jpg`,
    roughness: `${TEXTURE_ROOT}/metal-025/Metal025_2K-JPG_Roughness.jpg`,
    metalness: `${TEXTURE_ROOT}/metal-025/Metal025_2K-JPG_Metalness.jpg`,
    displacement: `${TEXTURE_ROOT}/metal-025/Metal025_2K-JPG_Displacement.jpg`,
    preview: `${TEXTURE_ROOT}/metal-025/Metal025.png`,
  },
};

export const TUNNEL_MODELS = {
  electricalBoxes: `${MODEL_ROOT}/electrical-boxes/electrical_boxes.glb`,
  bolt: `${MODEL_ROOT}/bolt-m10/bolt_m10x25_hexagon_head.glb`,
  wires: `${MODEL_ROOT}/wires/wires.glb`,
  oldPipePack:
    `${MODEL_ROOT}/old-industrial-pipe-pack/old_industrial_pipe_pack_pbr.glb`,
};

export const TUNNEL_HDRI = {
  abandonedTiledRoom: `${HDRI_ROOT}/abandoned_tiled_room_1k.exr`,
};
