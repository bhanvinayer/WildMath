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
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-gray-900 to-primary-800 flex flex-col items-center justify-center p-4 md:p-8 lg:p-12">
      {/* Home button at the very top */}
      <div className="w-full flex justify-end p-4">
        <button
          className="btn-pixel bg-primary-700 hover:bg-primary-500 text-lg px-6 py-3 shadow-lg transition"
          onClick={() => navigate('/')}
        >
          Home
        </button>
      </div>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Brain className="h-16 w-16 text-primary-500 drop-shadow-lg" />
        </div>
        <h1 className="text-5xl md:text-7xl font-display text-white mb-2 tracking-widest drop-shadow-xl font-[Minecraft]">
          <span className="text-primary-400">Wild</span>
          <span className="text-white">Math</span>
        </h1>
        <p className="text-gray-200 text-base md:text-lg font-mono tracking-wide font-['Press Start 2P']">
          the numbers strike back
        </p>
      </div>
      <div className="game-container border-primary-500 w-full max-w-md p-10 bg-gradient-to-br from-primary-900 via-gray-900 to-primary-700 shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-display text-white mb-10 text-center tracking-wider drop-shadow-lg">
          Begin Your Adventure
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="playerName" className="block text-lg font-bold text-primary-200 mb-3">
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
              className="w-full p-4 bg-gray-800 text-white border-2 border-primary-700 rounded-xl focus:border-primary-500 focus:ring-0 font-mono text-xl shadow-inner"
              placeholder="Brave Adventurer..."
              maxLength={15}
            />
            {error && (
              <div className="w-full mt-2 p-3 rounded-xl bg-gradient-to-br from-red-700 via-red-500 to-primary-700 border-2 border-primary-400 text-white text-center font-bold shadow-lg font-['Press Start 2P'] animate-pulse-slow">
                {error}
              </div>
            )}
          </div>
          <button 
            type="submit"
            className="btn-pixel bg-primary-600 w-full text-center text-xl py-4 tracking-wider shadow-lg hover:bg-primary-500 transition"
          >
            Start Adventure
          </button>
        </form>
        <button
          type="button"
          className="btn-pixel bg-gray-700 hover:bg-primary-500 w-full text-center text-lg py-3 mt-6 tracking-wider shadow-lg transition"
          onClick={() => alert('Solve math problems to attack monsters. Level up by winning battles. Choose your character and location, and enjoy your math adventure!')}
        >
          How to Play
        </button>
        <div className="mt-10 text-primary-300 text-xs text-center font-mono animate-pulse-slow">
          <p>Solve math problems. Defeat monsters. Save the realm.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;