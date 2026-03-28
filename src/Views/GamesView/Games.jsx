import React from 'react';
import { useNavigate } from 'react-router-dom';
import games from '../../data/gamesList';
import { getTodayString } from '../../utils/DailyHelpers';
import './Games.css';

const LIVE_GAME_IDS = [1, 2, 3, 4, 5, 6];

const GAME_LOCKOUT_KEYS = {
  1: 'sharedShirt',
  2: 'badgeGuess',
  3: 'kitGuess',
  4: 'careerConundrum',
  5: 'footballHiLo',
  6: 'stadiumGuessr',
};

const DIFFICULTY_STARS = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

const getTodayResult = (gameId) => {
  const key = GAME_LOCKOUT_KEYS[gameId];
  if (!key) return null;
  const storageKey = `${key}_${getTodayString()}`;
  return localStorage.getItem(storageKey);
};

const StarRating = ({ count }) => (
  <div className="game-card__stars">
    {[1, 2, 3].map(i => (
      <span
        key={i}
        className={`game-card__star ${i <= count ? 'game-card__star--filled' : 'game-card__star--empty'}`}
      >
        ★
      </span>
    ))}
  </div>
);

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const isLive = LIVE_GAME_IDS.includes(game.id);
  const stars = DIFFICULTY_STARS[game.difficulty] ?? 1;
  const todayResult = isLive ? getTodayResult(game.id) : null;

  const handleClick = () => {
    if (isLive && game.route) navigate(game.route);
  };

  return (
    <div
      className={`game-card ${isLive ? 'game-card--live' : 'game-card--locked'}`}
      onClick={handleClick}
      role={isLive ? 'button' : undefined}
      tabIndex={isLive ? 0 : undefined}
      onKeyDown={isLive ? (e) => e.key === 'Enter' && handleClick() : undefined}
    >
      {!isLive && (
        <div className="game-card__lock"><span>SOON</span></div>
      )}

      {todayResult && (
        <div className={`game-card__result game-card__result--${todayResult}`}>
          <span>{todayResult === 'won' ? 'WON' : 'LOST'}</span>
        </div>
      )}

      {/* Icon — real image if available, placeholder box if not */}
      <div className="game-card__icon">
        {game.icon ? (
          <img src={game.icon} alt={game.name} className="game-card__icon-img" />
        ) : (
          <span className="game-card__icon-placeholder">?</span>
        )}
      </div>

      <div className="game-card__info">
        <h2 className="game-card__name">{game.name}</h2>
        <p className="game-card__desc">{game.description}</p>
      </div>

      <div className="game-card__footer">
        <StarRating count={stars} />
        {isLive && !todayResult && <span className="game-card__play">PLAY →</span>}
        {isLive && todayResult && <span className="game-card__play game-card__play--played">DONE ✓</span>}
      </div>
    </div>
  );
};

const Games = () => {
  return (
    <div className="games-page">
      <div className="games-page__header">
        <h1 className="games-page__title">GAMES</h1>
        <p className="games-page__subtitle">One challenge per game, every day.</p>
      </div>
      <div className="games-grid">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Games;