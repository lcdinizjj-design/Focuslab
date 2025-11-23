
import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, Info, AlertTriangle, AlertOctagon } from 'lucide-react';

export const NotificationSystem: React.FC = () => {
  const { appNotifications, removeNotification } = useApp();

  if (appNotifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-xs pointer-events-none">
      {appNotifications.map((notif) => (
        <div 
          key={notif.id}
          className={`pointer-events-auto transform transition-all duration-300 animate-fade-in
            flex items-start p-4 rounded-xl border shadow-2xl backdrop-blur-md
            ${notif.type === 'SUCCESS' ? 'bg-green-900/80 border-green-500/50 text-green-100' : 
              notif.type === 'WARNING' ? 'bg-yellow-900/80 border-yellow-500/50 text-yellow-100' : 
              notif.type === 'ERROR' ? 'bg-red-900/80 border-red-500/50 text-red-100' : 
              'bg-stone-900/80 border-blue-500/50 text-blue-100'}
          `}
        >
          <div className="shrink-0 mr-3 mt-0.5">
             {notif.type === 'SUCCESS' && <CheckCircle className="w-5 h-5 text-green-400" />}
             {notif.type === 'WARNING' && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
             {notif.type === 'ERROR' && <AlertOctagon className="w-5 h-5 text-red-400" />}
             {notif.type === 'INFO' && <Info className="w-5 h-5 text-blue-400" />}
          </div>
          <div className="flex-1">
             <h4 className="text-sm font-bold mb-1">{notif.title}</h4>
             <p className="text-xs opacity-90 leading-relaxed">{notif.message}</p>
          </div>
          <button 
            onClick={() => removeNotification(notif.id)}
            className="ml-2 text-white/50 hover:text-white shrink-0"
          >
             <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
