'use client';

import React, { useState, useEffect, forwardRef } from 'react';

/**
 * @typedef {Object} RevealFxProps
 * @property {React.ReactNode} children - Child elements to be revealed
 * @property {'slow' | 'medium' | 'fast'} [speed='medium'] - Animation speed
 * @property {number} [delay=0] - Delay before animation starts in seconds
 * @property {boolean} [revealedByDefault=false] - Whether component is revealed on mount
 * @property {number | string} [translateY] - Translation distance in Y axis
 * @property {boolean} [trigger] - External trigger for reveal
 * @property {Object} [style] - Additional CSS styles
 * @property {string} [className] - Additional CSS classes
 */

const baseStyles = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  opacity: 0,
  transitionProperty: 'transform, opacity',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  willChange: 'transform, opacity'
};

const revealedStyles = {
  opacity: 1
};

const hiddenStyles = {
  opacity: 0
};

const RevealFx = forwardRef(({
  children,
  speed = 'medium',
  delay = 0,
  revealedByDefault = false,
  translateY,
  trigger,
  style,
  className,
  ...rest
}, ref) => {
  const [isRevealed, setIsRevealed] = useState(revealedByDefault);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (trigger !== undefined) {
      setIsRevealed(trigger);
    }
  }, [trigger]);

  const getSpeedDuration = () => {
    switch (speed) {
      case 'fast':
        return '1s';
      case 'slow':
        return '3s';
      case 'medium':
      default:
        return '2s';
    }
  };

  const getTranslateYValue = () => {
    if (typeof translateY === 'number') {
      return `${translateY}rem`;
    } else if (typeof translateY === 'string') {
      return `var(--static-space-${translateY})`;
    }
    return undefined;
  };
  

  const translateValue = getTranslateYValue();

  const revealStyle = {
    ...baseStyles,
    ...(isRevealed ? revealedStyles : hiddenStyles),
    transitionDuration: getSpeedDuration(),
    transform: isRevealed ? 'translateY(0)' : `translateY(${translateValue})`,
    ...style,
  };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={revealStyle}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
});

RevealFx.displayName = 'RevealFx';

export default RevealFx;