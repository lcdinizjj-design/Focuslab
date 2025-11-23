import React from 'react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Users, UserPlus, Trophy } from 'lucide-react';

export const Community: React.FC = () => {
  const { setView, user } = useApp();

  // Mock data for community feature
  const ranking = [
    { name: 'Alex S.', xp: 12400, streak: 45 },
    { name: 'Sarah K.', xp: 11200, streak: 32 },
    { name: user?.name || 'Você', xp: user?.xp || 0, streak: user?.streak || 0, active: true },
    { name: 'Mike T.', xp: 8900, streak: 12 },
    { name: 'John D.', xp: 5400, streak: 5 },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      <div className="flex items-center gap-4 mb-4 sticky top-0 bg-stone-900/90 backdrop-blur z-10 py-4 border-b border-stone-900">
        <button onClick={() => setView(AppView.DASHBOARD)} className="p-2 hover:bg-stone-800 rounded-lg">
          <ArrowLeft className="w-6 h-6 text-stone-400" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Accountability</h2>
          <p className="text-xs text-stone-500">Membros de Elite</p>
        </div>
      </div>

      {/* Find Partner CTA */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-900/30 p-6 rounded-2xl text-center">
         <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
         <h3 className="text-xl font-bold text-white mb-2">Ninguém vence sozinho.</h3>
         <p className="text-stone-400 text-sm mb-6">Encontre um parceiro de responsabilidade para cobrar sua disciplina diária.</p>
         <Button className="w-full">
            <UserPlus className="w-4 h-4 mr-2" /> Encontrar Dupla
         </Button>
      </div>

      {/* Ranking */}
      <div>
         <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" /> Ranking Semanal
         </h3>
         <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
            {ranking.map((p, i) => (
               <div key={i} className={`flex items-center justify-between p-4 border-b border-stone-800 last:border-none ${p.active ? 'bg-stone-800/50' : ''}`}>
                  <div className="flex items-center gap-4">
                     <span className={`w-6 text-center font-bold ${i < 3 ? 'text-yellow-500' : 'text-stone-600'}`}>#{i+1}</span>
                     <div>
                        <p className={`font-bold ${p.active ? 'text-blue-400' : 'text-white'}`}>{p.name}</p>
                        <p className="text-xs text-stone-500">{p.streak} dias de streak</p>
                     </div>
                  </div>
                  <span className="font-mono text-stone-300">{p.xp} XP</span>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};