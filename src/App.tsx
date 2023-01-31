import './App.css';
import Shuttlecock from './components/Shuttlecock';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{margin: "20px", fontFamily: "'VT323', monospace", fontSize: "56px"}}>
            BADMINTON
        </div>
        <Shuttlecock />
        <div style={{margin: "20px", fontFamily: "'VT323', monospace", fontSize: "24px"}}>
            How to play: WASD to move, Use mouse position to aim crosshair, when birdie is close to you and low enough, left click to hit. Backspace to restart game.
        </div>
      </header>
    </div>
  );
}

export default App;
