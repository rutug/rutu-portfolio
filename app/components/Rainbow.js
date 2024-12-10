'use client';

const RainbowText = ({ children, className = "" }) => {
  return (
    <span className={`animate-rainbow-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text bg-300% font-semibold ${className}`}>
      {children}
    </span>
  );
};

export default RainbowText;