import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LockoutScreen.css';

const LockoutScreen = ({ gameName, result }) => {
  const navigate = useNavigate();
  const won = result === 'won';

  return (
    <div className="lockout">
      <div className="lockout__card">

        <div className={`lockout__badge ${won ? 'lockout__badge--won' : 'lockout__badge--lost'}`}>
          <span>{won ? 'CORRECT' : 'WRONG'}</span>
        </div>

        {/* Game name */}
        {gameName && (
          <p className="lockout__game-name">{gameName}</p>
        )}

        {/* Main message */}
        <h1 className="lockout__title">
          {won ? (
            'WELL DONE.'
          ) : (
            <>BETTER LUCK<span className="lockout__title-line2">TOMORROW.</span></>
          )}
        </h1>

        <p className="lockout__sub">
          {won
            ? "You got today's challenge. Come back tomorrow for a new one."
            : "You've used today's attempt. A new challenge drops tomorrow."}
        </p>

        {/* Divider */}
        <div className="lockout__divider" />

        {/* Back button */}
        <button className="lockout__btn" onClick={() => navigate('/games')}>
          <span>← ALL GAMES</span>
        </button>

      </div>
    </div>
  );
};

export default LockoutScreen;