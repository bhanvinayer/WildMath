// Math adventure locations for the game
import { GameLocation, MathProblemType } from '../types';
import { enemies } from './enemies';

export const locations: GameLocation[] = [
  {
    id: 'fraction-forest',
    name: 'Fraction Forest',
    description:
      'A mystical forest where all creatures speak in fractions and parts. Master fractions to progress!',
    backgroundImage:
      'https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    enemies: enemies.filter(
      (e) => e.id === 'fraction-fox' || e.id === 'dividing-deer'
    ),
    mathType: MathProblemType.FRACTIONS,
  },
  {
    id: 'geometry-gorge',
    name: 'Geometry Gorge',
    description:
      'A deep canyon with rock formations in perfect geometric shapes. Learn angles and shapes to cross safely.',
    backgroundImage:
      'https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    enemies: enemies.filter(
      (e) => e.id === 'angle-anglerfish' || e.id === 'polygon-panther'
    ),
    mathType: MathProblemType.GEOMETRY,
  },
  {
    id: 'decimal-desert',
    name: 'Decimal Desert',
    description:
      'A vast desert where mirages appear as decimal numbers. Navigate through by mastering decimals and percentages.',
    backgroundImage:
      'https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    enemies: enemies.filter(
      (e) => e.id === 'decimal-dragon' || e.id === 'percentage-phoenix'
    ),
    mathType: MathProblemType.DECIMALS,
  },
  {
    id: 'algebra-kingdom',
    name: 'Algebra Kingdom',
    description:
      'The grand kingdom where equations rule everything. Solve algebraic problems to claim the throne.',
    backgroundImage:
      'https://images.pexels.com/photos/461940/pexels-photo-461940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    enemies: enemies.filter(
      (e) =>
        e.id === 'equation-elemental' ||
        e.id === 'variable-vampire' ||
        e.id === 'calculus-king'
    ),
    mathType: MathProblemType.ALGEBRA,
  },
];

// Get a location by its unique ID
export const getLocationById = (id: string): GameLocation | undefined => {
  return locations.find((location) => location.id === id);
};