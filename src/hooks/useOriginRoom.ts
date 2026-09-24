"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { STATIONS } from "@/data/stations";
import { LIGHTING } from "@/lib/diorama/lighting";
import { buildRoom } from "@/lib/diorama/room";
import { bakeEnvironment, type Environment } from "@/lib/diorama/environment";
import type { Theme } from "@/lib/theme";
import type { StationIndex } from "@/lib/types";

/* Owns the WebGL side of page 3: renderer, camera, the light rig, drag-orbit,
   scroll-zoom, and the glide between camera waypoints.

   The scene is built once and then driven by refs rather than React state —
   a render loop that re-rendered React every frame would be 60 reconciles a
   second for nothing. `station` and `theme` come in as props and are pushed
   into refs so the loop reads the latest value without being rebuilt. */

interface Options {
  station: StationIndex;
  theme: Theme;
  /** Skips the idle drift and shortens camera glides. */
  reducedMotion?: boolean;
  /** Fired when a prop in the scene is clicked. */
  onSelectStation?: (index: StationIndex) => void;
  /** Fired on any press or zoom inside the room — used to stop the tour. */
  onInteract?: () => void;
}

/** Below this much pointer travel a press counts as a click, not a drag. */
const CLICK_SLOP = 6;

const DEG = Math.PI / 180;

export function useOriginRoom({
  station,
  theme,
  reducedMotion = false,
  onSelectStation,
  onInteract,
}: Options) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const stationRef = useRef(station);
  const themeRef = useRef(theme);
  const reducedRef = useRef(reducedMotion);
  const selectRef = useRef(onSelectStation);
  const interactRef = useRef(onInteract);

  /* Refs are written after render, not during it. The render loop is a rAF,
     so it picks the new value up on the next frame either way. The callback
     goes through a ref too, so a caller passing an inline arrow does not
     rebuild the whole scene on every render. */
  useEffect(() => {
    stationRef.current = station;
    themeRef.current = theme;
    reducedRef.current = reducedMotion;
    selectRef.current = onSelectStation;
    interactRef.current = onInteract;
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || 1;
    let height = mount.clientHeight || 1;

    // --- renderer -------------------------------------------------------
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      // No WebGL — the caller's <noscript>-style fallback stays visible.
      return;
    }
    renderer.setSize(width, height);
    // Capped at 2: beyond that the gain is invisible and the fill cost is real.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);

    const { group: room, registry } = buildRoom();
    scene.add(room);

    // --- light rig. One object per preset field; see lighting.ts. --------
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(15, 22, 13);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 60;
    const fill = new THREE.DirectionalLight(0xffffff, 1);
    fill.position.set(-12, 9, -8);
    const stitch = new THREE.PointLight(0xffffff, 1, 11, 1.5);
    stitch.position.set(2.4, 3.2, 1.8);
    const vanity = new THREE.PointLight(0xffffff, 1, 8.5, 1.5);
    vanity.position.set(-3.4, 3.1, -4.4);
    const bed = new THREE.PointLight(0xffffff, 1, 10, 1.6);
    bed.position.set(3.4, 2.2, -3.6);
    scene.add(ambient, sun, fill, stitch, vanity, bed);

    const background = new THREE.Color();
    /** The stitch lamp's un-flickered intensity for the current lighting mix. */
    let stitchBase = 0;

    /* Filled in after the first lighting pass — a bake needs the lights it is
       meant to capture, and applyLighting is what sets those. */
    let environments: Record<Theme, Environment> | null = null;
    let currentEnvironment: Theme | null = null;
    const applyEnvironment = (mix: number) => {
      if (!environments) return;
      /* Swapped at the midpoint rather than blended: what changes is the
         brightness of a reflection inside two small mirrors, and a cube map
         cannot be lerped without baking a third. */
      const wanted: Theme = mix > 0.5 ? "light" : "dark";
      if (wanted === currentEnvironment) return;
      currentEnvironment = wanted;
      scene.environment = environments[wanted].texture;
    };

    /* Lighting is tweened rather than snapped: the toggle should read as the
       room's lights coming up, not as a different page. `t` is eased outside. */
    const applyLighting = (t: number) => {
      const from = LIGHTING.dark;
      const to = LIGHTING.light;
      const lerp = (a: number, b: number) => a + (b - a) * t;
      const mix = (target: THREE.Color, a: number, b: number) =>
        target.set(a).lerp(new THREE.Color(b), t);

      mix(ambient.color, from.ambient.color, to.ambient.color);
      ambient.intensity = lerp(from.ambient.intensity, to.ambient.intensity);
      mix(sun.color, from.sun.color, to.sun.color);
      sun.intensity = lerp(from.sun.intensity, to.sun.intensity);
      mix(fill.color, from.fill.color, to.fill.color);
      fill.intensity = lerp(from.fill.intensity, to.fill.intensity);
      mix(stitch.color, from.stitch.color, to.stitch.color);
      // The flicker below reads this, so it is stored rather than only applied.
      stitchBase = lerp(from.stitch.intensity, to.stitch.intensity);
      stitch.intensity = stitchBase;
      mix(vanity.color, from.vanity.color, to.vanity.color);
      vanity.intensity = lerp(from.vanity.intensity, to.vanity.intensity);
      mix(bed.color, from.bed.color, to.bed.color);
      bed.intensity = lerp(from.bed.intensity, to.bed.intensity);

      mix(background, from.background, to.background);
      scene.background = background;
      renderer.toneMappingExposure = lerp(from.exposure, to.exposure);
      applyEnvironment(t);
    };

    // 0 = night, 1 = day. Starts settled so there is no opening fade.
    let daylight = themeRef.current === "light" ? 1 : 0;

    /* Bake each mode's reflection once, with that mode's lights actually
       applied. Roughly eye height at the centre of the room, so the mirrors
       reflect the space rather than the underside of the plinth. */
    const bakePoint = new THREE.Vector3(0, 2.4, 0);
    applyLighting(0);
    const darkEnv = bakeEnvironment(renderer, scene, bakePoint);
    applyLighting(1);
    const lightEnv = bakeEnvironment(renderer, scene, bakePoint);
    environments = { dark: darkEnv, light: lightEnv };

    applyLighting(daylight);

    // --- camera waypoints ------------------------------------------------
    const first = STATIONS[0];
    const targetCam = new THREE.Vector3(...first.cam);
    const targetLook = new THREE.Vector3(...first.look);
    const currentLook = targetLook.clone();
    camera.position.copy(targetCam);
    camera.lookAt(currentLook);

    /* Orbit is tracked as spherical offsets the user adds on top of whatever
       waypoint is active, so dragging does not fight the glide. */
    let yaw = 0;
    let pitch = 0;
    let zoom = 1;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const canvas = renderer.domElement;
    canvas.style.touchAction = "none";
    canvas.style.cursor = "grab";

    /* Picking. Props carry userData.station; the raycaster hits a leaf mesh,
       so resolving a click means walking up to the nearest tagged ancestor. */
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const stationAt = (clientX: number, clientY: number): StationIndex | null => {
      const box = canvas.getBoundingClientRect();
      pointer.x = ((clientX - box.left) / box.width) * 2 - 1;
      pointer.y = -((clientY - box.top) / box.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      for (const hit of raycaster.intersectObject(room, true)) {
        let node: THREE.Object3D | null = hit.object;
        while (node) {
          const tag = node.userData?.station;
          if (typeof tag === "number") return tag as StationIndex;
          node = node.parent;
        }
      }
      return null;
    };

    let pressX = 0;
    let pressY = 0;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = pressX = e.clientX;
      lastY = pressY = e.clientY;
      canvas.style.cursor = "grabbing";
      canvas.setPointerCapture(e.pointerId);
      /* Touching the room at all ends the tour — whether the press turns out
         to be a click on a prop or a drag to look around. Waiting to see which
         would let the camera glide away mid-gesture. */
      interactRef.current?.();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) {
        // Hint that props are clickable before the user commits to a press.
        canvas.style.cursor = stationAt(e.clientX, e.clientY) === null ? "grab" : "pointer";
        return;
      }
      yaw -= (e.clientX - lastX) * 0.005;
      // Clamped so the camera cannot pass the poles and flip the horizon.
      pitch = Math.max(-35 * DEG, Math.min(55 * DEG, pitch + (e.clientY - lastY) * 0.005));
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      canvas.style.cursor = "grab";
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);

      /* A press that barely moved is a click on whatever is under it. Without
         the slop test every drag would also "select" the prop it started on. */
      const travelled = Math.hypot(e.clientX - pressX, e.clientY - pressY);
      if (e.type !== "pointercancel" && travelled < CLICK_SLOP) {
        const picked = stationAt(e.clientX, e.clientY);
        if (picked !== null) selectRef.current?.(picked);
      }
    };
    const onWheel = (e: WheelEvent) => {
      // Only claim the gesture while zooming, so the page still scrolls past.
      e.preventDefault();
      zoom = Math.max(0.45, Math.min(1.8, zoom + e.deltaY * 0.0012));
      interactRef.current?.();
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    // --- resize ----------------------------------------------------------
    const resize = () => {
      width = mount.clientWidth || 1;
      height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    // --- loop -------------------------------------------------------------
    const clock = new THREE.Clock();
    let frame = 0;
    let lastStation: StationIndex = 0;
    const spherical = new THREE.Spherical();
    const desired = new THREE.Vector3();

    let elapsed = 0;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      /* getDelta() only — getElapsedTime() calls getDelta() internally, so
         asking for both in one frame leaves the second one returning ~0 and
         every delta-driven tween silently frozen. */
      const delta = Math.min(clock.getDelta(), 0.1);
      elapsed += delta;

      if (stationRef.current !== lastStation) {
        lastStation = stationRef.current;
        const next = STATIONS[lastStation];
        targetCam.set(...next.cam);
        targetLook.set(...next.look);
        // A new waypoint re-frames the shot, so the user's orbit is released.
        yaw = 0;
        pitch = 0;
        zoom = 1;
      }

      // Apply orbit + zoom as an offset on the active waypoint.
      spherical.setFromVector3(targetCam);
      spherical.theta += yaw;
      spherical.phi = Math.max(0.15, Math.min(Math.PI - 0.15, spherical.phi - pitch));
      spherical.radius *= zoom;
      desired.setFromSpherical(spherical);

      // Critically-damped-ish follow: fast enough to feel responsive, slow
      // enough that a waypoint jump reads as a glide.
      const ease = reducedRef.current ? 1 : 1 - Math.pow(0.0015, delta);
      camera.position.lerp(desired, ease);
      currentLook.lerp(targetLook, ease);

      const wanted = themeRef.current === "light" ? 1 : 0;
      if (daylight !== wanted) {
        const step = reducedRef.current ? 1 : delta * 1.6;
        daylight += Math.sign(wanted - daylight) * Math.min(step, Math.abs(wanted - daylight));
        applyLighting(daylight);
      }

      /* The lamp breathes, as in the reference (line 825). Set from the rig's
         current base rather than multiplied into the previous frame's value —
         compounding drifts the intensity away and fights applyLighting. */
      if (!reducedRef.current) {
        stitch.intensity = stitchBase * (1 + Math.sin(elapsed * 2.5) * 0.12);
      }

      camera.lookAt(currentLook);
      renderer.render(scene, camera);
    };
    tick();

    // --- teardown ---------------------------------------------------------
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      canvas.removeEventListener("wheel", onWheel);
      registry.dispose();
      environments?.dark.dispose();
      environments?.light.dispose();
      renderer.dispose();
      // Frees the GPU context immediately rather than waiting for GC; browsers
      // cap live contexts (~16) and a few navigations would otherwise hit it.
      renderer.forceContextLoss();
      canvas.remove();
    };
  }, []);

  return mountRef;
}
