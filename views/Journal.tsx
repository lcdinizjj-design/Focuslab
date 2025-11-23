import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppView, JournalEntry } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, MessageSquare, Calendar } from 'lucide-react';

export const Journal: React.FC = () => {
  const { setView, journalEntries, addJournalEntry } = useApp();
  const [step, setStep] = useState(0); // 0: Form, 1: Success/List
  const [form, setForm] = useState({ good: '', improve: '', victory: '', intention: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...form
    };
    addJournalEntry(entry);
    setStep(1);
  };

  const todayEntry = journalEntries.find(e => e.date.startsWith(new Date().toISOString().split('T')[0]));

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      <div className="flex items-center gap-4 mb-4 sticky top-0 bg-stone-950 z-10 py-4 border-b border-stone-900">
        <button onClick={() => setView(AppView.DASHBOARD)} className="p-2 hover:bg-stone-800 rounded-lg">
          <ArrowLeft className="w-6 h-6 text-stone-400" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Diário de Vitória</h2>
          <p className="text-xs text-stone-500">2 minutos de clareza diária.</p>
        </div>
      </div>

      {step === 0 && !todayEntry ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-stone-900 p-6 rounded-xl border border-stone-800">
             <label className="block text-sm font-bold text-blue-500 mb-2">1. O que fiz bem hoje?</label>
             <textarea 
               className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
               rows={3}
               placeholder="Reconheça suas vitórias..."
               value={form.good}
               onChange={e => setForm({...form, good: e.target.value})}
               required
             />
          </div>
          <div className="bg-stone-900 p-6 rounded-xl border border-stone-800">
             <label className="block text-sm font-bold text-yellow-500 mb-2">2. O que posso melhorar amanhã?</label>
             <textarea 
               className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-white focus:border-yellow-500 outline-none"
               rows={3}
               placeholder="Seja honesto, sem culpa..."
               value={form.improve}
               onChange={e => setForm({...form, improve: e.target.value})}
               required
             />
          </div>
          <div className="bg-stone-900 p-6 rounded-xl border border-stone-800">
             <label className="block text-sm font-bold text-green-500 mb-2">3. Minha microvitória do dia</label>
             <input 
               className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-white focus:border-green-500 outline-none"
               placeholder="Ex: Não comi açúcar."
               value={form.victory}
               onChange={e => setForm({...form, victory: e.target.value})}
               required
             />
          </div>
          <div className="bg-stone-900 p-6 rounded-xl border border-stone-800">
             <label className="block text-sm font-bold text-purple-500 mb-2">4. Intenção para amanhã</label>
             <input 
               className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
               placeholder="Uma palavra ou frase..."
               value={form.intention}
               onChange={e => setForm({...form, intention: e.target.value})}
               required
             />
          </div>
          <Button type="submit" className="w-full py-4">Salvar Diário (+50 XP)</Button>
        </form>
      ) : (
        <div className="space-y-6">
           {todayEntry && (
             <div className="bg-green-900/20 border border-green-900/50 p-4 rounded-xl text-center mb-6">
                <p className="text-green-400 font-bold">Diário de hoje preenchido!</p>
                <p className="text-xs text-stone-500">Volte amanhã para manter o streak.</p>
             </div>
           )}
           
           <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Histórico Recente
           </h3>
           <div className="space-y-4">
              {journalEntries.map(entry => (
                 <div key={entry.id} className="bg-stone-900 border border-stone-800 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3 border-b border-stone-800 pb-2">
                       <span className="text-stone-400 text-sm">{new Date(entry.date).toLocaleDateString()}</span>
                       <span className="text-xs font-bold text-purple-500 bg-purple-900/20 px-2 py-0.5 rounded">{entry.intention}</span>
                    </div>
                    <div className="grid gap-2 text-sm">
                       <p><span className="text-blue-500 font-bold">Bom:</span> {entry.good}</p>
                       <p><span className="text-yellow-500 font-bold">Melhorar:</span> {entry.improve}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};