export interface Item3D {
  rig: string;
  path: string;
  rotation?: [number, number, number];
  position?: [number, number, number];
  scale?: number;
}

export type Items3DType = Item3D[];


export enum ThemePresent {
    Sunset = 'sunset',
    Night = 'night',
    Studio = "studio",
    City = "city",
    Umbrellas = "umbrellas",
    Forest = "forest",
    Snow = "snow",
    Dawn = "dawn",
    Hangar = "hangar",
    Urban = "urban",
    Modern = "modern",
    Shangai = "shangai"
  }
