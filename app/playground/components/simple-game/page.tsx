"use client";

import { useState, useEffect, useRef } from "react";
import { groundMap, obstacleMap, obstacles, TILE_SIZE, groundSprites, obstacleSprites } from "./map";
import { ObstacleType } from "./types";

export default function SimpleFarmingGame() {
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 190 });
  const positionRef = useRef(characterPosition);
  const pressedKeys = useRef(new Set<string>());
  const animationFrame = useRef<number | null>(null);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const step = 2;
  const charWidth = 40;
  const charHeight = 80;
  const feetHeight = 20;

  const mapWidth = groundMap[0].length * TILE_SIZE;
  const mapHeight = groundMap.length * TILE_SIZE;

  // --- Responsive scaling + mobile detection ---
  useEffect(() => {
    const updateScale = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);

      if (isMobileDevice) {
        const containerWidth = window.innerWidth - 32;
        const containerHeight = window.innerHeight - 32;
        const scaleX = containerWidth / mapWidth;
        const scaleY = containerHeight / mapHeight;
        setScale(Math.min(scaleX, scaleY));
      } else {
        setScale(1); // Keep scale at 1 for non-mobile devices
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [mapWidth, mapHeight]);

  // --- Movement logic ---
  const moveCharacter = () => {
    let { x, y } = positionRef.current;

    const isUp =
      pressedKeys.current.has("w") ||
      pressedKeys.current.has("top") ||
      pressedKeys.current.has("lefttop") ||
      pressedKeys.current.has("righttop");
    const isDown =
      pressedKeys.current.has("s") ||
      pressedKeys.current.has("bottom") ||
      pressedKeys.current.has("leftbottom") ||
      pressedKeys.current.has("rightbottom");
    const isLeft =
      pressedKeys.current.has("a") ||
      pressedKeys.current.has("left") ||
      pressedKeys.current.has("lefttop") ||
      pressedKeys.current.has("leftbottom");
    const isRight =
      pressedKeys.current.has("d") ||
      pressedKeys.current.has("right") ||
      pressedKeys.current.has("righttop") ||
      pressedKeys.current.has("rightbottom");

    const diagonal = (isUp || isDown) && (isLeft || isRight);
    const moveStep = diagonal ? step / Math.sqrt(2) : step;

    let newX = x;
    let newY = y;

    if (isUp) newY = Math.max(0, newY - moveStep);
    if (isDown) newY = Math.min(mapHeight - charHeight, newY + moveStep);
    if (isLeft) newX = Math.max(0, newX - moveStep);
    if (isRight) newX = Math.min(mapWidth - charWidth, newX + moveStep);

    // --- Character feet hitbox ---
    const feetBox = { x: newX, y: newY + (charHeight - feetHeight), w: charWidth, h: feetHeight };

    // --- Collision with small obstacles ---
    const collidesSmall = obstacleMap.some((row, rowIndex) =>
      row.some((cell: ObstacleType, colIndex) => {
        if (cell === "X") return false;
        const obsX = colIndex * TILE_SIZE;
        const obsY = rowIndex * TILE_SIZE;
        const obsW = TILE_SIZE;
        const obsH = TILE_SIZE;
        const obsFeetH = obstacleSprites[cell]?.feetHeight ?? 0;
        const feetArea = { x: obsX, y: obsY + (obsH - obsFeetH), w: obsW, h: obsFeetH };
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["w", "a", "s", "d"].includes(key)) {
        pressedKeys.current.add(key);
        event.preventDefault();
        if (!animationFrame.current) animationFrame.current = requestAnimationFrame(moveCharacter);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["w", "a", "s", "d"].includes(key)) {
        pressedKeys.current.delete(key);
        event.preventDefault();
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

  // --- Mobile button helper ---
  const handleMobilePress = (key: string, isDown: boolean) => {
    console.log('Mobile button pressed:', key, isDown);
    if (isDown) {
      pressedKeys.current.add(key);
      if (!animationFrame.current) {
        animationFrame.current = requestAnimationFrame(moveCharacter);
      }
    } else {
      pressedKeys.current.delete(key);
    }
  };

  const getRowZIndex = (yPos: number) => Math.floor((yPos + charHeight) / TILE_SIZE);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-600 p-4 flex flex-col items-center">
      <div className="text-center text-black mb-4">
        <p className="text-sm md:text-lg">
          Use <span className="font-bold">{isMobile ? 'the buttons below' : 'WASD keys'}</span> to move! (
          {Math.round(characterPosition.x)}, {Math.round(characterPosition.y)})
        </p>
      </div>

      <div
        className="relative overflow-hidden border-4 border-green-600 rounded-lg shadow-2xl mx-auto "
        style={{ width: "100%", maxWidth: `${mapWidth}px`, aspectRatio: `${mapWidth} / ${mapHeight}` }}
      >
        <div
          className="absolute top-0 left-0"
          style={{ width: `${mapWidth}px`, height: `${mapHeight}px`, transform: `scale(${scale})`, transformOrigin: "top left" }}
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
            className="absolute bg-blue-500 border-2 border-blue-700 rounded shadow-lg flex items-center justify-center"
            style={{
              left: `${characterPosition.x}px`,
              top: `${characterPosition.y}px`,
              width: `${charWidth}px`,
              height: `${charHeight}px`,
              zIndex: getRowZIndex(characterPosition.y - 40),
            }}
          >
            <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
          </div>
        </div>

      </div>
        {/* --- Mobile buttons --- */}
        {isMobile && (
          <div className="mt-10 grid grid-cols-3 gap-2">
            {[
              ["↖", "lefttop"],
              ["↑", "top"],
              ["↗", "righttop"],
              ["←", "left"],
              [" ", "center"],
              ["→", "right"],
              ["↙", "leftbottom"],
              ["↓", "bottom"],
              ["↘", "rightbottom"],
            ].map(([symbol, key]) => (
              <button
                key={key}
                onMouseDown={() => handleMobilePress(key, true)}
                onMouseUp={() => handleMobilePress(key, false)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleMobilePress(key, true);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleMobilePress(key, false);
                }}
                onMouseLeave={() => handleMobilePress(key, false)}
                className="w-14 h-14 bg-gray-800/60 text-white rounded-full flex items-center justify-center select-none backdrop-blur-sm hover:bg-gray-700/60 active:bg-gray-900/60"
              >
                {symbol}
              </button>
            ))}
          </div>
        )}
    </div>
  );
}
