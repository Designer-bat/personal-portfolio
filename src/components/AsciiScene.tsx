"use client";

import { useEffect, useRef } from "react";
import type { Font } from "three/examples/jsm/loaders/FontLoader.js";
import asciiData from "@/data/asciiSceneData.json";
import styles from "./AsciiScene.module.scss";

const FONT_URL =
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/fonts/helvetiker_regular.typeface.json";
const MAX_INSTANCES = 6500;
const FIT_PADDING = 0.80;
// How strongly each instance's z is exaggerated into depth. Lower this to
// flatten the relief (sharper, calmer face) at the cost of a less dramatic
// 3D hair effect.
const DEPTH_MULTIPLIER = 4;
// Bump these up to close the gaps between neighboring characters so the
// field reads as continuous coverage instead of visibly separate glyphs.
// CHAR_SIZE grows each glyph; CHAR_WIDTH_SCALE controls how squeezed
// horizontally they are (1 = natural letter proportions, more overlap
// with neighbors side-to-side).
const CHAR_SIZE = 1.4;
const CHAR_WIDTH_SCALE = 0.85;

// If the container never reports a real size within this window, warn
// instead of silently hanging forever (usually a layout/CSS issue upstream:
// .scene is position:absolute and needs an ancestor with a real height).
const SIZE_TIMEOUT_MS = 4000;

export function AsciiScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function initialize() {
      const container = containerRef.current;
      if (!container) return;

      // Drive startup off ResizeObserver instead of polling rAF: it fires
      // as soon as the container has a real laid-out size, and we can bail
      // out with a clear warning if that never happens instead of hanging.
      const size = await new Promise<{ width: number; height: number } | null>(
        (resolve) => {
          if (disposed) {
            resolve(null);
            return;
          }

          if (container.clientWidth > 0 && container.clientHeight > 0) {
            resolve({
              width: container.clientWidth,
              height: container.clientHeight,
            });
            return;
          }

          let settled = false;

          const timeout = window.setTimeout(() => {
            if (settled) return;
            settled = true;
            console.warn(
              "AsciiScene: container never received a non-zero size. " +
                "Check that every ancestor of the element with the " +
                `"${styles.scene}" class has an explicit height — ` +
                "position: absolute; inset: 0 alone cannot create one.",
            );
            observer.disconnect();
            resolve(null);
          }, SIZE_TIMEOUT_MS);

          const observer = new ResizeObserver(() => {
            if (settled) return;
            if (container.clientWidth > 0 && container.clientHeight > 0) {
              settled = true;
              window.clearTimeout(timeout);
              observer.disconnect();
              resolve({
                width: container.clientWidth,
                height: container.clientHeight,
              });
            }
          });

          observer.observe(container);
        },
      );

      if (disposed || !size) return;

      const [THREE, { OrbitControls }, { FontLoader }, { TextGeometry }] =
        await Promise.all([
          import("three"),
          import("three/examples/jsm/controls/OrbitControls.js"),
          import("three/examples/jsm/loaders/FontLoader.js"),
          import("three/examples/jsm/geometries/TextGeometry.js"),
        ]);

      if (disposed) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        34,
        size.width / size.height,
        0.1,
        2000,
      );
      camera.position.set(0, 0, 205);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(size.width, size.height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      container.appendChild(renderer.domElement);

      const artwork = new THREE.Group();
      scene.add(artwork);

      const font = await new Promise<Font>((resolve, reject) => {
        new FontLoader().load(FONT_URL, resolve, undefined, reject);
      });
      if (disposed) return;

      const geometryCache = new Map<string, InstanceType<typeof TextGeometry>>();
      const materialCache = new Map<string, InstanceType<typeof THREE.MeshBasicMaterial>>();
      const instances = asciiData.groups.flatMap((group) =>
        group.instances.map((instance) => ({ ...instance, char: group.char })),
      );
      const step = Math.max(1, Math.ceil(instances.length / MAX_INSTANCES));

      instances.filter((_, index) => index % step === 0).forEach((instance) => {
        let geometry = geometryCache.get(instance.char);
        if (!geometry) {
          geometry = new TextGeometry(instance.char, {
            font,
            size: CHAR_SIZE,
            depth: 0.02,
            curveSegments: 4,
          });
          geometry.center();
          geometry.scale(CHAR_WIDTH_SCALE, 1, 1);
          geometryCache.set(instance.char, geometry);
        }

        let material = materialCache.get(instance.color);
        if (!material) {
          material = new THREE.MeshBasicMaterial({
            color: instance.color,
            transparent: true,
            opacity: 0.94,
            // Was false: without depth writing, overlapping glyphs in dense
            // areas (like the face) blend in draw order instead of properly
            // occluding one another, reading as hazy/unclear. Sparse areas
            // (hair strands) have little overlap so this mattered less there.
            depthWrite: true,
          });
          materialCache.set(instance.color, material);
        }

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          instance.x,
          instance.y,
          instance.z * DEPTH_MULTIPLIER,
        );
        artwork.add(mesh);
      });

      // Fit the artwork to the camera's actual visible frustum, not to raw
      // container pixels. With a PerspectiveCamera, the world-space area
      // visible at a given depth is determined by fov/aspect/distance, not
      // by pixel counts — treating pixels as world units (as an
      // OrthographicCamera-style fit would) produces a wildly oversized
      // scale, which also blows up the z-depth spread and causes severe
      // near-camera perspective distortion.
      const fitArtwork = () => {
        if (!container.clientWidth || !container.clientHeight) return;

        // Reset scale before measuring so we always fit from a known baseline.
        artwork.scale.setScalar(1);

        const box = new THREE.Box3().setFromObject(artwork);
        const boxSize = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(boxSize);
        box.getCenter(center);

        if (
          boxSize.x <= 0 ||
          boxSize.y <= 0 ||
          !Number.isFinite(boxSize.x) ||
          !Number.isFinite(boxSize.y)
        ) {
          return;
        }

        // World-space size visible at the artwork's depth.
        const distance = camera.position.z - artwork.position.z;
        const vFov = THREE.MathUtils.degToRad(camera.fov);
        const visibleHeight = 2 * Math.tan(vFov / 2) * distance;
        const visibleWidth = visibleHeight * camera.aspect;

        const availableWidth = visibleWidth * FIT_PADDING;
        const availableHeight = visibleHeight * FIT_PADDING;

        const fitScale = Math.min(
          availableWidth / boxSize.x,
          availableHeight / boxSize.y,
        );

        artwork.scale.setScalar(fitScale);
        artwork.position.x = -center.x * fitScale;
        artwork.position.y = -center.y * fitScale;
      };

      fitArtwork();

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = !reducedMotion;
      controls.autoRotate = !reducedMotion;
      controls.autoRotateSpeed = 0.35;
      controls.minPolarAngle = Math.PI / 2 - 0.22;
      controls.maxPolarAngle = Math.PI / 2 + 0.22;
      controls.minAzimuthAngle = -0.3;
      controls.maxAzimuthAngle = 0.3;

      const resize = () => {
        if (!container.clientWidth || !container.clientHeight) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        // Re-fit whenever the container's size (or aspect) changes.
        fitArtwork();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);

      let frame = 0;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        controls.dispose();
        geometryCache.forEach((geometry) => geometry.dispose());
        materialCache.forEach((material) => material.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    initialize().catch((error: unknown) => {
      if (!disposed) {
        console.error("Failed to initialize ASCII hero scene:", error);
      }
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.scene}
      role="img"
      aria-label="Interactive ASCII art portrait"
    >
      <div className={styles.fallback} aria-hidden="true">
        {asciiData.groups.slice(0, 3).map((group) => group.char).join("")}
      </div>
    </div>
  );
}