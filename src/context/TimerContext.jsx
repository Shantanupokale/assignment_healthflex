import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const initialState = {
  timers: [],
  history: [],
  categories: ['Workout', 'Study', 'Break', 'Meditation'],
};

function timerReducer(state, action) {
  switch (action.type) {
    case 'ADD_TIMER':
      return {
        ...state,
        timers: [...state.timers, action.payload],
        categories: state.categories.includes(action.payload.category)
          ? state.categories
          : [...state.categories, action.payload.category],
      };

    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id
            ? { ...timer, ...action.payload.updates }
            : timer
        ),
      };

    case 'DELETE_TIMER':
      return {
        ...state,
        timers: state.timers.filter(timer => timer.id !== action.payload),
      };

    case 'START_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload ? { ...timer, status: 'running' } : timer
        ),
      };

    case 'PAUSE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload ? { ...timer, status: 'paused' } : timer
        ),
      };

    case 'RESET_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload
            ? {
                ...timer,
                remainingTime: timer.duration,
                status: 'idle',
                hasTriggeredHalfwayAlert: false,
              }
            : timer
        ),
      };

    case 'COMPLETE_TIMER':
      const completedTimer = state.timers.find(t => t.id === action.payload);
      if (!completedTimer) return state;

      const historyEntry = {
        id: completedTimer.id,
        name: completedTimer.name,
        duration: completedTimer.duration,
        category: completedTimer.category,
        completedAt: new Date(),
      };

      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload
            ? {
                ...timer,
                status: 'completed',
                remainingTime: 0,
                completedAt: new Date(),
              }
            : timer
        ),
        history: [...state.history, historyEntry],
      };

    case 'TICK_TIMER':
  return {
    ...state,
    timers: state.timers.map(timer => {
      if (timer.id === action.payload && timer.status === 'running') {
        const newRemainingTime = Math.max(0, timer.remainingTime - 1);
        const halfwayPoint = timer.duration / 2;

        if (
          timer.halfwayAlert &&
          !timer.hasTriggeredHalfwayAlert &&
          newRemainingTime <= halfwayPoint
        ) {
          toast(`⏱️ Halfway point reached for ${timer.name}!`);
          return {
            ...timer,
            remainingTime: newRemainingTime,
            hasTriggeredHalfwayAlert: true,
          };
        }

        return {
          ...timer,
          remainingTime: newRemainingTime,
        };
      }
      return timer;
    }),
  };


    case 'BULK_ACTION':
      return {
        ...state,
        timers: state.timers.map(timer => {
          if (timer.category === action.payload.category) {
            switch (action.payload.action) {
              case 'start':
                return { ...timer, status: 'running' };
              case 'pause':
                return { ...timer, status: 'paused' };
              case 'reset':
                return {
                  ...timer,
                  remainingTime: timer.duration,
                  status: 'idle',
                  hasTriggeredHalfwayAlert: false,
                };
              default:
                return timer;
            }
          }
          return timer;
        }),
      };

    case 'ADD_TO_HISTORY':
      return {
        ...state,
        history: [...state.history, action.payload],
      };

    case 'LOAD_DATA':
      return {
        ...state,
        timers: action.payload.timers,
        history: action.payload.history,
      };

    default:
      return state;
  }
}

const TimerContext = createContext(null);

export function TimerProvider({ children }) {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  // Load from localStorage
  useEffect(() => {
    const savedTimers = localStorage.getItem('timers');
    const savedHistory = localStorage.getItem('timerHistory');

    if (savedTimers || savedHistory) {
      dispatch({
        type: 'LOAD_DATA',
        payload: {
          timers: savedTimers ? JSON.parse(savedTimers) : [],
          history: savedHistory ? JSON.parse(savedHistory) : [],
        },
      });
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(state.timers));
    localStorage.setItem('timerHistory', JSON.stringify(state.history));
  }, [state.timers, state.history]);

  // Handle ticking every second
  useEffect(() => {
    const interval = setInterval(() => {
      const runningTimers = state.timers.filter(t => t.status === 'running');

      runningTimers.forEach(timer => {
        if (timer.remainingTime > 0) {
          dispatch({ type: 'TICK_TIMER', payload: timer.id });
        } else if (timer.remainingTime === 0 && timer.status === 'running') {
          dispatch({ type: 'COMPLETE_TIMER', payload: timer.id });
         toast.success(`🎉 Timer "${timer.name}" completed!`, {
  duration: 5000,
});
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.timers]);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
}
