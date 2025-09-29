// src/components/StarryBackground.jsx
import React, { useRef, useEffect, useState } from "react";

const STAR_COUNT = 120;

function randomStar() {
  return {
    id: Math.random().toString(36).slice(2),
    size: Math.random() * 2.5 + 0.7,
    top: Math.random() * 95,
    left: Math.random() * 100, // spread initially across the whole screen
    speed: Math.random() * 0.6 + 0.25,
    opacity: Math.random() * 0.3 + 0.7,
  };
}

export default function StarryBackground() {
  const starsRef = useRef(Array.from({ length: STAR_COUNT }).map(randomStar));
  const [, setTick] = useState(0);

  useEffect(() => {
    let frame;
    function animate() {
      starsRef.current = starsRef.current.map(star => {
        let newLeft = star.left + star.speed;
        if (newLeft > 105) {
          // Reset star to random spot just off the left
          return {
            ...randomStar(),
            left: -5,
          };
        }
        return { ...star, left: newLeft };
      });
      setTick(t => t + 1); // force re-render
      frame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {starsRef.current.map(({ id, size, top, left, opacity }) => (
        <div
          key={id}
          className="rounded-full bg-white"
          style={{
            width: size,
            height: size,
            position: "absolute",
            top: `${top}%`,
            left: `${left}%`,
            opacity,
            filter: "drop-shadow(0 0 4px white)",
          }}
        />
      ))}
    </div>
  );
}
