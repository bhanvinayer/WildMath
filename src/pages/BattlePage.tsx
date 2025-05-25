import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { getRandomEnemy } from '../data/enemies';
import MathProblem from '../components/MathProblem';
import PlayerStats from '../components/PlayerStats';
import EnemyCard from '../components/EnemyCard';
import { GameState } from '../types';

const BattlePage: React.FC = () => {
  const {
    playerName,
    characterClass,
    playerStats,
    currentLocation,
    currentProblem,
    generateNewProblem,
    checkAnswer,
    gameState,
    setGameState,
    earnExperience,
    takeDamage,
    healPlayer,
    addToInventory,
  } = useGame();

  const navigate = useNavigate();

  // Get a random enemy based on player level
  const [enemy, setEnemy] = useState(getRandomEnemy(
    Math.max(1, playerStats.level - 1),
    playerStats.level + 1
  ));
  
  const [battleMessage, setBattleMessage] = useState('A wild enemy appears!');
  const [playerAttacking, setPlayerAttacking] = useState(false);
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
      
      // Show victory message with rewards
      setTimeout(() => {
        setBattleMessage(`Victory! You gained ${expGained} experience!`);
        setTimeout(() => {
          navigate('/game');
        }, 2000);
      }, 1000);
    }
  }, [playerStats.health, enemy.health, navigate, earnExperience, healPlayer]);

  const handlePlayerTurn = () => {
    setShowProblem(true);
    setBattleMessage('Solve the problem to attack!');
  };

  const handleProblemAnswer = (isCorrect: boolean) => {
    setShowProblem(false);
    
    if (isCorrect) {
      setBattleMessage('Correct! You attack the enemy!');
      setPlayerAttacking(true);
      
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
        setPlayerAttacking(false);
        
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
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="p-4 bg-gray-800">
        <h2 className="text-xl font-display text-white text-center">Battle!</h2>
      </div>
      
      <div className="flex-grow flex flex-col md:flex-row p-4 gap-6">
        {/* Left side - Player info */}
        <div className="w-full md:w-1/4">
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
        </div>
        
        {/* Center - Battle arena */}
        <div className="flex-grow flex flex-col items-center justify-center">
          {/* Battle message */}
          <div className="bg-gray-800 p-4 rounded-lg mb-6 text-center w-full">
            <p className="text-white font-medium">{battleMessage}</p>
          </div>
          
          {/* Enemy display */}
          <div className="w-full max-w-xs">
            <EnemyCard enemy={enemy} isAttacking={enemyAttacking} />
          </div>
          
          {/* Battle controls */}
          {!showProblem && !battleEnd && (
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handlePlayerTurn}
                className="btn-pixel bg-red-600 hover:bg-red-500"
              >
                Attack
              </button>
              <button
                onClick={handleEscape}
                className="btn-pixel bg-gray-700 hover:bg-gray-600"
              >
                Escape
              </button>
            </div>
          )}
          
          {/* Math problem */}
          {showProblem && currentProblem && (
            <div className="mt-6 w-full max-w-lg">
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