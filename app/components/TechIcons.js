'use client';

import React from 'react';
import Image from 'next/image';

const TechnologiesKnown = ({ 
  technologies,
  iconsPerRow = 4,
  iconSize = 'md' // sm, md, lg
}) => {
  // Map icon sizes in pixels
  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64
  };

  // Calculate grid columns based on iconsPerRow
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8'
  };

  return (
    <div className={`grid ${gridCols[iconsPerRow]} gap-8 md:gap-12`}>
      {technologies.map((tech, index) => (
        <div 
          key={index}
          className="flex flex-col items-center gap-2 transition-transform hover:scale-110"
        >
          <div className="relative" style={{ width: sizeMap[iconSize], height: sizeMap[iconSize] }}>
            <Image
              src={tech.imagePath}
              alt={tech.name || `Technology ${index + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              sizes={`${sizeMap[iconSize]}px`}
            />
          </div>
          {tech.name && (
            <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
              {tech.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TechnologiesKnown;