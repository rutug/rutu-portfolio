"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard = ({ project }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const [modalPosition, setModalPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      
      // Calculate exact center position in pixels
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const modalWidth = 1000;
      const modalHeight = 700;
      
      const centerLeft = (viewportWidth - modalWidth) / 2;
      const centerTop = (viewportHeight - modalHeight) / 2;
      
      setModalPosition({
        left: centerLeft,
        top: centerTop
      });
      
      // Log modal position after it's positioned
      setTimeout(() => {
        const modal = document.querySelector('[data-modal="project-modal"]');
        if (modal) {
          const modalRect = modal.getBoundingClientRect();
          const modalCenter = {
            x: modalRect.left + modalRect.width / 2,
            y: modalRect.top + modalRect.height / 2
          };
          
          console.log('📍 Expanded Card Position:', {
            center: modalCenter,
            rect: {
              top: modalRect.top,
              left: modalRect.left,
              width: modalRect.width,
              height: modalRect.height
            },
            calculatedPosition: { left: centerLeft, top: centerTop },
            viewportSize: { width: viewportWidth, height: viewportHeight }
          });
        }
      }, 100);
      
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const openModal = () => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      {/* Responsive Card */}
      <motion.div
        onClick={openModal}
        className="cursor-pointer w-full h-full min-h-[300px] sm:min-h-[320px]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="h-full rounded-lg border border-gray-700/50 backdrop-blur-sm bg-white/5 overflow-hidden hover:border-gray-600/70 transition-colors duration-300">
          {/* Image container - responsive height */}
          <div className="relative h-40 sm:h-48 md:h-52 lg:h-48">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          
          {/* Card content */}
          <div className="p-3 sm:p-4 md:p-5">
            <h3 className="text-base sm:text-lg font-medium text-gray-200 mb-2 line-clamp-1">
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-400 line-clamp-2 sm:line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Responsive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop - Click outside to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm cursor-pointer"
              onClick={closeModal}
              aria-label="Close modal"
            />

            {/* Modal Container - Fixed at exact position */}
            <div 
              className="fixed inset-0 z-50"
              onClick={closeModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.25, 0.1, 0.25, 1],
                  opacity: { duration: 0.2 }
                }}
                className="absolute bg-gray-900/95 rounded-lg border border-gray-700/50 backdrop-blur-sm shadow-2xl overflow-hidden"
                style={{
                  width: '1000px',
                  height: '700px',
                  left: '460px', // 960 - 500 (half of width)
                  top: '88px'     // 438 - 350 (half of height)
                }}
                onClick={(e) => e.stopPropagation()}
                data-modal="project-modal"
              >
                {/* Close Button - Fixed positioning */}
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-4 z-20 p-3 text-gray-400 hover:text-white bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-all duration-200 backdrop-blur-sm"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Content - Fixed dimensions with internal scrolling */}
                <div className="flex flex-col h-full">
                  {/* Scrollable Content Area - Both vertical and horizontal scroll */}
                  <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                    <div className="p-8 min-w-full">
                      <div className="space-y-6 min-w-[950px]">
                        {/* Project Image - Fixed size */}
                        <div className="relative h-80 w-full rounded-lg overflow-hidden">
                          <Image
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Project Title - Fixed typography */}
                        <h2 className="text-4xl font-bold text-gray-100 leading-tight">
                          {selectedProject.title}
                        </h2>

                        {/* Project Description - Fixed typography with scrollable content */}
                        <div className="text-gray-300 text-lg leading-relaxed max-w-none">
                          <p className="whitespace-pre-wrap break-words">
                            {selectedProject.description}
                          </p>
                        </div>

                        {/* Technologies - Fixed layout */}
                        <div className="flex flex-wrap gap-3">
                          {selectedProject.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 text-base rounded-full border border-gray-600/50 text-gray-200 bg-gray-800/50 backdrop-blur-sm whitespace-nowrap"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Demo Link - Fixed size */}
                        {selectedProject.demoUrl && (
                          <div className="pt-2 pb-4">
                            <a
                              href={selectedProject.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium transition-all duration-200 hover:scale-105"
                            >
                              <span>View Demo</span>
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;