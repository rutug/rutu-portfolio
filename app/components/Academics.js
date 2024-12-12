"use client";
import React from 'react';

const AcademicDetail = ({academics}) => {
  return (
    <div className="space-y-6">
      {academics.map((academic, index) => (
        <div 
          key={index}
          className="flex justify-between items-start p-4 rounded-lg border border-gray-700/50 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
        >
          {/* Left side - Academic Info */}
          <div className="flex-1 pr-4">
            <h3 className="text-lg font-medium text-gray-200 mb-1">
              {academic.title}
            </h3>
            <p className="text-sm text-gray-400">
              {academic.subtitle}
            </p>
          </div>

          {/* Right side - Year and Location */}
          <div className="flex flex-col items-end text-right">
            <span className="text-sm font-medium text-gray-300">
              {academic.year}
            </span>
            <span className="text-xs text-gray-400 mt-1">
              {academic.location}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AcademicDetail;