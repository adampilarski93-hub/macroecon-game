import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScenarioSelect } from './pages/ScenarioSelect';
import { Game } from './pages/Game';
import { SovereigntyPath } from './pages/SovereigntyPath';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScenarioSelect />} />
        <Route path="/game" element={<Game />} />
        <Route path="/sovereignty" element={<SovereigntyPath />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
