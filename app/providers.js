'use client';

import * as LucideIcons from 'lucide-react';

// Add this to global window object
if (typeof window !== "undefined") {
  window.LucideIcons = LucideIcons;
}

export function Providers({ children }) {
  return children;
}