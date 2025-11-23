import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, Moon, Sun, Activity } from 'lucide-react';

export const Habits: React.FC = () => {
  const { habits, toggleHabit } = useApp();

  const renderSection = (title: string, type: string, icon: any) => {
    const items = habits.filter(h => h.type === type);
    return (
      <div className="mb-6">
        <h3 className="flex items-center gap-2 text-stone-400 font-bold mb-3 uppercase text-xs tracking-wider">
          {icon} {title}
        </h3>
        <div className="space-y-2">
          {items.map(habit => (
            <div 
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                habit.completed 
                ? 'bg-stone-900/50 border-stone-800 opacity-60' 
                : 'bg-stone-900 border-stone-700 hover:border-stone-500'
              }`}
            >
              <span className={`font-medium ${habit.completed ? 'text-stone-500 line-through' : 'text-white'}`}>
                {habit.title}
              </span>
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                habit.completed ? 'bg-blue-500 border-blue-500' : 'border-stone-600'
              }`}>
                {habit.completed && <Check className="w-4 h-4 text-stone-950" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 pb-20">
      <h2 className="text-2xl font-bold text-white mb-6">Rituais & Hábitos</h2>
      {renderSection('Ritual Matinal', 'morning', <Sun className="w-4 h-4" />)}
      {renderSection('Hábitos Essenciais', 'habit', <Activity className="w-4 h-4" />)}
      {renderSection('Ritual Noturno', 'night', <Moon className="w-4 h-4" />)}
    </div>
  );
};