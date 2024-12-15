'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedProject(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`card-${project.id}`}
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="h-full rounded-lg border border-gray-700/50 backdrop-blur-sm bg-white/5 overflow-hidden">
              <motion.div layoutId={`image-container-${project.id}`} className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div layoutId={`content-${project.id}`} className="p-4">
                <motion.h3 layoutId={`title-${project.id}`} className="text-lg font-medium text-gray-200 mb-2">
                  {project.title}
                </motion.h3>
                <motion.p layoutId={`description-${project.id}`} className="text-gray-400 line-clamp-3">
                  {project.description}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBackdropClick}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm cursor-pointer"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden" onClick={handleBackdropClick}>
              <motion.div
                layoutId={`card-${selectedProject.id}`}
                className="relative w-[90%] max-w-4xl bg-gray-900/95 rounded-lg border border-gray-700/50 backdrop-blur-sm"
                initial={{ scale: 1 }}
                animate={{ scale: 1.15 }}
                exit={{ scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-2 top-2 p-2 text-gray-400 hover:text-white md:hidden z-10"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="max-h-[80vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="space-y-6">
                      <motion.div layoutId={`image-container-${selectedProject.id}`} className="relative h-64 w-full">
                        <Image
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </motion.div>

                      <motion.h2 layoutId={`title-${selectedProject.id}`} className="text-2xl font-medium text-gray-200">
                        {selectedProject.title}
                      </motion.h2>

                      <motion.p layoutId={`description-${selectedProject.id}`} className="text-gray-400">
                        {selectedProject.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap gap-2"
                      >
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm rounded-full border border-gray-700/50 text-gray-300 bg-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </motion.div>

                      {selectedProject.demoUrl && (
                        <motion.a
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: 0.3 }}
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                          <span>View Demo</span>
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      )}
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