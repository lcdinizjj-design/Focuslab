import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppView, UserContext } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Clock, Briefcase, MapPin, Coffee, Zap, CheckCircle } from 'lucide-react';

export const ContextQuiz: React.FC = () => {
  const { setView, updateUserContext } = useApp();
  const [step, setStep] = useState(0);
  
  // Initial state matching the UserContext interface
  const [formData, setFormData] = useState<UserContext>({
    wakeUpTime: '07:00',
    hasJob: true,
    jobShift: 'INTEGRAL',
    isStudent: false,
    commuteTime: '15-30',
    lunchTime: '12:00',
    availableTimeDaily: '45',
    intensityPreference: 'MODERADA'
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Finish and save
      updateUserContext(formData);
      setView(AppView.PROTOCOL_SELECTOR);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else setView(AppView.QUIZ);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6 animate-fade-in">
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-500" /> Rotina Matinal
             </h3>
             
             <div>
                <label className="block text-sm font-medium text-stone-400 mb-2">Que horas você costuma acordar?</label>
                <input 
                  type="time" 
                  value={formData.wakeUpTime}
                  onChange={e => setFormData({...formData, wakeUpTime: e.target.value})}
                  className="w-full bg-stone-900 border border-stone-800 p-4 rounded-xl text-white text-2xl text-center focus:border-blue-500 outline-none"
                />
             </div>
             
             <div>
                <label className="block text-sm font-medium text-stone-400 mb-2">Horário médio de almoço?</label>
                <input 
                  type="time" 
                  value={formData.lunchTime}
                  onChange={e => setFormData({...formData, lunchTime: e.target.value})}
                  className="w-full bg-stone-900 border border-stone-800 p-4 rounded-xl text-white text-2xl text-center focus:border-blue-500 outline-none"
                />
             </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-blue-500" /> Ocupação
             </h3>

             <div className="space-y-3">
                <label className="flex items-center justify-between p-4 bg-stone-900 border border-stone-800 rounded-xl cursor-pointer hover:border-blue-500">
                   <span className="text-white font-medium">Trabalha atualmente?</span>
                   <input type="checkbox" checked={formData.hasJob} onChange={e => setFormData({...formData, hasJob: e.target.checked})} className="w-5 h-5 accent-blue-500" />
                </label>

                {formData.hasJob && (
                  <div className="grid grid-cols-2 gap-2 pl-4 border-l-2 border-stone-800">
                     {['MANHA', 'TARDE', 'NOITE', 'INTEGRAL'].map(shift => (
                        <button
                          key={shift}
                          onClick={() => setFormData({...formData, jobShift: shift as any})}
                          className={`p-2 rounded-lg text-xs font-bold ${formData.jobShift === shift ? 'bg-blue-600 text-white' : 'bg-stone-900 text-stone-500'}`}
                        >
                           {shift}
                        </button>
                     ))}
                  </div>
                )}

                <label className="flex items-center justify-between p-4 bg-stone-900 border border-stone-800 rounded-xl cursor-pointer hover:border-blue-500">
                   <span className="text-white font-medium">Você estuda?</span>
                   <input type="checkbox" checked={formData.isStudent} onChange={e => setFormData({...formData, isStudent: e.target.checked})} className="w-5 h-5 accent-blue-500" />
                </label>
             </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="w-6 h-6 text-blue-500" /> Logística
             </h3>
             
             <div className="space-y-2">
                <p className="text-sm text-stone-400">Tempo total de deslocamento (ida + volta):</p>
                {['0-15', '15-30', '30-60', '60+'].map(time => (
                   <button 
                      key={time}
                      onClick={() => setFormData({...formData, commuteTime: time as any})}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        formData.commuteTime === time 
                          ? 'bg-blue-900/20 border-blue-500 text-white' 
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:bg-stone-800'
                      }`}
                   >
                      {time === '60+' ? 'Mais de 1 hora' : `${time} minutos`}
                   </button>
                ))}
             </div>
          </div>
        );
      case 3:
         return (
           <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 <Coffee className="w-6 h-6 text-blue-500" /> Disponibilidade
              </h3>
              
              <div className="space-y-2">
                 <p className="text-sm text-stone-400">Tempo REAL disponível para o programa por dia:</p>
                 {['15', '30', '45', '60', '90+'].map(time => (
                    <button 
                       key={time}
                       onClick={() => setFormData({...formData, availableTimeDaily: time as any})}
                       className={`w-full p-4 rounded-xl border text-left transition-all ${
                         formData.availableTimeDaily === time 
                           ? 'bg-blue-900/20 border-blue-500 text-white' 
                           : 'bg-stone-900 border-stone-800 text-stone-400 hover:bg-stone-800'
                       }`}
                    >
                       {time === '90+' ? 'Mais de 90 min' : `${time} minutos`}
                    </button>
                 ))}
              </div>
           </div>
         );
      case 4:
         return (
           <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 <Zap className="w-6 h-6 text-blue-500" /> Intensidade
              </h3>
              
              <div className="space-y-3">
                 <p className="text-sm text-stone-400">Como você prefere sua nova rotina?</p>
                 
                 <button 
                    onClick={() => setFormData({...formData, intensityPreference: 'LEVE'})}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${formData.intensityPreference === 'LEVE' ? 'bg-blue-900/20 border-blue-500' : 'bg-stone-900 border-stone-800'}`}
                 >
                    <span className="font-bold text-white block">Leve & Gradual</span>
                    <span className="text-xs text-stone-500">Pequenas mudanças, sem choque.</span>
                 </button>
                 
                 <button 
                    onClick={() => setFormData({...formData, intensityPreference: 'MODERADA'})}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${formData.intensityPreference === 'MODERADA' ? 'bg-blue-900/20 border-blue-500' : 'bg-stone-900 border-stone-800'}`}
                 >
                    <span className="font-bold text-white block">Moderada (Recomendado)</span>
                    <span className="text-xs text-stone-500">Desafiadora, mas sustentável.</span>
                 </button>

                 <button 
                    onClick={() => setFormData({...formData, intensityPreference: 'INTENSA'})}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${formData.intensityPreference === 'INTENSA' ? 'bg-blue-900/20 border-blue-500' : 'bg-stone-900 border-stone-800'}`}
                 >
                    <span className="font-bold text-white block">Intensa & Brutal</span>
                    <span className="text-xs text-stone-500">Mudança radical. Doa a quem doer.</span>
                 </button>
              </div>
           </div>
         );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col">
       {/* Header */}
       <div className="p-6 border-b border-stone-900 flex items-center gap-4">
          <button onClick={handleBack} className="p-2 rounded-lg hover:bg-stone-800 text-stone-400">
             <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
             <div className="h-1 w-full bg-stone-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 ease-out" style={{ width: `${((step + 1) / 5) * 100}%` }}></div>
             </div>
          </div>
          <span className="text-xs font-bold text-stone-500">{step + 1}/5</span>
       </div>

       {/* Content */}
       <div className="flex-1 p-6 max-w-md mx-auto w-full flex flex-col justify-center">
          <div className="mb-8">
             <h2 className="text-2xl font-bold text-white mb-2">Ajuste de Realidade</h2>
             <p className="text-stone-400 text-sm">Vamos adaptar o plano para que ele caiba no seu dia, e não o contrário.</p>
          </div>
          
          {renderStep()}

          <div className="mt-10">
             <Button onClick={handleNext} className="w-full py-4 shadow-lg shadow-blue-900/20">
                {step === 4 ? 'Gerar Meu Protocolo' : 'Próximo Passo'}
             </Button>
          </div>
       </div>
    </div>
  );
};