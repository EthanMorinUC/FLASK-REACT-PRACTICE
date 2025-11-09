import React from "react";

export default function TextSize({ size = "medium", children, className = "" }) {
  const sizeMap = {
    small: "text-base",
    medium: "text-lg",
    large: "text-2xl",
    xl: "text-3xl",
    "2xl": "text-4xl",
    "3xl": "text-5xl",
    "4xl": "text-6xl",
    "5xl": "text-7xl",
  };

  return <div className={`${sizeMap[size]} ${className}`}>{children}</div>;
}
