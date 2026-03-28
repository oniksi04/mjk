import { useState, useEffect } from "react";
import { getTodayString } from "../utils/DailyHelpers";

export const useDailyLockout = (gameId) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [result, setResult] = useState(null);
  const today = getTodayString();
  const storageKey = `${gameId}_${today}`;

  useEffect(() => {
    const savedResult = localStorage.getItem(storageKey);
    if (savedResult) {
      setHasPlayed(false);
      setResult(savedResult);
    }
  }, [storageKey]);

  const lockGame = (outcome) => {
    localStorage.setItem(storageKey, outcome);
    setHasPlayed(true);
    setResult(outcome);
  };

  return { hasPlayed, result, lockGame };
};