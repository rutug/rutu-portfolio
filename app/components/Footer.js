'use client';

import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-4 text-center">
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <span>Made with</span>
        <Heart 
          className="w-4 h-4 text-red-500 animate-pulse" 
          fill="currentColor"
        />
        <span>using</span>
        <span className="font-semibold text-blue-600 dark:text-blue-400">Next.js</span>
        <span>•</span>
        <span className="font-semibold text-cyan-600 dark:text-cyan-400">Tailwind</span>
        <span>•</span>
        <span className="font-semibold text-blue-500 dark:text-blue-300">React</span>
      </div>
    </footer>
  );
};

export default Footer;