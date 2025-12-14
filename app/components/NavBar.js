'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Briefcase, BookOpen, LogOut } from 'lucide-react';

const NavigationBar = ({
  items = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'About', href: '/about', icon: User },
    { label: 'Work', href: '/work', icon: Briefcase },
    // { label: 'Blog', href: '/blog', icon: BookOpen },
  ]
}) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [location, setLocation] = useState('Fetching location...');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

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

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
    };

    getLocation();
    updateTime();

    const timeInterval = setInterval(updateTime, 1000);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, pathname]);

  const handleLogout = () => {
    window.location.href = '/logout';
  };

  const gridCols = `grid-cols-${items.length + (isLoggedIn ? 1 : 0)}`;

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center fixed top-0 left-0 right-0 px-6 py-2 z-50">
        <div className="text-sm text-gray-400">
          {location}
        </div>

        <div className="flex justify-center">
          <nav className={`transition-all duration-300 border border-gray-700/50 rounded-full px-4
            ${isScrolled ? 'backdrop-blur-md bg-black/20' : 'backdrop-blur-sm bg-black/10'}`}
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
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 text-red-400 hover:bg-white/10 hover:text-red-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </nav>
        </div>

        <div className="flex flex-col items-end text-sm text-gray-400">
          <div>{currentTime}</div>
          <div className="text-xs">Last updated: April 2024</div>
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden">
        {/* First layer: Base background with gradient */}
        <div className="fixed top-0 left-0 right-0 h-32 z-40 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none" />

        {/* Second layer: Content with blur */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="relative px-4 py-2 backdrop-blur-md bg-black/5">
            <div className="flex justify-between items-center text-xs text-gray-400">
              <div>{location}</div>
              <div>
                <div>{currentTime}</div>
                <div className="text-right">Last updated: April 2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-[100] p-4 bg-gradient-to-t from-black via-black/20 to-transparent
        transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <nav className="relative flex justify-center">
          <div className={`inline-grid ${gridCols} bg-black/10 backdrop-blur-sm border border-gray-700/50 rounded-full`}>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="touch-manipulation px-8"
              >
                <div className="py-4 flex flex-col items-center">
                  <item.icon className={`w-5 h-5 mb-1 ${pathname === item.href ? 'text-blue-400' : 'text-gray-400'
                    }`} />
                  <span className={`text-xs ${pathname === item.href ? 'text-white font-medium' : 'text-gray-400'
                    }`}>
                    {item.label}
                  </span>
                </div>
              </Link>
            ))}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="touch-manipulation px-8"
              >
                <div className="py-4 flex flex-col items-center">
                  <LogOut className="w-5 h-5 mb-1 text-red-400" />
                  <span className="text-xs text-red-400">
                    Logout
                  </span>
                </div>
              </button>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavigationBar;