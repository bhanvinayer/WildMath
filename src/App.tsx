import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CharacterSelectPage from './pages/CharacterSelectPage';
import GamePage from './pages/GamePage';
import BattlePage from './pages/BattlePage';
import { GameProvider } from './contexts/GameContext';

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character-select" element={<CharacterSelectPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/battle" element={<BattlePage />} />
        </Routes>
      </div>
    </GameProvider>
  );
}

export default App;