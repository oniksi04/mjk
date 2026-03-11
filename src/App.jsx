import './App.css';
import MaskedCursor from './Components/MaskedCursor/MaskedCursor';
import SocialLinks from './Components/SocialLinks/SocialLinks';
import MenuButton from './Components/Buttons/MenuButton';


function App() {
  return <div className="App">
    <div className="app-container">
      {/* Button 1: Games */}
      <MenuButton 
        label="Games" 
        destination="/games" 
        topOffset="50px" 
      />

      {/* Button 2: Progress */}
      <MenuButton 
        label="Progress" 
        destination="/progress" 
        topOffset="180px"  /* Offset so they don't overlap */
      />

      <MaskedCursor />
      <SocialLinks />
    </div>
  </div>
}

export default App;

/* Stage All- git add .
Commit-	git commit -m "message"
Upload-	git push origin main */