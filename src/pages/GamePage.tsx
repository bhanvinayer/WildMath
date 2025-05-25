import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { GameState } from '../types';
import { locations } from '../data/locations';
import PlayerStats from '../components/PlayerStats';
import { MapPin, Sword } from 'lucide-react';

const GamePage: React.FC = () => {
  const { 
    playerName, 
    characterClass, 
    playerStats, 
    currentLocation,
    setCurrentLocation,
    setGameState,
    generateNewProblem 
  } = useGame();
  
  const [activeLocation, setActiveLocation] = useState(
    locations.find(loc => loc.id === currentLocation.toLowerCase().replace(' ', '-')) || locations[0]
  );
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!playerName || !characterClass) {
      navigate('/');
    }
  }, [playerName, characterClass, navigate]);
  
  useEffect(() => {
    const location = locations.find(loc => 
      loc.id === currentLocation.toLowerCase().replace(' ', '-')
    );
    if (location) {
      setActiveLocation(location);
    }
  }, [currentLocation]);
  
  const handleStartBattle = () => {
    // Generate a problem for upcoming battle
    generateNewProblem(playerStats.level, activeLocation.mathType);
    
    setGameState(GameState.BATTLE);
    navigate('/battle');
  };
  
  const handleChangeLocation = (locationId: string) => {
    const newLocation = locations.find(loc => loc.id === locationId);
    if (newLocation) {
      setCurrentLocation(newLocation.name);
    }
  };

  if (!activeLocation) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-gray-900 to-primary-800 flex flex-col p-2">
      {/* Home button at the very top */}
      <div className="w-full flex justify-end p-2 pb-0">
        <button
          className="btn-pixel bg-primary-700 hover:bg-primary-500 text-lg px-6 py-3 shadow-lg transition"
          onClick={() => navigate('/')}
        >
          Home
        </button>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="flex justify-center mt-2">
          <h1 className="text-4xl md:text-6xl font-display text-white tracking-widest drop-shadow-xl font-[Minecraft]">
            <span className="text-primary-400">Wild</span>
            <span className="text-white">Math</span>
          </h1>
        </div>
        <p className="text-gray-200 text-base md:text-lg tracking-wide mb-2 font-['Press Start 2P'],font-mono">
          the numbers strike back
        </p>
      </div>
      <div className="bg-gray-900/80 p-4 shadow-2xl flex items-center justify-between">
        <div className="container mx-auto">
          <PlayerStats
            playerName={playerName}
            characterClass={characterClass!}
            level={playerStats.level}
            health={playerStats.health}
            maxHealth={playerStats.maxHealth}
            experience={playerStats.experience}
            nextLevelExp={playerStats.nextLevelExp}
          />
        </div>
      </div>
      {/* Main content */}
      <div className="flex-grow flex flex-col md:flex-row gap-6 p-4">
        {/* Left sidebar - Location selection */}
        <div className="w-full md:w-1/4 bg-gradient-to-br from-primary-900 via-gray-900 to-primary-700 rounded-2xl p-6 shadow-xl mb-6 md:mb-0">
          <h2 className="font-display text-2xl text-white mb-6 flex items-center drop-shadow-lg">
            <MapPin className="mr-2 h-6 w-6 text-primary-400 animate-bounce-slow" />
            Locations
          </h2>
          <div className="space-y-3">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => handleChangeLocation(location.id)}
                className={`w-full text-left p-4 rounded-xl font-bold transition-all duration-200 shadow-lg border-2 ${
                  activeLocation.id === location.id
                    ? 'bg-primary-700 text-white border-primary-400 scale-105 ring-2 ring-primary-300'
                    : 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-primary-800 hover:text-white hover:scale-102'
                }`}
              >
                <span className="font-display tracking-wide text-lg">{location.name}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Main area - Current location */}
        <div className="flex-grow flex flex-col justify-between p-0 md:p-6">
          <div 
            className="h-full rounded-2xl overflow-hidden relative shadow-2xl animate-float"
            style={{
              backgroundImage: `url(${activeLocation.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60 p-8 flex flex-col justify-between">
              <div className="bg-black bg-opacity-70 p-6 rounded-xl mb-auto shadow-lg">
                <h1 className="text-4xl font-display text-white mb-3 drop-shadow-xl">{activeLocation.name}</h1>
                <p className="text-primary-200 text-lg font-mono drop-shadow-lg animate-pulse-slow">{activeLocation.description}</p>
              </div>
              <div className="mt-auto flex justify-end">
                <button
                  onClick={handleStartBattle}
                  className="btn-pixel bg-red-600 hover:bg-red-500 flex items-center text-xl px-8 py-4 shadow-xl animate-bounce-slow"
                >
                  <Sword className="mr-3 h-7 w-7" />
                  Start Battle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;