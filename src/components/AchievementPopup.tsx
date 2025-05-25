import React from 'react';

interface AchievementPopupProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const AchievementPopup: React.FC<AchievementPopupProps> = ({ open, onClose, title, description }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gradient-to-br from-yellow-400 via-primary-400 to-primary-700 rounded-2xl shadow-2xl border-4 border-yellow-300 p-8 max-w-sm w-full relative animate-float">
        <button
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-yellow-400 focus:outline-none"
          onClick={onClose}
          aria-label="Close achievement"
        >
          ×
        </button>
        <h2 className="text-2xl font-display text-yellow-900 mb-4 text-center drop-shadow-lg">{title}</h2>
        <div className="text-yellow-900 text-lg font-mono text-center">{description}</div>
      </div>
    </div>
  );
};

export default AchievementPopup;
