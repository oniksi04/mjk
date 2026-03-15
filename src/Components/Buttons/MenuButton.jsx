import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuButton.css';

const MenuButton = ({ label, destination, topOffset, hideCursor, showCursor }) => {
  const navigate = useNavigate();

  return (
    <div
      className="box-button"
      onClick={() => navigate(destination)}
      onMouseEnter={hideCursor}
      onMouseLeave={showCursor}
      style={{ top: topOffset }}
    >
      <div className="button">
        <span>{label}</span>
      </div>
    </div>
  );
}

export default MenuButton;