'use client';

import React, { useEffect, useState } from 'react';

const GlowingCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    let requestId;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const lerp = (start, end, factor) => {
      return start + (end - start) * factor;
    };

    const updatePosition = () => {
      currentX = lerp(currentX, targetX, 0.15);
      currentY = lerp(currentY, targetY, 0.15);
      
      setPosition({ x: currentX, y: currentY });
      requestId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e) => {
      if (isTouch) return; // Ignore mouse events if touch is being used
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleTouchMove = (e) => {
      setIsTouch(true);
      // Prevent scrolling while touching
      e.preventDefault();
      const touch = e.touches[0];
      targetX = touch.clientX;
      targetY = touch.clientY;
    };

    const handleTouchEnd = () => {
      // Optional: hide or fade out the glow when touch ends
      // You can implement additional logic here if needed
    };

    // Mouse events
    window.addEventListener('mousemove', handleMouseMove);
    
    // Touch events
    window.addEventListener('touchstart', handleTouchMove, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    requestId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(requestId);
    };
  }, [isTouch]);

  // Adjust size based on device type
  const size = isTouch ? 500 : 1500; // Smaller size for mobile

  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-screen"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        width: `${size}px`,
        height: `${size}px`,
        background: `
          radial-gradient(
            circle at center,
            rgba(4, 0, 41, 0.9) 0%,
            rgba(3, 0, 31, 0.7) 20%,
            rgba(2, 0, 20, 0.5) 40%,
            rgba(1, 0, 10, 0.3) 60%,
            rgba(0, 0, 0, 0) 80%
          )
        `,
        filter: 'blur(30px)',
        willChange: 'transform',
        opacity: isTouch ? 0.8 : 1, // Slightly reduced opacity for touch devices
        visibility: position.x === 0 && position.y === 0 ? 'hidden' : 'visible' // Hide until first interaction
      }}
    />
  );
};

export default GlowingCursor;