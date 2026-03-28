import { useState, useMemo } from "react";
import players from "../../../data/playersList";
import teams from "../../../data/teamsList";
import { getDailyIndex } from "../../../utils/DailyHelpers";
import { useDailyLockout } from "../../../hooks/useDailyLockout";
import GameLayout from "../../../Components/GameLayout";
import Autocomplete, { filterSuggestions } from "../../../Components/AutoComplete/Autocomplete";
import LockoutScreen from "../../../Components/LockoutScreen";
import GameToast from "../../../Components/GameToast/GameToast";
import "./SharedShirt.css";

const buildValidPairs = () => {
  const pairs = [];
  const teamNames = teams.map(t => t.name);
  for (let i = 0; i < teamNames.length; i++) {
    for (let j = i + 1; j < teamNames.length; j++) {
      const teamA = teamNames[i];
      const teamB = teamNames[j];
      const sharedPlayers = players.filter(
        p => p.teams.includes(teamA) && p.teams.includes(teamB)
      );
      if (sharedPlayers.length > 0) pairs.push({ teamA, teamB, sharedPlayers });
    }
  }
  return pairs;
};

const SharedShirt = () => {
  const { hasPlayed, result, lockGame } = useDailyLockout("sharedShirt");
  const [guess, setGuess] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [toast, setToast] = useState({ visible: false, type: null });

  const validPairs = useMemo(() => buildValidPairs(), []);
  const dailyIndex = getDailyIndex(validPairs.length);
  const { teamA, teamB, sharedPlayers } = validPairs[dailyIndex];

  const teamAObj = teams.find(t => t.name === teamA);
  const teamBObj = teams.find(t => t.name === teamB);

  const showToast = (type) => setToast({ visible: true, type });
  const hideToast = () => setToast({ visible: false, type: null });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setGuess(value);
    setSuggestions(value.length > 1 ? filterSuggestions(players, value) : []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const exists = players.some(p => p.name.toLowerCase() === guess.trim().toLowerCase());
    if (!exists) { showToast("invalid"); return; }
    const isCorrect = sharedPlayers.some(p => p.name.toLowerCase() === guess.trim().toLowerCase());
    lockGame(isCorrect ? "won" : "lost");
    showToast(isCorrect ? "correct" : "wrong");
  };

  if (hasPlayed) return <LockoutScreen gameName="Shared Shirt" result={result} />;

  return (
    <GameLayout title="Shared Shirt">
      <p className="ss-instruction">Name a player who has worn the shirt of both clubs.</p>
      <div className="ss-clubs">
        <div className="ss-club">
          <div className="ss-club__badge">
            <img src={teamAObj.crest.normal} alt={teamA} />
          </div>
          <span className="ss-club__name">{teamA}</span>
        </div>
        <div className="ss-vs"><span>x</span></div>
        <div className="ss-club">
          <div className="ss-club__badge">
            <img src={teamBObj.crest.normal} alt={teamB} />
          </div>
          <span className="ss-club__name">{teamB}</span>
        </div>
      </div>
      <Autocomplete
        value={guess}
        suggestions={suggestions}
        allData={players}
        onChange={handleInputChange}
        onSelect={(name) => { setGuess(name); setSuggestions([]); }}
        onSubmit={handleSubmit}
        placeholder="Name a player..."
      />
      <GameToast type={toast.type} entityType="player" visible={toast.visible} onHide={hideToast} />
    </GameLayout>
  );
};

export default SharedShirt;