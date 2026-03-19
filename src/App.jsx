import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Progress from './Views/ProgressView/Progress';
import Games from './Views/GamesView/Games';
import MaskedCursor from './Components/MaskedCursor/MaskedCursor';
import SocialLinks from './Components/SocialLinks';
import MenuButton from './Components/Buttons/MenuButton';
import Shop from './Views/ShopView/Shop';
import BadgeGuess from './Views/GamesView/GameComponents/BadgeGuess';

function App() {
  const [cursorVisible, setCursorVisible] = useState(true);

  return (
    <div className="App">
      <Routes>

        <Route
          path="/"
          element={
            <div className="app-container">
              <MenuButton
                label="Games"
                destination="/games"
                topOffset="7.8vh"
                hideCursor={() => setCursorVisible(false)}
                showCursor={() => setCursorVisible(true)}
              />

              <MenuButton
                label="Progress"
                destination="/progress"
                topOffset="32vh"
                hideCursor={() => setCursorVisible(false)}
                showCursor={() => setCursorVisible(true)}
              />

              <MaskedCursor />
              <SocialLinks />           
              </div>
          }
        />

        <Route path="/games" element={<Games />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/games/badge-guess" element={<BadgeGuess />} />

      </Routes>
    </div>
  );
}

export default App;

{/*Stage All	git add .
Commit	git commit -m "message"
Upload	git push origin main */}