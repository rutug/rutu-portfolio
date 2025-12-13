"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard = ({ project }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      // Lock the page at current scroll position and prevent any scroll effect
      scrollYRef.current = window.scrollY || window.pageYOffset || 0;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll to previous position
      const y = Math.abs(parseInt(document.body.style.top || '0', 10)) || 0;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (y) window.scrollTo(0, y);
    }
    return () => {
      // Cleanup in case modal unmounts while open
      const y = Math.abs(parseInt(document.body.style.top || '0', 10)) || 0;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (y) window.scrollTo(0, y);
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
        ref={cardRef}
        onClick={openModal}
        className="cursor-pointer w-full h-full min-h-[300px] sm:min-h-[320px]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="h-full rounded-lg border border-gray-700/50 backdrop-blur-sm bg-white/5 overflow-hidden hover:border-gray-600/70 transition-colors duration-300">
          {/* Image container - responsive height */}
          <motion.div className="relative h-40 sm:h-48 md:h-52 lg:h-48">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </motion.div>

          {/* Card content */}
          <div className="p-3 sm:p-4 md:p-5">
            <motion.h3 className="text-base sm:text-lg font-medium text-gray-200 mb-2 line-clamp-1">
              {project.title}
            </motion.h3>
            <p className="text-sm sm:text-base text-gray-400 line-clamp-2 sm:line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Responsive Modal */}
      {mounted && createPortal(
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

              {/* Modal Container - click outside to close */}
              <div
                className="fixed inset-0 z-50 pointer-events-none"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, x: "-50%", y: "-50%" }}
                  animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                  exit={{ opacity: 0, scale: 0.85, x: "-50%", y: "-50%" }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1],
                    opacity: { duration: 0.2 }
                  }}
                  className="fixed top-1/2 left-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-[1000px] max-h-[90vh] bg-gray-900/95 rounded-lg border border-gray-700/50 backdrop-blur-sm shadow-2xl overflow-hidden pointer-events-auto"
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
                    {/* Scrollable Content Area - vertical scroll only */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                      <div className="p-4 sm:p-6 md:p-8 w-full">
                        <div className="space-y-4 sm:space-y-6 w-full max-w-full">
                          {/* Project Image - Responsive size */}
                          <motion.div className="relative h-48 sm:h-64 md:h-72 lg:h-80 w-full rounded-lg overflow-hidden">
                            <Image
                              src={selectedProject.image}
                              alt={selectedProject.title}
                              fill
                              className="object-cover"
                            />
                          </motion.div>

                          {/* Project Title - Responsive typography */}
                          <motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100 leading-tight">
                            {selectedProject.title}
                          </motion.h2>

                          {/* Project Description - Responsive typography */}
                          <div className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-none">
                            <p className="whitespace-pre-wrap break-words">
                              {selectedProject.description}
                            </p>
                          </div>

                          {/* Technologies - Responsive layout */}
                          <div className="flex flex-wrap gap-3">
                            {selectedProject.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1.5 text-sm sm:text-base rounded-full border border-gray-600/50 text-gray-200 bg-gray-800/50 backdrop-blur-sm whitespace-nowrap"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Demo Link - Responsive size */}
                          {selectedProject.demoUrl && (
                            <div className="pt-2 pb-4">
                              <a
                                href={selectedProject.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-5 py-3 sm:px-7 sm:py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-medium transition-all duration-200 hover:scale-105"
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
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default ProjectCard;