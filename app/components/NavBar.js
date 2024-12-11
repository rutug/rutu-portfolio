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
        const cachedLocation = localStorage.getItem('userLocation');
        const cachedTimestamp = localStorage.getItem('locationTimestamp');

        if (cachedLocation && cachedTimestamp) {
          if (Date.now() - Number(cachedTimestamp) < 3600000) {
            setLocation(cachedLocation);
            return;
          }
        }

        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const locationString = `${data.city || 'Unknown'}/${data.region || 'Region'}`;

        localStorage.setItem('userLocation', locationString);
        localStorage.setItem('locationTimestamp', Date.now().toString());

        setLocation(locationString);
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

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Initial calls
    getLocation();
    updateTime();

    // Set up intervals and listeners
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
      <div className="hidden md:flex justify-between items-center fixed top-0 left-0 right-0 px-6 py-2 z-50">
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
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${pathname === item.href
                      ? 'bg-white/10 text-white scale-105 border border-white/20 shadow-lg shadow-white/10'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <item.icon className={`w-4 h-4 ${pathname === item.href ? 'text-blue-400' : ''}`} />
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

      {/* Mobile Navigation */}
      <div className="fixed bottom-6 left-0 right-0 z-50 md:hidden">
        {/* Info Bar - Top */}
        <div className="flex justify-between items-center text-xs text-gray-400 px-6 mb-2">
          <div>{location}</div>
          <div>Last updated: April 2024</div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center">
          <nav className={`transition-all duration-300 border border-gray-700/50 rounded-full
            ${isScrolled
              ? 'backdrop-blur-md bg-black/20'
              : 'backdrop-blur-sm bg-black/10'
            }`}
          >
            <div className="grid grid-cols-4 gap-2 h-16 px-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center space-y-1 px-4 transition-all duration-300
                  ${pathname === item.href
                      ? 'text-white scale-110 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-blue-400 after:rounded-full'
                      : 'text-gray-300 hover:text-white'
                    }`}
                >
                  <item.icon className={`w-5 h-5 ${pathname === item.href ? 'text-blue-400' : ''}`} />
                  <span className={`text-xs ${pathname === item.href ? 'font-medium' : ''}`}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;