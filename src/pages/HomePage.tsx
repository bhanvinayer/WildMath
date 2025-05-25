import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { Brain } from 'lucide-react';
import { GameState } from '../types';

const HomePage: React.FC = () => {
  const { setPlayerName, setGameState } = useGame();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    setPlayerName(name);
    setGameState(GameState.CHARACTER_SELECT);
    navigate('/character-select');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8 animate-float">
        <div className="flex justify-center mb-4">
          <Brain className="h-16 w-16 text-primary-500" />
        </div>
        <h1 className="text-4xl md:text-6xl font-display text-white mb-2">
          <span className="text-primary-400">Math</span>
          <span className="text-white">Quest</span>
        </h1>
        <p className="text-gray-300 text-sm md:text-base">
          A Role-Playing Math Adventure
        </p>
      </div>
      
      <div className="game-container border-primary-500 w-full max-w-md p-6">
        <h2 className="text-xl font-display text-white mb-6 text-center">
          Begin Your Adventure
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-300 mb-2">
              Enter Your Name:
            </label>
            <input
              type="text"
              id="playerName"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              className="w-full p-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:border-primary-500 focus:ring-0"
              placeholder="Brave Adventurer..."
              maxLength={15}
            />
            {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
          </div>
          
          <button 
            type="submit"
            className="btn-pixel bg-primary-600 w-full text-center"
          >
            Start Adventure
          </button>
        </form>
        
        <div className="mt-8 text-gray-400 text-xs text-center">
          <p>Solve math problems. Defeat monsters. Save the realm.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;