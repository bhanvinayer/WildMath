import { Enemy, MathProblemType } from '../types';

// Enemies organized by location and difficulty level
export const enemies: Enemy[] = [
  // Fraction Forest Enemies
  {
    id: 'fraction-fox',
    name: 'Fraction Fox',
    health: 30,
    maxHealth: 30,
    attack: 5,
    defense: 3,
    image: 'https://images.pexels.com/photos/247399/pexels-photo-247399.jpeg?auto=compress&cs=tinysrgb&w=300',
    level: 1,
    problemType: MathProblemType.FRACTIONS,
  },
  {
    id: 'dividing-deer',
    name: 'Dividing Deer',
    health: 45,
    maxHealth: 45,
    attack: 7,
    defense: 4,
    image: 'https://images.pexels.com/photos/34231/antler-antler-carrier-fallow-deer-hirsch.jpg?auto=compress&cs=tinysrgb&w=300',
    level: 2,
    problemType: MathProblemType.FRACTIONS,
  },
  
  // Geometry Gorge Enemies
  {
    id: 'angle-anglerfish',
    name: 'Angle Anglerfish',
    health: 50,
    maxHealth: 50,
    attack: 12,
    defense: 8,
    image: 'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&cs=tinysrgb&w=300',
    level: 3,
    problemType: MathProblemType.GEOMETRY,
  },
  {
    id: 'polygon-panther',
    name: 'Polygon Panther',
    health: 70,
    maxHealth: 70,
    attack: 15,
    defense: 10,
    image: 'https://images.pexels.com/photos/46795/jaguar-carnivore-wild-animal-big-cat-46795.jpeg?auto=compress&cs=tinysrgb&w=300',
    level: 4,
    problemType: MathProblemType.GEOMETRY,
  },
  
  // Decimal Desert Enemies
  {
    id: 'decimal-dragon',
    name: 'Decimal Dragon',
    health: 100,
    maxHealth: 100,
    attack: 20,
    defense: 15,
    image: 'https://images.pexels.com/photos/133394/pexels-photo-133394.jpeg?auto=compress&cs=tinysrgb&w=300',
    level: 5,
    problemType: MathProblemType.DECIMALS,
  },
  {
    id: 'percentage-phoenix',
    name: 'Percentage Phoenix',
    health: 120,
    maxHealth: 120,
    attack: 22,
    defense: 18,
    image: 'https://images.pexels.com/photos/4254883/pexels-photo-4254883.jpeg?auto=compress&cs=tinysrgb&w=300',
    level: 6,
    problemType: MathProblemType.DECIMALS,
  },
  
  // Algebra Kingdom Enemies
  {
    id: 'equation-elemental',
    name: 'Equation Elemental',
    health: 150,
    maxHealth: 150,
    attack: 25,
    defense: 20,
    image: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=300',
    level: 7,
    problemType: MathProblemType.ALGEBRA,
  },
  {
    id: 'variable-vampire',
    name: 'Variable Vampire',
    health: 180,
    maxHealth: 180,
    attack: 30,
    defense: 25,
    image: 'https://images.pexels.com/photos/7767839/pexels-photo-7767839.jpeg?auto=compress&cs=tinysrgb&w=300',
    level: 8,
    problemType: MathProblemType.ALGEBRA,
  },
  
  // Final Boss
  {
    id: 'calculus-king',
    name: 'Calculus King',
    health: 300,
    maxHealth: 300,
    attack: 40,
    defense: 35,
    image: 'https://images.pexels.com/photos/2187606/pexels-photo-2187606.jpeg?auto=compress&cs=tinysrgb&w=300',
    level: 10,
    problemType: MathProblemType.ALGEBRA, // Mix of all types
  }
];

// Function to get enemy by ID
export const getEnemyById = (id: string): Enemy | undefined => {
  return enemies.find(enemy => enemy.id === id);
};

// Function to get random enemy by level range
export const getRandomEnemy = (minLevel: number, maxLevel: number): Enemy => {
  const eligibleEnemies = enemies.filter(
    enemy => enemy.level >= minLevel && enemy.level <= maxLevel
  );
  
  if (eligibleEnemies.length === 0) {
    return enemies[0]; // Fallback to first enemy if none match
  }
  
  const randomIndex = Math.floor(Math.random() * eligibleEnemies.length);
  return eligibleEnemies[randomIndex];
};