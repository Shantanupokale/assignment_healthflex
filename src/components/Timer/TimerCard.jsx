import React from 'react';
import { Play, Pause, RotateCcw, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTimer } from '../../context/TimerContext';
import ProgressBar from './ProgressBar';

export default function TimerCard({ timer }) {
  const { dispatch } = useTimer();

  const handleStart = () => dispatch({ type: 'START_TIMER', payload: timer.id });
  const handlePause = () => dispatch({ type: 'PAUSE_TIMER', payload: timer.id });
  const handleReset = () => dispatch({ type: 'RESET_TIMER', payload: timer.id });
  const handleDelete = () => dispatch({ type: 'DELETE_TIMER', payload: timer.id });

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    switch (timer.status) {
      case 'running':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'paused':
        return 'text-amber-600 dark:text-amber-400';
      case 'completed':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-slate-500 dark:text-slate-400';
    }
  };

  const getStatusBg = () => {
    switch (timer.status) {
      case 'running':
        return 'bg-emerald-100 dark:bg-emerald-900/30';
      case 'paused':
        return 'bg-amber-100 dark:bg-amber-900/30';
      case 'completed':
        return 'bg-blue-100 dark:bg-blue-900/30';
      default:
        return 'bg-slate-100 dark:bg-slate-800/30';
    }
  };

  const getCardBorder = () => {
    switch (timer.status) {
      case 'running':
        return 'border-emerald-200 dark:border-emerald-800/50 shadow-emerald-500/10';
      case 'paused':
        return 'border-amber-200 dark:border-amber-800/50 shadow-amber-500/10';
      case 'completed':
        return 'border-blue-200 dark:border-blue-800/50 shadow-blue-500/10';
      default:
        return 'border-white/20 dark:border-slate-700/20';
    }
  };

  return (
    <div className={`bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-3xl p-6 border ${getCardBorder()} shadow-lg transition-all duration-200 touch-manipulation`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
            {timer.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBg()} ${getStatusColor()}`}>
              {timer.status === 'running' ? 'Running' :
               timer.status === 'paused' ? 'Paused' :
               timer.status === 'completed' ? 'Completed' : 'Ready'}
            </span>
            {timer.halfwayAlert && (
              <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full font-medium">
                Alert
              </span>
            )}
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Time Display */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold font-mono text-slate-900 dark:text-white mb-2">
          {formatTime(timer.remainingTime)}
        </div>
        <div className="flex items-center justify-center gap-1 text-sm text-slate-500 dark:text-slate-400">
          <Clock className="w-3 h-3" />
          <span>of {formatTime(timer.duration)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <ProgressBar timer={timer} />
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {timer.status === 'running' ? (
          <Button
            variant="outline"
            onClick={handlePause}
            className="flex-1 h-12 rounded-2xl text-black/80 dark:text-white bg-white/80 dark:bg-slate-700/80 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <Pause className="w-4 h-4 mr-2 text-black/80 dark:text-white    " />
            Pause
          </Button>
        ) : (
          <Button
            onClick={handleStart}
            className="flex-1 h-12 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
            disabled={timer.status === 'completed'}
          >
            <Play className="w-4 h-4 mr-2" />
            {timer.status === 'paused' ? 'Resume' : 'Start'}
          </Button>
        )}

        <Button
          variant="outline"
          onClick={handleReset}
          className="h-12 px-4 rounded-2xl bg-white/80 dark:bg-slate-700/80 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          <RotateCcw className="w-4 h-4 text-black/80 dark:text-white" />
        </Button>
      </div>
    </div>
  );
}
