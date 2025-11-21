import type { Items3DType } from "@/types";

export const Items3D: Items3DType = [
  {
    rig: 'Rig',
    path: '/models/KnightMano.glb',
    position: [2, 0, -2],
    scale: 1
  },
  {
    rig: 'Rig',
    path: '/models/KnightMano.glb',
    position: [-4, 0, -2],
    scale: 1,
  },
  {
    rig: 'Rig',
    path: '/models/KnightMano.glb',
    position: [-4, 0, -7],
    scale: 1,
    rotation: [0, Math.PI, 0]
  },
  {
    rig: 'Rig',
    path: '/models/KnightMano.glb',
    position: [2, 0, -7],
    scale: 1,
    rotation: [0, Math.PI, 0]
  },
  {
    rig: 'Tree',
    path: '/models/Tree_2_B_Color1.glb',
    position: [-5, 0, -3],
    scale: 1
  },
  {
    rig: 'Rock_3_B_Color1',
    path: '/models/Rock_3_B_Color1.glb',
    position: [-6, 0, -4],
    scale: 1.5
  },
  {
    rig: 'Rig',
    path: '/models/Barracks.glb',
    position: [-1, 0, -4],
    scale: 4
  },
  {
    rig: 'Bush',
    path: '/models/Bush_2_C_Color1.glb',
    position: [3, 0, -6],
    scale: 1
  },
  {
    rig: 'Bush',
    path: '/models/Bush_4_A_Color1.glb',
    position: [-3, 0, -1],
    scale: 1
  },
  {
    rig: 'Bush',
    path: '/models/Bush_4_A_Color1.glb',
    position: [1, 0, -1],
    scale: 1
  }

]


export const CaractersAnimated: Items3DType = [
  {
    rig: 'Rig',
    path: '/models/Knight.glb',
    position: [-1, 0, 0],
    scale: 1
  },
  {
    rig: 'Viking',
    path: '/models/viking.glb',
    position: [1, 0, 0],
    scale: 1,
    rotation: [Math.PI / 2, 0, 0]
  },
  {
    rig: 'Mage',
    path: '/models/Mage.glb',
    position: [-3, 0, 0],
    scale: 1,
    rotation: [Math.PI / 2, 0, 0]
  }
]
