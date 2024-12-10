'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Briefcase, BookOpen } from 'lucide-react';

const NavigationBar = ({ 
  items = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'About', href: '/about', icon: User },
    { label: 'Work', href: '/work', icon: Briefcase },
    { label: 'Blog', href: '/blog', icon: BookOpen },
  ]
}) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [location, setLocation] = useState('Fetching location...');

  useEffect(() => {
    // Fetch location
    const getLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setLocation(`${data.city}/${data.region}`);
      } catch (error) {
        setLocation('Location unavailable');
      }
    };

    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      }));
    };

    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Initial calls
    getLocation();
    updateTime();

    // Set up intervals and event listeners
    const timeInterval = setInterval(updateTime, 1000);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="flex justify-between items-center fixed top-0 left-0 right-0 px-6 py-2 z-50">
        {/* Left - Location */}
        <div className="text-sm text-gray-400">
          {location}
        </div>

        {/* Center - Navigation */}
        <div className="flex justify-center">
          <nav className={`transition-all duration-300 border border-gray-700/50 rounded-full px-4
            ${isScrolled 
              ? 'backdrop-blur-md bg-black/20' 
              : 'backdrop-blur-sm bg-black/10'
            }`}
          >
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

        {/* Right - Time and Last Updated */}
        <div className="flex flex-col items-end text-sm text-gray-400">
          <div>{currentTime}</div>
          <div className="text-xs">Last updated: April 2024</div>
        </div>
      </div>

      {/* Mobile Navigation remains the same */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 flex justify-center z-50">
        {/* ... mobile navigation code ... */}
      </div>
    </>
  );
};

export default NavigationBar;