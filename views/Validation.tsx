import React from 'react';
import { useApp } from '../context/AppContext';
import { AppView, ValidationReportItem } from '../types';
import { CheckCircle, AlertTriangle, XCircle, ArrowLeft } from 'lucide-react';

export const Validation: React.FC = () => {
  const { setView } = useApp();

  const report: ValidationReportItem[] = [
    { category: 'UI/UX', status: 'Pronto', details: 'Design system dark mode consistente, Tailwind configurado, responsivo mobile-first.' },
    { category: 'Lógica de Gamificação', status: 'Pronto', details: 'Sistema de XP, Níveis e Streak implementado no AppContext.' },
    { category: 'Conteúdo', status: 'Pronto', details: 'Gerador de 100 microconteúdos implementado via script em constants.ts.' },
    { category: 'Arquitetura', status: 'Pronto', details: 'Separação clara: Views, Context, Services, Components.' },
    { category: 'Automação', status: 'Requer Ajustes', details: 'Automações de 48h/7 dias são simuladas; precisam de backend real para funcionar offline.' },
    { category: 'Modos', status: 'Pronto', details: 'Lógica de troca de modos (Monge, Bunker) funcional no estado global.' },
    { category: 'Performance', status: 'Pronto', details: 'React Context otimizado, sem re-renders excessivos visíveis.' }
  ];

  return (
    <div className="space-y-6 pb-20">
       <div className="flex items-center gap-4 mb-4 sticky top-0 bg-stone-950 z-10 py-4">
        <button onClick={() => setView(AppView.SETTINGS)} className="p-2 hover:bg-stone-800 rounded-lg">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white">Relatório de Validação</h2>
      </div>

      <div className="grid gap-4">
        {report.map((item, idx) => (
          <div key={idx} className="bg-stone-900 border border-stone-800 p-4 rounded-lg flex items-start gap-4">
            <div className="mt-1">
              {item.status === 'Pronto' ? <CheckCircle className="text-green-500 w-5 h-5" /> :
               item.status === 'Requer Ajustes' ? <AlertTriangle className="text-yellow-500 w-5 h-5" /> :
               <XCircle className="text-red-500 w-5 h-5" />}
            </div>
            <div>
              <h4 className="font-bold text-white">{item.category}</h4>
              <span className={`text-xs px-2 py-0.5 rounded border ${
                 item.status === 'Pronto' ? 'bg-green-900/20 border-green-900 text-green-500' :
                 'bg-yellow-900/20 border-yellow-900 text-yellow-500'
              }`}>
                {item.status}
              </span>
              <p className="text-sm text-stone-400 mt-2">{item.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-stone-900 border-t-4 border-green-500 rounded-lg mt-8">
        <h3 className="text-xl font-bold text-white mb-2">Veredito Final</h3>
        <p className="text-stone-300">
          O MVP está 🟢 <span className="font-bold text-white">PRONTO</span> para validação de mercado. 
          A estrutura React+Tailwind está escalável. A ausência de backend foi contornada com LocalStorage para a demo.
        </p>
      </div>
    </div>
  );
};