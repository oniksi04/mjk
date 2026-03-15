import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Progress from './Components/ProgressView/Progress';
import Games from './Components/GamesView/Games';
import MaskedCursor from './Components/MaskedCursor/MaskedCursor';
import SocialLinks from './Components/SocialLinks/SocialLinks';
import MenuButton from './Components/Buttons/MenuButton';
import Shop from './Components/ShopView/Shop';

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
                topOffset="44px"
                hideCursor={() => setCursorVisible(false)}
                showCursor={() => setCursorVisible(true)}
              />

              <MenuButton
                label="Progress"
                destination="/progress"
                topOffset="190px"
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

      </Routes>
    </div>
  );
}

export default App;

{/*Stage All	git add .
Commit	git commit -m "message"
Upload	git push origin main */}