import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuButton.css';

const MenuButton = ({ label, destination, topOffset }) => {
  const navigate = useNavigate();

  return (
    <div className="button-wrapper" style={{ top: topOffset }}>
      {/* data-text is what the hover animation uses to know what to "fill" */}
      <button 
        className="button" 
        data-text={label} 
        onClick={() => navigate(destination)}
      >
        <span className="actual-text">&nbsp;{label}&nbsp;</span>
        <span aria-hidden="true" className="hover-text">&nbsp;{label}&nbsp;</span>
      </button>
    </div>
  );
}

export default MenuButton;