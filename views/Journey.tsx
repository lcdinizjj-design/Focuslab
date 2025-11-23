import React from 'react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';
import { ArrowLeft, CheckCircle, Lock, Circle } from 'lucide-react';
import { Button } from '../components/Button';

export const Journey: React.FC = () => {
  const { journey, completeJourneyDay, setView } = useApp();

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-4 sticky top-0 bg-stone-950 z-10 py-4 border-b border-stone-900">
        <button onClick={() => setView(AppView.DASHBOARD)} className="p-2 hover:bg-stone-800 rounded-lg">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">A Jornada de 30 Dias</h2>
          <p className="text-sm text-stone-500">Consistência é a única moeda que importa.</p>
        </div>
      </div>

      <div className="grid gap-4 pb-20">
        {journey.map((day, index) => (
          <div 
            key={day.day} 
            className={`relative p-6 rounded-xl border transition-all ${
              day.locked 
                ? 'bg-stone-900/30 border-stone-800 opacity-50' 
                : day.completed 
                  ? 'bg-green-900/10 border-green-900/30' 
                  : 'bg-stone-900 border-blue-900/30 shadow-lg shadow-blue-900/5'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                  day.completed ? 'bg-green-500 text-white' : day.locked ? 'bg-stone-800 text-stone-600' : 'bg-blue-500 text-white'
                }`}>
                  {day.day}
                </div>
                <div>
                  <h3 className={`font-bold ${day.completed ? 'text-green-400' : 'text-white'}`}>{day.title}</h3>
                  <p className="text-sm text-stone-400">{day.mission}</p>
                </div>
              </div>
              <div>
                {day.locked ? <Lock className="w-6 h-6 text-stone-700" /> : 
                 day.completed ? <CheckCircle className="w-6 h-6 text-green-500" /> : 
                 <Circle className="w-6 h-6 text-blue-500" />}
              </div>
            </div>

            {!day.locked && !day.completed && (
              <div className="mt-4 pt-4 border-t border-stone-800 flex justify-end">
                <Button size="sm" onClick={() => completeJourneyDay(index)}>
                  Concluir Missão (+100 XP)
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};