import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppView, CustomRoutine, RoutineActivity } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Plus, Trash2, Clock, Calendar, MoveUp, MoveDown, Play } from 'lucide-react';

export const CustomRoutines: React.FC = () => {
  const { setView, customRoutines, addCustomRoutine, deleteCustomRoutine, toggleRoutineActive } = useApp();
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('07:00');
  const [endTime, setEndTime] = useState('08:00');
  const [days, setDays] = useState<number[]>([1, 2, 3, 4, 5]); // Mon-Fri default
  const [activities, setActivities] = useState<RoutineActivity[]>([]);
  
  // Activity Input State
  const [actName, setActName] = useState('');
  const [actDur, setActDur] = useState(15);

  const handleAddActivity = () => {
    if (!actName) return;
    const newAct: RoutineActivity = {
      id: Date.now().toString(),
      name: actName,
      durationMin: actDur
    };
    setActivities([...activities, newAct]);
    setActName('');
    setActDur(15);
  };

  const moveActivity = (index: number, direction: 'up' | 'down') => {
    const newActs = [...activities];
    if (direction === 'up' && index > 0) {
      [newActs[index], newActs[index - 1]] = [newActs[index - 1], newActs[index]];
    } else if (direction === 'down' && index < newActs.length - 1) {
      [newActs[index], newActs[index + 1]] = [newActs[index + 1], newActs[index]];
    }
    setActivities(newActs);
  };

  const removeActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const toggleDay = (day: number) => {
    if (days.includes(day)) setDays(days.filter(d => d !== day));
    else setDays([...days, day]);
  };

  const handleSave = () => {
    if (!title || activities.length === 0) return;
    
    const newRoutine: CustomRoutine = {
      id: Date.now().toString(),
      title,
      startTime,
      endTime,
      daysOfWeek: days,
      activities,
      isActive: true
    };
    
    addCustomRoutine(newRoutine);
    setIsCreating(false);
    // Reset form
    setTitle('');
    setActivities([]);
  };

  const daysMap = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  if (isCreating) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col pb-20">
        <div className="p-4 border-b border-stone-900 flex items-center gap-4 sticky top-0 bg-stone-950 z-10">
          <button onClick={() => setIsCreating(false)} className="p-2 hover:bg-stone-800 rounded-lg text-stone-400">
             <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-white">Criar Nova Rotina</h2>
        </div>

        <div className="p-6 space-y-6">
           {/* Basic Info */}
           <div className="space-y-4 bg-stone-900 p-4 rounded-xl border border-stone-800">
              <div>
                 <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Nome da Rotina</label>
                 <input 
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                    placeholder="Ex: Ritual Matinal Blindado"
                    value={title} onChange={e => setTitle(e.target.value)}
                 />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Início</label>
                    <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-white" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Fim (Est.)</label>
                    <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-white" />
                 </div>
              </div>
              
              <div>
                 <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Recorrência</label>
                 <div className="flex justify-between">
                    {daysMap.map((d, i) => (
                       <button 
                          key={i}
                          onClick={() => toggleDay(i)}
                          className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all ${days.includes(i) ? 'bg-blue-600 text-white' : 'bg-stone-800 text-stone-500'}`}
                       >
                          {d}
                       </button>
                    ))}
                 </div>
              </div>
           </div>

           {/* Activities Builder */}
           <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500" /> Estrutura da Rotina</h3>
              
              <div className="flex gap-2 mb-4">
                 <input 
                    className="flex-1 bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white"
                    placeholder="Atividade (ex: Leitura)"
                    value={actName} onChange={e => setActName(e.target.value)}
                 />
                 <input 
                    type="number"
                    className="w-20 bg-stone-950 border border-stone-700 rounded-lg px-2 py-2 text-sm text-white text-center"
                    placeholder="Min"
                    value={actDur} onChange={e => setActDur(parseInt(e.target.value))}
                 />
                 <button onClick={handleAddActivity} className="bg-blue-600 text-white rounded-lg px-3 flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                 </button>
              </div>

              <div className="space-y-2">
                 {activities.map((act, idx) => (
                    <div key={act.id} className="flex items-center justify-between bg-stone-950 border border-stone-800 p-3 rounded-lg">
                       <div>
                          <p className="text-sm text-white font-medium">{act.name}</p>
                          <p className="text-xs text-stone-500">{act.durationMin} min</p>
                       </div>
                       <div className="flex items-center gap-1">
                          <button onClick={() => moveActivity(idx, 'up')} className="p-1 hover:bg-stone-800 rounded text-stone-500"><MoveUp className="w-4 h-4" /></button>
                          <button onClick={() => moveActivity(idx, 'down')} className="p-1 hover:bg-stone-800 rounded text-stone-500"><MoveDown className="w-4 h-4" /></button>
                          <button onClick={() => removeActivity(idx)} className="p-1 hover:bg-red-900/20 rounded text-red-500 ml-2"><Trash2 className="w-4 h-4" /></button>
                       </div>
                    </div>
                 ))}
                 {activities.length === 0 && <p className="text-center text-xs text-stone-600 py-4">Adicione atividades acima.</p>}
              </div>
           </div>

           <Button className="w-full py-4" onClick={handleSave} disabled={!title || activities.length === 0}>
              Salvar Rotina Personalizada
           </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 pb-24 animate-fade-in">
      <div className="flex items-center gap-4 mb-4 sticky top-0 bg-stone-950 z-10 py-4 px-4 border-b border-stone-900">
        <button onClick={() => setView(AppView.DASHBOARD)} className="p-2 hover:bg-stone-800 rounded-lg">
          <ArrowLeft className="w-6 h-6 text-stone-400" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Minhas Rotinas</h2>
          <p className="text-xs text-stone-500">Crie seus próprios rituais.</p>
        </div>
      </div>

      <div className="px-4 space-y-4">
         <Button className="w-full flex items-center justify-center gap-2 dashed border border-stone-700 bg-stone-900/50 hover:bg-stone-900" onClick={() => setIsCreating(true)}>
            <Plus className="w-5 h-5" /> Criar Nova Rotina
         </Button>

         {customRoutines.length === 0 ? (
            <div className="text-center py-12">
               <Calendar className="w-12 h-12 text-stone-800 mx-auto mb-3" />
               <p className="text-stone-500 text-sm">Nenhuma rotina criada.</p>
            </div>
         ) : (
            <div className="space-y-4">
               {customRoutines.map(routine => (
                  <div key={routine.id} className="bg-stone-900 border border-stone-800 rounded-xl p-4 relative overflow-hidden">
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <h3 className="text-lg font-bold text-white">{routine.title}</h3>
                           <p className="text-xs text-stone-400 flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" /> {routine.startTime} - {routine.endTime}
                           </p>
                        </div>
                        <div className="flex gap-2">
                           <button 
                              onClick={() => deleteCustomRoutine(routine.id)} 
                              className="p-2 hover:bg-red-900/20 rounded-lg text-stone-600 hover:text-red-500 transition-colors"
                           >
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     </div>

                     <div className="space-y-2 mb-4">
                        {routine.activities.slice(0, 3).map(act => (
                           <div key={act.id} className="flex items-center gap-2 text-sm text-stone-300">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span>{act.name}</span>
                              <span className="text-stone-600 text-xs ml-auto">{act.durationMin}min</span>
                           </div>
                        ))}
                        {routine.activities.length > 3 && (
                           <p className="text-xs text-stone-500 italic">e mais {routine.activities.length - 3} atividades...</p>
                        )}
                     </div>

                     <div className="flex items-center justify-between border-t border-stone-800 pt-3">
                        <div className="flex gap-1">
                           {daysMap.map((d, i) => (
                              <span key={i} className={`text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded ${routine.daysOfWeek.includes(i) ? 'bg-stone-800 text-stone-300' : 'text-stone-700'}`}>
                                 {d}
                              </span>
                           ))}
                        </div>
                        <button 
                           onClick={() => toggleRoutineActive(routine.id)}
                           className={`px-3 py-1 rounded-lg text-xs font-bold border ${routine.isActive ? 'bg-green-900/20 text-green-500 border-green-900' : 'bg-stone-950 text-stone-500 border-stone-800'}`}
                        >
                           {routine.isActive ? 'ATIVA' : 'PAUSADA'}
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
    </div>
  );
};