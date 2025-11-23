import React from 'react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Trophy, Zap, Lock, CheckCircle } from 'lucide-react';
import { Crown, Sword, Brain, Flame } from 'lucide-react';

const IconMap: any = { Crown, Sword, Brain, Flame, Zap };

export const Gamification: React.FC = () => {
  const { setView, user, missions, completeMission, badges } = useApp();

  const progress = (user?.xp || 0) % 1000 / 1000 * 100;

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4 sticky top-0 bg-stone-950 z-10 py-4 border-b border-stone-900">
        <button onClick={() => setView(AppView.DASHBOARD)} className="p-2 hover:bg-stone-800 rounded-lg">
          <ArrowLeft className="w-6 h-6 text-stone-400" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Sala de Troféus</h2>
          <p className="text-xs text-stone-500">Suas conquistas e missões.</p>
        </div>
      </div>

      {/* Level Card */}
      <div className="bg-stone-900 rounded-2xl p-6 border border-stone-800 text-center">
         <div className="w-20 h-20 bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-900/50">
            <Trophy className="w-10 h-10 text-yellow-500" />
         </div>
         <h3 className="text-3xl font-bold text-white mb-1">Nível {user?.level}</h3>
         <p className="text-stone-400 text-sm mb-4">{user?.xp} XP Total</p>
         
         <div className="w-full bg-stone-950 h-3 rounded-full overflow-hidden mb-2 border border-stone-800">
            <div className="h-full bg-yellow-500" style={{ width: `${progress}%` }}></div>
         </div>
         <p className="text-xs text-stone-500">Próximo nível em {1000 - ((user?.xp || 0) % 1000)} XP</p>
      </div>

      {/* Missions */}
      <div>
         <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" /> Missões Ativas
         </h3>
         <div className="space-y-3">
            {missions.map(mission => (
               <div 
                  key={mission.id} 
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                     mission.completed 
                     ? 'bg-stone-900/50 border-stone-800 opacity-60' 
                     : 'bg-stone-900 border-stone-700 hover:border-blue-500'
                  }`}
               >
                  <div>
                     <div className="flex items-center gap-2">
                        <span className="text-xs font-bold bg-stone-800 px-1.5 py-0.5 rounded text-stone-400">{mission.type === 'DAILY' ? 'DIÁRIA' : 'SEMANAL'}</span>
                        <h4 className={`font-bold text-sm ${mission.completed ? 'text-stone-500 line-through' : 'text-white'}`}>{mission.title}</h4>
                     </div>
                     <p className="text-xs text-stone-500 mt-1">Recompensa: <span className="text-yellow-500 font-bold">+{mission.xpReward} XP</span></p>
                  </div>
                  <button 
                     disabled={mission.completed}
                     onClick={() => completeMission(mission.id)}
                     className={`px-3 py-1.5 rounded text-xs font-bold ${
                        mission.completed 
                        ? 'bg-green-900/20 text-green-500 border border-green-900/50' 
                        : 'bg-blue-600 text-white hover:bg-blue-500'
                     }`}
                  >
                     {mission.completed ? 'Concluída' : 'Concluir'}
                  </button>
               </div>
            ))}
         </div>
      </div>

      {/* Badges */}
      <div>
         <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-500" /> Medalhas
         </h3>
         <div className="grid grid-cols-3 gap-4">
            {badges.map(badge => {
               const Icon = IconMap[badge.icon] || Trophy;
               return (
                  <div key={badge.id} className={`aspect-square rounded-xl border flex flex-col items-center justify-center p-2 text-center ${badge.unlocked ? 'bg-stone-900 border-yellow-900/30' : 'bg-stone-950 border-stone-900 opacity-50'}`}>
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${badge.unlocked ? 'bg-yellow-900/20 text-yellow-500' : 'bg-stone-900 text-stone-700'}`}>
                        {badge.unlocked ? <Icon className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                     </div>
                     <span className={`text-xs font-bold ${badge.unlocked ? 'text-white' : 'text-stone-600'}`}>{badge.name}</span>
                  </div>
               );
            })}
         </div>
      </div>
    </div>
  );
};