import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScenarioSelect } from './pages/ScenarioSelect';
import { Game } from './pages/Game';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScenarioSelect />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
