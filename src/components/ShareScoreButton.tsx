import React from 'react';

interface ShareScoreButtonProps {
  score: number;
  label?: string;
}

const ShareScoreButton: React.FC<ShareScoreButtonProps> = ({ score, label = 'Share your score' }) => {
  const handleShare = async () => {
    const shareText = `I scored ${score} points in WildMath! Can you beat me? #WildMathGame`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'WildMath Score',
          text: shareText,
          url: window.location.href,
        });
      } catch (e) {
        // User cancelled
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareText);
      alert('Score copied to clipboard! Share it with your friends!');
    }
  };

  return (
    <button
      className="btn-pixel bg-primary-600 hover:bg-primary-500 text-lg px-6 py-3 shadow-lg transition mt-4"
      onClick={handleShare}
    >
      {label}
    </button>
  );
};

export default ShareScoreButton;
