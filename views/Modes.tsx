import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppView, ModeType, MonkModeSettings } from '../types';
import { Button } from '../components/Button';
import { 
  Shield, 
  Swords, 
  ArrowLeft, 
  BellOff, 
  Globe, 
  Smartphone, 
  CheckCircle, 
  Lock,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  Plus,
  X,
  Flame,
  Zap,
  Target,
  Skull,
  Radio
} from 'lucide-react';

export const Modes: React.FC = () => {
  const { 
    user, 
    setMode, 
    setView, 
    monkModeSettings, 
    updateMonkModeSettings,
    blockedSites,
    updateBlockedSites 
  } = useApp();
  
  const [selectedMode, setSelectedMode] = useState<ModeType>(user?.mode === ModeType.DEFAULT ? ModeType.MONK : user?.mode || ModeType.MONK);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [newSiteInput, setNewSiteInput] = useState('');

  const toggleSetting = (key: keyof MonkModeSettings) => {
    updateMonkModeSettings({
      ...monkModeSettings,
      [key]: !monkModeSettings[key]
    });
  };

  const handleAddSite = () => {
    if (newSiteInput.trim()) {
      const cleanSite = newSiteInput.replace(/(^\w+:|^)\/\//, '').trim();
      if (!blockedSites.includes(cleanSite)) {
        updateBlockedSites([...blockedSites, cleanSite]);
      }
      setNewSiteInput('');
    }
  };

  const handleRemoveSite = (siteToRemove: string) => {
    updateBlockedSites(blockedSites.filter(site => site !== siteToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSite();
    }
  };

  const handleActivate = () => {
    if (user?.mode === ModeType.MONK && selectedMode !== ModeType.MONK) {
      setShowExitConfirmation(true);
      return;
    }
    setMode(selectedMode);
  };

  const confirmExitMonkMode = () => {
    setMode(selectedMode);
    setShowExitConfirmation(false);
  };

  const isCurrentMode = user?.mode === selectedMode;

  // --- Render Helpers for distinct UI ---

  const renderMonkMode = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Monk Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-stone-950 to-black border border-purple-500/30 p-6 rounded-3xl text-center shadow-2xl shadow-purple-900/20 group">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-[80px] group-hover:bg-purple-600/30 transition-all duration-700"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)] group-hover:scale-105 transition-transform duration-500">
            <Shield className="w-10 h-10 text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2 tracking-tight font-serif italic">O Claustro</h3>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-200 text-[10px] font-bold uppercase tracking-widest mb-4">
             <Radio className="w-3 h-3 animate-pulse" /> Alta Restrição
          </div>
          <p className="text-purple-100/70 text-sm leading-relaxed max-w-xs">
            Silêncio absoluto. Elimine o ruído do mundo para ouvir seus próprios pensamentos. 
            Ideal para <strong>Deep Work</strong> e clareza espiritual.
          </p>
        </div>
      </div>

      {/* Monk Settings */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-bold text-purple-500/70 uppercase tracking-widest px-2">Configurações do Voto</h4>
        
        {/* Block Notifications */}
        <div onClick={() => toggleSetting('blockNotifications')} className="cursor-pointer bg-stone-900/80 rounded-xl p-4 border border-stone-800 hover:border-purple-500/50 transition-all flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-stone-950 rounded-lg border border-stone-800 group-hover:border-purple-500/30 transition-colors">
               <BellOff className="w-5 h-5 text-stone-500 group-hover:text-purple-400 transition-colors" />
            </div>
            <div>
              <p className="text-stone-200 font-bold text-sm group-hover:text-purple-100">Silêncio Digital</p>
              <p className="text-xs text-stone-500">Bloquear todas notificações</p>
            </div>
          </div>
          <div className={`w-10 h-6 rounded-full relative transition-colors duration-300 ${monkModeSettings.blockNotifications ? 'bg-purple-600' : 'bg-stone-700'}`}>
            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${monkModeSettings.blockNotifications ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
        </div>

        {/* Block Sites */}
        <div className={`bg-stone-900/80 rounded-xl border transition-all duration-300 overflow-hidden ${monkModeSettings.blockSocialMedia ? 'border-purple-500/40' : 'border-stone-800 hover:border-purple-500/20'}`}>
          <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => toggleSetting('blockSocialMedia')}>
            <div className="flex items-center gap-4">
               <div className="p-2.5 bg-stone-950 rounded-lg border border-stone-800">
                  <Globe className={`w-5 h-5 transition-colors ${monkModeSettings.blockSocialMedia ? 'text-purple-400' : 'text-stone-500'}`} />
               </div>
              <div>
                <p className="text-stone-200 font-bold text-sm">Muralha de Fogo</p>
                <p className="text-xs text-stone-500">
                  {monkModeSettings.blockSocialMedia ? `${blockedSites.length} sites bloqueados` : 'Bloqueador desligado'}
                </p>
              </div>
            </div>
            <div className={`w-10 h-6 rounded-full relative transition-colors duration-300 ${monkModeSettings.blockSocialMedia ? 'bg-purple-600' : 'bg-stone-700'}`}>
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${monkModeSettings.blockSocialMedia ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
          </div>
          
          {monkModeSettings.blockSocialMedia && (
            <div className="px-4 pb-4 pt-0 animate-fade-in">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-900/50 to-transparent mb-4"></div>
              <div className="flex gap-2 mb-3">
                <input 
                  type="text" 
                  placeholder="bloquear site..."
                  className="flex-1 bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 placeholder-stone-600 font-mono"
                  value={newSiteInput}
                  onChange={(e) => setNewSiteInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button 
                  onClick={handleAddSite}
                  className="bg-purple-600 hover:bg-purple-500 text-white rounded-lg px-3 flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {blockedSites.map((site, index) => (
                  <div key={index} className="flex items-center gap-2 bg-purple-900/20 px-3 py-1 rounded border border-purple-500/20 text-xs text-purple-200">
                    <span>{site}</span>
                    <button onClick={() => handleRemoveSite(site)} className="hover:text-white"><X className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Grayscale */}
        <div onClick={() => toggleSetting('grayscale')} className="cursor-pointer bg-stone-900/80 rounded-xl p-4 border border-stone-800 hover:border-purple-500/50 transition-all flex items-center justify-between group">
          <div className="flex items-center gap-4">
             <div className="p-2.5 bg-stone-950 rounded-lg border border-stone-800 group-hover:border-purple-500/30 transition-colors">
               <Smartphone className="w-5 h-5 text-stone-500 group-hover:text-purple-400 transition-colors" />
             </div>
            <div>
              <p className="text-stone-200 font-bold text-sm group-hover:text-purple-100">Visão Monocromática</p>
              <p className="text-xs text-stone-500">Reduz dopamina visual</p>
            </div>
          </div>
          <div className={`w-10 h-6 rounded-full relative transition-colors duration-300 ${monkModeSettings.grayscale ? 'bg-purple-600' : 'bg-stone-700'}`}>
            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${monkModeSettings.grayscale ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderWarriorMode = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Warrior Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-950 via-stone-950 to-black border border-red-600/30 p-6 rounded-3xl text-center shadow-2xl shadow-red-900/20 group">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-red-600/10 rounded-full blur-[80px] group-hover:bg-red-600/20 transition-all duration-500"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30 shadow-[0_0_30px_rgba(220,38,38,0.2)] group-hover:rotate-3 transition-transform duration-300">
            <Swords className="w-10 h-10 text-red-500 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2 tracking-tight uppercase italic">Arena</h3>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/30 border border-red-500/30 text-red-300 text-[10px] font-bold uppercase tracking-widest mb-4">
             <Flame className="w-3 h-3" /> Energia Extrema
          </div>
          <p className="text-red-100/70 text-sm leading-relaxed max-w-xs">
             Ataque massivo. Foco em volume de execução e intensidade. 
             Perfeito para dias de prazo curto onde a perfeição é inimiga da entrega.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
         <div className="bg-stone-900/60 border border-stone-800 p-4 rounded-2xl text-center group hover:border-red-500/40 transition-colors">
            <Skull className="w-6 h-6 text-stone-600 group-hover:text-red-500 mx-auto mb-2 transition-colors" />
            <h4 className="font-bold text-white text-sm">Intensidade</h4>
            <p className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">Máxima</p>
         </div>
         <div className="bg-stone-900/60 border border-stone-800 p-4 rounded-2xl text-center group hover:border-red-500/40 transition-colors">
            <Zap className="w-6 h-6 text-stone-600 group-hover:text-yellow-500 mx-auto mb-2 transition-colors" />
            <h4 className="font-bold text-white text-sm">Pausas</h4>
            <p className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">Mínimas</p>
         </div>
      </div>

      <div className="p-5 rounded-2xl bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800">
         <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-3">Regras de Combate</h4>
         <ul className="space-y-3 text-sm text-stone-400">
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_rgba(220,38,38,0.8)]"></div> 
              Pomodoros estendidos (50/10)
            </li>
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_rgba(220,38,38,0.8)]"></div> 
              Música de alta BPM permitida
            </li>
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_rgba(220,38,38,0.8)]"></div> 
              Multitarefa tática (se necessário)
            </li>
         </ul>
      </div>
    </div>
  );

  const renderBunkerMode = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Bunker Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-cyan-950 via-stone-950 to-black border border-cyan-500/30 p-6 rounded-3xl text-center shadow-2xl shadow-cyan-900/20 group">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-cyan-900/10 to-transparent opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-cyan-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)] group-hover:border-cyan-400/50 transition-colors duration-500">
            <Lock className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2 tracking-tight font-mono">BUNKER_V1</h3>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-200 text-[10px] font-bold uppercase tracking-widest mb-4">
             <Shield className="w-3 h-3" /> Isolamento Total
          </div>
          <p className="text-cyan-100/70 text-sm leading-relaxed max-w-xs">
             Protocolo de emergência. Nada entra, nada sai. O mundo externo deixa de existir.
             Recomendado apenas para crises ou prazos finais críticos.
          </p>
        </div>
      </div>

      <div className="bg-stone-950 border border-stone-800 rounded-2xl p-6 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
         <div className="flex items-start gap-5 relative z-10">
            <div className="p-3 bg-cyan-950/30 rounded-xl border border-cyan-900/50">
               <Target className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
            <div>
               <h4 className="font-bold text-white mb-1 font-mono text-sm">ESTADO DE SÍTIO</h4>
               <p className="text-sm text-stone-400 leading-relaxed">
                  Neste modo, sugerimos ativar o "Modo Avião" físico do seu celular. Avise familiares antes de entrar. Não há pausas programadas.
               </p>
            </div>
         </div>
      </div>
    </div>
  );

  // --- Styles for Tabs based on Selection ---
  const getTabStyle = (mode: ModeType) => {
    const base = "flex-1 py-4 rounded-xl text-xs font-bold transition-all duration-300 flex flex-col items-center gap-2 border";
    
    if (selectedMode === mode) {
       if (mode === ModeType.MONK) return `${base} bg-purple-600/20 border-purple-500 text-purple-200 shadow-[0_0_20px_rgba(147,51,234,0.15)]`;
       if (mode === ModeType.WARRIOR) return `${base} bg-red-600/20 border-red-500 text-red-200 shadow-[0_0_20px_rgba(220,38,38,0.15)]`;
       if (mode === ModeType.BUNKER) return `${base} bg-cyan-600/20 border-cyan-500 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.15)]`;
    }
    
    return `${base} bg-stone-900/50 border-transparent text-stone-500 hover:bg-stone-900 hover:text-stone-300`;
  };

  const getActionButtonStyle = () => {
     if (isCurrentMode) return "bg-stone-900 border-stone-800 text-stone-500 cursor-not-allowed";
     if (selectedMode === ModeType.MONK) return "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_30px_rgba(147,51,234,0.4)] border-purple-400";
     if (selectedMode === ModeType.WARRIOR) return "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_30px_rgba(220,38,38,0.4)] border-red-400";
     if (selectedMode === ModeType.BUNKER) return "bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] border-cyan-400";
     return "bg-stone-800";
  };

  return (
    <div className="space-y-6 pb-24 h-full flex flex-col relative">
      <div className="flex items-center gap-4 sticky top-0 bg-stone-950/90 backdrop-blur-md z-20 py-4 border-b border-stone-900">
        <button onClick={() => setView(AppView.DASHBOARD)} className="p-2 hover:bg-stone-800 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6 text-stone-400" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Modos de Operação</h2>
          <p className="text-xs text-stone-500">Escolha sua estratégia de batalha.</p>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex gap-3 p-1">
        <button onClick={() => setSelectedMode(ModeType.MONK)} className={getTabStyle(ModeType.MONK)}>
          <Shield className={`w-5 h-5 ${selectedMode === ModeType.MONK ? 'text-purple-400' : 'text-stone-600'}`} /> 
          MONGE
        </button>
        <button onClick={() => setSelectedMode(ModeType.WARRIOR)} className={getTabStyle(ModeType.WARRIOR)}>
          <Swords className={`w-5 h-5 ${selectedMode === ModeType.WARRIOR ? 'text-red-500' : 'text-stone-600'}`} /> 
          GUERREIRO
        </button>
        <button onClick={() => setSelectedMode(ModeType.BUNKER)} className={getTabStyle(ModeType.BUNKER)}>
          <Lock className={`w-5 h-5 ${selectedMode === ModeType.BUNKER ? 'text-cyan-400' : 'text-stone-600'}`} /> 
          BUNKER
        </button>
      </div>

      {/* Mode Content */}
      <div className="flex-1 overflow-y-auto pb-4 scrollbar-hide">
        {selectedMode === ModeType.MONK && renderMonkMode()}
        {selectedMode === ModeType.WARRIOR && renderWarriorMode()}
        {selectedMode === ModeType.BUNKER && renderBunkerMode()}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 left-0 right-0 p-6 bg-gradient-to-t from-stone-950 via-stone-950/90 to-transparent pointer-events-none z-30">
        <div className="max-w-md mx-auto pointer-events-auto">
         <Button 
            className={`w-full py-4 text-lg font-bold uppercase tracking-wider transition-all duration-300 border-t ${getActionButtonStyle()}`}
            onClick={handleActivate}
            disabled={isCurrentMode}
         >
            {isCurrentMode ? (
               <span className="flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" /> Modo Ativo</span>
            ) : (
               `Ativar ${selectedMode === ModeType.MONK ? 'Protocolo Monge' : selectedMode === ModeType.WARRIOR ? 'Modo Guerreiro' : 'Bunker'}`
            )}
         </Button>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirmation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-stone-900 border border-red-900/50 p-6 rounded-2xl max-w-sm w-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent"></div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-900/20 flex items-center justify-center mb-4 animate-pulse border border-red-500/20">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Quebrar o Voto?</h3>
              <p className="text-stone-400 text-sm mb-8 leading-relaxed">
                Você está no <strong>Modo Monge</strong>. Sair agora quebrará seu streak de disciplina e permitirá que o ruído volte.
              </p>
              <div className="flex gap-3 w-full">
                <Button variant="secondary" onClick={() => setShowExitConfirmation(false)} className="flex-1 py-3">
                  Manter Foco
                </Button>
                <Button variant="danger" onClick={confirmExitMonkMode} className="flex-1 py-3 bg-red-900/50 hover:bg-red-900 border-red-800">
                  Sair Agora
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};