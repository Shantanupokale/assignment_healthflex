
import { Plus, Filter, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../components/ThemeSwitcher';

export default function Home() {
  const navigate = useNavigate();
  



  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
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
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm">
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
            <ThemeSwitcher />
          </div>
        </div>

        {/* Stats Cards */}
        
        
        
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
        
      </div>
    </div>
  );
}
