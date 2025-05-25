import React from 'react';

interface HealthBarProps {
  current: number;
  max: number;
  label?: string;
  isPlayer?: boolean;
}

const HealthBar: React.FC<HealthBarProps> = ({ 
  current, 
  max, 
  label,
  isPlayer = false 
}) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  let barColor = 'from-red-500 to-red-600';
  if (percentage > 50) {
    barColor = 'from-green-500 to-green-600';
  } else if (percentage > 25) {
    barColor = 'from-yellow-500 to-yellow-600';
  }
  
  return (
    <div className={`w-full ${isPlayer ? 'mb-2' : 'mt-2'}`}>
      {label && (
        <div className="flex justify-between text-xs mb-1">
          <span className="font-bold">{label}</span>
          <span>{current}/{max}</span>
        </div>
      )}
      <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${barColor} transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default HealthBar;