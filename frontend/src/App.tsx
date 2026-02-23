import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScenarioSelect } from './pages/ScenarioSelect';
import { Game } from './pages/Game';
import { SovereigntyPath } from './pages/SovereigntyPath';
import { DecisionTreePage } from './pages/DecisionTreePage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScenarioSelect />} />
        <Route path="/game" element={<Game />} />
        <Route path="/sovereignty" element={<SovereigntyPath />} />
        <Route path="/narrative/:scenarioId" element={<DecisionTreePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
