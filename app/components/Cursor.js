'use client';
import React, { useState, useEffect } from 'react';

const Cursor = () => {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
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
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      targetX = touch.clientX;
      targetY = touch.clientY;
    };

    // Add both mouse and touch event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    
    requestId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      cancelAnimationFrame(requestId);
    };
  }, []);

  // Don't render anything on server side
  if (!mounted) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-screen"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        width: typeof window !== 'undefined' && window.innerWidth < 768 ? '800px' : '1500px',
        height: typeof window !== 'undefined' && window.innerWidth < 768 ? '800px' : '1500px',
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
        willChange: 'transform'
      }}
    />
  );
};

export default Cursor;