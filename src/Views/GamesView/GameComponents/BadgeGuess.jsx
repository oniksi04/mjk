import { useEffect, useState, useMemo } from "react";
import teams from "../../../data/teamsList";
import "../GameComponents/badgeguess.css"

const BadgeGuess = () => {
  const [currentTeam, setCurrentTeam] = useState(null);
  const [guess, setGuess] = useState("");
  const [hasPlayedToday, setHasPlayedToday] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const savedStatus = localStorage.getItem(`badgeGuess_${today}`);

    if (savedStatus) {
      setHasPlayedToday(false);
    }

    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const dailyIndex = seed % teams.length;
    setCurrentTeam(teams[dailyIndex]);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setGuess(value);

    if (value.length > 1) {
      const filtered = teams
        .filter(t => t.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5); // Limit to top 5 matches
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectTeam = (teamName) => {
    setGuess(teamName);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentTeam || hasPlayedToday) return;

    const today = new Date().toISOString().split('T')[0];
    const isCorrect = guess.toLowerCase() === currentTeam.name.toLowerCase();

    // Save result to block further attempts today
    localStorage.setItem(`badgeGuess_${today}`, isCorrect ? "won" : "lost");
    setHasPlayedToday(true);

    alert(isCorrect ? "🎯 Correct! See you tomorrow." : `❌ Wrong! It was ${currentTeam.name}`);
  };

  if (!currentTeam) return <div>Loading...</div>;

  return (
    <div className="game-container">
      <h1>BadgeGuessr</h1>

      {hasPlayedToday ? (
        <div className="lockout-screen">
          <h2>Come back tomorrow for a new badge!</h2>
        </div>
      ) : (
        <>
          <div className="badge-display">
             <img src={currentTeam.crest.blurred} alt="Badge" style={{ width: "200px" }} />
          </div>

          <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
            <input
              type="text"
              value={guess}
              onChange={handleInputChange}
              placeholder="Start typing a team..."
              autoComplete="off"
            />
            
            {/* Autocomplete Dropdown */}
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((t) => (
                  <li key={t.id} onClick={() => handleSelectTeam(t.name)}>
                    {t.name}
                  </li>
                ))}
              </ul>
            )}

            <button type="submit" disabled={!guess}>Submit Guess</button>
          </form>
        </>
      )}
    </div>
  );
};

export default BadgeGuess;