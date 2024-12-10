'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Briefcase, BookOpen, Image } from 'lucide-react';

const NavigationBar = ({ 
  items = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'About', href: '/about', icon: User },
    { label: 'Work', href: '/work', icon: Briefcase },
    { label: 'Blog', href: '/blog', icon: BookOpen },
    // { label: 'Gallery', href: '/gallery', icon: Image }
  ]
}) => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-center fixed top-6 left-0 right-0 z-50">
        <nav className="backdrop-blur-sm bg-white/10 border border-gray-200 rounded-full px-4">
          <div className="flex items-center space-x-2 h-12">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                  ${pathname === item.href 
                    ? 'bg-black/10 text-white' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 flex justify-center z-50">
        <nav className="backdrop-blur-sm bg-white/10 border border-gray-200 rounded-full">
          <div className="grid grid-cols-5 gap-2 h-16 px-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center space-y-1 px-4
                  ${pathname === item.href 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

    </>
  );
};

export default NavigationBar;