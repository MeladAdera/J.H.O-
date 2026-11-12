import * as THREE from "three";

/* Shared construction helpers for the origin room.

   Three.js allocates geometries and materials on the GPU, and React unmounts
   this scene on every client navigation. Anything not disposed leaks a buffer
   per visit until the browser drops the context, so every builder registers
   what it creates and teardown walks the registry once. */

export class Registry {
  private geometries = new Set<THREE.BufferGeometry>();
  private materials = new Set<THREE.Material>();

  geo<T extends THREE.BufferGeometry>(g: T): T {
    this.geometries.add(g);
    return g;
  }

  mat<T extends THREE.Material>(m: T): T {
    this.materials.add(m);
    return m;
  }

  dispose(): void {
    for (const g of this.geometries) g.dispose();
    for (const m of this.materials) m.dispose();
    this.geometries.clear();
    this.materials.clear();
  }
}

/** A mesh that casts and receives shadow unless told otherwise. */
export function mesh(
  geo: THREE.BufferGeometry,
  mat: THREE.Material,
  cast = true,
  receive = true,
): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}

/** Positions a mesh and returns it, so builders read as one statement each. */
export function at(m: THREE.Mesh, x: number, y: number, z: number): THREE.Mesh {
  m.position.set(x, y, z);
  return m;
}
