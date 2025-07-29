import React, { useState } from 'react';
import { Plus, Filter, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTimer } from '../context/TimerContext';
import TimerCard from '../components/Timer/TimerCard';
import CategorySection from '../components/Category/CategorySection';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../components/ThemeSwitcher';


export default function Home() {
  const { state } = useTimer();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const groupedTimers = state.timers.reduce((acc, timer) => {
    if (!acc[timer.category]) {
      acc[timer.category] = [];
    }
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const filteredCategories = selectedCategory === 'all'
    ? Object.keys(groupedTimers)
    : Object.keys(groupedTimers).filter(cat => cat === selectedCategory);

  const hasTimers = state.timers.length > 0;
  const runningCount = state.timers.filter(t => t.status === 'running').length;
  const completedToday = state.history.filter(h =>
    new Date(h.completedAt).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 sm:px-6">
        <div className="flex  sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Good morning! 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Stats */}
        {hasTimers && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-slate-700/20">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {state.timers.length}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Total Timers
              </div>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-slate-700/20">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {runningCount}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Active Now
              </div>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-slate-700/20">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {completedToday}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Completed Today
              </div>
            </div>
          </div>
        )}

        {/* Category Filter + Create */}
        {hasTimers && (
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="flex-1 bg-white text-black dark:text-white dark:bg-slate-800/60 backdrop-blur-sm border-white/20 dark:border-slate-700/20 rounded-2xl h-12">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className='bg-white text-black dark:bg-slate-800 dark:text-white '>
                <SelectItem value="all">All Categories</SelectItem>
                {state.categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={() => navigate('/create')}
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl h-12 px-6 shadow-lg shadow-indigo-500/25"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 pb-6">
        {hasTimers ? (
          <div className="space-y-4">
            {filteredCategories.map(category => (
              <CategorySection
                key={category}
                category={category}
                timers={groupedTimers[category]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-3xl flex items-center justify-center">
              <div className="text-4xl">⏱️</div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No timers yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm mx-auto">
              Create your first timer to start tracking your activities and boost productivity
            </p>
            <Button
              onClick={() => navigate('/create')}
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl h-12 px-8 shadow-lg shadow-indigo-500/25"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Timer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
