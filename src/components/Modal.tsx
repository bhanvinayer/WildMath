import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gradient-to-br from-primary-900 via-gray-900 to-primary-700 rounded-2xl shadow-2xl border-4 border-primary-500 p-8 max-w-lg w-full relative animate-float">
        <button
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-primary-400 focus:outline-none"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <h2 className="text-3xl font-display text-primary-300 mb-6 text-center drop-shadow-lg">{title}</h2>
        <div className="text-white text-lg font-mono">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
