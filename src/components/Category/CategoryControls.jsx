import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTimer } from '../../context/TimerContext';

export default function CategoryControls({ category }) {
  const { dispatch } = useTimer();

  const handleBulkAction = (action) => {
    dispatch({ type: 'BULK_ACTION', payload: { category, action } });
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleBulkAction('start')}
        className="flex-1 min-w-[8rem] h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-sm"
      >
        <Play className="w-3 h-3 mr-1" />
        Start All
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleBulkAction('pause')}
        className="flex-1 min-w-[8rem] h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-sm"
      >
        <Pause className="w-3 h-3 mr-1" />
        Pause All
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleBulkAction('reset')}
        className="flex-1 min-w-[8rem] h-10 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm"
      >
        <RotateCcw className="w-3 h-3 mr-1" />
        Reset All
      </Button>
    </div>
  );
}
