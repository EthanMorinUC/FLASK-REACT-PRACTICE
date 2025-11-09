import React, { useState, useEffect } from "react";

export default function WalkingCat() {
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [isJumping, setIsJumping] = useState(false);
 

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x + direction * 3;
        let newDirection = direction;

        // Bounce off edges
        if (newX > window.innerWidth - 80) {
          newX = window.innerWidth - 80;
          newDirection = -1;
        } else if (newX < 0) {
          newX = 0;
          newDirection = 1;
        }

        if (newDirection !== direction) setDirection(newDirection);

        return { ...prev, x: newX };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [direction]);

  // Jump randomly
  useEffect(() => {
    const jumpInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 600);
      }
    }, 3000);

    return () => clearInterval(jumpInterval);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 transition-all duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `scaleX(${direction}) ${isJumping ? 'translateY(-20px)' : ''}`,
      }}
    >
      <div className={`text-6xl transition-all duration-300 animate-bounce`}>
        {/* ASCII Cat */}
        <pre className="font-mono text-2xl leading-none select-none text-white drop-shadow-lg">
{`  /\\_/\\
 ( o.o )
  > ^ <
 /|   |\\
(_|   |_)`}
        </pre>
      </div>
    </div>
  );
}
