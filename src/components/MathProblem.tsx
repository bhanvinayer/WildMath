import React, { useState } from 'react';
import { Problem } from '../types';

interface MathProblemProps {
  problem: Problem;
  onAnswer: (isCorrect: boolean) => void;
  showHint?: boolean;
}

const MathProblem: React.FC<MathProblemProps> = ({
  problem,
  onAnswer,
  showHint = false,
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showingHint, setShowingHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const answer = problem.options ? selectedOption : userAnswer;
    const isCorrect = answer === problem.answer.toString();
    
    onAnswer(isCorrect);
  };

  const toggleHint = () => {
    setShowingHint(!showingHint);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-xl w-full max-w-md mx-auto">
      <h3 className="text-xl font-display text-white mb-4">Problem</h3>
      
      <div className="bg-gray-700 p-4 rounded-lg mb-6">
        <p className="math-text text-white">{problem.question}</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {problem.options ? (
          <div className="space-y-3 mb-6">
            {problem.options.map((option, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedOption === option
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                onClick={() => setSelectedOption(option)}
              >
                <p className="math-text">{option}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-6">
            <label htmlFor="answer" className="block text-sm font-medium text-gray-300 mb-2">
              Your Answer:
            </label>
            <input
              type="text"
              id="answer"
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary-500 math-text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer..."
            />
          </div>
        )}
        
        <div className="flex justify-between items-center">
          {showHint && problem.hint && (
            <button
              type="button"
              onClick={toggleHint}
              className="text-primary-300 hover:text-primary-200 text-sm"
            >
              {showingHint ? 'Hide Hint' : 'Show Hint'}
            </button>
          )}
          
          <button
            type="submit"
            disabled={problem.options ? !selectedOption : !userAnswer}
            className={`btn-pixel bg-primary-600 hover:bg-primary-500 px-6 py-2 ml-auto ${
              (problem.options ? !selectedOption : !userAnswer)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            Submit Answer
          </button>
        </div>
      </form>
      
      {showingHint && problem.hint && (
        <div className="mt-4 p-3 bg-gray-900 rounded-lg border border-primary-500">
          <p className="text-primary-300 text-sm">{problem.hint}</p>
        </div>
      )}
    </div>
  );
};

export default MathProblem;