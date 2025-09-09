"use client";

import { useState, useEffect, useRef } from "react";
import { TILE_SIZE, groundMap, obstacleMap, groundSprites, obstacleSprites } from "./map";

export default function SimpleGame() {
  const [characterPosition, setCharacterPosition] = useState({x: 0 , y: 200});
  const positionRef = useRef(characterPosition);
  const pressedKeys = useRef(new Set<string>());
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const step = 2;
    const charSize = TILE_SIZE * 0.9; // updated size

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
      if (isDown) newY = Math.min(groundMap.length * TILE_SIZE - charSize, newY + moveStep);
      if (isLeft) newX = Math.max(0, newX - moveStep);
      if (isRight) newX = Math.min(groundMap[0].length * TILE_SIZE - charSize, newX + moveStep);

      // Collision detection
      const collides = obstacleMap.some((row, rowIndex) =>
        row.some((cell, colIndex) => {
          if (cell === "X") return false; // empty space
          const obsX = colIndex * TILE_SIZE;
          const obsY = rowIndex * TILE_SIZE;
          return (
            newX + charOffset < obsX + TILE_SIZE &&
            newX + charOffset + charSize > obsX &&
            newY + charOffset < obsY + TILE_SIZE &&
            newY + charOffset + charSize > obsY
          );
        })
      );


      if (!collides) {
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

  const charSize = TILE_SIZE * 0.9;
  const charOffset = TILE_SIZE * 0.05; // to center inside tile

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-600 p-8">
      <div className=" mx-auto">
        <div className="text-center mt-6 text-white">
          <p className="text-lg mb-2">
            Use WASD keys to move your character! ({Math.round(characterPosition.x)},{" "}
            {Math.round(characterPosition.y)})
          </p>
        </div>
        <div
          className="relative border-4 border-green-600 rounded-lg shadow-2xl overflow-hidden"
          style={{
            width: `${groundMap[0].length * TILE_SIZE + 5}px`,
            height: `${groundMap.length * TILE_SIZE + 5}px`,
            margin: "0 auto",
          }}
        >
          {/* Ground tiles */}
          {groundMap.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <img
                key={`ground-${rowIndex}-${colIndex}`}
                src={groundSprites[cell]}
                alt="ground"
                className="absolute"
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

          {/* Obstacles */}
          {obstacleMap.map((row, rowIndex) =>
            row.map((cell, colIndex) =>
              cell !== "X" ? (
                <img
                  key={`obstacle-${rowIndex}-${colIndex}`}
                  src={obstacleSprites[cell]}
                  alt="obstacle"
                  className="absolute"
                  style={{
                    left: `${colIndex * TILE_SIZE}px`,
                    top: `${rowIndex * TILE_SIZE}px`,
                    width: `${TILE_SIZE}px`,
                    height: `${TILE_SIZE}px`,
                    objectFit: "cover",
                  }}
                />
              ) : null
            )
          )}

          {/* Character */}
          <div
            className="absolute bg-blue-500 border-2 border-blue-700 rounded shadow-lg"
            style={{
              left: `${characterPosition.x + charOffset}px`,
              top: `${characterPosition.y + charOffset}px`,
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
