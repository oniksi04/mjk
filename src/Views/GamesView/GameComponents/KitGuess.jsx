import { useEffect, useState, useMemo } from "react";
import teams from "../../../data/teamsList";
import { getTodayString, getDailyIndex } from "../../../utils/DailyHelpers";
import { useDailyLockout } from "../../../hooks/useDailyLockout";
import GameLayout from "../../../Components/GameLayout";
import Autocomplete from "../../../Components/AutoComplete/Autocomplete";
import LockoutScreen from "../../../Components/LockoutScreen";
import GameToast from "../../../Components/GameToast/GameToast";

const KitGuess = () => {
  const { hasPlayed, result, lockGame } = useDailyLockout("kitGuess");
  const [guess, setGuess] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [toast, setToast] = useState({ visible: false, type: null });

  const dailyIndex = getDailyIndex(teams.length)
  const currentTeam = teams[dailyIndex]
  
  const showToast = (type) => setToast({ visible: true, type });
  const hideToast = () => setToast({ visible: false, type: null });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setGuess(value);
    setSuggestions(value.length > 1 ? teams.filter(t => t.name.toLowerCase().includes(value.toLowerCase())).slice(0, 5) : []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const exists = teams.some(t => t.name.toLowerCase() === guess.trim().toLowerCase());
    if (!exists) {
      showToast('invalid');
      return;
    }

    const isCorrect = guess.toLowerCase() === currentTeam.name.toLowerCase();
    lockGame(isCorrect ? "won" : "lost");
    showToast(isCorrect ? 'correct' : 'wrong');
  };

  if (hasPlayed) {
    return <LockoutScreen gameName="KitGuessr" result={result} />;
  }


  return (
    <GameLayout title="KitGuessr">
      <div className="kit-display" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <img src={currentTeam.kits.blurred} alt="Kit" style={{ width: "350px" }} />
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

export default KitGuess;