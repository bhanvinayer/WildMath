import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { getRandomEnemy } from '../data/enemies';
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
    // Get a random enemy from current location
    const minLevel = Math.max(1, playerStats.level - 1);
    const maxLevel = playerStats.level + 2;
    
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
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Top bar with player stats */}
      <div className="bg-gray-800 p-4 shadow-md">
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
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Left sidebar - Location selection */}
        <div className="w-full md:w-1/4 bg-gray-800 p-4">
          <h2 className="font-display text-xl text-white mb-4 flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-primary-400" />
            Locations
          </h2>
          <div className="space-y-2">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => handleChangeLocation(location.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeLocation.id === location.id
                    ? 'bg-primary-700 text-white'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                <p className="font-medium">{location.name}</p>
              </button>
            ))}
          </div>
        </div>
        
        {/* Main area - Current location */}
        <div className="flex-grow p-4">
          <div 
            className="h-full rounded-xl overflow-hidden relative"
            style={{
              backgroundImage: `url(${activeLocation.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col">
              <div className="bg-black bg-opacity-70 p-4 rounded-lg mb-auto">
                <h1 className="text-3xl font-display text-white mb-2">{activeLocation.name}</h1>
                <p className="text-gray-300">{activeLocation.description}</p>
              </div>
              
              <div className="mt-auto">
                <button
                  onClick={handleStartBattle}
                  className="btn-pixel bg-red-600 hover:bg-red-500 flex items-center"
                >
                  <Sword className="mr-2 h-5 w-5" />
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