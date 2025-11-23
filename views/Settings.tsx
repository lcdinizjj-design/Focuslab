
import React from 'react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';
import { Button } from '../components/Button';
import { LogOut, ShieldCheck, User, Mail, ToggleRight, ToggleLeft, Calendar, Clock, ArrowLeft, Phone, Bell } from 'lucide-react';

export const Settings: React.FC = () => {
  const { logout, setView, user, updateNotificationPreferences, requestBrowserPermission } = useApp();

  const prefs = user?.notificationPreferences || { emailDaily: false, emailWeekly: false, browserNotifications: false };

  const handleToggle = (key: 'emailDaily' | 'emailWeekly') => {
    updateNotificationPreferences({
      ...prefs,
      [key]: !prefs[key]
    });
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      <div className="flex items-center gap-4 mb-2 sticky top-0 bg-stone-950 z-10 py-4 border-b border-stone-900">
         <button onClick={() => setView(AppView.DASHBOARD)} className="p-2 hover:bg-stone-800 rounded-lg">
           <ArrowLeft className="w-6 h-6 text-stone-400" />
         </button>
         <h2 className="text-2xl font-bold text-white">Configurações</h2>
      </div>
      
      {/* User Profile Card */}
      <div className="bg-stone-900 p-6 rounded-xl border border-stone-800 text-center">
        <div className="w-20 h-20 bg-stone-800 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-stone-700">
          <User className="w-10 h-10 text-stone-500" />
        </div>
        <h3 className="text-xl font-bold text-white">{user?.name}</h3>
        <p className="text-stone-500 text-sm mb-2">{user?.email}</p>
        {user?.phoneNumber && (
           <div className="flex items-center justify-center gap-2 text-xs text-stone-600 mb-4">
              <Phone className="w-3 h-3" /> {user.phoneNumber}
           </div>
        )}
        <div className="inline-block px-3 py-1 rounded bg-stone-950 text-blue-500 text-xs font-bold border border-stone-800">
           Nível {user?.level}
        </div>
      </div>

      {/* System Notifications */}
      <div className="bg-stone-900 rounded-xl border border-stone-800 overflow-hidden">
        <div className="p-4 border-b border-stone-800 flex items-center gap-2">
          <Bell className="w-5 h-5 text-yellow-500" />
          <h3 className="font-bold text-white text-sm">Alertas do Sistema</h3>
        </div>
        <div className="p-4">
           <div className="flex items-center justify-between">
             <div className="pr-4">
                <p className="text-white font-medium text-sm">Notificações do Navegador</p>
                <p className="text-xs text-stone-500 mt-1">Permite que o Focuslab te avise sobre início de rotinas e lembretes de hábitos mesmo minimizado.</p>
             </div>
             {prefs.browserNotifications ? (
               <div className="text-green-500 text-xs font-bold flex items-center gap-1 bg-green-900/20 px-2 py-1 rounded">
                  Ativo
               </div>
             ) : (
               <Button size="sm" onClick={requestBrowserPermission}>
                  Ativar
               </Button>
             )}
           </div>
        </div>
      </div>

      {/* Email Notifications Settings */}
      <div className="bg-stone-900 rounded-xl border border-stone-800 overflow-hidden">
        <div className="p-4 border-b border-stone-800 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-white text-sm">Notificações por Email</h3>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Daily Summary Toggle */}
          <div className="flex items-center justify-between">
             <div className="flex items-start gap-3">
                <div className="p-2 bg-stone-800 rounded-lg">
                  <Clock className="w-4 h-4 text-stone-400" />
                </div>
                <div>
                   <p className="text-white font-medium text-sm">Resumo Diário</p>
                   <p className="text-xs text-stone-500">Receba seu progresso todo dia às 20h.</p>
                </div>
             </div>
             <button 
               onClick={() => handleToggle('emailDaily')} 
               className="text-stone-400 hover:text-blue-500 transition-colors"
             >
                {prefs.emailDaily ? <ToggleRight className="w-8 h-8 text-blue-500" /> : <ToggleLeft className="w-8 h-8" />}
             </button>
          </div>

          {/* Weekly Report Toggle */}
          <div className="flex items-center justify-between">
             <div className="flex items-start gap-3">
                <div className="p-2 bg-stone-800 rounded-lg">
                  <Calendar className="w-4 h-4 text-stone-400" />
                </div>
                <div>
                   <p className="text-white font-medium text-sm">Relatório Semanal</p>
                   <p className="text-xs text-stone-500">Análise de performance todo domingo.</p>
                </div>
             </div>
             <button 
               onClick={() => handleToggle('emailWeekly')} 
               className="text-stone-400 hover:text-blue-500 transition-colors"
             >
                {prefs.emailWeekly ? <ToggleRight className="w-8 h-8 text-blue-500" /> : <ToggleLeft className="w-8 h-8" />}
             </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button variant="secondary" className="w-full justify-start" onClick={() => setView(AppView.VALIDATION)}>
          <ShieldCheck className="w-5 h-5 mr-2" /> Relatório de Validação
        </Button>
        
        <Button variant="danger" className="w-full justify-start" onClick={logout}>
          <LogOut className="w-5 h-5 mr-2" /> Sair da Conta
        </Button>
      </div>
      
      <div className="pt-8 text-center text-xs text-stone-600">
        Focuslab v1.2.0 MVP
      </div>
    </div>
  );
};
