import * as THREE from "three";
import { PALETTE as P } from "./palette";
import { Registry, mesh, at } from "./kit";

/* The furniture of the origin room, ported from
   design-reference/my little world.html:385-740.

   One builder per station, so a waypoint and the thing it aims at stay
   together. Positions are world units on the plinth built in room.ts — moving
   a group means re-aiming its waypoint in data/stations.ts.

   Shapes and palette follow the reference; its branded props (a Stitch lamp,
   a Guess bag) are modelled as forms only, without any mark or logo. */

/** Station 03 — the vanity desk, its arched mirror, bottles and stool. */
export function buildVanity(reg: Registry): THREE.Group {
  const group = new THREE.Group();
  group.position.set(-3.6, 0, -4.5);

  const wood = reg.mat(new THREE.MeshStandardMaterial({ color: P.vanityWood, roughness: 0.6 }));
  const gold = reg.mat(
    new THREE.MeshStandardMaterial({ color: P.goldHardware, metalness: 0.85, roughness: 0.3 }),
  );
  const frameGold = reg.mat(
    new THREE.MeshStandardMaterial({ color: P.mirrorGoldFrame, roughness: 0.4, metalness: 0.6 }),
  );

  group.add(at(mesh(reg.geo(new THREE.BoxGeometry(3.6, 0.15, 1.5)), wood), 0, 1.6, 0));

  // Drawer pedestals, one either side of the knee hole.
  const pedestal = reg.geo(new THREE.BoxGeometry(1.0, 1.5, 1.4));
  group.add(at(mesh(pedestal, wood), -1.25, 0.75, 0));
  group.add(at(mesh(pedestal, wood), 1.25, 0.75, 0));

  const pull = reg.geo(new THREE.BoxGeometry(0.18, 0.04, 0.04));
  for (let d = 0; d < 3; d++) {
    const y = 0.35 + d * 0.45;
    group.add(at(mesh(pull, gold), -1.25, y, 0.72));
    group.add(at(mesh(pull, gold), 1.25, y, 0.72));
  }

  // The sculptural arched mirror: a half-torus over a flat glass disc.
  const mirror = new THREE.Group();
  mirror.position.set(0, 1.65, -0.4);

  const arch = mesh(
    reg.geo(new THREE.TorusGeometry(1.35, 0.1, 16, 36, Math.PI)),
    frameGold,
  );
  arch.rotation.z = Math.PI;
  arch.position.y = 1.35;
  mirror.add(arch);

  mirror.add(at(mesh(reg.geo(new THREE.BoxGeometry(2.7, 0.12, 0.16)), frameGold), 0, 1.35, 0));

  const glass = new THREE.Mesh(
    reg.geo(new THREE.CircleGeometry(1.25, 32)),
    reg.mat(new THREE.MeshStandardMaterial({ color: P.mirrorGlass, roughness: 0.05, metalness: 0.85 })),
  );
  glass.position.set(0, 1.35, 0.01);
  mirror.add(glass);
  group.add(mirror);

  /* Cosmetics scattered across the top. Laid out arithmetically rather than
     hand-placed — the clutter reads as clutter and stays cheap. */
  const bottleColors = [0xf472b6, 0x38bdf8, 0xfde047, 0xe2e8f0, 0xa855f7, 0xf43f5e];
  for (let c = 0; c < 14; c++) {
    const h = 0.15 + (c % 4) * 0.08;
    const r = 0.04 + (c % 3) * 0.02;
    const bottle = mesh(
      reg.geo(new THREE.CylinderGeometry(r, r * 1.1, h, 12)),
      reg.mat(
        new THREE.MeshStandardMaterial({
          color: bottleColors[c % bottleColors.length],
          roughness: 0.2,
          metalness: c % 2 === 0 ? 0.3 : 0.7,
        }),
      ),
    );
    group.add(at(bottle, -1.2 + c * 0.18 + (c % 3) * 0.05, 1.6 + h / 2, 0.15 + ((c % 4) - 1.5) * 0.18));
  }

  // Stool.
  const seat = mesh(
    reg.geo(new THREE.CylinderGeometry(0.45, 0.45, 0.08, 24)),
    reg.mat(new THREE.MeshStandardMaterial({ color: P.pinkLinen, roughness: 0.7 })),
  );
  group.add(at(seat, 0, 0.9, 0.85));

  const legGeo = reg.geo(new THREE.CylinderGeometry(0.025, 0.02, 0.9, 8));
  for (let l = 0; l < 4; l++) {
    const angle = (l / 4) * Math.PI * 2;
    group.add(at(mesh(legGeo, wood), Math.cos(angle) * 0.32, 0.45, 0.85 + Math.sin(angle) * 0.32));
  }

  return group;
}

/** Station 03 — the standing full-length dressing mirror beside the vanity. */
export function buildStandingMirror(reg: Registry): THREE.Group {
  const group = new THREE.Group();
  group.position.set(-0.8, 0, -5.2);
  group.rotation.y = 0.25;

  const height = 4.2;
  const width = 1.3;
  const frame = reg.mat(
    new THREE.MeshStandardMaterial({ color: P.goldHardware, roughness: 0.35, metalness: 0.8 }),
  );
  const wood = reg.mat(new THREE.MeshStandardMaterial({ color: P.vanityWood, roughness: 0.6 }));

  const glass = mesh(
    reg.geo(new THREE.PlaneGeometry(width - 0.16, height - 0.5)),
    reg.mat(new THREE.MeshStandardMaterial({ color: P.mirrorGlass, roughness: 0.05, metalness: 0.9 })),
  );
  group.add(at(glass, 0, height / 2 + 0.2, 0.02));

  const arch = mesh(reg.geo(new THREE.TorusGeometry(width / 2, 0.08, 12, 24, Math.PI)), frame);
  arch.position.y = height - 0.05;
  group.add(arch);

  const post = reg.geo(new THREE.CylinderGeometry(0.04, 0.04, height - 0.2, 10));
  group.add(at(mesh(post, frame), -width / 2, (height - 0.2) / 2, 0));
  group.add(at(mesh(post, frame), width / 2, (height - 0.2) / 2, 0));

  /* The LED perimeter. MeshBasicMaterial so it ignores the light rig — it is
     a light source in the fiction, and shading it would make it go dark at
     night, which is exactly when it should read brightest. */
  const strip = new THREE.Mesh(
    reg.geo(new THREE.PlaneGeometry(width - 0.06, height - 0.38)),
    reg.mat(new THREE.MeshBasicMaterial({ color: 0xfffae8, transparent: true, opacity: 0.45 })),
  );
  strip.position.set(0, height / 2 + 0.2, 0.01);
  group.add(strip);

  group.add(at(mesh(reg.geo(new THREE.BoxGeometry(width + 0.3, 0.12, 0.65)), wood), 0, 0.06, 0));

  return group;
}

/* Stations 01 and 04 — the draped round altar carrying the ring lamp, the
   laptop, the marker cup and the sketchbook. One group because the two
   waypoints look at the same table from different distances. */
export function buildDesk(reg: Registry): THREE.Group {
  const group = new THREE.Group();
  group.position.set(2.4, 0, 1.8);

  // The cloth: a disc for the top, an open cone for the skirt falling off it.
  group.add(
    at(
      mesh(
        reg.geo(new THREE.CylinderGeometry(1.82, 1.86, 0.12, 32)),
        reg.mat(new THREE.MeshStandardMaterial({ color: P.yellowDrape, roughness: 0.85 })),
      ),
      0,
      1.55,
      0,
    ),
  );
  group.add(
    at(
      mesh(
        reg.geo(new THREE.CylinderGeometry(1.85, 2.08, 1.5, 32, 1, true)),
        reg.mat(
          new THREE.MeshStandardMaterial({
            color: P.yellowDrapeDark,
            roughness: 0.9,
            // Open cylinder: without DoubleSide the inside of the skirt vanishes.
            side: THREE.DoubleSide,
          }),
        ),
      ),
      0,
      0.76,
      0,
    ),
  );

  // --- laptop ---------------------------------------------------------
  const laptop = new THREE.Group();
  /* Tagged for its own station, so clicking the laptop opens station 04 while
     the table around it opens 01 — the raycaster stops at the nearest tagged
     ancestor, and this one sits below the desk's tag. */
  laptop.userData.station = 4;
  laptop.position.set(-0.35, 1.62, 0.15);
  laptop.rotation.y = 0.38;
  laptop.add(
    mesh(
      reg.geo(new THREE.BoxGeometry(0.9, 0.03, 0.65)),
      reg.mat(new THREE.MeshStandardMaterial({ color: 0x22242a, roughness: 0.4, metalness: 0.5 })),
    ),
  );

  const lid = new THREE.Group();
  lid.position.set(0, 0.02, -0.31);
  lid.rotation.x = -0.3;
  lid.add(
    at(
      mesh(
        reg.geo(new THREE.BoxGeometry(0.9, 0.6, 0.02)),
        reg.mat(new THREE.MeshStandardMaterial({ color: 0x19191f, roughness: 0.4 })),
      ),
      0,
      0.3,
      0,
    ),
  );
  // Unlit: the screen emits, so it must not dim when the room does.
  const screen = new THREE.Mesh(
    reg.geo(new THREE.PlaneGeometry(0.84, 0.54)),
    reg.mat(new THREE.MeshBasicMaterial({ color: P.screenCyan })),
  );
  screen.position.set(0, 0.3, 0.012);
  lid.add(screen);
  laptop.add(lid);
  group.add(laptop);

  // --- ring lamp -------------------------------------------------------
  const lamp = new THREE.Group();
  lamp.position.set(0.45, 1.62, 0.65);
  const shell = reg.mat(new THREE.MeshStandardMaterial({ color: P.stitchBlue, roughness: 0.4 }));

  lamp.add(at(mesh(reg.geo(new THREE.CylinderGeometry(0.25, 0.28, 0.06, 16)), shell), 0, 0.03, 0));

  const body = mesh(reg.geo(new THREE.SphereGeometry(0.22, 16, 16)), shell);
  body.scale.set(1, 1.25, 1);
  body.position.y = 0.26;
  lamp.add(body);

  lamp.add(at(mesh(reg.geo(new THREE.TorusGeometry(0.18, 0.038, 12, 24)), shell), 0, 0.72, 0.06));

  const bulb = new THREE.Mesh(
    reg.geo(new THREE.CircleGeometry(0.155, 16)),
    reg.mat(new THREE.MeshBasicMaterial({ color: 0xffffff })),
  );
  bulb.position.set(0, 0.72, 0.075);
  lamp.add(bulb);

  lamp.add(
    at(
      mesh(
        reg.geo(new THREE.CylinderGeometry(0.022, 0.022, 0.35, 8)),
        reg.mat(new THREE.MeshStandardMaterial({ color: 0xd1d5db })),
      ),
      0,
      0.5,
      0.03,
    ),
  );
  group.add(lamp);

  // --- marker cup -------------------------------------------------------
  group.add(
    at(
      mesh(
        reg.geo(new THREE.CylinderGeometry(0.2, 0.18, 0.4, 16)),
        reg.mat(new THREE.MeshStandardMaterial({ color: 0xf8f9fa, roughness: 0.4 })),
      ),
      0.95,
      1.82,
      -0.2,
    ),
  );

  /* Pens fanned round the cup. Tilts are derived from the index rather than
     Math.random() as the reference did — a scene that rebuilds on every theme
     change or remount should not reshuffle itself. */
  const penColors = [0xf472b6, 0x60a5fa, 0x4ade80, 0xfbbf24, 0xa78bfa, 0xf87171, 0x38bdf8, 0xf43f5e];
  const penGeo = reg.geo(new THREE.CylinderGeometry(0.018, 0.018, 0.55, 8));
  for (let i = 0; i < 16; i++) {
    const pen = mesh(
      penGeo,
      reg.mat(
        new THREE.MeshStandardMaterial({ color: penColors[i % penColors.length], roughness: 0.3 }),
      ),
    );
    const angle = (i / 16) * Math.PI * 2;
    const radius = 0.08 + (i % 3) * 0.035;
    pen.position.set(0.95 + Math.cos(angle) * radius, 2.05, -0.2 + Math.sin(angle) * radius);
    pen.rotation.set(Math.sin(i * 2.3) * 0.14, 0, Math.cos(i * 1.7) * 0.14);
    group.add(pen);
  }

  // --- sketchbook, bowl, notes -------------------------------------------
  const book = mesh(
    reg.geo(new THREE.BoxGeometry(0.55, 0.04, 0.75)),
    reg.mat(new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.6 })),
  );
  book.position.set(0.8, 1.64, 0.55);
  book.rotation.y = -0.35;
  group.add(book);

  const bowl = mesh(
    reg.geo(new THREE.SphereGeometry(0.18, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.65)),
    reg.mat(
      new THREE.MeshStandardMaterial({
        color: 0xbfdbfe,
        roughness: 0.1,
        transparent: true,
        opacity: 0.65,
      }),
    ),
    false,
    false,
  );
  group.add(at(bowl, 0.4, 1.74, -0.6));

  group.add(
    at(
      mesh(
        reg.geo(new THREE.BoxGeometry(0.12, 0.08, 0.12)),
        reg.mat(new THREE.MeshStandardMaterial({ color: 0xfef08a })),
      ),
      0.4,
      1.72,
      -0.6,
    ),
  );

  return group;
}

/* Station 02 — the coat tree carrying a lime jacket and two bags. The
   reference's bags are branded; these keep the silhouettes and the palette
   (black with a brass plate, tan with a dark strap) and carry no marks. */
export function buildRack(reg: Registry): THREE.Group {
  const group = new THREE.Group();
  group.position.set(-2.2, 0, -1.5);

  const iron = reg.mat(
    new THREE.MeshStandardMaterial({ color: 0x1f1f22, roughness: 0.5, metalness: 0.7 }),
  );
  const brass = reg.mat(
    new THREE.MeshStandardMaterial({ color: P.goldHardware, roughness: 0.2, metalness: 0.85 }),
  );

  group.add(at(mesh(reg.geo(new THREE.CylinderGeometry(0.75, 0.8, 0.08, 16)), iron), 0, 0.04, 0));
  group.add(at(mesh(reg.geo(new THREE.CylinderGeometry(0.045, 0.045, 4.4, 12)), iron), 0, 2.2, 0));

  const crown = mesh(reg.geo(new THREE.TorusGeometry(0.5, 0.035, 8, 24)), iron);
  crown.rotation.x = Math.PI / 2;
  crown.position.y = 3.85;
  group.add(crown);

  // --- lime jacket on a hanger ------------------------------------------
  const jacket = new THREE.Group();
  jacket.position.set(0.3, 2.7, 0.25);
  jacket.rotation.y = -0.5;
  jacket.add(at(mesh(reg.geo(new THREE.BoxGeometry(0.03, 0.14, 0.48)), brass), 0, 1.0, 0));
  jacket.add(
    mesh(
      reg.geo(new THREE.BoxGeometry(0.24, 1.7, 0.9)),
      reg.mat(new THREE.MeshStandardMaterial({ color: P.neonLime, roughness: 0.5 })),
    ),
  );
  jacket.add(
    at(
      mesh(
        reg.geo(new THREE.BoxGeometry(0.28, 1.25, 0.38)),
        reg.mat(new THREE.MeshStandardMaterial({ color: P.neonLimeDark, roughness: 0.5 })),
      ),
      0.04,
      -0.15,
      0.16,
    ),
  );
  group.add(jacket);

  // --- black bag with a brass plate --------------------------------------
  const blackBag = new THREE.Group();
  blackBag.position.set(-0.28, 2.6, 0.35);
  const strap = mesh(
    reg.geo(new THREE.TorusGeometry(0.24, 0.016, 6, 16, Math.PI)),
    reg.mat(new THREE.MeshStandardMaterial({ color: 0x111111 })),
  );
  strap.position.y = 0.68;
  blackBag.add(strap);
  blackBag.add(
    mesh(
      reg.geo(new THREE.BoxGeometry(0.18, 0.58, 0.68)),
      reg.mat(new THREE.MeshStandardMaterial({ color: P.blackBag, roughness: 0.35, metalness: 0.2 })),
    ),
  );
  blackBag.add(at(mesh(reg.geo(new THREE.BoxGeometry(0.01, 0.09, 0.26)), brass), 0.1, 0.05, 0));
  group.add(blackBag);

  // --- tan shoulder bag ---------------------------------------------------
  const tanBag = new THREE.Group();
  tanBag.position.set(0.18, 2.15, -0.38);
  tanBag.add(
    mesh(
      reg.geo(new THREE.BoxGeometry(0.17, 0.46, 0.55)),
      reg.mat(new THREE.MeshStandardMaterial({ color: P.monogramTan, roughness: 0.65 })),
    ),
  );
  tanBag.add(
    at(
      mesh(
        reg.geo(new THREE.CylinderGeometry(0.012, 0.012, 0.72, 6)),
        reg.mat(new THREE.MeshStandardMaterial({ color: P.monogramBrown })),
      ),
      0,
      0.52,
      0,
    ),
  );
  group.add(tanBag);

  return group;
}

/* Overview dressing — the wardrobe, the twin bed and the floor fan. None of
   these has a waypoint of its own; they exist so station 00 reads as a room
   rather than a corner with three objects in it. */
export function buildFurnishings(reg: Registry): THREE.Group {
  const group = new THREE.Group();
  const darkWood = reg.mat(new THREE.MeshStandardMaterial({ color: P.woodDark, roughness: 0.65 }));
  const brass = reg.mat(
    new THREE.MeshStandardMaterial({ color: P.goldHardware, metalness: 0.85, roughness: 0.25 }),
  );

  // --- wardrobe -----------------------------------------------------------
  const wardrobe = new THREE.Group();
  wardrobe.position.set(-5.0, 0, -2.2);
  wardrobe.add(at(mesh(reg.geo(new THREE.BoxGeometry(1.8, 5.6, 1.4)), darkWood), 0, 2.8, 0));
  wardrobe.add(
    at(
      mesh(
        reg.geo(new THREE.BoxGeometry(0.02, 0.02, 1.42)),
        reg.mat(new THREE.MeshStandardMaterial({ color: 0x111111 })),
      ),
      0.91,
      4.2,
      0,
    ),
  );
  const wardrobePull = reg.geo(new THREE.BoxGeometry(0.04, 0.42, 0.03));
  for (const side of [-1, 1]) {
    wardrobe.add(at(mesh(wardrobePull, brass), 0.93, 2.9, side * 0.16));
  }
  group.add(wardrobe);

  // --- bed ----------------------------------------------------------------
  const bed = new THREE.Group();
  bed.position.set(-1.8, 0, 3.2);
  bed.rotation.y = -0.25;
  bed.add(at(mesh(reg.geo(new THREE.BoxGeometry(3.6, 0.45, 2.1)), darkWood), 0, 0.22, 0));
  bed.add(at(mesh(reg.geo(new THREE.BoxGeometry(0.24, 1.6, 2.1)), darkWood), -1.7, 0.9, 0));
  bed.add(
    at(
      mesh(
        reg.geo(new THREE.BoxGeometry(3.4, 0.42, 2.0)),
        reg.mat(new THREE.MeshStandardMaterial({ color: P.pinkLinen, roughness: 0.85 })),
      ),
      0.05,
      0.58,
      0,
    ),
  );
  const pillowGeo = reg.geo(new THREE.BoxGeometry(0.65, 0.22, 0.75));
  const pillowMat = reg.mat(new THREE.MeshStandardMaterial({ color: 0xfdfdfd, roughness: 0.8 }));
  for (const z of [-0.45, 0.45]) {
    const pillow = at(mesh(pillowGeo, pillowMat), -1.2, 0.85, z);
    pillow.rotation.z = 0.2;
    bed.add(pillow);
  }
  group.add(bed);

  // --- floor fan ----------------------------------------------------------
  const fan = new THREE.Group();
  fan.position.set(4.2, 0, 3.8);
  const shell = reg.mat(new THREE.MeshStandardMaterial({ color: P.fanWhite, roughness: 0.3 }));
  fan.add(at(mesh(reg.geo(new THREE.CylinderGeometry(0.42, 0.44, 0.08, 16)), shell), 0, 0.04, 0));
  fan.add(
    at(
      mesh(
        reg.geo(new THREE.CylinderGeometry(0.03, 0.03, 2.3, 8)),
        reg.mat(new THREE.MeshStandardMaterial({ color: 0xcfd8dc })),
      ),
      0,
      1.15,
      0,
    ),
  );
  const cage = mesh(reg.geo(new THREE.CylinderGeometry(0.48, 0.48, 0.16, 16)), shell);
  cage.rotation.x = Math.PI / 2;
  cage.position.y = 2.3;
  fan.add(cage);
  group.add(fan);

  return group;
}

/* Dust hanging in the light. Seeded rather than Math.random() so the scene is
   identical on every mount — a remount that reshuffles the motes reads as a
   glitch when the theme is toggled. */
export function buildMotes(reg: Registry): THREE.Points {
  const count = 65;
  const positions = new Float32Array(count * 3);
  let seed = 7;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (rand() - 0.5) * 14;
    positions[i + 1] = 0.8 + rand() * 5.8;
    positions[i + 2] = (rand() - 0.5) * 14;
  }
  const geo = reg.geo(new THREE.BufferGeometry());
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return new THREE.Points(
    geo,
    reg.mat(
      new THREE.PointsMaterial({
        color: 0xffd1b8,
        size: 0.075,
        transparent: true,
        opacity: 0.55,
      }),
    ),
  );
}
