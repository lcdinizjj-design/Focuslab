import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppView, SmartGoal } from '../types';
import { Button } from '../components/Button';
import { 
  ArrowLeft, 
  Plus, 
  Target, 
  Calendar, 
  BarChart3, 
  CheckSquare, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  Clock,
  Zap
} from 'lucide-react';

export const Productivity: React.FC = () => {
  const { setView, smartGoals, addSmartGoal, toggleSmartGoalComplete, deleteSmartGoal, focusHistory } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  // Stats Calculation
  const totalFocusMinutes = focusHistory.filter(s => s.type === 'FOCUS').reduce((acc, curr) => acc + curr.duration, 0);
  const today = new Date().toISOString().split('T')[0];
  const todayFocusMinutes = focusHistory
    .filter(s => s.type === 'FOCUS' && s.date.startsWith(today))
    .reduce((acc, curr) => acc + curr.duration, 0);
  const completedGoals = smartGoals.filter(g => g.completed).length;

  return (
    <div className="space-y-6 h-full flex flex-col pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2 sticky top-0 bg-stone-950 z-10 py-4 border-b border-stone-900">
        <button onClick={() => setView(AppView.DASHBOARD)} className="p-2 hover:bg-stone-800 rounded-lg">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Produtividade</h2>
          <p className="text-xs text-stone-500">Gestão de Metas & Métricas</p>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
           <div className="flex items-center gap-2 mb-2 text-stone-400">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-xs uppercase font-bold">Foco Hoje</span>
           </div>
           <p className="text-2xl font-bold text-white">{todayFocusMinutes} <span className="text-sm text-stone-500">min</span></p>
        </div>
        <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
           <div className="flex items-center gap-2 mb-2 text-stone-400">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-xs uppercase font-bold">Total Global</span>
           </div>
           <p className="text-2xl font-bold text-white">{Math.floor(totalFocusMinutes / 60)}h {totalFocusMinutes % 60}m</p>
        </div>
      </div>

      {/* Goals Section Header */}
      <div className="flex items-center justify-between mt-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-500" /> Metas S.M.A.R.T.
        </h3>
        <Button size="sm" onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4" /> Nova Meta
        </Button>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {smartGoals.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-stone-800 rounded-xl">
             <p className="text-stone-500 text-sm mb-2">Nenhuma meta definida.</p>
             <p className="text-stone-600 text-xs">"Quem não sabe para onde vai, qualquer caminho serve."</p>
          </div>
        ) : (
          smartGoals.map(goal => (
             <GoalCard 
                key={goal.id} 
                goal={goal} 
                onToggle={() => toggleSmartGoalComplete(goal.id)} 
                onDelete={() => deleteSmartGoal(goal.id)} 
             />
          ))
        )}
      </div>

      {/* Add Goal Modal */}
      {showAddModal && <SmartGoalModal onClose={() => setShowAddModal(false)} onSave={addSmartGoal} />}
    </div>
  );
};

/* Sub-components */

const GoalCard: React.FC<{ goal: SmartGoal, onToggle: () => void, onDelete: () => void }> = ({ goal, onToggle, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`bg-stone-900 border rounded-xl overflow-hidden transition-all ${goal.completed ? 'border-green-900/30 opacity-70' : 'border-stone-800 hover:border-blue-900/50'}`}>
      <div className="p-4 flex items-start justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
           <button 
             onClick={(e) => { e.stopPropagation(); onToggle(); }}
             className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
               goal.completed ? 'bg-green-500 border-green-500' : 'border-stone-600 hover:border-blue-500'
             }`}
           >
             {goal.completed && <CheckSquare className="w-4 h-4 text-stone-950" />}
           </button>
           <div>
              <h4 className={`font-bold text-sm ${goal.completed ? 'text-stone-500 line-through' : 'text-white'}`}>{goal.title}</h4>
              <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                 <Calendar className="w-3 h-3" /> {goal.timeBound}
              </p>
           </div>
        </div>
        <button className="text-stone-500">
           {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 pt-0 bg-stone-900/50 border-t border-stone-800">
          <div className="grid gap-3 py-4 text-sm">
            <SmartDetail label="Específica" value={goal.specific} />
            <SmartDetail label="Mensurável" value={goal.measurable} />
            <SmartDetail label="Atingível" value={goal.achievable} />
            <SmartDetail label="Relevante" value={goal.relevant} />
          </div>
          <div className="flex justify-end pt-2">
             <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-red-500 text-xs flex items-center gap-1 hover:text-red-400">
                <Trash2 className="w-3 h-3" /> Excluir Meta
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SmartDetail = ({ label, value }: { label: string, value: string }) => (
  <div className="grid grid-cols-3 gap-2">
     <span className="text-xs font-bold text-stone-500 uppercase">{label}</span>
     <span className="text-stone-300 col-span-2 text-xs">{value}</span>
  </div>
);

const SmartGoalModal: React.FC<{ onClose: () => void, onSave: (g: SmartGoal) => void }> = ({ onClose, onSave }) => {
   const [formData, setFormData] = useState({
     title: '', specific: '', measurable: '', achievable: '', relevant: '', timeBound: ''
   });

   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     onSave({
       id: Date.now().toString(),
       ...formData,
       progress: 0,
       completed: false,
       createdAt: new Date().toISOString()
     });
     onClose();
   };

   return (
     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
        <div className="bg-stone-900 w-full max-w-lg rounded-t-2xl sm:rounded-2xl border border-stone-800 shadow-2xl h-[90vh] sm:h-auto overflow-y-auto">
           <div className="p-6 border-b border-stone-800 flex justify-between items-center sticky top-0 bg-stone-900 z-10">
              <h3 className="text-xl font-bold text-white">Nova Meta S.M.A.R.T.</h3>
              <button onClick={onClose}><ArrowLeft className="w-6 h-6 text-stone-500" /></button>
           </div>
           
           <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                 <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Meta Principal (Resumo)</label>
                 <input required className="w-full bg-stone-950 border border-stone-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none" 
                   placeholder="Ex: Perder 5kg em 30 dias"
                   value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                 />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-blue-500 uppercase mb-1">Specific (Específica)</label>
                    <textarea required className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none h-20 resize-none" 
                      placeholder="O que exatamente você quer alcançar?"
                      value={formData.specific} onChange={e => setFormData({...formData, specific: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-blue-500 uppercase mb-1">Measurable (Mensurável)</label>
                    <textarea required className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none h-20 resize-none" 
                      placeholder="Qual número define o sucesso?"
                      value={formData.measurable} onChange={e => setFormData({...formData, measurable: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-blue-500 uppercase mb-1">Achievable (Atingível)</label>
                    <textarea required className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none h-20 resize-none" 
                      placeholder="Como você vai fazer isso? É realista?"
                      value={formData.achievable} onChange={e => setFormData({...formData, achievable: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-blue-500 uppercase mb-1">Relevant (Relevante)</label>
                    <textarea required className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none h-20 resize-none" 
                      placeholder="Por que isso importa agora?"
                      value={formData.relevant} onChange={e => setFormData({...formData, relevant: e.target.value})}
                    />
                 </div>
              </div>

              <div>
                 <label className="block text-xs font-bold text-blue-500 uppercase mb-1">Time-Bound (Prazo)</label>
                 <input type="date" required className="w-full bg-stone-950 border border-stone-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none" 
                   value={formData.timeBound} onChange={e => setFormData({...formData, timeBound: e.target.value})}
                 />
              </div>

              <div className="pt-4">
                 <Button type="submit" className="w-full py-4">Criar Arquitetura de Meta</Button>
              </div>
           </form>
        </div>
     </div>
   );
}
