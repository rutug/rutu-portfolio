'use client';

import React from 'react';

const Timeline = ({ items }) => {
  return (
    <div className="relative flex flex-col space-y-8">
      {/* Vertical line */}
      <div className="absolute left-4 top-5 h-full w-0.5 bg-gray-700" />
      
      {items.map((item, index) => (
        <div key={index} className="relative flex items-start ml-8">
          {/* Dot */}
          <div className="absolute -left-6 mt-1.5">
            <div className="h-3 w-3 rounded-full border-2 border-gray-700 bg-gray-900" />
          </div>
          
          {/* Content */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              {/* Icon (if provided) */}
              {item.icon && (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 text-gray-300">
                  {item.icon}
                </div>
              )}
              
              {/* Title */}
              <div className="text-lg font-semibold text-gray-200">
                {item.title}
              </div>
              
              {/* Badge (if provided) */}
              {item.badge && (
                <span className="rounded-full bg-blue-900/30 px-3 py-1 text-xs text-blue-400">
                  {item.badge}
                </span>
              )}
            </div>
            
            {/* Date */}
            <div className="text-sm text-gray-500">
              {item.date}
            </div>
            
            {/* Description */}
            <div className="text-gray-400">
              {item.description}
            </div>
            
            {/* Actions (if provided) */}
            {item.actions && (
              <div className="flex space-x-3">
                {item.actions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    onClick={action.onClick}
                    className="flex items-center space-x-2 rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  >
                    {action.icon && <span>{action.icon}</span>}
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;