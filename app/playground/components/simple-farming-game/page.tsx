"use client";

import { useState, useEffect, useRef } from "react";

export default function SimpleFarmingGame() {
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 50 });
  const positionRef = useRef(characterPosition);
  const pressedKeys = useRef(new Set<string>());
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const step = 2; // reduced base speed

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["w", "a", "s", "d"].includes(key)) {
        pressedKeys.current.add(key);
        event.preventDefault();
        if (!animationFrame.current) {
          animationFrame.current = requestAnimationFrame(moveCharacter);
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["w", "a", "s", "d"].includes(key)) {
        pressedKeys.current.delete(key);
        event.preventDefault();
      }
    };

    const moveCharacter = () => {
      let { x, y } = positionRef.current;

      const isUp = pressedKeys.current.has("w");
      const isDown = pressedKeys.current.has("s");
      const isLeft = pressedKeys.current.has("a");
      const isRight = pressedKeys.current.has("d");

      // check how many directions are active
      const activeDirections = [isUp, isDown, isLeft, isRight].filter(Boolean).length;
      const diagonal = (isUp || isDown) && (isLeft || isRight);
      const moveStep = diagonal ? step / Math.sqrt(2) : step;

      if (isUp) y = Math.max(0, y - moveStep);
      if (isDown) y = Math.min(752, y + moveStep);
      if (isLeft) x = Math.max(0, x - moveStep);
      if (isRight) x = Math.min(752, x + moveStep);

      if (x !== positionRef.current.x || y !== positionRef.current.y) {
        positionRef.current = { x, y };
        setCharacterPosition({ x, y });
      }

      if (pressedKeys.current.size > 0) {
        animationFrame.current = requestAnimationFrame(moveCharacter);
      } else {
        animationFrame.current = null;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-600 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Simple Farming Game
        </h1>

        <div
          className="relative bg-green-400 border-4 border-green-600 rounded-lg shadow-2xl overflow-hidden"
          style={{ width: "800px", height: "800px", margin: "0 auto" }}
        >
          {/* Character */}
          <div
            className="absolute bg-blue-500 border-2 border-blue-700 rounded shadow-lg transition-none"
            style={{
              left: `${characterPosition.x}px`,
              top: `${characterPosition.y}px`,
              width: "40px",
              height: "40px",
            }}
          >
            <div className="w-full h-full bg-blue-400 rounded flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
            </div>
          </div>

          {/* Grid */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 25 }, (_, i) => (
              <div
                key={i}
                className="absolute border border-green-500"
                style={{
                  left: `${(i % 5) * 100}px`,
                  top: `${Math.floor(i / 5) * 100}px`,
                  width: "100px",
                  height: "100px",
                }}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-6 text-white">
          <p className="text-lg mb-2">Use WASD keys to move your character!</p>
          <p className="text-sm opacity-80">
            Hold keys for continuous movement • Position: ({characterPosition.x},{" "}
            {characterPosition.y})
          </p>
        </div>
      </div>
    </div>
  );
}
