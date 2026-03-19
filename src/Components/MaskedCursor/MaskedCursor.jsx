import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./maskedcursor.css";

const MaskedCursor = () => {
  const navigate = useNavigate();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      setMousePosition({ x, y });
      setIsHovered(x > window.innerWidth * 0.58);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  
  const multiplier = window.innerWidth;
  const size = isHovered ? 0.35*multiplier : 0.025*multiplier;

  const handleClick = () => {
    if (isHovered) {
      navigate("/shop");
    }
  };

  return (
    <div className="container" onClick={handleClick}>
      <motion.div
        className="mask"
        animate={{
          WebkitMaskPosition: `${mousePosition.x - size / 2}px ${
            mousePosition.y - size / 2
          }px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ ease: "backOut", duration: 0.4 }}
      />

      <div className="normal" />

      {isHovered && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: window.innerWidth * 0.58,
            width: window.innerWidth * 0.42,
            height: "100%",
            cursor: "pointer",
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};


export default MaskedCursor;