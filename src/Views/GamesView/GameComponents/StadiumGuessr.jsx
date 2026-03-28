import { useState } from "react";
import teams from "../../../data/teamsList";
import { getDailyIndex } from "../../../utils/DailyHelpers";
import { useDailyLockout } from "../../../hooks/useDailyLockout";
import GameLayout from "../../../Components/GameLayout";
import Autocomplete, { filterSuggestions } from "../../../Components/AutoComplete/Autocomplete";
import LockoutScreen from "../../../Components/LockoutScreen";
import GameToast from "../../../Components/GameToast/GameToast";

const StadiumGuessr = () => {
  const { hasPlayed, result, lockGame } = useDailyLockout("stadiumGuessr");
  const [guess, setGuess] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [toast, setToast] = useState({ visible: false, type: null });

  const dailyIndex = getDailyIndex(teams.length);
  const currentTeam = teams[dailyIndex];

  const showToast = (type) => setToast({ visible: true, type });
  const hideToast = () => setToast({ visible: false, type: null });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setGuess(value);
    setSuggestions(value.length > 1 ? filterSuggestions(teams, value) : []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const exists = teams.some(t => t.name.toLowerCase() === guess.trim().toLowerCase());
    if (!exists) { showToast("invalid"); return; }
    const isCorrect = guess.trim().toLowerCase() === currentTeam.name.toLowerCase();
    lockGame(isCorrect ? "won" : "lost");
    showToast(isCorrect ? "correct" : "wrong");
  };

  if (hasPlayed) return <LockoutScreen gameName="StadiumGuessr" result={result} />;

  return (
    <GameLayout title="StadiumGuessr">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {/* stadium.image is the path, stadium.name is the label */}
        <img
          src={currentTeam.stadium.image}
          alt={currentTeam.stadium.name}
          style={{ width: "350px" }}
        />
      </div>
      <Autocomplete
        value={guess}
        suggestions={suggestions}
        allData={teams}
        onChange={handleInputChange}
        onSelect={(name) => { setGuess(name); setSuggestions([]); }}
        onSubmit={handleSubmit}
        placeholder="Enter club name..."
      />
      <GameToast type={toast.type} entityType="team" visible={toast.visible} onHide={hideToast} />
    </GameLayout>
  );
};

export default StadiumGuessr;