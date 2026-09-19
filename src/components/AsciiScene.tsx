"use client";

import { useEffect, useRef } from "react";
import type { Font } from "three/examples/jsm/loaders/FontLoader.js";
import asciiData from "@/data/asciiSceneData.json";
import styles from "./AsciiScene.module.scss";

const FONT_URL =
  "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/fonts/helvetiker_regular.typeface.json";
const MAX_INSTANCES = 4200;

export function AsciiScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function initialize() {
      const [THREE, { OrbitControls }, { FontLoader }, { TextGeometry }] =
        await Promise.all([
          import("three"),
          import("three/examples/jsm/controls/OrbitControls.js"),
          import("three/examples/jsm/loaders/FontLoader.js"),
          import("three/examples/jsm/geometries/TextGeometry.js"),
        ]);

      const container = containerRef.current;
      if (!container || disposed) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        34,
        container.clientWidth / container.clientHeight,
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
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);

      const artwork = new THREE.Group();
      const scale = Math.min(
        container.clientWidth / asciiData.dimensions.width,
        container.clientHeight / asciiData.dimensions.height,
      );
      artwork.scale.setScalar(scale * 1.18);
      artwork.position.set(
        -asciiData.dimensions.width * scale * 0.5,
        -asciiData.dimensions.height * scale * 0.5,
        0,
      );
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
            size: 1,
            depth: 0.02,
            curveSegments: 1,
          });
          geometry.center();
          geometry.scale(0.6, 1, 1);
          geometryCache.set(instance.char, geometry);
        }

        let material = materialCache.get(instance.color);
        if (!material) {
          material = new THREE.MeshBasicMaterial({
            color: instance.color,
            transparent: true,
            opacity: 0.92,
          });
          materialCache.set(instance.color, material);
        }

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(instance.x, instance.y, instance.z * 10);
        artwork.add(mesh);
      });

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
      };
      const observer = new ResizeObserver(resize);
      observer.observe(container);

      let frame = 0;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
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
