import React from 'react'
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

const SocialLinks = () => {
  const socials = [
    { id: 1, href: 'https://www.tiktok.com/@mysteryjerseykosova', icon: <FaTiktok />, label: 'Tiktok' },
    { id: 2, href: 'https://facebook.com', icon: <FaFacebookF />, label: 'Facebook' },
    { id: 3, href: 'https://www.instagram.com/mysteryjerseykosova/', icon: <FaInstagram />, label: 'Instagram' },
  ];
  
  return (
    <div
      style={{
        position: "fixed",
        bottom: "35px",
        left: "44px",
        display: "flex",
        alignItems: "center",  // vertically centers the text with icons
        gap: "20px",
        zIndex: 9999,
        color: "#000"           // make sure text inherits color
      }}
    >
      {/* Render social icons */}
      {socials.map(({ id, href, icon, label }) => (
        <a 
          key={id} 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={label}
          style={{ fontSize: '30px', color: 'inherit' }}
        >
          {icon}
        </a>
      ))}

      <span
        style={{
        fontSize: '18px',
        fontWeight: 700,
        fontFamily: 'Satoshi, sans-serif',
        position: 'relative',
        top: '-5px'             
      }}>●&nbsp;&nbsp;&nbsp;Follow us!</span>
    </div>
  );
}

export default SocialLinks;
