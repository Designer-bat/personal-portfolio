"use client";

import { gsap } from "gsap";
import {
  Bodies,
  Body,
  Composite,
  Constraint,
  Engine,
  Events,
  type IEventCollision,
  Sleeping,
} from "matter-js";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function HeroBadge() {
  const prefersReducedMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLSpanElement>(null);
  const dragConstraintRef = useRef<Constraint | null>(null);
  const pointerRef = useRef<{
    id: number;
    clientX: number;
    clientY: number;
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    time: number;
  } | null>(null);
  const [isHeld, setIsHeld] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    const card = cardRef.current;
    const ribbon = ribbonRef.current;
    const sheen = sheenRef.current;
    if (!scene || !card || !ribbon || !sheen) return;

    const engine = Engine.create({ enableSleeping: true });
    engine.gravity.y = prefersReducedMotion ? 0 : 1.05;
    engine.positionIterations = 8;
    engine.velocityIterations = 6;
    engine.constraintIterations = 6; // solve the rope more accurately at high speed

    const sceneBounds = scene.getBoundingClientRect();
    let sceneWidth = sceneBounds.width;
    let sceneHeight = sceneBounds.height;
    let cardWidth = card.offsetWidth;
    let cardHeight = card.offsetHeight;
    let boundaries: Body[] = [];
    let frameId = 0;
    let previousFrame = 0;
    let disposed = false;
    let angleLimit = 0;

    const updateAngleLimit = () => {
      angleLimit = 0;
      for (let angle = 0.28; angle >= 0; angle -= 0.005) {
        const halfWidth =
          (Math.abs(Math.cos(angle)) * cardWidth + Math.abs(Math.sin(angle)) * cardHeight) / 2;
        const halfHeight =
          (Math.abs(Math.sin(angle)) * cardWidth + Math.abs(Math.cos(angle)) * cardHeight) / 2;
        if (halfWidth <= sceneWidth / 2 && halfHeight <= sceneHeight / 2) {
          angleLimit = angle;
          break;
        }
      }
    };

    const createBoundaries = () => {
      const thickness = 120;
      boundaries = [
        Bodies.rectangle(sceneWidth / 2, -thickness / 2, sceneWidth + thickness * 2, thickness, {
          isStatic: true,
          label: "scene-boundary",
          restitution: 0.28,
        }),
        Bodies.rectangle(
          sceneWidth / 2,
          sceneHeight + thickness / 2,
          sceneWidth + thickness * 2,
          thickness,
          { isStatic: true, label: "scene-boundary", restitution: 0.28 },
        ),
        Bodies.rectangle(-thickness / 2, sceneHeight / 2, thickness, sceneHeight + thickness * 2, {
          isStatic: true,
          label: "scene-boundary",
          restitution: 0.3,
        }),
        Bodies.rectangle(
          sceneWidth + thickness / 2,
          sceneHeight / 2,
          thickness,
          sceneHeight + thickness * 2,
          { isStatic: true, label: "scene-boundary", restitution: 0.3 },
        ),
      ];
      Composite.add(engine.world, boundaries);
    };

    /* ---------- Card + rope ---------- */

    const ATTACH_OFFSET = 14; // where the rope joins the card, measured from the card's top edge
    const getRibbonLength = () => clamp(sceneHeight * 0.22, 70, 142);
    let ribbonLength = getRibbonLength();
    let anchorX = sceneWidth / 2;

    const body = Bodies.rectangle(
      anchorX,
      ribbonLength + cardHeight / 2 - ATTACH_OFFSET,
      cardWidth,
      cardHeight,
      {
        label: "identity-card",
        density: 0.0011,
        friction: 0.82,
        frictionStatic: 0.92,
        frictionAir: 0.024,
        restitution: 0.34,
      },
    );
    Body.setAngle(body, -0.035);
    body.sleepThreshold = 75;

    // The rope: fixed anchor at the top of the scene -> top of the card
    const tether = Constraint.create({
      pointA: { x: anchorX, y: 0 },
      bodyB: body,
      pointB: { x: 0, y: -cardHeight / 2 + ATTACH_OFFSET },
      length: ribbonLength,
      stiffness: 1,
      damping: 0.05,
    });

    Composite.add(engine.world, [body, tether]);
    createBoundaries();
    updateAngleLimit();

    /* ---------- Render loop ---------- */

    const render = (timestamp: number) => {
      frameId = 0;
      if (disposed) return;

      const delta = previousFrame
        ? clamp(timestamp - previousFrame, 1000 / 120, 1000 / 60)
        : 1000 / 60;
      previousFrame = timestamp;
      Engine.update(engine, delta);

      // Hard limit: the rope can never be stretched past its length, however hard the card is thrown
      {
        const oy = -cardHeight / 2 + ATTACH_OFFSET;
        const ax = body.position.x - oy * Math.sin(body.angle);
        const ay = body.position.y + oy * Math.cos(body.angle);
        const rx = ax - anchorX;
        const ry = ay;
        const reach = Math.hypot(rx, ry);
        const maxReach = ribbonLength * 1.02;
        if (reach > maxReach) {
          const nx = rx / reach;
          const ny = ry / reach;
          const excess = reach - maxReach;
          Body.setPosition(body, {
            x: body.position.x - nx * excess,
            y: body.position.y - ny * excess,
          });
          const outward = body.velocity.x * nx + body.velocity.y * ny;
          if (outward > 0) {
            Body.setVelocity(body, {
              x: body.velocity.x - nx * outward,
              y: body.velocity.y - ny * outward,
            });
          }
        }
      }

      if (Math.abs(body.angle) > angleLimit) {
        Body.setAngle(body, clamp(body.angle, -angleLimit, angleLimit));
        if (body.angularVelocity * body.angle > 0) Body.setAngularVelocity(body, 0);
      }
      Body.setAngularVelocity(
        body,
        clamp(body.angularVelocity * 0.84 - body.angle * 0.07, -0.16, 0.16),
      );

      const { x, y } = body.position;
      const angleDegrees = clamp((body.angle * 180) / Math.PI, -180, 180);
      const heightAboveFloor = clamp(
        (sceneHeight - y - cardHeight / 2) / Math.max(1, sceneHeight - cardHeight),
        0,
        1,
      );
      const shadowLift = heightAboveFloor * 18;
      card.style.transform =
        `translate(-50%, -50%) translate3d(${x - sceneWidth / 2}px, ${y - sceneHeight / 2}px, 0) ` +
        `rotateZ(${body.angle}rad)`;

      // Ribbon runs from the fixed anchor to the point where it joins the card
      const attachOffsetY = -cardHeight / 2 + ATTACH_OFFSET;
      const attachX = x - attachOffsetY * Math.sin(body.angle);
      const attachY = y + attachOffsetY * Math.cos(body.angle);
      const dx = attachX - anchorX;
      const ribbonDistance = Math.hypot(dx, attachY);
      const ribbonAngle = Math.atan2(-dx, attachY);
      ribbon.style.height = `${ribbonDistance}px`;
      ribbon.style.transform = `translate3d(${anchorX - 47}px, 0, 0) rotateZ(${ribbonAngle}rad)`;

      card.style.setProperty("--shadow-y", `${7 + shadowLift}px`);
      card.style.setProperty("--shadow-blur", `${16 + heightAboveFloor * 30}px`);
      card.style.setProperty("--shadow-alpha", `${0.43 - heightAboveFloor * 0.2}`);
      card.style.setProperty("--tilt-x", `${clamp(-body.velocity.y * 0.32, -8, 8)}deg`);
      card.style.setProperty("--tilt-y", `${clamp(body.velocity.x * 0.32, -8, 8)}deg`);
      card.style.setProperty("--sheen-x", `${clamp(50 + body.angularVelocity * 150, 18, 82)}%`);
      card.setAttribute("aria-valuenow", `${Math.round(angleDegrees)}`);
      card.setAttribute("aria-valuetext", `${Math.round(angleDegrees)} degrees`);

      if (!body.isSleeping || dragConstraintRef.current) {
        frameId = requestAnimationFrame(render);
      }
    };

    const startRendering = () => {
      if (!frameId && !disposed) frameId = requestAnimationFrame(render);
    };

    const pulseSheen = (opacity: number) => {
      gsap.killTweensOf(sheen);
      gsap.to(sheen, {
        opacity,
        duration: 0.22,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const handleCollision = (event: IEventCollision<Engine>) => {
      const hitBoundary = event.pairs.some(
        ({ bodyA, bodyB }) =>
          (bodyA === body && bodyB.label === "scene-boundary") ||
          (bodyB === body && bodyA.label === "scene-boundary"),
      );
      if (hitBoundary) pulseSheen(0.4);
    };
    Events.on(engine, "collisionStart", handleCollision);

    /* ---------- Resize ---------- */

    const resizeObserver = new ResizeObserver(() => {
      const bounds = scene.getBoundingClientRect();
      const nextCardWidth = card.offsetWidth;
      const nextCardHeight = card.offsetHeight;
      if (!bounds.width || !bounds.height) return;

      // Ignore tiny layout changes so the card doesn't snap back to its start position
      const sizeChanged =
        Math.abs(bounds.width - sceneWidth) > 1 ||
        Math.abs(bounds.height - sceneHeight) > 1 ||
        Math.abs(nextCardWidth - cardWidth) > 1 ||
        Math.abs(nextCardHeight - cardHeight) > 1;
      if (!sizeChanged) return;

      for (const boundary of boundaries) {
        Composite.remove(engine.world, boundary);
      }
      sceneWidth = bounds.width;
      sceneHeight = bounds.height;
      const scaleX = nextCardWidth / cardWidth;
      const scaleY = nextCardHeight / cardHeight;
      if (Math.abs(scaleX - 1) > 0.001 || Math.abs(scaleY - 1) > 0.001) {
        Body.scale(body, scaleX, scaleY);
        cardWidth = nextCardWidth;
        cardHeight = nextCardHeight;
      }

      anchorX = sceneWidth / 2;
      ribbonLength = getRibbonLength();
      updateAngleLimit();
      createBoundaries();

      // Re-hang the card from the (possibly moved) anchor
      tether.pointA = { x: anchorX, y: 0 };
      tether.pointB = { x: 0, y: -cardHeight / 2 + ATTACH_OFFSET };
      tether.length = ribbonLength;

      Body.setPosition(body, {
        x: anchorX,
        y: ribbonLength + cardHeight / 2 - ATTACH_OFFSET,
      });
      Body.setAngle(body, 0);
      Body.setVelocity(body, { x: 0, y: 0 });
      Body.setAngularVelocity(body, 0);

      if (dragConstraintRef.current) {
        const pointer = pointerRef.current;
        if (pointer) {
          pointer.x = pointer.clientX - bounds.left;
          pointer.y = pointer.clientY - bounds.top;
        }
        dragConstraintRef.current.pointA = {
          x: pointerRef.current?.x ?? body.position.x,
          y: pointerRef.current?.y ?? body.position.y,
        };
      }
      Sleeping.set(body, false);
      startRendering();
    });
    resizeObserver.observe(scene);
    resizeObserver.observe(card);

    /* ---------- Pointer interaction ---------- */

    const getScenePoint = (event: globalThis.PointerEvent) => {
      const bounds = scene.getBoundingClientRect();
      return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    };

    const handlePointerDown = (event: globalThis.PointerEvent) => {
      if (event.button !== 0 || !event.isPrimary || pointerRef.current) return;
      const point = getScenePoint(event);
      const pointer = {
        id: event.pointerId,
        clientX: event.clientX,
        clientY: event.clientY,
        x: point.x,
        y: point.y,
        velocityX: 0,
        velocityY: 0,
        time: event.timeStamp,
      };
      const localX = point.x - body.position.x;
      const localY = point.y - body.position.y;
      const cosine = Math.cos(body.angle);
      const sine = Math.sin(body.angle);
      const constraint = Constraint.create({
        pointA: point,
        pointB: {
          x: localX * cosine + localY * sine,
          y: -localX * sine + localY * cosine,
        },
        bodyB: body,
        stiffness: 0.16,
        damping: 0.12,
        length: 0,
      });

      event.preventDefault();
      card.setPointerCapture(event.pointerId);
      pointerRef.current = pointer;
      dragConstraintRef.current = constraint;
      Composite.add(engine.world, constraint);
      Sleeping.set(body, false);
      setIsHeld(true);
      pulseSheen(0.32);
      startRendering();
    };

    const handlePointerMove = (event: globalThis.PointerEvent) => {
      const pointer = pointerRef.current;
      const constraint = dragConstraintRef.current;
      if (!pointer || pointer.id !== event.pointerId || !constraint) return;

      const point = getScenePoint(event);
      const elapsed = Math.max(1, event.timeStamp - pointer.time);
      pointer.velocityX = (point.x - pointer.x) / elapsed;
      pointer.velocityY = (point.y - pointer.y) / elapsed;
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      pointer.x = point.x;
      pointer.y = point.y;
      pointer.time = event.timeStamp;
      constraint.pointA = point;
      Sleeping.set(body, false);
      startRendering();
    };

    const handlePointerEnd = (event: globalThis.PointerEvent) => {
      const pointer = pointerRef.current;
      if (!pointer || pointer.id !== event.pointerId) return;

      const constraint = dragConstraintRef.current;
      if (constraint) Composite.remove(engine.world, constraint);
      dragConstraintRef.current = null;
      pointerRef.current = null;
      Body.setVelocity(body, {
        x: clamp(body.velocity.x + pointer.velocityX * 10, -28, 28),
        y: clamp(body.velocity.y + pointer.velocityY * 10, -28, 28),
      });
      Body.setAngularVelocity(
        body,
        clamp(
          body.angularVelocity +
            (pointer.velocityX * (pointer.y - body.position.y) -
              pointer.velocityY * (pointer.x - body.position.x)) *
              0.000025,
          -0.22,
          0.22,
        ),
      );
      setIsHeld(false);
      pulseSheen(0.06);
      startRendering();
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        Body.setVelocity(body, {
          x: body.velocity.x,
          y: clamp(body.velocity.y - 4.5, -18, 18),
        });
        Body.setAngularVelocity(body, clamp(body.angularVelocity + 0.035, -0.12, 0.12));
        Sleeping.set(body, false);
        startRendering();
        return;
      }

      const keyVelocity = 2.6;
      let nextX = body.velocity.x;
      let nextY = body.velocity.y;
      if (event.key === "ArrowLeft") nextX -= keyVelocity;
      else if (event.key === "ArrowRight") nextX += keyVelocity;
      else if (event.key === "ArrowUp") nextY -= keyVelocity;
      else if (event.key === "ArrowDown") nextY += keyVelocity;
      else if (event.key === "Escape") {
        Body.setVelocity(body, { x: 0, y: 0 });
        Body.setAngularVelocity(body, 0);
        Sleeping.set(body, false);
        startRendering();
        return;
      } else return;

      event.preventDefault();
      Body.setVelocity(body, { x: clamp(nextX, -18, 18), y: clamp(nextY, -18, 18) });
      Body.setAngularVelocity(body, clamp(body.angularVelocity + nextX * 0.0015, -0.12, 0.12));
      Sleeping.set(body, false);
      startRendering();
    };

    card.addEventListener("pointerdown", handlePointerDown);
    card.addEventListener("pointermove", handlePointerMove);
    card.addEventListener("pointerup", handlePointerEnd);
    card.addEventListener("pointercancel", handlePointerEnd);
    card.addEventListener("lostpointercapture", handlePointerEnd);
    card.addEventListener("keydown", handleKeyDown);

    startRendering();

    return () => {
      disposed = true;
      if (frameId) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      Events.off(engine, "collisionStart", handleCollision);
      gsap.killTweensOf(sheen);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      card.removeEventListener("pointerdown", handlePointerDown);
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerup", handlePointerEnd);
      card.removeEventListener("pointercancel", handlePointerEnd);
      card.removeEventListener("lostpointercapture", handlePointerEnd);
      card.removeEventListener("keydown", handleKeyDown);
      dragConstraintRef.current = null;
      pointerRef.current = null;
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={sceneRef} className="reference-badge-scene">
      <div ref={ribbonRef} className="reference-badge-ribbon" aria-hidden="true" />
      <div
        ref={cardRef}
        className={`reference-badge-card${isHeld ? " is-held" : ""}`}
        role="slider"
        tabIndex={0}
        aria-label="Tilt of Ramesh Tiwari's identity card"
        aria-describedby="reference-badge-hint"
        aria-valuemin={-180}
        aria-valuemax={180}
        aria-valuenow={0}
      >
        <div className="reference-badge-face">
          <div className="reference-badge-header">
            <strong>RT®</strong>
            <span>Creative ID</span>
          </div>

          <div className="reference-badge-portrait">
            <Image
              src="/images/avatar-01.jpg"
              alt="Portrait of Ramesh Tiwari"
              fill
              sizes="300px"
              preload
            />
          </div>

          <h2 className="reference-badge-name">
            Ramesh
            <span>Tiwari</span>
          </h2>

          <ul className="reference-badge-roles" aria-label="Roles">
            <li className="is-highlighted">Visual Designer</li>
            <li>Developer</li>
            <li>Technical Lead</li>
          </ul>

          <div className="reference-badge-footer">
            <div>
              <span>Based in</span>
              <strong>Kathmandu, Nepal</strong>
            </div>
            <span className="reference-badge-barcode" aria-hidden="true" />
          </div>
        </div>
        <span ref={sheenRef} className="reference-badge-sheen" aria-hidden="true" />
      </div>
    </div>
  );
}