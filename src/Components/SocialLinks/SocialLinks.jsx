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
      bottom: "40px",
      left: "40px",
      display: "flex",
      gap: "20px",
      zIndex: 9999
    }}
  >
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
    </div>
  );
}

export default SocialLinks
