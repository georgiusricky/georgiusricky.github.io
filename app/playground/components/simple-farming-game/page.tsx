"use client";

import { useState, useEffect } from "react";

export default function SimpleFarmingGame() {
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const step = 10;
      setCharacterPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;

        switch (event.key.toLowerCase()) {
          case 'w':
          case 'arrowup':
            newY = Math.max(0, prev.y - step);
            break;
          case 's':
          case 'arrowdown':
            newY = Math.min(400, prev.y + step);
            break;
          case 'a':
          case 'arrowleft':
            newX = Math.max(0, prev.x - step);
            break;
          case 'd':
          case 'arrowright':
            newX = Math.min(400, prev.x + step);
            break;
        }

        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-600 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Simple Farming Game
        </h1>
        
        <div className="relative bg-green-400 border-4 border-green-600 rounded-lg shadow-2xl overflow-hidden"
             style={{ width: '500px', height: '500px', margin: '0 auto' }}>
          
          {/* Character Box */}
          <div 
            className="absolute bg-blue-500 border-2 border-blue-700 rounded shadow-lg transition-all duration-100"
            style={{
              left: `${characterPosition.x}px`,
              top: `${characterPosition.y}px`,
              width: '40px',
              height: '40px'
            }}
          >
            <div className="w-full h-full bg-blue-400 rounded flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
            </div>
          </div>

          {/* Grid pattern for grass */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 25 }, (_, i) => (
              <div key={i} className="absolute border border-green-500" 
                   style={{
                     left: `${(i % 5) * 100}px`,
                     top: `${Math.floor(i / 5) * 100}px`,
                     width: '100px',
                     height: '100px'
                   }}>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6 text-white">
          <p className="text-lg mb-2">Use WASD or Arrow Keys to move your character!</p>
          <p className="text-sm opacity-80">Position: ({characterPosition.x}, {characterPosition.y})</p>
        </div>
      </div>
    </div>
  );
}
