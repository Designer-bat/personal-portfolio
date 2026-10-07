"use client";

import { gallery } from "@/resources";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./GalleryView.module.scss";

gsap.registerPlugin(Observer);

const settings = {
  radius: 1.8,
  verticalGap: 0.9,
  angleGap: 0.85,
  cardWidth: 1.35,
  cardHeight: 1.8,
  idleSpin: 0.005,
  scrollSensitivity: 0.004,
  smoothing: 0.1,
  wobbleStrength: 0.3,
};

const vertexShader = `
  uniform float uWobble;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    viewPosition.x += sin(uv.y * 3.14159) * uWobble;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uImageAspect;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float cardAspect = 1.35 / 1.8;

    if (uImageAspect > cardAspect) {
      uv.x = (uv.x - 0.5) * (cardAspect / uImageAspect) + 0.5;
    } else {
      uv.y = (uv.y - 0.5) * (uImageAspect / cardAspect) + 0.5;
    }

    vec4 color = texture2D(uTexture, uv);
    if (!gl_FrontFacing) color.rgb = mix(color.rgb, vec3(1.0), 0.75);
    gl_FragColor = color;
  }
`;

export default function GalleryView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [renderError, setRenderError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
    } catch (error) {
      console.error("Failed to initialize the gallery renderer:", error);
      setRenderError("The interactive gallery could not start in this browser.");
      return;
    }

    setRenderError(null);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 8;

    const cardCount = gallery.images.length * 2;
    const geometry = new THREE.PlaneGeometry(settings.cardWidth, settings.cardHeight, 1, 16);
    const textureLoader = new THREE.TextureLoader();
    const wobble = { value: 0 };
    const materials: THREE.ShaderMaterial[] = [];
    let disposed = false;

    const images = gallery.images.concat(gallery.images);
    const cards = images.map((image) => {
      const texture = textureLoader.load(
        image.src,
        (loadedTexture) => {
          if (disposed) {
            loadedTexture.dispose();
            return;
          }
          loadedTexture.colorSpace = THREE.SRGBColorSpace;
          const dimensions = loadedTexture.image as {
            width: number;
            height: number;
          };
          material.uniforms.uImageAspect.value = dimensions.width / dimensions.height;
        },
        undefined,
        (error) => {
          console.error(`Failed to load gallery image "${image.src}":`, error);
          if (!disposed) {
            setRenderError("Some gallery images could not be loaded.");
          }
        },
      );
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        uniforms: {
          uTexture: { value: texture },
          uImageAspect: { value: settings.cardWidth / settings.cardHeight },
          uWobble: wobble,
        },
      });
      materials.push(material);
      const card = new THREE.Mesh(geometry, material);
      scene.add(card);
      return card;
    });

    const state = { rotation: 0, rotationTarget: 0 };
    const observer = Observer.create({
      target: canvas,
      type: "wheel,touch",
      preventDefault: true,
      onChange: (self) => {
        state.rotationTarget += self.deltaY * settings.scrollSensitivity;
      },
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        state.rotationTarget += 1;
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        state.rotationTarget -= 1;
      }
    };
    canvas.addEventListener("keydown", handleKeyDown);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    window.addEventListener("resize", resize);

    const idleSpin = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : settings.idleSpin;

    const render = () => {
      state.rotationTarget += idleSpin;
      state.rotation += (state.rotationTarget - state.rotation) * settings.smoothing;

      const lag = THREE.MathUtils.clamp(state.rotationTarget - state.rotation, -1, 1);
      wobble.value += (lag * settings.wobbleStrength - wobble.value) * settings.smoothing;

      cards.forEach((card, index) => {
        const slot =
          THREE.MathUtils.euclideanModulo(index - state.rotation, cardCount) - cardCount / 2;
        const angle = slot * settings.angleGap + Math.PI / 2;
        card.position.set(
          Math.cos(angle) * settings.radius,
          slot * settings.verticalGap,
          Math.sin(angle) * settings.radius,
        );
        card.rotation.y = Math.PI / 2 - angle;
      });

      renderer.render(scene, camera);
    };

    gsap.ticker.add(render);

    return () => {
      disposed = true;
      observer.kill();
      gsap.ticker.remove(render);
      canvas.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", resize);
      for (const material of materials) {
        material.uniforms.uTexture.value.dispose();
        material.dispose();
      }
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className={styles.gallery} aria-label="Interactive image gallery">
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        aria-label="Three-dimensional gallery. Scroll or swipe to rotate; use the arrow keys when focused."
        tabIndex={0}
      />
      <ul className={styles.screenReaderOnly} aria-label="Gallery image descriptions">
        {gallery.images.map((image) => (
          <li key={image.src}>{image.alt}</li>
        ))}
      </ul>
      <p className={styles.hint} aria-hidden="true">
        Scroll or swipe to explore
      </p>
      {renderError && (
        <p className={styles.error} role="alert">
          {renderError}
        </p>
      )}
    </section>
  );
}
