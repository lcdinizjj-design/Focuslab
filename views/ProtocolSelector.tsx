import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PROTOCOLS } from '../constants';
import { AppView, UserContext } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Trophy, Timer, Zap, Star, Check } from 'lucide-react';

export const ProtocolSelector: React.FC = () => {
  const { setView, startProtocol, lastDiagnosis, user } = useApp();
  const ctx = user?.dailyContext;

  // Logic to recommend based on Context
  const recommendation = useMemo(() => {
    if (!ctx) return { 
      id: 'p-30', 
      reason: 'Protocolo padrão balanceado.' 
    };

    // Analyze Time Constraint
    const isShortTime = ctx.availableTimeDaily === '15' || ctx.availableTimeDaily === '30';
    const isLongTime = ctx.availableTimeDaily === '60' || ctx.availableTimeDaily === '90+';
    const isCommuteHeavy = ctx.commuteTime === '60+';

    // Analyze Preference
    const wantsHard = ctx.intensityPreference === 'INTENSA';
    const wantsEasy = ctx.intensityPreference === 'LEVE';

    let recId = 'p-30'; // Default
    let reason = 'Equilíbrio entre desafio e rotina.';

    // Logic Rules
    if (wantsHard && isLongTime) {
       recId = 'p-60'; // 60 Dias Brutal
       reason = 'Você tem tempo e pediu intensidade. Este é o caminho da elite.';
    } else if (isShortTime && isCommuteHeavy) {
       recId = 'p-7'; // 7 Dias Reset
       reason = 'Seu deslocamento consome energia. Comece com um reset rápido de 7 dias.';
    } else if (wantsEasy) {
       recId = 'p-morning'; // Ritual Matinal
       reason = 'Você prefere mudanças graduais. Focar na manhã é o melhor início.';
    } else if (lastDiagnosis === 'NOISE') {
       recId = 'p-15'; // Despertar Mental
       reason = 'Para eliminar o ruído mental detectado no diagnóstico.';
    } else if (lastDiagnosis === 'CHAOS') {
       recId = 'p-30'; // Reconstrução
       reason = 'O Caos exige estrutura sólida de 30 dias.';
    }

    return { id: recId, reason };
  }, [ctx, lastDiagnosis]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 pb-20 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-stone-950/90 backdrop-blur-md border-b border-stone-900 p-4 flex items-center gap-4">
        <button 
          onClick={() => user ? setView(AppView.DASHBOARD) : setView(AppView.LANDING)} 
          className="p-2 hover:bg-stone-800 rounded-lg text-stone-400"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white">Jornadas Guiadas</h2>
          <p className="text-xs text-stone-500">Sistema de Execução Estratégica</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto p-6 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Plano Adaptado
          </h1>
          <p className="text-stone-400 text-sm">
            Analisamos sua rotina (Acordar às {ctx?.wakeUpTime || '07:00'}, {ctx?.commuteTime === '0-15' ? 'pouco' : 'muito'} trânsito) e ajustamos a estratégia.
          </p>
        </div>

        {/* Contextual Banner */}
        <div className="bg-blue-900/10 border border-blue-900/30 p-4 rounded-xl flex items-start gap-3">
           <Star className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
           <div>
              <p className="text-sm font-bold text-blue-400 mb-1">Recomendação do Sistema</p>
              <p className="text-xs text-stone-300 leading-relaxed">{recommendation.reason}</p>
           </div>
        </div>

        <div className="grid gap-6">
          {PROTOCOLS.map(protocol => {
            // Check if recommended
            const isRecommended = protocol.id === recommendation.id;

            return (
              <div 
                key={protocol.id} 
                className={`relative bg-stone-900 rounded-2xl p-6 border transition-all hover:scale-[1.02] ${
                  isRecommended 
                    ? 'border-blue-500 shadow-2xl shadow-blue-900/20 ring-1 ring-blue-500/50 order-first' 
                    : 'border-stone-800 hover:border-stone-600'
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Melhor Escolha
                  </div>
                )}

                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${
                      protocol.intensity === 'Brutal' ? 'bg-red-900/20 text-red-500' :
                      protocol.intensity === 'Avançado' ? 'bg-purple-900/20 text-purple-500' :
                      'bg-blue-900/20 text-blue-500'
                    }`}>
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{protocol.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                        <span className="flex items-center gap-1"><Timer className="w-3 h-3" /> {protocol.durationDays} dias</span>
                        <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {protocol.intensity}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-stone-400 text-sm leading-relaxed mb-6">
                  {protocol.description}
                </p>

                {/* Context Adjustment Visualization */}
                {isRecommended && ctx && (
                   <div className="mb-6 space-y-2 border-t border-stone-800 pt-4">
                      <p className="text-xs font-bold text-stone-500 uppercase">Ajustes para seu dia:</p>
                      <ul className="text-xs text-stone-400 space-y-1">
                         <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-500" /> Janela de Foco: {ctx.hasJob ? 'Manhã (antes do trabalho)' : 'Tarde'}</li>
                         <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-500" /> Carga Diária: {ctx.availableTimeDaily} min</li>
                      </ul>
                   </div>
                )}

                <div className="bg-stone-950 rounded-lg p-3 mb-6 border border-stone-800">
                  <p className="text-xs text-stone-500 italic">"{protocol.dailyQuote}"</p>
                </div>

                <Button 
                  className={`w-full ${
                    protocol.intensity === 'Brutal' ? 'bg-red-900 hover:bg-red-800 border border-red-700' : ''
                  }`}
                  onClick={() => startProtocol(protocol.id)}
                >
                  Iniciar Agora
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};