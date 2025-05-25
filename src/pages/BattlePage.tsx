import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { getRandomEnemy } from '../data/enemies';
import MathProblem from '../components/MathProblem';
import PlayerStats from '../components/PlayerStats';
import EnemyCard from '../components/EnemyCard';

const BattlePage: React.FC = () => {
  const {
    playerName,
    characterClass,
    playerStats,
    currentProblem,
    generateNewProblem,
    earnExperience,
    takeDamage,
    healPlayer,
  } = useGame();

  const navigate = useNavigate();

  // Get a random enemy based on player level
  const [enemy, setEnemy] = useState(() => getRandomEnemy(
    playerStats.level, // minLevel is player's current level
    playerStats.level // maxLevel is also player's current level for a tighter match
  ));
  
  const [battleMessage, setBattleMessage] = useState('A wild enemy appears!');
  const [enemyAttacking, setEnemyAttacking] = useState(false);
  const [showProblem, setShowProblem] = useState(false);
  const [battleEnd, setBattleEnd] = useState(false);

  useEffect(() => {
    if (!currentProblem) {
      // Generate a problem based on enemy type
      generateNewProblem(playerStats.level, enemy.problemType);
    }
  }, [enemy, playerStats.level, currentProblem, generateNewProblem]);

  useEffect(() => {
    // Check if player is dead
    if (playerStats.health <= 0) {
      setBattleMessage('You have been defeated!');
      setBattleEnd(true);
      setTimeout(() => {
        healPlayer(Math.floor(playerStats.maxHealth / 2)); // Resurrect with half health
        navigate('/game');
      }, 3000);
    }
    
    // Check if enemy is defeated
    if (enemy.health <= 0) {
      setBattleMessage(`You defeated the ${enemy.name}!`);
      setBattleEnd(true);
      
      // Award experience based on enemy level
      const expGained = enemy.level * 20;
      earnExperience(expGained);
      
      setTimeout(() => {
        navigate('/game');
      }, 2000);
    }
  }, [playerStats.health, enemy.health, navigate, earnExperience, healPlayer]);

  useEffect(() => {
    // When player level changes, update enemy to match new level
    setEnemy(getRandomEnemy(playerStats.level, playerStats.level));
  }, [playerStats.level]);

  const handlePlayerTurn = () => {
    setShowProblem(true);
    setBattleMessage('Solve the problem to attack!');
  };

  const handleProblemAnswer = (isCorrect: boolean) => {
    setShowProblem(false);
    
    if (isCorrect) {
      setBattleMessage('Correct! You attack the enemy!');
      
      // Calculate damage based on player level and character class bonus
      let damage = 10 + playerStats.level * 2;
      
      // Class-specific bonuses
      if (characterClass && enemy.problemType) {
        // Match character class strength with problem type for bonus
        const isStrengthMatch = 
          (characterClass === 'wizard' && enemy.problemType === 'algebra') ||
          (characterClass === 'archer' && enemy.problemType === 'fractions') ||
          (characterClass === 'knight' && enemy.problemType === 'geometry');
        
        if (isStrengthMatch) {
          damage = Math.floor(damage * 1.5);
          setBattleMessage(`Correct! Critical hit for ${damage} damage!`);
        } else {
          setBattleMessage(`Correct! You deal ${damage} damage!`);
        }
      }
      
      // Update enemy health
      const newHealth = Math.max(0, enemy.health - damage);
      setEnemy({
        ...enemy,
        health: newHealth
      });
      
      setTimeout(() => {
        if (newHealth > 0) {
          // Enemy's turn
          setBattleMessage(`${enemy.name} is preparing to attack!`);
          setTimeout(enemyTurn, 1500);
        }
      }, 1000);
    } else {
      setBattleMessage('Incorrect! The enemy attacks!');
      setTimeout(enemyTurn, 1500);
    }
  };

  const enemyTurn = () => {
    setEnemyAttacking(true);
    
    // Calculate enemy damage based on enemy level and attack power
    const damage = Math.max(5, enemy.attack - Math.floor(playerStats.level / 2));
    
    setBattleMessage(`${enemy.name} attacks for ${damage} damage!`);
    takeDamage(damage);
    
    setTimeout(() => {
      setEnemyAttacking(false);
      
      // Generate new problem for next turn
      generateNewProblem(playerStats.level, enemy.problemType);
      
      if (playerStats.health - damage > 0) {
        setBattleMessage('Your turn! Prepare to defend!');
      }
    }, 1000);
  };

  const handleEscape = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-gray-900 to-primary-800 flex flex-col p-4 md:p-8 lg:p-12">
      {/* Home button and game branding in the same row */}
      <div className="w-full flex flex-row items-center justify-between p-4 pb-0">
        <div className="flex flex-col items-start">
          <h1 className="text-4xl md:text-6xl font-display text-white tracking-widest drop-shadow-xl font-[Minecraft] leading-none">
            <span className="text-primary-400">Wild</span>
            <span className="text-white">Math</span>
          </h1>
          <p className="text-gray-200 text-base md:text-lg tracking-wide font-['Press Start 2P'],font-mono leading-tight">
            the numbers strike back
          </p>
        </div>
        <button
          className="btn-pixel bg-primary-700 hover:bg-primary-500 text-lg px-6 py-3 shadow-lg transition ml-4"
          onClick={() => navigate('/')}
        >
          Home
        </button>
      </div>
      <div className="p-4 bg-gray-900/80 shadow-2xl flex items-center justify-between">
        <h2 className="text-3xl font-display text-white text-center tracking-widest drop-shadow-xl">Battle Arena</h2>
      </div>
      <div className="flex-grow flex flex-col md:flex-row p-6 gap-8">
        {/* Left side - Player info and Enemy info */}
        <div className="w-full md:w-1/4 flex flex-col gap-8">
          <PlayerStats
            playerName={playerName}
            characterClass={characterClass!}
            level={playerStats.level}
            health={playerStats.health}
            maxHealth={playerStats.maxHealth}
            experience={playerStats.experience}
            nextLevelExp={playerStats.nextLevelExp}
            isDefending={enemyAttacking}
          />
          <EnemyCard enemy={enemy} isAttacking={enemyAttacking} />
        </div>
        {/* Center - Battle arena */}
        <div className="flex-grow flex flex-col items-center justify-center">
          {/* Battle message */}
          <div className="bg-gradient-to-br from-primary-900 via-gray-900 to-primary-700 p-6 rounded-2xl mb-8 text-center w-full max-w-2xl shadow-xl border-2 border-primary-700">
            {battleEnd && enemy.health <= 0 ? (
              <p className="text-green-400 font-display text-5xl md:text-7xl tracking-widest drop-shadow-2xl animate-pop font-bold">
                Victory!
              </p>
            ) : (
              <p className="text-white font-display text-2xl tracking-wide drop-shadow-lg animate-pulse-slow">{battleMessage}</p>
            )}
          </div>
          {/* Battle controls */}
          {!showProblem && !battleEnd && (
            <div className="mt-8 flex flex-col sm:flex-row gap-6">
              <button
                onClick={handlePlayerTurn}
                className="btn-pixel bg-red-600 hover:bg-red-500 text-xl px-8 py-4 shadow-xl animate-bounce-slow"
              >
                Attack
              </button>
              <button
                onClick={handleEscape}
                className="btn-pixel bg-gray-700 hover:bg-gray-600 text-xl px-8 py-4 shadow-xl"
              >
                Escape
              </button>
            </div>
          )}
          {/* Math problem */}
          {showProblem && currentProblem && (
            <div className="mt-8 w-full max-w-lg">
              <MathProblem 
                problem={currentProblem} 
                onAnswer={handleProblemAnswer}
                showHint={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BattlePage;