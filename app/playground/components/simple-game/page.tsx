"use client";

import { useState, useEffect, useRef } from "react";
import { groundMap, obstacleMap, obstacles, TILE_SIZE, groundSprites, obstacleSprites } from "./map";
import { ObstacleType } from "./types";

export default function SimpleFarmingGame() {
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 190 });
  const positionRef = useRef(characterPosition);
  const pressedKeys = useRef(new Set<string>());
  const animationFrame = useRef<number | null>(null);

  const step = 2;
  const charWidth = 40;
  const charHeight = 80;
  const feetHeight = 20; // bottom 40px of character

  const mapWidth = groundMap[0].length * TILE_SIZE;
  const mapHeight = groundMap.length * TILE_SIZE;

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
      if (isDown) newY = Math.min(mapHeight - charHeight, newY + moveStep);
      if (isLeft) newX = Math.max(0, newX - moveStep);
      if (isRight) newX = Math.min(mapWidth - charWidth, newX + moveStep);

      // --- Character feet hitbox (bottom 40px only) ---
      const feetBox = { x: newX, y: newY + (charHeight - feetHeight), w: charWidth, h: feetHeight };

      // --- Collision with small obstacles ---
      const collidesSmall = obstacleMap.some((row, rowIndex) =>
        row.some((cell: ObstacleType, colIndex) => {
          if (cell === "X") return false;

          const obsX = colIndex * TILE_SIZE;
          const obsY = rowIndex * TILE_SIZE;
          const obsW = TILE_SIZE;
          const obsH = TILE_SIZE;

          // Get small obstacle feet height if defined, default to 0
          const obsFeetH = obstacleSprites[cell]?.feetHeight ?? 0;

          const feetArea = {
            x: obsX,
            y: obsY + (obsH - obsFeetH),
            w: obsW,
            h: obsFeetH,
          };

          return (
            feetBox.x < feetArea.x + feetArea.w &&
            feetBox.x + feetBox.w > feetArea.x &&
            feetBox.y + feetBox.h > feetArea.y &&
            feetBox.y < feetArea.y + feetArea.h
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
          feetBox.x < obsX + obsW &&
          feetBox.x + feetBox.w > obsX &&
          feetBox.y < obsY + obsH &&
          feetBox.y + feetBox.h > obsY
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
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [mapWidth, mapHeight]);

  const getRowZIndex = (yPos: number) => Math.floor((yPos + charHeight) / TILE_SIZE);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-600 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mt-6 text-white">
          <p className="text-lg mb-2">
            Use WASD keys to move your character! (
            {Math.round(characterPosition.x)}, {Math.round(characterPosition.y)})
          </p>
        </div>
        <div
          className="relative border-4 border-green-600 rounded-lg shadow-2xl overflow-hidden select-none"
          style={{ width: `${mapWidth}px`, height: `${mapHeight}px`, margin: "0 auto" }}
        >
          {/* Ground */}
          {groundMap.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <img
                key={`ground-${rowIndex}-${colIndex}`}
                src={groundSprites[cell]}
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
              const obsData = obstacleSprites[cell];
              return (
                <img
                  key={`obs-${rowIndex}-${colIndex}`}
                  src={obsData.image}
                  alt="obstacle"
                  className="absolute select-none pointer-events-none"
                  style={{
                    left: `${colIndex * TILE_SIZE}px`,
                    top: `${rowIndex * TILE_SIZE}px`,
                    width: `${TILE_SIZE}px`,
                    height: `${TILE_SIZE}px`,
                    objectFit: "cover",
                    zIndex: rowIndex,
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
                zIndex: obs.y,
              }}
            />
          ))}

          {/* Character */}
          <div
            className="absolute bg-blue-500 border-2 border-blue-700 rounded shadow-lg"
            style={{
              left: `${characterPosition.x}px`,
              top: `${characterPosition.y}px`,
              width: `${charWidth}px`,
              height: `${charHeight}px`,
              zIndex: getRowZIndex(characterPosition.y-40),
            }}
          >
            <div className="w-full h-full bg-blue-400 flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
