import React from 'react';

export default function ProgressBar({ timer }) {
  const progressPercentage = ((timer.duration - timer.remainingTime) / timer.duration) * 100;

  const getProgressColor = () => {
    if (timer.status === 'completed') return 'from-blue-400 to-blue-600';
    if (timer.status === 'running') return 'from-emerald-400 to-emerald-600';
    if (timer.status === 'paused') return 'from-amber-400 to-amber-600';
    return 'from-slate-300 to-slate-500';
  };

  const getTrackColor = () => {
    return 'bg-slate-200 dark:bg-slate-700';
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Progress
        </span>
        <span className="text-sm font-bold text-slate-900 dark:text-white">
          {Math.round(progressPercentage)}%
        </span>
      </div>

      <div className="relative">
        <div className={`h-3 rounded-full ${getTrackColor()}`} />
        
        <div
          className={`absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r ${getProgressColor()} transition-all duration-500 ease-out`}
          style={{ width: `${progressPercentage}%` }}
        />

        {timer.status === 'running' && (
          <div
            className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-50 animate-pulse"
            style={{ width: `${progressPercentage}%` }}
          />
        )}
      </div>
    </div>
  );
}
