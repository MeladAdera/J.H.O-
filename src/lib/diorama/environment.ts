import * as THREE from "three";

/* Something for the mirrors to reflect.

   A MeshStandardMaterial at metalness 0.9 reflects its environment and
   nothing else. With no environment set that is literally nothing, so both
   mirrors render as flat slate.

   A gradient sky does not fix this, which is worth recording because it looks
   like it should: the vanity glass is a flat disc facing the viewer, so its
   reflection vector samples one narrow band of the gradient and comes back
   near-uniform — flat slate in a different colour. The mirror has to reflect
   the actual room.

   So this bakes a cube map from a point in the room with a CubeCamera. Six
   128px faces, rendered twice at startup — once per lighting preset — and then
   never again, because the geometry never moves. Per-mirror accuracy would
   need a bake at each mirror's position; one shared bake from the centre is
   close enough that the glass reads as glass. */

export interface Environment {
  texture: THREE.Texture;
  dispose(): void;
}

/** Bakes the scene as it currently stands. Call with the lighting already set. */
export function bakeEnvironment(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  at: THREE.Vector3,
): Environment {
  const target = new THREE.WebGLCubeRenderTarget(128, {
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
  });
  const camera = new THREE.CubeCamera(0.5, 80, target);
  camera.position.copy(at);

  /* Clear any previous environment first: baking a scene that is already
     reflecting an older bake compounds the reflection each time. */
  const previous = scene.environment;
  scene.environment = null;
  camera.update(renderer, scene);
  scene.environment = previous;

  return { texture: target.texture, dispose: () => target.dispose() };
}
