import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, AlertCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useTimer } from '../context/TimerContext';
import { toast } from 'react-hot-toast';

export default function CreateTimer() {
  const navigate = useNavigate();
  const { state, dispatch } = useTimer();
  const [formData, setFormData] = useState({
    name: '',
    hours: '',
    minutes: '',
    seconds: '',
    category: '',
    newCategory: '',
    halfwayAlert: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Timer name is required');
      return;
    }

    const hours = parseInt(formData.hours) || 0;
    const minutes = parseInt(formData.minutes) || 0;
    const seconds = parseInt(formData.seconds) || 0;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds === 0) {
      toast.error('Timer duration must be greater than 0');
      return;
    }

    const category = formData.newCategory.trim() || formData.category;
    if (!category) {
      toast.error('Please select or enter a category');
      return;
    }

    const newTimer = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      duration: totalSeconds,
      remainingTime: totalSeconds,
      category,
      status: 'idle',
      halfwayAlert: formData.halfwayAlert,
      createdAt: new Date()
    };

    dispatch({ type: 'ADD_TIMER', payload: newTimer });
    toast.success('Timer created successfully!');
    navigate('/');
  };

  return (
    <div className="min-h-screen  text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 sm:px-6  ">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Create Timer</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Set up a new timer for your activity</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 pb-10 sm:px-6 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Timer Name</Label>
            <Input
              id="name"
              placeholder="e.g., Morning Workout"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded-lg h-11 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label>Duration</Label>
            <div className="grid grid-cols-3 gap-3">
              {['hours', 'minutes', 'seconds'].map((field) => (
                <div key={field}>
                  <Label htmlFor={field} className="text-xs capitalize mb-1 block text-gray-600 dark:text-gray-400">
                    {field}
                  </Label>
                  <Input
                    id={field}
                    type="number"
                    min="0"
                    max={field === 'hours' ? '23' : '59'}
                    placeholder="0"
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    className="h-11 text-center font-mono rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-3">
            <Label>Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value, newCategory: '' })}
            >
              <SelectTrigger className="h-11 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Tag className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg text-black dark:text-white">
                {state.categories.map((category) => (
                  <SelectItem 
                    key={category} 
                    value={category}
                    className="focus:bg-gray-100 dark:focus:bg-gray-700"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">or</div>
            <Input
              placeholder="Create new category"
              value={formData.newCategory}
              onChange={(e) => setFormData({ ...formData, newCategory: e.target.value, category: '' })}
              className="h-11 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            />
          </div>

          {/* Halfway Alert */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="font-medium">Halfway Alert</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Notifies at 50% completion</div>
                </div>
             </div>
              <Switch className='bg-blue-100  '
                checked={formData.halfwayAlert}
                onCheckedChange={(checked) => setFormData({ ...formData, halfwayAlert: checked })}
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-12 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-md"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Timer
          </Button>
        </form>
      </div>
    </div>
  );
}