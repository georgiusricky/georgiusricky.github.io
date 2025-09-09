"use client";

import { useState, useEffect, useRef } from "react";
import { groundMap, obstacleMap, obstacles, TILE_SIZE } from "./map";
import { ObstacleType } from "./types";

export default function SimpleFarmingGame() {
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 240 });
  const positionRef = useRef(characterPosition);
  const pressedKeys = useRef(new Set<string>());
  const animationFrame = useRef<number | null>(null);

  const step = 2;
  const charSize = TILE_SIZE * 0.9;

  useEffect(() => {
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

      const diagonal = (isUp || isDown) && (isLeft || isRight);
      const moveStep = diagonal ? step / Math.sqrt(2) : step;

      let newX = x;
      let newY = y;

      if (isUp) newY = Math.max(0, newY - moveStep);
      if (isDown) newY = Math.min(765, newY + moveStep);
      if (isLeft) newX = Math.max(0, newX - moveStep);
      if (isRight) newX = Math.min(765, newX + moveStep);

      const offset = (TILE_SIZE - charSize) / 2;

      // --- Collision with small obstacles ---
      const collidesSmall = obstacleMap.some((row, rowIndex) =>
        row.some((cell: ObstacleType, colIndex) => {
          if (cell === "X") return false;
          const obsX = colIndex * TILE_SIZE;
          const obsY = rowIndex * TILE_SIZE;
          const obsSize = TILE_SIZE;

          return (
            newX + offset < obsX + obsSize &&
            newX + offset + charSize > obsX &&
            newY + offset < obsY + obsSize &&
            newY + offset + charSize > obsY
          );
        })
      );

      // --- Collision with big obstacles ---
      const collidesBig = obstacles.some((obs) => {
        const obsX = obs.x * TILE_SIZE;
        const obsY = obs.y * TILE_SIZE;
        const obsW = obs.w * TILE_SIZE;
        const obsH = obs.h * TILE_SIZE;

        return (
          newX + offset < obsX + obsW &&
          newX + offset + charSize > obsX &&
          newY + offset < obsY + obsH &&
          newY + offset + charSize > obsY
        );
      });

      if (!collidesSmall && !collidesBig) {
        x = newX;
        y = newY;
      }

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
        <div className="text-center mt-6 text-white">
          <p className="text-lg mb-2">
            Use WASD keys to move your character! (
            {Math.round(characterPosition.x)}, {Math.round(characterPosition.y)})
          </p>
        </div>
        <div
          className="relative border-4 border-green-600 rounded-lg shadow-2xl overflow-hidden select-none"
          style={{ width: "805px", height: "805px", margin: "0 auto" }}
        >
          {/* Ground */}
          {groundMap.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <img
                key={`ground-${rowIndex}-${colIndex}`}
                src={
                  cell === "G"
                    ? "/playground/simple-game/texture_grass.png"
                    : "/playground/simple-game/texture_land.png"
                }
                alt="ground"
                className="absolute select-none pointer-events-none"
                style={{
                  left: `${colIndex * TILE_SIZE}px`,
                  top: `${rowIndex * TILE_SIZE}px`,
                  width: `${TILE_SIZE}px`,
                  height: `${TILE_SIZE}px`,
                  objectFit: "cover",
                }}
              />
            ))
          )}

          {/* Small obstacles */}
          {obstacleMap.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              if (cell === "X") return null;
              const img =
                cell === "S"
                  ? "/playground/simple-game/stone.png"
                  : cell === "T"
                  ? "/playground/simple-game/tree.png"
                  : cell === "B"
                  ? "/playground/simple-game/bush.png"
                  : cell === "F"
                  ? "/playground/simple-game/fence.png"
                  : null;
              return (
                <img
                  key={`obs-${rowIndex}-${colIndex}`}
                  src={img!}
                  alt="obstacle"
                  className="absolute select-none pointer-events-none"
                  style={{
                    left: `${colIndex * TILE_SIZE}px`,
                    top: `${rowIndex * TILE_SIZE}px`,
                    width: `${TILE_SIZE}px`,
                    height: `${TILE_SIZE}px`,
                    objectFit: "cover",
                  }}
                />
              );
            })
          )}

          {/* Big obstacles */}
          {obstacles.map((obs, i) => (
            <img
              key={`big-obs-${i}`}
              src={obs.image}
              alt="obstacle"
              className="absolute select-none pointer-events-none"
              style={{
                left: `${obs.x * TILE_SIZE}px`,
                top: `${obs.y * TILE_SIZE}px`,
                width: `${obs.w * TILE_SIZE}px`,
                height: `${obs.h * TILE_SIZE}px`,
                objectFit: "cover",
              }}
            />
          ))}

          {/* Character */}
          <div
            className="absolute bg-blue-500 border-2 border-blue-700 rounded shadow-lg"
            style={{
              left: `${characterPosition.x}px`,
              top: `${characterPosition.y}px`,
              width: `${charSize}px`,
              height: `${charSize}px`,
            }}
          >
            <div className="w-full h-full bg-blue-400 rounded flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
