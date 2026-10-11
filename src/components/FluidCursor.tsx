"use client";

import { useEffect, useRef } from "react";

import styles from "./FluidCursor.module.scss";

const interactiveSelector =
  'a, button, input[type="button"], input[type="submit"], input[type="reset"], label, [role="button"], [role="link"], [data-cursor="interactive"], [data-cursor="image"], img, video, canvas, summary, [tabindex]:not([tabindex="-1"])';

const nativeCursorSelector =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]), textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="searchbox"]';

export function FluidCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringPositionRef = useRef<HTMLDivElement>(null);
  const dotPositionRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ringPosition = ringPositionRef.current;
    const dotPosition = dotPositionRef.current;
    const ring = ringRef.current;

    if (!cursor || !ringPosition || !dotPosition || !ring) return;

    const root = document.documentElement;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enabled = false;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let ringX = 0;
    let ringY = 0;
    let lastFrameTime = 0;
    let hasPosition = false;
    let selectingText = false;

    const setNativeTarget = (target: EventTarget | null) => {
      const isNativeTarget =
        target instanceof Element && Boolean(target.closest(nativeCursorSelector));
      if (isNativeTarget) {
        root.dataset.fluidCursorNative = "true";
      } else {
        delete root.dataset.fluidCursorNative;
      }
    };

    const updateInteraction = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      const interactive = element?.closest(interactiveSelector);
      const isMedia =
        Boolean(element?.closest('img, video, [data-cursor="image"]')) ||
        Boolean(interactive?.querySelector("img, video"));

      ring.classList.toggle(styles.hovering, Boolean(interactive));
      ring.classList.toggle(styles.media, isMedia);
      setNativeTarget(target);
    };

    const animateRing = (time: number) => {
      frame = 0;
      const elapsed = lastFrameTime ? Math.min(time - lastFrameTime, 32) : 16;
      lastFrameTime = time;
      const easing = 1 - Math.exp(-elapsed / 68);
      ringX += (pointerX - ringX) * easing;
      ringY += (pointerY - ringY) * easing;
      ringPosition.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      if (Math.abs(pointerX - ringX) + Math.abs(pointerY - ringY) > 0.12) {
        frame = window.requestAnimationFrame(animateRing);
      } else {
        ringX = pointerX;
        ringY = pointerY;
        ringPosition.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        lastFrameTime = 0;
      }
    };

    const hideCursor = () => {
      cursor.dataset.visible = "false";
      delete root.dataset.fluidCursorNative;
      ring.classList.remove(styles.hovering, styles.media);
      cursor.classList.remove(styles.clicking);
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      hasPosition = false;
      lastFrameTime = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        hideCursor();
        return;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;
      dotPosition.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      updateInteraction(event.target);

      if (!hasPosition) {
        ringX = pointerX;
        ringY = pointerY;
        ringPosition.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        cursor.dataset.visible = "true";
        hasPosition = true;
      }

      if (!frame) {
        frame = window.requestAnimationFrame(animateRing);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && !root.dataset.fluidCursorNative) {
        cursor.classList.add(styles.clicking);
      } else if (event.pointerType !== "mouse") {
        hideCursor();
      }
    };

    const onPointerUp = () => cursor.classList.remove(styles.clicking);

    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) hideCursor();
    };

    const onWindowBlur = () => hideCursor();

    const onSelectStart = () => {
      selectingText = true;
      root.classList.add("has-fluid-cursor-selection");
    };

    const onSelectionEnd = () => {
      if (!selectingText) return;
      selectingText = false;
      root.classList.remove("has-fluid-cursor-selection");
    };

    const enable = () => {
      if (enabled) return;
      enabled = true;
      root.classList.add("has-fluid-cursor");
      document.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerdown", onPointerDown, { passive: true });
      document.addEventListener("pointerout", onPointerOut, { passive: true });
      document.addEventListener("selectstart", onSelectStart);
      window.addEventListener("pointerup", onPointerUp, { passive: true });
      window.addEventListener("pointercancel", onPointerUp, { passive: true });
      window.addEventListener("blur", onWindowBlur);
      window.addEventListener("mouseup", onSelectionEnd, { passive: true });
      window.addEventListener("touchend", onSelectionEnd, { passive: true });
    };

    const disable = () => {
      if (!enabled) return;
      enabled = false;
      hideCursor();
      root.classList.remove("has-fluid-cursor", "has-fluid-cursor-selection");
      selectingText = false;
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("selectstart", onSelectStart);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("mouseup", onSelectionEnd);
      window.removeEventListener("touchend", onSelectionEnd);
    };

    const updateSupport = () => {
      if (finePointer.matches && !reducedMotion.matches) {
        enable();
      } else {
        disable();
      }
    };

    updateSupport();
    finePointer.addEventListener("change", updateSupport);
    reducedMotion.addEventListener("change", updateSupport);

    return () => {
      finePointer.removeEventListener("change", updateSupport);
      reducedMotion.removeEventListener("change", updateSupport);
      disable();
      root.classList.remove("has-fluid-cursor-selection");
      delete root.dataset.fluidCursorNative;
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} fluid-cursor`}
      aria-hidden="true"
      data-visible="false"
    >
      <div ref={ringPositionRef} className={styles.ringPosition}>
        <span ref={ringRef} className={styles.ring} />
      </div>
      <div ref={dotPositionRef} className={styles.dotPosition}>
        <span className={styles.dot} />
      </div>
    </div>
  );
}
