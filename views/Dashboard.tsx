import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppView, ModeType } from '../types';
import { Button } from '../components/Button';
import { Flame, Target, Trophy, Clock, BookOpen, Swords, ListChecks, CheckSquare, Users, MessageSquare, Bot, Crown, LayoutList, ChevronRight, Play } from 'lucide-react';
import { PROTOCOLS, SENSEI_MESSAGES } from '../constants';

export const Dashboard: React.FC = () => {
  const { user, setView, habits, journey, activeProtocol, completeProtocolTask, checkDailyProtocolProgress, missions, customRoutines } = useApp();
  const [senseiMessage, setSenseiMessage] = useState('');

  useEffect(() => {
    if (activeProtocol) {
      checkDailyProtocolProgress();
    }
    // Pick random message
    const messages = [...SENSEI_MESSAGES.MOTIVATIONAL, ...SENSEI_MESSAGES.TOUGH_LOVE];
    setSenseiMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, [activeProtocol, checkDailyProtocolProgress]);

  if (!user) return null;

  const todayHabits = habits.filter(h => !h.completed).length;
  const currentDay = journey.find(d => !d.completed) || journey[journey.length - 1];
  const completedMissions = missions.filter(m => m.completed).length;
  const totalMissions = missions.length;

  // Get Protocol Data if active
  const protocolDef = activeProtocol ? PROTOCOLS.find(p => p.id === activeProtocol.protocolId) : null;
  const protocolDayData = activeProtocol?.history.find(h => h.day === activeProtocol.currentDay);

  // Active Custom Routines
  const activeCustomRoutines = customRoutines.filter(r => r.isActive);

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      {/* Mentor Widget (Formerly Sensei WAP) */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-950 p-4 rounded-xl border border-stone-800 flex items-start gap-4 relative overflow-hidden">
         <div className="absolute -right-4 -top-4 opacity-5">
            <Bot className="w-32 h-32" />
         </div>
         <div className="w-12 h-12 rounded-full bg-blue-900/20 flex items-center justify-center border border-blue-900/50 shrink-0">
            <Bot className="w-6 h-6 text-blue-400" />
         </div>
         <div>
           <h4 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">Mentor IA diz:</h4>
           <p className="text-white text-sm font-medium leading-relaxed">"{senseiMessage}"</p>
         </div>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Nível" value={user.level} icon={<Trophy className="text-blue-500" />} />
        <StatCard label="XP" value={user.xp} icon={<Target className="text-green-500" />} />
        <StatCard label="Streak" value={`${user.streak} Dias`} icon={<Flame className="text-orange-500" />} />
        <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 flex items-center justify-between cursor-pointer hover:border-blue-500/50 transition-colors" onClick={() => setView(AppView.MODES)}>
          <div>
            <p className="text-stone-400 text-xs uppercase tracking-wider">Modo Atual</p>
            <p className={`text-xl font-bold ${user.mode === ModeType.MONK ? 'text-purple-400' : user.mode === ModeType.WARRIOR ? 'text-red-500' : 'text-stone-200'}`}>
              {user.mode}
            </p>
          </div>
          <Swords className="w-6 h-6 text-stone-500" />
        </div>
      </div>

      {/* Big Why Reminder */}
      {user.bigWhy && (
        <div className="text-center py-2 border-y border-stone-900">
          <p className="text-xs text-stone-500 uppercase tracking-widest">Motivo Profundo: <span className="text-blue-500 font-bold">{user.bigWhy}</span></p>
        </div>
      )}

      {/* Main Action Area - Protocol Priority or Daily Mission */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Protocol / Daily Mission */}
        <div className="md:col-span-2 bg-stone-900 rounded-2xl border border-stone-800 p-6 relative overflow-hidden">
          
          {activeProtocol && protocolDef && protocolDayData ? (
            <>
              {/* ACTIVE PROTOCOL UI */}
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <ListChecks className="w-32 h-32 text-blue-500" />
              </div>
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-blue-500 font-bold uppercase tracking-wider text-xs bg-blue-900/20 px-2 py-1 rounded">
                   {protocolDef.title}
                 </h3>
                 <span className="text-stone-400 font-mono text-xs">Dia {activeProtocol.currentDay}/{protocolDef.durationDays}</span>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-2">Protocolo de Hoje</h2>
                <div className="bg-stone-950/50 p-4 rounded-lg border border-stone-800 mb-4">
                   <p className="text-stone-400 italic text-sm">"{protocolDef.dailyQuote}"</p>
                </div>

                <div className="space-y-3">
                   {protocolDayData.tasks.map(task => (
                     <div 
                       key={task.id} 
                       className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                         task.completed 
                           ? 'bg-green-900/10 border-green-900/30 opacity-60' 
                           : 'bg-stone-900 border-stone-700 hover:border-blue-500'
                       }`}
                       onClick={() => completeProtocolTask(task.id)}
                     >
                       <div className={`w-5 h-5 rounded flex items-center justify-center border ${task.completed ? 'bg-green-500 border-green-500' : 'border-stone-600'}`}>
                          {task.completed && <CheckSquare className="w-3 h-3 text-stone-950" />}
                       </div>
                       <span className={`text-sm ${task.completed ? 'line-through text-stone-500' : 'text-stone-200'}`}>
                         {task.text}
                       </span>
                     </div>
                   ))}
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button onClick={() => setView(AppView.FOCUS)} className="flex-1">
                  <Clock className="w-4 h-4" /> Focus Zone
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* STANDARD JOURNEY UI */}
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Target className="w-32 h-32 text-blue-500" />
              </div>
              <h3 className="text-stone-400 font-semibold mb-1">Missão do Dia #{currentDay.day}</h3>
              <h2 className="text-2xl font-bold text-white mb-4">{currentDay.mission}</h2>
              
              <div className="bg-stone-950/50 p-4 rounded-lg mb-6 border border-stone-800">
                <p className="text-sm text-stone-300"><span className="text-blue-500 font-bold">Micro-ação:</span> {currentDay.microAction}</p>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setView(AppView.FOCUS)}>
                  <Clock className="w-4 h-4" /> Focus Zone
                </Button>
                <Button variant="secondary" onClick={() => setView(AppView.PROTOCOL_SELECTOR)}>
                  Escolher Protocolo
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Side Column */}
        <div className="space-y-4">
          {/* Quick Habits */}
          <div className="bg-stone-900 rounded-2xl border border-stone-800 p-6">
            <h3 className="text-white font-bold mb-4 flex justify-between">
              Pendências 
              <span className="text-blue-500 text-sm">{todayHabits} restantes</span>
            </h3>
            <div className="space-y-3">
              {habits.slice(0, 3).map(habit => (
                <div key={habit.id} className="flex items-center gap-3 text-sm text-stone-300 opacity-80">
                  <div className={`w-2 h-2 rounded-full ${habit.completed ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className={habit.completed ? 'line-through text-stone-600' : ''}>{habit.title}</span>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-sm" onClick={() => setView(AppView.HABITS)}>
              Gerenciar Hábitos
            </Button>
          </div>

          {/* Gamification Entry */}
          <div 
            onClick={() => setView(AppView.GAMIFICATION)}
            className="bg-stone-900 rounded-xl border border-stone-800 p-4 cursor-pointer hover:border-yellow-500/50 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-900/20 rounded-lg text-yellow-500">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Minhas Missões</p>
                <div className="w-24 h-1.5 bg-stone-800 rounded-full mt-1 overflow-hidden">
                   <div className="h-full bg-yellow-500" style={{ width: `${(completedMissions / totalMissions) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Routines Widget */}
      <div className="bg-stone-900 rounded-2xl border border-stone-800 p-6">
         <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
               <LayoutList className="w-5 h-5 text-blue-500" /> Rotinas Personalizadas
            </h3>
            <button 
               onClick={() => setView(AppView.CUSTOM_ROUTINES)} 
               className="text-xs text-blue-500 hover:text-blue-400 flex items-center"
            >
               Gerenciar <ChevronRight className="w-3 h-3 ml-1" />
            </button>
         </div>

         {activeCustomRoutines.length === 0 ? (
            <div className="text-center py-6 bg-stone-950/50 rounded-xl border border-stone-800/50">
               <p className="text-stone-500 text-sm">Nenhuma rotina ativa.</p>
               <Button size="sm" variant="secondary" className="mt-2" onClick={() => setView(AppView.CUSTOM_ROUTINES)}>
                  Criar Rotina
               </Button>
            </div>
         ) : (
            <div className="grid md:grid-cols-2 gap-4">
               {activeCustomRoutines.slice(0, 2).map(routine => (
                  <div key={routine.id} className="bg-stone-950 border border-stone-800 rounded-lg p-4 flex items-center justify-between">
                     <div>
                        <p className="font-bold text-white text-sm">{routine.title}</p>
                        <p className="text-xs text-stone-500">{routine.startTime} - {routine.activities.length} atividades</p>
                     </div>
                     <Button size="sm" onClick={() => setView(AppView.CUSTOM_ROUTINES)}>
                        <Play className="w-3 h-3" />
                     </Button>
                  </div>
               ))}
            </div>
         )}
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <FeatureButton 
            icon={<BookOpen className="w-6 h-6 text-blue-500" />} 
            label="Biblioteca" 
            sub="Microconteúdo"
            onClick={() => setView(AppView.LIBRARY)} 
         />
         <FeatureButton 
            icon={<MessageSquare className="w-6 h-6 text-green-500" />} 
            label="Diário" 
            sub="4 Perguntas"
            onClick={() => setView(AppView.JOURNAL)} 
         />
         <FeatureButton 
            icon={<Users className="w-6 h-6 text-purple-500" />} 
            label="Comunidade" 
            sub="Accountability"
            onClick={() => setView(AppView.COMMUNITY)} 
         />
         <FeatureButton 
            icon={<Crown className="w-6 h-6 text-yellow-500" />} 
            label="Planos Focuslab" 
            sub="Upgrade"
            onClick={() => setView(AppView.PLANS)} 
         />
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon }: { label: string, value: string | number, icon: any }) => (
  <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 flex items-center justify-between">
    <div>
      <p className="text-stone-400 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
    <div className="opacity-80">{icon}</div>
  </div>
);

const FeatureButton = ({ icon, label, sub, onClick }: { icon: any, label: string, sub: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="bg-stone-900 p-4 rounded-xl border border-stone-800 hover:bg-stone-800 transition-all text-left group"
  >
    <div className="mb-3 group-hover:scale-110 transition-transform origin-left">{icon}</div>
    <p className="font-bold text-white text-sm">{label}</p>
    <p className="text-xs text-stone-500">{sub}</p>
  </button>
);