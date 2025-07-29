import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Folder } from 'lucide-react';
import TimerCard from '../Timer/TimerCard';
import CategoryControls from './CategoryControls';

export default function CategorySection({ category, timers }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const runningCount = timers.filter(t => t.status === 'running').length;
  const completedCount = timers.filter(t => t.status === 'completed').length;

  const getCategoryColor = (category) => {
    const colors = {
      Workout: 'from-red-400 to-pink-500',
      Study: 'from-blue-400 to-indigo-500',
      Break: 'from-green-400 to-emerald-500',
      Meditation: 'from-purple-400 to-violet-500',
      Work: 'from-orange-400 to-amber-500',
    };
    return colors[category] || 'from-slate-400 to-slate-500';
  };

  return (
    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-slate-700/20 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full group touch-manipulation"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${getCategoryColor(category)} flex items-center justify-center shadow-lg`}>
              <Folder className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {category}
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span>{timers.length} timers</span>
                {runningCount > 0 && (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    • {runningCount} active
                  </span>
                )}
                {completedCount > 0 && (
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    • {completedCount} done
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-2 rounded-full group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {isExpanded && (
          <div className="mt-4">
            <CategoryControls category={category} />
          </div>
        )}
      </div>

      {/* Timers */}
      {isExpanded && (
  <div className="px-6 pb-6">
    <div className="flex flex-wrap gap-4">
      {timers.map(timer => (
        <div key={timer.id} className="flex-1 min-w-full sm:min-w-[300px] md:min-w-[45%] lg:min-w-[30%] xl:min-w-[22%]">
          <TimerCard timer={timer} />
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
}
