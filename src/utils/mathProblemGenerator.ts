import { MathProblemType, Problem } from '../types';

// Generate a random integer between min and max (inclusive)
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a fraction problem
const generateFractionProblem = (difficulty: number): Problem => {
  const problems = [
    // Difficulty 1: Simple fraction addition/subtraction with like denominators
    () => {
      const denominator = getRandomInt(2, 10);
      let a = getRandomInt(1, denominator - 1);
      let b = getRandomInt(1, denominator - 1);
      const operation = Math.random() > 0.5 ? '+' : '-';
      
      let answer, question;
      
      if (operation === '+') {
        answer = (a + b) / denominator;
        question = `${a}/${denominator} + ${b}/${denominator} = ?`;
      } else {
        // Ensure a > b to avoid negative fractions for beginners
        if (a < b) {
          const temp = a;
          a = b;
          b = temp;
        }
        answer = (a - b) / denominator;
        question = `${a}/${denominator} - ${b}/${denominator} = ?`;
      }
      
      // Format answer as a simplified fraction
      const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
      const numerator = a + (operation === '+' ? b : -b);
      const g = gcd(Math.abs(numerator), denominator);

      answer = numerator === 0 ? "0" : 
               g === denominator ? `${numerator/g}` : 
               `${numerator/g}/${denominator/g}`;

      // Generate unique options
      const optionsSet = new Set<string>();
      optionsSet.add(answer.toString());
      // Unsimplified
      optionsSet.add(`${numerator}/${denominator}`);
      // Inverted (avoid if numerator==0)
      if (numerator !== 0) optionsSet.add(`${denominator}/${numerator}`);
      // Close but wrong
      optionsSet.add(`${numerator + 1}/${denominator}`);
      const options = Array.from(optionsSet).slice(0, 4);

      return {
        question,
        answer,
        options: shuffleArray(options),
        hint: "Remember, when adding or subtracting fractions with the same denominator, you only add or subtract the numerators."
      };
    },
    
    // Difficulty 2: Comparing fractions
    () => {
      const denominator1 = getRandomInt(2, 12);
      const denominator2 = getRandomInt(2, 12);
      const numerator1 = getRandomInt(1, denominator1);
      const numerator2 = getRandomInt(1, denominator2);
      
      const fraction1 = numerator1 / denominator1;
      const fraction2 = numerator2 / denominator2;
      
      let answer, question;
      
      question = `Which fraction is larger: ${numerator1}/${denominator1} or ${numerator2}/${denominator2}?`;
      answer = fraction1 > fraction2 ? `${numerator1}/${denominator1}` : `${numerator2}/${denominator2}`;
      
      return {
        question,
        answer,
        options: shuffleArray([
          `${numerator1}/${denominator1}`,
          `${numerator2}/${denominator2}`,
          'They are equal',
          'Cannot be determined'
        ]),
        hint: "Convert the fractions to decimals or find a common denominator to compare them easily."
      };
    },
    
    // Difficulty 3: Mixed operations with fractions
    () => {
      const denominator1 = getRandomInt(2, 8);
      const denominator2 = getRandomInt(2, 8);
      const numerator1 = getRandomInt(1, denominator1 * 2);
      const numerator2 = getRandomInt(1, denominator2);
      
      const operations = ['+', '-', '×', '÷'];
      const operation = operations[getRandomInt(0, 3)];
      
      let answer, question;
      question = `${numerator1}/${denominator1} ${operation} ${numerator2}/${denominator2} = ?`;
      
      const fraction1 = numerator1 / denominator1;
      const fraction2 = numerator2 / denominator2;
      
      let resultFraction;
      switch (operation) {
        case '+':
          resultFraction = fraction1 + fraction2;
          break;
        case '-':
          resultFraction = fraction1 - fraction2;
          break;
        case '×':
          resultFraction = fraction1 * fraction2;
          break;
        case '÷':
          resultFraction = fraction1 / fraction2;
          break;
        default:
          resultFraction = 0;
      }
      
      // Format as a decimal to 2 places for simplicity at higher difficulties
      answer = resultFraction.toFixed(2);
      
      return {
        question,
        answer,
        options: shuffleArray([
          answer,
          (resultFraction + 0.1).toFixed(2),
          (resultFraction - 0.1).toFixed(2),
          (resultFraction * 2).toFixed(2)
        ]),
        hint: "For multiplication, multiply the numerators and the denominators. For division, multiply by the reciprocal."
      };
    }
  ];
  
  // Select problem based on difficulty (1-3)
  const clampedDifficulty = Math.max(1, Math.min(3, Math.floor(difficulty)));
  return {
    ...problems[clampedDifficulty - 1](),
    difficulty,
    type: MathProblemType.FRACTIONS
  };
};

// Generate an algebra problem
const generateAlgebraProblem = (difficulty: number): Problem => {
  const problems = [
    // Difficulty 1: Simple one-step equations
    () => {
      const x = getRandomInt(1, 10);
      const b = getRandomInt(1, 20);
      const question = `Solve for x: x + ${b} = ${x + b}`;
      const answer = x;
      
      return {
        question,
        answer,
        options: shuffleArray([
          x.toString(),
          (x + 1).toString(),
          (x - 1).toString(),
          (b).toString()
        ]),
        hint: "Subtract the same value from both sides of the equation."
      };
    },
    
    // Difficulty 2: Two-step equations
    () => {
      const x = getRandomInt(1, 10);
      const a = getRandomInt(2, 5);
      const b = getRandomInt(1, 20);
      const question = `Solve for x: ${a}x + ${b} = ${a * x + b}`;
      const answer = x;
      
      return {
        question,
        answer,
        options: shuffleArray([
          x.toString(),
          (x + 1).toString(),
          Math.floor(x / a).toString(),
          (x * a).toString()
        ]),
        hint: "First, subtract the constant term from both sides, then divide by the coefficient of x."
      };
    },
    
    // Difficulty 3: More complex equation solving
    () => {
      const x = getRandomInt(1, 10);
      const a = getRandomInt(2, 5);
      const b = getRandomInt(1, 10);
      const c = getRandomInt(5, 30);
      const question = `Solve for x: ${a}x - ${b} = ${a * x - b}`;
      const answer = x;
      
      return {
        question,
        answer,
        options: shuffleArray([
          x.toString(),
          (x + 2).toString(),
          (x - 2).toString(),
          Math.floor(c / a).toString()
        ]),
        hint: "Isolate the variable term on one side, then solve for x."
      };
    }
  ];
  
  // Select problem based on difficulty (1-3)
  const clampedDifficulty = Math.max(1, Math.min(3, Math.floor(difficulty)));
  return {
    ...problems[clampedDifficulty - 1](),
    difficulty,
    type: MathProblemType.ALGEBRA
  };
};

// Generate a geometry problem
const generateGeometryProblem = (difficulty: number): Problem => {
  const problems = [
    // Difficulty 1: Basic perimeter/area
    () => {
      const length = getRandomInt(3, 10);
      const width = getRandomInt(3, 10);
      const isArea = Math.random() > 0.5;
      
      let question, answer;
      
      if (isArea) {
        question = `What is the area of a rectangle with length ${length} and width ${width}?`;
        answer = length * width;
      } else {
        question = `What is the perimeter of a rectangle with length ${length} and width ${width}?`;
        answer = 2 * (length + width);
      }
      
      return {
        question,
        answer,
        options: shuffleArray([
          answer.toString(),
          (isArea ? length + width : length * width).toString(), // Common mistake
          (answer + 2).toString(),
          (answer - 2).toString()
        ]),
        hint: isArea ? "Area = length × width" : "Perimeter = 2 × (length + width)"
      };
    },
    
    // Difficulty 2: Angles in shapes
    () => {
      const shapes = [
        { name: "triangle", angles: 180 },
        { name: "quadrilateral", angles: 360 },
        { name: "pentagon", angles: 540 },
        { name: "hexagon", angles: 720 }
      ];
      
      const selectedShape = shapes[getRandomInt(0, shapes.length - 1)];
      const knownAnglesCount = selectedShape.name === "triangle" ? 2 : 3;
      let knownAngles: number[] = [];
      let totalKnownAngles = 0;
      
      // Generate known angles
      for (let i = 0; i < knownAnglesCount; i++) {
        let angle: number;
        if (i === knownAnglesCount - 1) {
          // Make sure the last known angle doesn't make the total too close to sum
          const maxPossible = selectedShape.angles - totalKnownAngles - 10;
          angle = getRandomInt(10, maxPossible);
        } else {
          angle = getRandomInt(30, 120);
        }
        knownAngles.push(angle);
        totalKnownAngles += angle;
      }
      
      const missingAngle = selectedShape.angles - totalKnownAngles;
      const anglesText = knownAngles.join("°, ") + "°";
      
      const question = `In a ${selectedShape.name} with interior angles ${anglesText}, what is the measure of the missing angle?`;
      const answer = missingAngle;
      
      return {
        question,
        answer,
        options: shuffleArray([
          answer.toString(),
          (answer + 10).toString(),
          (answer - 10).toString(),
          "180°" // Common misconception
        ]),
        hint: `The sum of interior angles in a ${selectedShape.name} is ${selectedShape.angles}°.`
      };
    },
    
    // Difficulty 3: Pythagorean theorem and more complex geometry
    () => {
      const problemType = getRandomInt(1, 2);
      
      // Pythagorean theorem
      if (problemType === 1) {
        // Use Pythagorean triples for nice numbers
        const triples = [
          [3, 4, 5],
          [5, 12, 13],
          [8, 15, 17]
        ];
        
        const triple = triples[getRandomInt(0, triples.length - 1)];
        const missingIndex = getRandomInt(0, 2);
        
        let question, answer;
        
        if (missingIndex === 2) {
          // Find hypotenuse
          question = `In a right triangle, if the legs are ${triple[0]} and ${triple[1]}, what is the length of the hypotenuse?`;
          answer = triple[2];
        } else {
          // Find a leg
          question = `In a right triangle, if one leg is ${triple[1 - missingIndex]} and the hypotenuse is ${triple[2]}, what is the length of the other leg?`;
          answer = triple[missingIndex];
        }
        
        return {
          question,
          answer,
          options: shuffleArray([
            answer.toString(),
            (answer + 1).toString(),
            (answer - 1).toString(),
            (triple[0] + triple[1]).toString() // Common mistake
          ]),
          hint: "Use the Pythagorean theorem: a² + b² = c² where c is the hypotenuse."
        };
      } 
      // Area of circle
      else {
        const radius = getRandomInt(2, 10);
        const question = `What is the area of a circle with radius ${radius}? (Use π = 3.14)`;
        const answer = (Math.PI * radius * radius).toFixed(2);
        
        return {
          question,
          answer,
          options: shuffleArray([
            answer.toString(),
            (2 * Math.PI * radius).toFixed(2), // Circumference, common mistake
            (Math.PI * radius).toFixed(2), // Another common mistake
            (Math.PI * radius * radius * 2).toFixed(2) // Just wrong
          ]),
          hint: "The area of a circle is π × r²."
        };
      }
    }
  ];
  
  // Select problem based on difficulty (1-3)
  const clampedDifficulty = Math.max(1, Math.min(3, Math.floor(difficulty)));
  return {
    ...problems[clampedDifficulty - 1](),
    difficulty,
    type: MathProblemType.GEOMETRY
  };
};

// Generate a decimal problem
const generateDecimalProblem = (difficulty: number): Problem => {
  const problems = [
    // Difficulty 1: Simple decimal operations
    () => {
      let a = getRandomInt(1, 20) / 10; // e.g., 0.1 to 2.0
      let b = getRandomInt(1, 20) / 10;
      const operation = Math.random() > 0.5 ? '+' : '-';
      
      let answer, question;
      
      if (operation === '+') {
        answer = a + b;
        question = `${a.toFixed(1)} + ${b.toFixed(1)} = ?`;
      } else {
        // Ensure a > b to avoid negative numbers for beginners
        if (a < b) {
          const temp = a;
          a = b;
          b = temp;
        }
        answer = a - b;
        question = `${a.toFixed(1)} - ${b.toFixed(1)} = ?`;
      }
      
      return {
        question,
        answer: answer.toFixed(1),
        options: shuffleArray([
          answer.toFixed(1),
          (answer + 0.1).toFixed(1),
          (answer - 0.1).toFixed(1),
          (answer * 10).toFixed(1) // Common decimal place error
        ]),
        hint: "Line up the decimal points when adding or subtracting decimals."
      };
    },
    
    // Difficulty 2: Multiplication and division with decimals
    () => {
      const a = getRandomInt(1, 20) / 10;
      const b = getRandomInt(1, 20) / 10;
      const operation = Math.random() > 0.5 ? '×' : '÷';
      
      let answer, question;
      
      if (operation === '×') {
        answer = a * b;
        question = `${a.toFixed(1)} × ${b.toFixed(1)} = ?`;
      } else {
        // Ensure clean division
        answer = a / b;
        question = `${a.toFixed(1)} ÷ ${b.toFixed(1)} = ?`;
      }
      
      return {
        question,
        answer: answer.toFixed(2),
        options: shuffleArray([
          answer.toFixed(2),
          (answer + 0.1).toFixed(2),
          (answer - 0.1).toFixed(2),
          (a + b).toFixed(2) // Common operation confusion
        ]),
        hint: operation === '×' ? 
          "When multiplying decimals, multiply as if they're whole numbers, then place the decimal point based on the total number of decimal places." :
          "When dividing decimals, first convert the divisor to a whole number by multiplying both numbers by the same power of 10."
      };
    },
    
    // Difficulty 3: Percentages
    () => {
      const problemType = getRandomInt(1, 3);
      
      // Find percentage of a number
      if (problemType === 1) {
        const whole = getRandomInt(20, 200);
        const percentage = getRandomInt(1, 10) * 10; // 10%, 20%, etc.
        
        const answer = (whole * percentage / 100);
        const question = `What is ${percentage}% of ${whole}?`;
        
        return {
          question,
          answer: answer.toString(),
          options: shuffleArray([
            answer.toString(),
            (whole / percentage).toString(),
            (percentage / 100).toString(),
            (whole + percentage).toString()
          ]),
          hint: "To find the percentage of a number, multiply the number by the percentage and divide by 100."
        };
      } 
      // Find what percent one number is of another
      else if (problemType === 2) {
        const percentage = getRandomInt(1, 10) * 10; // 10%, 20%, etc.
        const whole = getRandomInt(50, 200);
        const part = whole * percentage / 100;
        
        const question = `${part} is what percent of ${whole}?`;
        const answer = percentage;
        
        return {
          question,
          answer: answer + '%',
          options: shuffleArray([
            answer + '%',
            (answer + 10) + '%',
            (answer - 10) + '%',
            (whole / part) + '%'
          ]),
          hint: "To find what percent A is of B, divide A by B and multiply by 100."
        };
      }
      // Find the original number given a percentage
      else {
        const percentage = getRandomInt(2, 10) * 10; // 20%, 30%, etc.
        const part = getRandomInt(10, 50);
        const whole = part * 100 / percentage;
        
        const question = `If ${part} is ${percentage}% of a number, what is the number?`;
        const answer = whole;
        
        return {
          question,
          answer: answer.toString(),
          options: shuffleArray([
            answer.toString(),
            (part * percentage).toString(),
            (part / percentage * 100).toString(),
            (part + percentage).toString()
          ]),
          hint: "If part is P% of whole, then whole = part × (100 ÷ P)"
        };
      }
    }
  ];
  
  // Select problem based on difficulty (1-3)
  const clampedDifficulty = Math.max(1, Math.min(3, Math.floor(difficulty)));
  return {
    ...problems[clampedDifficulty - 1](),
    difficulty,
    type: MathProblemType.DECIMALS
  };
};

// Helper function to shuffle array
const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Main function to generate a problem based on type and difficulty
export const generateProblem = (difficulty: number, type: string): Problem => {
  switch (type) {
    case MathProblemType.FRACTIONS:
      return generateFractionProblem(difficulty);
    case MathProblemType.ALGEBRA:
      return generateAlgebraProblem(difficulty);
    case MathProblemType.GEOMETRY:
      return generateGeometryProblem(difficulty);
    case MathProblemType.DECIMALS:
      return generateDecimalProblem(difficulty);
    default:
      // Default to algebra if type not recognized
      return generateAlgebraProblem(difficulty);
  }
};