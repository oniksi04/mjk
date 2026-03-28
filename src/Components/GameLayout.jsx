import './gamelayout.css';

const GameLayout = ({ title, children }) => {
  return (
    <div className="game-container">
      {title && <h1 className="game-title">{title}</h1>}
      <div className="game-content-wrapper">
        {children}
      </div>
    </div>
  );
};

export default GameLayout;