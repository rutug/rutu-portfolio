"use client";
import RevealFx from "../components/RevealFx";
import Timeline from "../components/Timeline";
import AcademicDetail from "../components/Academics";
import TechnologiesKnown from "../components/TechIcons";
import { FileIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import docker from "../Logos/docker.png"
import js from "../Logos/js.png"
import linux from "../Logos/linux.png"
import next from "../Logos/next.png"
import react from "../Logos/react.png"
import vuejs from "../Logos/vue-js.png"
import motion from "../Logos/motion.svg"
import python from "../Logos/python.png"
import tailwindcss from "../Logos/Tailwind.png"
import redis from "../Logos/redis.png"
import nodejs from "../Logos/node-js.svg"
import git from "../Logos/Git.png"
import mongodb from "../Logos/mongodb.png"

export default function About() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY;
      
      let found = false;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (!found && rect.top <= 100 && rect.bottom > 100) {
          setActiveSection(section.id);
          found = true;
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
    const element = document.getElementById(id);
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - headerOffset,
      behavior: 'smooth'
    });
  };

  const experiences = [
    {
      title: "Software Engineer - Kanverse.ai",
      badge: "",
      date: "July 2023- Present",
      description: "",
      icon: <FileIcon className="w-4 h-4" />
    },
    {
      title: "Intern- Jade Global Software Pvt. Ltd.",
      badge: "",
      date: "March 2023- July 20203",
      description: "",
      icon: <FileIcon className="w-4 h-4" />
    },
  ]

  const academics = [
    {
      title: "B.Tech. (IT)",
      subtitle: "Savitribai Phule Pune University",
      year: "2023",
      location: "Pune, Maharashtra"
    },
    {
      title: "HSC",
      subtitle: "Shri Shivaji Science College, Amravati",
      year: "2018",
      location: "Amravati, Maharshtra"
    },
    {
      title: "SSC",
      subtitle: "Vidyaniketan English School",
      year: "2016",
      location: "Maharashtra"
    }
  ];

  const technologies = [
    {
      name: 'NextJs',
      imagePath: next
    },
    {
      name: 'Reactjs',
      imagePath: react
    },
    {
      name: 'Node.js',
      imagePath: nodejs
    },
    {
      name: 'VueJs',
      imagePath: vuejs
    },
    {
      name: 'Mongo DB',
      imagePath: mongodb
    },
    {
      name: 'Framer Motion',
      imagePath: motion
    },
    {
      name: 'Docker',
      imagePath: docker
    },
    {
      name: 'Redis',
      imagePath: redis
    },
    {
      name: 'Python',
      imagePath: python
    },
    {
      name: 'Git',
      imagePath: git
    },
    {
      name: 'Linux',
      imagePath: linux
    },
    {
      name: 'Tailwind CSS',
      imagePath: tailwindcss
    }
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/4 lg:fixed lg:left-0 lg:h-screen bg-black/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none sticky top-0 z-10">
        <div className="h-full flex items-center p-4 lg:p-12">
          <nav className="w-full flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`whitespace-nowrap px-4 py-3 transition-all duration-300 rounded-lg
                  ${activeSection === item.id 
                    ? 'bg-white/10 text-white text-lg font-medium translate-x-2' 
                    : 'text-gray-400 hover:text-gray-200 hover:translate-x-2'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="w-full lg:w-3/4 lg:ml-[25%] pt-24 lg:pt-12 px-4 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-32">
          <RevealFx>
            <section id="about">
              <div className="w-full py-16">
                <h2 className="text-3xl font-medium text-gray-200 mb-6">About Me</h2>
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-700/50">
                  <p className="text-gray-400 leading-relaxed">
                    I&apos;m a software engineer passionate about building elegant solutions...
                  </p>
                </div>
              </div>
            </section>
          </RevealFx>

          <RevealFx>
            <section id="experience">
              <div className="w-full py-16">
                <h2 className="text-3xl font-medium text-gray-200 mb-6">Experience</h2>
                <Timeline items={experiences} />
              </div>
            </section>
          </RevealFx>

          <RevealFx>
            <section id="education">
              <div className="w-full py-16">
                <h2 className="text-3xl font-medium text-gray-200 mb-6">Education</h2>
                <AcademicDetail academics={academics} />
              </div>
            </section>
          </RevealFx>

          <RevealFx>
            <section id="technologies">
              <div className="w-full py-16">
                <h2 className="text-3xl font-medium text-gray-200 mb-6">Technologies I Work With</h2>
                <div className="rounded-lg border border-gray-700/50 backdrop-blur-sm bg-white/5 p-6">
                  <TechnologiesKnown 
                    technologies={technologies}
                    iconsPerRow={4}
                    iconSize="md"
                  />
                </div>
              </div>
            </section>
          </RevealFx>
        </div>
      </div>
    </div>
  );
}