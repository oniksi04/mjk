import React, {useEffect, useState} from 'react'
import { motion } from "framer-motion"

import photo1 from "../../assets/mjkidentity1.webp";
import photo2 from "../../assets/mjkidentity2.webp";



const MaskedCursor = () => {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const setFromEvent = (e) => {
    const x = e.clientX;
    const y = e.clientY;

    setMousePosition({ x, y });

    if (x > window.innerWidth * 0.6) {
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

  const size = isHovered ? '450' : '30'

  console.log(isHovered);

  return (
    <div className="container">
      <motion.div className="mask" style={{ backgroundImage: `url(${photo2})` }} 
      animate={{WebkitMaskPosition: `${mousePosition.x - size / 2}px
      ${mousePosition.y - size / 2}px`,
      WebkitMaskSize: `${size}px`}} transition={{ ease: "backOut", duration: 0.4 }} >

      </motion.div>
      <div className="normal" style={{ backgroundImage: `url(${photo1})` }}>
    
      </div>
    </div>
  )
}

export default MaskedCursor