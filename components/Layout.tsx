import React from 'react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';
import { Home, Book, Map, Settings, LayoutGrid, Target } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { view, setView } = useApp();

  // Views that don't have the dashboard chrome
  if ([AppView.LANDING, AppView.AUTH, AppView.FOCUS, AppView.QUIZ].includes(view)) {
    return <>{children}</>;
  }

  const NavItem = ({ icon, label, target }: { icon: any, label: string, target: AppView }) => (
    <button 
      onClick={() => setView(target)}
      className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${view === target ? 'text-blue-500' : 'text-stone-500 hover:text-stone-300'}`}
    >
      {icon}
      <span className="text-[10px] font-medium mt-1">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 flex flex-col max-w-md mx-auto shadow-2xl border-x border-stone-900 relative">
      {/* Main Content Area */}
      <main className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        {children}
      </main>

      {/* Bottom Navigation (Mobile First Design) */}
      <nav className="bg-stone-950 border-t border-stone-900 flex justify-around items-center pb-safe pt-2 px-2 sticky bottom-0 z-50 h-16">
        <NavItem icon={<Home className="w-6 h-6" />} label="Lab" target={AppView.DASHBOARD} />
        <NavItem icon={<Target className="w-6 h-6" />} label="Metas" target={AppView.PRODUCTIVITY} />
        <NavItem icon={<Map className="w-6 h-6" />} label="Jornada" target={AppView.JOURNEY} />
        <NavItem icon={<Book className="w-6 h-6" />} label="Lib" target={AppView.LIBRARY} />
        <NavItem icon={<LayoutGrid className="w-6 h-6" />} label="Habitos" target={AppView.HABITS} />
        <NavItem icon={<Settings className="w-6 h-6" />} label="Ajustes" target={AppView.SETTINGS} />
      </nav>
    </div>
  );
};