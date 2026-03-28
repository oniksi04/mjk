import { useState } from "react";
import players from "../../../data/playersList";
import teams from "../../../data/teamsList";
import { getDailyIndex } from "../../../utils/DailyHelpers";
import { useDailyLockout } from "../../../hooks/useDailyLockout";
import GameLayout from "../../../Components/GameLayout";
import Autocomplete, { filterSuggestions } from "../../../Components/AutoComplete/Autocomplete";
import LockoutScreen from "../../../Components/LockoutScreen";
import GameToast from "../../../Components/GameToast/GameToast";
import "./CareerConundrum.css";

const CareerConundrum = () => {
  const { hasPlayed, result, lockGame } = useDailyLockout("careerConundrum");
  const [guess, setGuess] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [toast, setToast] = useState({ visible: false, type: null });

  const dailyIndex = getDailyIndex(players.length);
  const currentPlayer = players[dailyIndex];

  const showToast = (type) => setToast({ visible: true, type });
  const hideToast = () => setToast({ visible: false, type: null });

  const getTeamByName = (name) => teams.find(t => t.name === name);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setGuess(value);
    setSuggestions(value.length > 1 ? filterSuggestions(players, value) : []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const exists = players.some(p => p.name.toLowerCase() === guess.trim().toLowerCase());
    if (!exists) { showToast("invalid"); return; }
    const isCorrect = guess.trim().toLowerCase() === currentPlayer.name.toLowerCase();
    lockGame(isCorrect ? "won" : "lost");
    showToast(isCorrect ? "correct" : "wrong");
  };

  if (hasPlayed) return <LockoutScreen gameName="Career Conundrum" result={result} />;

  // Split teams into rows of max 5
  const teamRows = currentPlayer.teams.reduce((rows, team, i) => {
    const rowIndex = Math.floor(i / 5);
    if (!rows[rowIndex]) rows[rowIndex] = [];
    rows[rowIndex].push({ team, originalIndex: i });
    return rows;
  }, []);

  return (
    <GameLayout title="Career Conundrum">
      <div className="cc-path">
        {teamRows.map((row, rowIndex) => (
          <div key={rowIndex} className="cc-path__row">
            {row.map(({ team, originalIndex }) => {
              const teamObj = getTeamByName(team);
              return (
                <div key={originalIndex} className="cc-path__step">
                  <div className="cc-path__badge">
                    {teamObj ? (
                      <img src={teamObj.crest.normal} alt={team} />
                    ) : (
                      <span className="cc-path__badge-initial">{team.charAt(0)}</span>
                    )}
                  </div>
                  <div className="cc-path__club-name">{team}</div>
                  {/* Arrow after every club except the very last one overall */}
                  {originalIndex < currentPlayer.teams.length - 1 && (
                    <div className="cc-path__arrow">→</div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p className="cc-hint">Who is this player?</p>

      <Autocomplete
        value={guess}
        suggestions={suggestions}
        allData={players}
        onChange={handleInputChange}
        onSelect={(name) => { setGuess(name); setSuggestions([]); }}
        onSubmit={handleSubmit}
        placeholder="Enter player name..."
      />

      <GameToast type={toast.type} entityType="player" visible={toast.visible} onHide={hideToast} />
    </GameLayout>
  );
};

export default CareerConundrum;