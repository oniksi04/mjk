import { useState, useMemo, useEffect } from "react";
import players from "../../../data/playersList";
import { getDailyIndex } from "../../../utils/DailyHelpers";
import { useDailyLockout } from "../../../hooks/useDailyLockout";
import LockoutScreen from "../../../Components/LockoutScreen";
import GameToast from "../../../Components/GameToast/GameToast";
import "./FootballHiLo.css";

const STAT_CATEGORIES = [
  { key: "careerGoals",     label: "career goals",      format: (v) => v.toLocaleString() },
  { key: "careerAssists",   label: "career assists",    format: (v) => v.toLocaleString() },
  { key: "peakMarketValue", label: "peak market value", format: (v) => `€${v.toLocaleString()}` },
  { key: "clubsCount",      label: "clubs played for",  format: (v) => v.toString() },
];

// ─── Seeded PRNG ─────────────────────────────────────────
const makeRand = (seed) => {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(1664525, s) + 1013904223 >>> 0;
    return s / 0x100000000;
  };
};

// ─── Session seed — different every session, same within a session ───
const getSessionSeed = () => {
  let sessionSeed = sessionStorage.getItem("hiloSeed");
  if (!sessionSeed) {
    sessionSeed = Math.floor(Math.random() * 999999).toString();
    sessionStorage.setItem("hiloSeed", sessionSeed);
  }
  return parseInt(sessionSeed);
};

// ─── Today's seed — date-based + session offset ──────────
const getTodaySeed = () => {
  const d = new Date();
  const dateSeed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  return (dateSeed + getSessionSeed()) >>> 0;
};

// ─── Build 11-player chain ────────────────────────────────
const buildChain = (statKey, seed) => {
  const rand = makeRand(seed);

  const startIndex = Math.floor(rand() * players.length);
  const chain = [players[startIndex]];
  const usedIds = new Set([players[startIndex].id]);

  for (let i = 0; i < 13; i++) {
    const current = chain[chain.length - 1];
    const currentVal = current[statKey];

    const candidates = players.filter(p => {
      if (usedIds.has(p.id)) return false;
      const diff = Math.abs(p[statKey] - currentVal);
      const pct = diff / Math.max(currentVal, p[statKey]);
      return pct >= 0.10 && pct <= 0.55;
    });

    if (candidates.length === 0) {
      const unused = players.filter(p => !usedIds.has(p.id));
      if (unused.length === 0) break;
      unused.sort((a, b) =>
        Math.abs(a[statKey] - currentVal) - Math.abs(b[statKey] - currentVal)
      );
      chain.push(unused[0]);
      usedIds.add(unused[0].id);
    } else {
      const pick = candidates[Math.floor(rand() * candidates.length)];
      chain.push(pick);
      usedIds.add(pick.id);
    }
  }

  const rounds = [];
  for (let i = 0; i < Math.min(13, chain.length - 1); i++) {
    rounds.push({ left: chain[i], right: chain[i + 1] });
  }

  let higherCount = rounds.filter(r => r.right[statKey] > r.left[statKey]).length;
  const swapRand = makeRand(seed + 99);
  const indices = rounds.map((_, i) => i).sort(() => swapRand() - 0.5);

  for (const idx of indices) {
    if (higherCount === 5) break;
    const r = rounds[idx];
    const isHigher = r.right[statKey] > r.left[statKey];
    if (higherCount > 5 && isHigher) {
      rounds[idx] = { left: r.right, right: r.left };
      higherCount--;
    } else if (higherCount < 5 && !isHigher) {
      rounds[idx] = { left: r.right, right: r.left };
      higherCount++;
    }
  }

  return rounds;
};

const PLACEHOLDER_PHOTO = "/assets/crests/edited/manutd1.png";
const TOTAL_ROUNDS = 10;
const MAX_LIVES = 3;

const FootballHiLo = () => {
  const { hasPlayed, result, lockGame } = useDailyLockout("footballHiLo");
  const [toast, setToast] = useState({ visible: false, type: null });
  const [correct, setCorrect] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [gameOver, setGameOver] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);

  const todaySeed = useMemo(() => getTodaySeed(), []);
  const categoryIndex = getDailyIndex(STAT_CATEGORIES.length);
  const category = STAT_CATEGORIES[categoryIndex];

  const rounds = useMemo(() => buildChain(category.key, todaySeed), [category.key, todaySeed]);

  const currentRound = rounds[roundIndex] ?? null;

  // Handle running out of rounds or winning
  useEffect(() => {
    if (!currentRound && !gameOver) {
      lockGame("won");
      setGameOver(true);
    }
  }, [currentRound, gameOver]);

  const showToast = (type) => setToast({ visible: true, type });
  const hideToast = () => setToast({ visible: false, type: null });

  const handleGuess = (guess) => {
    if (gameOver || hasPlayed || !currentRound) return;

    const { left, right } = currentRound;
    const leftVal = left[category.key];
    const rightVal = right[category.key];
    const isHigher = rightVal > leftVal;

    const isCorrect =
      (guess === "higher" && isHigher) ||
      (guess === "lower" && !isHigher);

    if (isCorrect) {
      const newCorrect = correct + 1;
      setCorrect(newCorrect);
      showToast("correct");
      if (newCorrect >= TOTAL_ROUNDS) {
        lockGame("won");
        setGameOver(true);
      } else {
        setRoundIndex(prev => prev + 1);
      }
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      showToast("wrong");
      if (newLives <= 0) {
        lockGame("lost");
        setGameOver(true);
      } else {
        setRoundIndex(prev => prev + 1);
      }
    }
  };

  // Show lockout once game is over and hasPlayed is confirmed
  if (hasPlayed) {
    return <LockoutScreen gameName="Football HiLo" result={result} />;
  }

  // Game just ended this session — show lockout with local result
  if (gameOver) {
    const localResult = correct >= TOTAL_ROUNDS ? "won" : "lost";
    return <LockoutScreen gameName="Football HiLo" result={localResult} />;
  }

  // Safety — no round available yet
  if (!currentRound) return null;

  const { left, right } = currentRound;
  const progressPercent = (correct / TOTAL_ROUNDS) * 100;

  return (
    <div className="hilo-page">

      <div className="hilo-header">
        <h1 className="hilo-title">FOOTBALL HILO</h1>
        <p className="hilo-category">{category.label}</p>
      </div>

      <div className="hilo-lives">
        {Array.from({ length: MAX_LIVES }).map((_, i) => (
          <span key={i} className={`hilo-life ${i < lives ? 'hilo-life--active' : 'hilo-life--lost'}`}>
            ♥
          </span>
        ))}
      </div>

      <div className="hilo-arena">

        <div className="hilo-card hilo-card--known">
          <img
            className="hilo-card__photo"
            src={left.photo || PLACEHOLDER_PHOTO}
            alt={left.name}
            onError={e => { e.target.src = PLACEHOLDER_PHOTO; }}
          />
          <div className="hilo-card__overlay">
            <h2 className="hilo-card__name">{left.name}</h2>
            <p className="hilo-card__stat-label">has</p>
            <p className="hilo-card__stat-value">{category.format(left[category.key])}</p>
            <p className="hilo-card__stat-label">{category.label}</p>
          </div>
        </div>

        <div className="hilo-vs"><span>VS</span></div>

        <div className="hilo-card hilo-card--unknown">
          <img
            className="hilo-card__photo"
            src={right.photo || PLACEHOLDER_PHOTO}
            alt={right.name}
            onError={e => { e.target.src = PLACEHOLDER_PHOTO; }}
          />
          <div className="hilo-card__overlay">
            <h2 className="hilo-card__name">{right.name}</h2>
            <p className="hilo-card__stat-label">has a</p>
            <div className="hilo-card__buttons">
              <button className="hilo-btn hilo-btn--higher" onClick={() => handleGuess("higher")} disabled={gameOver}>
                HIGHER ▲
              </button>
              <button className="hilo-btn hilo-btn--lower" onClick={() => handleGuess("lower")} disabled={gameOver}>
                LOWER ▼
              </button>
            </div>
            <p className="hilo-card__stat-label">{category.label} than {left.name.split(" ")[0]}</p>
          </div>
        </div>

      </div>

      <div className="hilo-progress">
        <div className="hilo-progress__track">
          <div className="hilo-progress__fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <span className="hilo-progress__count">{correct} / {TOTAL_ROUNDS}</span>
      </div>

      <GameToast type={toast.type} visible={toast.visible} onHide={hideToast} />
    </div>
  );
};

export default FootballHiLo;