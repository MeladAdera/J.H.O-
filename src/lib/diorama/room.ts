import * as THREE from "three";
import { PALETTE as P } from "./palette";
import { Registry, mesh } from "./kit";
import {
  buildDesk,
  buildFurnishings,
  buildMotes,
  buildRack,
  buildStandingMirror,
  buildVanity,
} from "./props";

export { Registry } from "./kit";

/* Builds the origin room's geometry. Ported from
   design-reference/my little world.html:329-740.

   Everything is primitives — no loaders, no external models — so the scene is
   ready the moment the module evaluates and there is nothing to wait on.

   Every geometry and material is registered with the returned Registry.
   Three.js allocates those on the GPU and React will unmount this scene on
   every client navigation, so anything not disposed leaks a buffer per visit
   until the context is lost. */

/** The exhibition plinth the whole room sits on, plus its checkered tiles. */
function buildBase(reg: Registry, radius: number): THREE.Group {
  const group = new THREE.Group();

  const base = mesh(
    reg.geo(new THREE.CylinderGeometry(radius, radius + 0.35, 0.45, 56)),
    reg.mat(new THREE.MeshStandardMaterial({ color: P.plinth, roughness: 0.85 })),
    false,
    true,
  );
  base.position.y = -0.23;
  group.add(base);

  /* Checkered floor. One shared geometry and two shared materials across
     ~250 tiles — instancing the meshes but not their buffers keeps the draw
     cost low without an InstancedMesh, which would complicate shadows here. */
  const size = 0.92;
  const tileGeo = reg.geo(new THREE.PlaneGeometry(size * 0.96, size * 0.96));
  const tileA = reg.mat(new THREE.MeshStandardMaterial({ color: P.floorTileA, roughness: 0.7 }));
  const tileB = reg.mat(new THREE.MeshStandardMaterial({ color: P.floorTileB, roughness: 0.85 }));

  const tiles = new THREE.Group();
  tiles.rotation.x = -Math.PI / 2;
  tiles.position.y = 0.01;

  const rows = 18;
  const cols = 18;
  for (let r = -rows / 2; r < rows / 2; r++) {
    for (let c = -cols / 2; c < cols / 2; c++) {
      // Clip the grid to the round plinth instead of overhanging it.
      if (Math.sqrt(r * r * size * size + c * c * size * size) >= radius - 0.3) continue;
      const tile = new THREE.Mesh(tileGeo, (Math.abs(r) + Math.abs(c)) % 2 === 0 ? tileA : tileB);
      tile.position.set(c * size + size / 2, r * size + size / 2, 0);
      tile.receiveShadow = true;
      tiles.add(tile);
    }
  }
  group.add(tiles);
  return group;
}

/** Two corner walls — just enough architecture to catch light and shadow. */
function buildWalls(reg: Registry): THREE.Group {
  const group = new THREE.Group();
  const height = 7.2;
  const thickness = 0.35;
  const wallMat = reg.mat(
    new THREE.MeshStandardMaterial({ color: P.wallWarm, roughness: 0.9 }),
  );

  const back = mesh(
    reg.geo(new THREE.BoxGeometry(12, height, thickness)),
    wallMat,
    false,
    true,
  );
  back.position.set(0, height / 2, -6);
  group.add(back);

  const left = mesh(reg.geo(new THREE.BoxGeometry(thickness, height, 12)), wallMat, false, true);
  left.position.set(-6, height / 2, 0);
  group.add(left);

  return group;
}

export interface Room {
  group: THREE.Group;
  registry: Registry;
}

export function buildRoom(): Room {
  const registry = new Registry();
  const group = new THREE.Group();

  group.add(buildBase(registry, 10.2));
  group.add(buildWalls(registry));

  // Station props, in waypoint order.
  group.add(buildDesk(registry)); // 01 and 04
  group.add(buildRack(registry)); // 02
  group.add(buildVanity(registry)); // 03
  group.add(buildStandingMirror(registry)); // 03

  // Dressing the wide shot.
  group.add(buildFurnishings(registry));
  group.add(buildMotes(registry));

  return { group, registry };
}
