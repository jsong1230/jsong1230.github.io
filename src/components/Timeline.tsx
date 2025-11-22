import { useState } from 'react';

interface TimelineItem {
  year: string;
  title: string;
  role: string;
  description: string;
  current?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  lang?: 'ko' | 'en';
}

export default function Timeline({ items, lang = 'ko' }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700" />
      
      <div className="space-y-12">
        {items.map((item, index) => (
          <div key={index} className="relative flex gap-6">
            {/* Year dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className={`w-8 h-8 rounded-full border-2 ${
                item.current 
                  ? 'bg-gray-900 dark:bg-gray-100 border-gray-900 dark:border-gray-100' 
                  : 'bg-white dark:bg-black border-gray-300 dark:border-gray-700'
              }`} />
            </div>
            
            {/* Content */}
            <div className="flex-1 pb-12">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.year}
                </span>
                {item.current && (
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {lang === 'ko' ? '현재' : 'Current'}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.role}</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

