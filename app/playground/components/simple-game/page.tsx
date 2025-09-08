"use client";

import { useState, useEffect, useRef } from "react";

export default function SimpleFarmingGame() {
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 50 });
  const positionRef = useRef(characterPosition);
  const pressedKeys = useRef(new Set<string>());
  const animationFrame = useRef<number | null>(null);

  // Obstacles
  const obstacles = [
    { x: 0, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 40, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 80, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 120, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 240, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 280, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 320, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 360, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 400, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 440, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 480, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 520, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 560, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 600, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 640, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 680, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 720, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 760, y: 160, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 0, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 40, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 80, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 120, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 160, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 200, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 240, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 280, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 320, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 360, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 400, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 440, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 480, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 520, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 560, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 600, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 640, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 680, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 720, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
    { x: 760, y: 280, size: 40, image: "/playground/simple-game/fence.png" },
  ];

  const tiles = Array.from({ length: 20 * 20 }, (_, i) => {
    const row = Math.floor(i / 20);
    const col = i % 20;

    if(row == 5 || row == 6 || row== 7){
      return "/playground/simple-game/texture_land.png";
    }

    return "/playground/simple-game/texture_grass.png";
  });

  useEffect(() => {
    const step = 2;

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

      // Character size
      const charSize = 40;

      // Collision with obstacles
      const collides = obstacles.some(
        (obs) =>
          newX < obs.x + obs.size &&
          newX + charSize > obs.x &&
          newY < obs.y + obs.size &&
          newY + charSize > obs.y
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mt-6 text-white">
          <p className="text-lg mb-2">Use WASD keys to move your character! ({Math.round(characterPosition.x)},{" "} {Math.round(characterPosition.y)})</p>
        </div>
        <div
          className="relative border-4 border-green-600 rounded-lg shadow-2xl overflow-hidden"
          style={{ width: "805px", height: "805px", margin: "0 auto" }}
        >
          {/* Tiles (grass, land, soil) */}
          {tiles.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="tile"
              className="absolute"
              style={{
                left: `${(i % 20) * 40}px`,
                top: `${Math.floor(i / 20) * 40}px`,
                width: "40px",
                height: "40px",
                objectFit: "cover",
              }}
            />
          ))}

          {/* Obstacles */}
          {obstacles.map((obs, i) => (
            <img
              key={i}
              src={obs.image}
              alt="obstacle"
              className="absolute"
              style={{
                left: `${obs.x}px`,
                top: `${obs.y}px`,
                width: `${obs.size}px`,
                height: `${obs.size}px`,
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
              width: "40px",
              height: "40px",
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
