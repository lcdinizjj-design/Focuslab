import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';
import { AppView, Soundscape } from '../types';
import { SOUNDSCAPES } from '../constants';
import { Play, Pause, RotateCcw, XCircle, CheckCircle2, Coffee, Brain, Volume2, VolumeX, CloudRain, Trees, Waves, Building } from 'lucide-react';

type TimerMode = 'FOCUS' | 'SHORT_BREAK' | 'LONG_BREAK';

const TIMERS = {
  FOCUS: 25 * 60,
  SHORT_BREAK: 5 * 60,
  LONG_BREAK: 15 * 60
};

const IconMap: any = {
  CloudRain, Trees, Waves, Building, Coffee
};

export const FocusMode: React.FC = () => {
  const { setView, addXp, addFocusSession, activeSoundscape, setActiveSoundscape } = useApp();
  
  // State
  const [mode, setMode] = useState<TimerMode>('FOCUS');
  const [timeLeft, setTimeLeft] = useState(TIMERS.FOCUS);
  const [isActive, setIsActive] = useState(false);
  const [task, setTask] = useState('');
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Audio Effect
  useEffect(() => {
    if (activeSoundscape && soundEnabled && isActive) {
      if (!audioElement) {
        const audio = new Audio(activeSoundscape.url);
        audio.loop = true;
        audio.play().catch(e => console.error("Audio play error", e));
        setAudioElement(audio);
      } else if (audioElement.src !== activeSoundscape.url) {
        audioElement.pause();
        const audio = new Audio(activeSoundscape.url);
        audio.loop = true;
        audio.play();
        setAudioElement(audio);
      }
    } else {
      if (audioElement) {
        audioElement.pause();
        if (!isActive) { 
           // Don't nullify if just pausing? No, stop sound when timer stops.
        }
      }
    }
    return () => {
      if (audioElement) audioElement.pause();
    };
  }, [activeSoundscape, isActive, soundEnabled]);

  const handleTimerComplete = () => {
    setIsActive(false);
    
    // Play sound
    if (soundEnabled) {
      const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
      audio.play().catch(e => console.log("Audio play failed", e));
    }

    if (mode === 'FOCUS') {
      const newCount = pomodorosCompleted + 1;
      setPomodorosCompleted(newCount);
      addXp(50); // XP reward
      
      // Save to history
      addFocusSession({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        duration: 25,
        type: 'FOCUS',
        task: task || 'Foco Livre'
      });

      if (Notification.permission === 'granted') {
        new Notification("Ciclo de Foco Concluído!", { body: "Hora de descansar a mente." });
      }

      // Auto-switch to break
      if (newCount % 4 === 0) {
        setMode('LONG_BREAK');
        setTimeLeft(TIMERS.LONG_BREAK);
      } else {
        setMode('SHORT_BREAK');
        setTimeLeft(TIMERS.SHORT_BREAK);
      }
    } else {
      // Break over, back to focus
      if (Notification.permission === 'granted') {
        new Notification("Pausa Finalizada!", { body: "Volte para o foco." });
      }
      setMode('FOCUS');
      setTimeLeft(TIMERS.FOCUS);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(TIMERS[mode]);
  };

  const changeMode = (newMode: TimerMode) => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(TIMERS[newMode]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getProgressColor = () => {
    if (mode === 'FOCUS') return 'text-blue-500';
    if (mode === 'SHORT_BREAK') return 'text-green-500';
    return 'text-purple-500';
  };

  return (
    <div className="h-full flex flex-col py-4 max-w-md mx-auto animate-fade-in pb-20">
      {/* Header / Top Bar */}
      <div className="flex items-center justify-between mb-6">
         <div className="flex items-center gap-2 bg-stone-900 px-3 py-1 rounded-full border border-stone-800">
            <CheckCircle2 className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-bold text-stone-300">{pomodorosCompleted} Ciclos hoje</span>
         </div>
         <h2 className="text-lg font-bold text-white tracking-widest">FOCUS ZONE</h2>
         <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 text-stone-500 hover:text-white">
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
         </button>
      </div>

      {/* Task Input */}
      <div className="mb-8 text-center">
        <input 
          type="text" 
          placeholder="Qual sua missão agora?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          disabled={isActive}
          className="w-full bg-transparent text-center text-xl text-white placeholder-stone-700 focus:outline-none border-b border-stone-800 focus:border-blue-500 transition-colors pb-2"
        />
      </div>

      {/* Main Timer Display */}
      <div className="relative mb-8 flex justify-center">
        <div className="text-center relative z-10">
          <h1 className={`text-8xl font-mono font-bold tracking-tighter mb-2 ${isActive ? 'text-white' : 'text-stone-500'} transition-colors`}>
            {formatTime(timeLeft)}
          </h1>
          <p className={`text-sm uppercase tracking-[0.3em] font-bold ${getProgressColor()}`}>
             {mode === 'FOCUS' ? 'Foco Profundo' : mode === 'SHORT_BREAK' ? 'Pausa Curta' : 'Recuperação'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 justify-center mb-8">
        <Button 
          size="lg" 
          onClick={toggleTimer} 
          className={`w-32 h-16 shadow-2xl text-xl ${isActive ? 'bg-stone-800 border border-stone-700' : 'bg-blue-600 hover:bg-blue-500'}`}
        >
          {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </Button>
        <Button variant="secondary" className="h-16 w-16" onClick={resetTimer}>
          <RotateCcw className="w-6 h-6" />
        </Button>
      </div>

      {/* Soundscapes */}
      <div className="mb-6">
        <p className="text-xs font-bold text-stone-500 uppercase mb-3 text-center">Ambiente Sonoro</p>
        <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
           {SOUNDSCAPES.map(sound => {
             const Icon = IconMap[sound.icon] || CloudRain;
             const isActiveSound = activeSoundscape?.id === sound.id;
             return (
               <button
                 key={sound.id}
                 onClick={() => setActiveSoundscape(isActiveSound ? null : sound)}
                 className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl border transition-all ${isActiveSound ? 'bg-blue-900/20 border-blue-500 text-blue-400' : 'bg-stone-900 border-stone-800 text-stone-500 hover:border-stone-600'}`}
               >
                 <Icon className="w-6 h-6 mb-1" />
                 <span className="text-[9px]">{sound.name}</span>
               </button>
             )
           })}
        </div>
      </div>

      {/* Mode Selectors */}
      <div className="grid grid-cols-3 gap-3 bg-stone-900 p-2 rounded-2xl border border-stone-800 mb-4">
        <button 
          onClick={() => changeMode('FOCUS')}
          className={`flex flex-col items-center justify-center py-3 rounded-xl text-xs font-bold transition-all ${mode === 'FOCUS' ? 'bg-stone-800 text-blue-500 shadow-lg' : 'text-stone-500 hover:text-stone-300'}`}
        >
          <Brain className="w-5 h-5 mb-1" />
          25 min
        </button>
        <button 
          onClick={() => changeMode('SHORT_BREAK')}
          className={`flex flex-col items-center justify-center py-3 rounded-xl text-xs font-bold transition-all ${mode === 'SHORT_BREAK' ? 'bg-stone-800 text-green-500 shadow-lg' : 'text-stone-500 hover:text-stone-300'}`}
        >
          <Coffee className="w-5 h-5 mb-1" />
          5 min
        </button>
        <button 
          onClick={() => changeMode('LONG_BREAK')}
          className={`flex flex-col items-center justify-center py-3 rounded-xl text-xs font-bold transition-all ${mode === 'LONG_BREAK' ? 'bg-stone-800 text-purple-500 shadow-lg' : 'text-stone-500 hover:text-stone-300'}`}
        >
          <Coffee className="w-5 h-5 mb-1" />
          15 min
        </button>
      </div>

      <div className="mt-auto text-center">
        <button onClick={() => setView(AppView.DASHBOARD)} className="flex items-center justify-center gap-2 text-stone-600 hover:text-red-400 transition-colors mx-auto text-sm">
          <XCircle className="w-4 h-4" /> Encerrar Sessão
        </button>
      </div>
    </div>
  );
};