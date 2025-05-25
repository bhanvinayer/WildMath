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
    <div className="bg-gradient-to-br from-primary-900 via-gray-900 to-primary-700 rounded-2xl p-8 shadow-2xl border-2 border-primary-700 w-full max-w-xl mx-auto animate-float">
      <h3 className="text-2xl font-display text-white mb-6 tracking-wide drop-shadow-lg">Solve the Problem</h3>
      <div className="bg-gray-800 p-6 rounded-xl mb-8 shadow-lg animate-float">
        <p className="math-text text-white text-xl">{problem.question}</p>
      </div>
      <form onSubmit={handleSubmit} aria-label="Math Problem" tabIndex={0}>
        {problem.options ? (
          <div className="space-y-4 mb-8">
            {problem.options.map((option, index) => (
              <div 
                key={index}
                role="radio"
                aria-checked={selectedOption === option}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedOption(option);
                  }
                }}
                className={`p-4 rounded-xl cursor-pointer font-mono text-lg font-bold transition-all shadow-lg border-2 focus:outline-none focus:ring-4 focus:ring-primary-400 focus:border-primary-400 ${
                  selectedOption === option
                    ? 'bg-primary-600 text-white border-primary-400 scale-105'
                    : 'bg-gray-700 text-white border-gray-700 hover:bg-primary-800 hover:text-white hover:scale-102'
                }`}
                onClick={() => setSelectedOption(option)}
                aria-label={`Option ${option}`}
              >
                {option}
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-8">
            <label htmlFor="answer" className="block text-base font-medium text-primary-200 mb-3">
              Your Answer:
            </label>
            <input
              type="text"
              id="answer"
              className="w-full p-4 bg-gray-800 text-white border-2 border-primary-700 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-400 font-mono text-lg shadow-inner"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer..."
              aria-label="Your Answer"
            />
          </div>
        )}
        <div className="flex justify-between items-center">
          {showHint && problem.hint && (
            <button
              type="button"
              onClick={toggleHint}
              className="text-primary-300 hover:text-primary-200 text-base font-bold animate-pulse-slow focus:outline-none focus:ring-2 focus:ring-primary-400"
              aria-label={showingHint ? 'Hide Hint' : 'Show Hint'}
            >
              {showingHint ? 'Hide Hint' : 'Show Hint'}
            </button>
          )}
          <button
            type="submit"
            disabled={problem.options ? !selectedOption : !userAnswer}
            className={`btn-pixel bg-primary-600 hover:bg-primary-500 px-8 py-3 ml-auto text-lg font-bold shadow-lg focus:outline-none focus:ring-4 focus:ring-primary-400 ${
              (problem.options ? !selectedOption : !userAnswer)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            aria-disabled={problem.options ? !selectedOption : !userAnswer}
            aria-label="Submit Answer"
          >
            Submit Answer
          </button>
        </div>
      </form>
      {showingHint && problem.hint && (
        <div className="mt-6 p-4 bg-gradient-to-br from-primary-900 via-gray-900 to-primary-700 rounded-xl border-2 border-primary-500 shadow-lg animate-float font-['Press Start 2P'] text-primary-300 text-base text-center">
          <p>{problem.hint}</p>
        </div>
      )}
    </div>
  );
};

export default MathProblem;