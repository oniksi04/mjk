import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import photo1 from "../../assets/mjkidentity.avif";
import photo2 from "../../assets/mjkidentity2.avif";
import "./maskedcursor.css";

const MaskedCursor = () => {
  const navigate = useNavigate();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const setFromEvent = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      setMousePosition({ x, y });

      if (x > window.innerWidth * 0.58) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', setFromEvent);
    return () => {
      window.removeEventListener('mousemove', setFromEvent);
    };
  }, []);

  const size = isHovered ? 450 : 30;

  const handleClick = () => {
    if (isHovered) {
      navigate("/shop");
    }
  };

  return (
    <div className="container" onClick={handleClick}>
      <motion.div
        className="mask"
        style={{ backgroundImage: `url(${photo1})` }}
        animate={{
          WebkitMaskPosition: `${mousePosition.x - size / 2}px ${mousePosition.y - size / 2}px`,
          WebkitMaskSize: `${size}px`
        }}
        transition={{ ease: "backOut", duration: 0.4 }}
      />

      <div className="normal" style={{ backgroundImage: `url(${photo2})` }} />

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
