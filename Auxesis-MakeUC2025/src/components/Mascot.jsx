import React, { useState, useEffect, useRef } from "react";
import catIcon from "../assets/Are_na.jpg"; // Adjust path if your Mascot.jsx is in a different folder

export default function Mascot() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ x: 2, y: 0 });
  const [direction, setDirection] = useState(1);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpVelocity, setJumpVelocity] = useState(0);
  const mascotRef = useRef(null);

  const WIDTH = 256; // change size as you want
  const HEIGHT = 256;

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setPosition((prev) => {
        const GROUND_Y = window.innerHeight - HEIGHT - 50;
        let newX = prev.x + velocity.x;
        let newY = prev.y + jumpVelocity;
        let newVelX = velocity.x;
        let newJumpVel = jumpVelocity + 0.2;
        let newDir = direction;

        if (newX > window.innerWidth - WIDTH) {
          newX = window.innerWidth - WIDTH;
          newVelX = -Math.abs(newVelX);
          newDir = -1;
        } else if (newX < 0) {
          newX = 0;
          newVelX = Math.abs(newVelX);
          newDir = 1;
        }

        if (newY >= GROUND_Y) {
          newY = GROUND_Y;
          newJumpVel = 0;
          setIsJumping(false);
        }

        setVelocity({ x: newVelX, y: 0 });
        setJumpVelocity(newJumpVel);
        setDirection(newDir);

        return { x: newX, y: newY };
      });
    }, 30);

    return () => clearInterval(gameLoop);
  }, [velocity, jumpVelocity, direction]);

  useEffect(() => {
    const actionLoop = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.3) {
        setJumpVelocity(-12);
        setIsJumping(true);
      } else if (rand < 0.55) {
        setVelocity((v) => ({ ...v, x: -v.x }));
        setDirection((d) => -d);
      }
    }, 3500);
    return () => clearInterval(actionLoop);
  }, []);

  const handleClick = () => {
    setJumpVelocity(-9);
  };

  return (
    <img
      ref={mascotRef}
      src={catIcon}
      alt="Mascot"
      onClick={handleClick}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: WIDTH,
        height: HEIGHT,
        zIndex: 1000,
        userSelect: "none",
        cursor: "pointer",
        transition: "transform 0.15s",
        transform: `scaleX(${direction}) ${isJumping ? "scaleY(0.8)" : ""}`,
      }}
      title="Click me!"
      draggable={false}
    />
  );
}
