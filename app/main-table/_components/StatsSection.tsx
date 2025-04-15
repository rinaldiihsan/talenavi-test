'use client';

import React from 'react';
import { Stats, Option } from './TableTodo';

interface StatsSectionProps {
  title: string;
  stats: Stats;
  options: Option[];
}

export default function StatsSection({ title, stats, options }: StatsSectionProps) {
  return (
    <div className="mt-4">
      <h3 className="font-medium text-sm mb-2">{title}</h3>
      <div className="flex flex-col space-y-2">
        {options.map((option) => {
          const stat = stats[option.value] || { count: 0, percentage: 0 };
          return (
            <div key={option.value} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: option.color }} />
                  {option.value}
                </span>
                <span>
                  {stat.count} ({stat.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${stat.percentage}%`,
                    backgroundColor: option.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
