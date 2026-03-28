import React, { useEffect } from 'react';
import './GameToast.css';

/**
 * GameToast — replaces all alert() calls in games
 *
 * Props:
 *   type:        'correct' | 'wrong' | 'invalid'
 *   entityType:  'team' | 'player' — used for invalid message (default: 'team')
 *   message:     string (optional full override)
 *   visible:     boolean
 *   onHide:      callback — called after auto-dismiss
 */

const getDefaultMessage = (type, entityType = 'team') => {
  switch (type) {
    case 'correct': return '🎯 Correct!';
    case 'wrong':   return '❌ Wrong answer.';
    case 'invalid': return `⚠️ Not a valid ${entityType}.`;
    default:        return '';
  }
};

const GameToast = ({ type, entityType = 'team', message, visible, onHide }) => {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => onHide?.(), 2500);
    return () => clearTimeout(timer);
  }, [visible, onHide]);

  if (!visible) return null;

  const text = message || getDefaultMessage(type, entityType);

  return (
    <div className={`game-toast game-toast--${type}`} role="alert">
      <span className="game-toast__text">{text}</span>
    </div>
  );
};

export default GameToast;