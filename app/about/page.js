// app/about/page.jsx
"use client";
import RevealFx from "../components/RevealFx";
import Timeline from "../components/Timeline";
import AcademicDetail from "../components/Academics";
import TechnologiesKnown from "../components/TechIcons";
import { useEffect, useState } from 'react';

export default function About() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About Me' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'technologies', label: 'Technologies' },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex">
      {/* Vertical Navigation */}
      <div className="w-[25%] fixed left-0 h-screen flex items-center pl-12">
        <nav className="w-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left px-4 py-3 mb-4 last:mb-0 transition-all duration-300
                ${activeSection === item.id 
                  ? 'text-white text-lg font-medium translate-x-2' 
                  : 'text-gray-400 hover:text-gray-200 hover:translate-x-2'
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="w-[75%] ml-[25%] py-20 px-8">
        <div className="max-w-3xl">
          {/* About Section */}
          <RevealFx>
            <section id="about" className="mb-32">
              <h2 className="text-2xl font-medium text-gray-200 mb-6">About Me</h2>
              <div className="p-6">
                <p className="text-gray-400 leading-relaxed">
                  I&apos;m a software engineer passionate about building elegant solutions...
                </p>
              </div>
            </section>
          </RevealFx>

          {/* Experience Section */}
          <RevealFx>
            <section id="experience" className="mb-32">
              <h2 className="text-2xl font-medium text-gray-200 mb-6">Experience</h2>
              <Timeline items={[]} />
            </section>
          </RevealFx>

          {/* Education Section */}
          <RevealFx>
            <section id="education" className="mb-32">
              <h2 className="text-2xl font-medium text-gray-200 mb-6">Education</h2>
              <AcademicDetail academics={[]} />
            </section>
          </RevealFx>

          {/* Technologies Section */}
          <RevealFx>
            <section id="technologies" className="mb-32">
              <h2 className="text-2xl font-medium text-gray-200 mb-6">Technologies I Work With</h2>
              <div className="rounded-lg border border-gray-700/50 backdrop-blur-sm bg-white/5 p-6">
                <TechnologiesKnown 
                  technologies={[]}
                  iconsPerRow={4}
                  iconSize="md"
                />
              </div>
            </section>
          </RevealFx>
        </div>
      </div>
    </div>
  );
}