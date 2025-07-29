import React, { useState } from 'react';
import { ArrowLeft, Download, Calendar, Clock, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useTimer } from '../context/TimerContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function History() {
  const navigate = useNavigate();
  const { state } = useTimer();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filteredHistory = state.history
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
        case 'oldest':
          return new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();
        case 'duration':
          return b.duration - a.duration;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const exportHistory = () => {
    if (state.history.length === 0) {
      toast.error('No history to export');
      return;
    }

    const dataStr = JSON.stringify(state.history, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `timer-history-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    toast.success('History exported successfully!');
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const getUniqueCategories = () => {
    const categories = [...new Set(state.history.map(item => item.category))];
    return categories;
  };

  return (
    <div className=" min-h-screen  px-4 pt-6 pb-4 sm:px-6 space-y-6 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
              <button
                      onClick={() => navigate('/')}
                      className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Timer History</h1>
            <p className="text-sm text-muted-foreground">
              {state.history.length} completed timers
            </p>
          </div>
        </div>

        {state.history.length > 0 && (
          <Button  size="icon" onClick={exportHistory} className='bg-white text-black dark:text-white dark:bg-gray-800'>
            <Download className="w-4 h-4 " />
          </Button>
        )}
      </div>

      {/* History List */}
      {filteredHistory.length > 0 ? (
        <div className="flex flex-wrap gap-4">
  {filteredHistory.map((item) => (
    <div
      key={item.id}
      className="flex-1 min-w-full sm:min-w-[300px] md:min-w-[48%] lg:min-w-[32%] xl:min-w-[24%]"
    >
      <Card className="transition-colors bg-white dark:bg-gray-800 h-full">
        <CardContent className="p-4 py-2 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{item.name}</h3>
                <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDuration(item.duration)}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(item.completedAt)}
                </div>
              </div>
            </div>
            <div className="text-2xl">🎉</div>
          </div>
        </CardContent>
      </Card>
    </div>
  ))}
</div>

      ) : state.history.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-lg font-semibold mb-2">No completed timers yet</h3>
          <p className="text-muted-foreground mb-4">
            Complete some timers to see your history here
          </p>
          <Button onClick={() => navigate('/')}>Go to Dashboard</Button>
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">No results found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
