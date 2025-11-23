
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { AppView, User, ModeType, Habit, JourneyDay, MicroContent, MonkModeSettings, SmartGoal, FocusSession, ActiveProtocol, ProtocolDefinition, ProtocolTask, Mission, Badge, JournalEntry, BigWhyType, Soundscape, UserContext, CustomRoutine, NotificationPreferences, AppNotification } from '../types';
import { generateMicroContents, INITIAL_HABITS, JOURNEY_DATA, LEVEL_THRESHOLDS, PROTOCOLS, INITIAL_MISSIONS, BADGES, SOUNDSCAPES } from '../constants';
import { StorageService } from '../services/storage';

interface AppContextType {
  user: User | null;
  view: AppView;
  setView: (view: AppView) => void;
  habits: Habit[];
  journey: JourneyDay[];
  contents: MicroContent[];
  login: (name: string, email: string, phoneNumber?: string) => void;
  logout: () => void;
  toggleHabit: (id: string) => void;
  completeJourneyDay: (index: number) => void;
  toggleContentRead: (id: number) => void;
  deleteContent: (id: number) => void;
  updateContent: (content: MicroContent) => void;
  monkModeSettings: MonkModeSettings;
  updateMonkModeSettings: (settings: MonkModeSettings) => void;
  blockedSites: string[];
  updateBlockedSites: (sites: string[]) => void;
  setMode: (mode: ModeType) => void;
  addXp: (amount: number) => void;
  smartGoals: SmartGoal[];
  addSmartGoal: (goal: SmartGoal) => void;
  toggleSmartGoalComplete: (id: string) => void;
  deleteSmartGoal: (id: string) => void;
  focusHistory: FocusSession[];
  addFocusSession: (session: FocusSession) => void;
  activeProtocol: ActiveProtocol | null;
  startProtocol: (protocolId: string) => void;
  completeProtocolTask: (taskId: string) => void;
  checkDailyProtocolProgress: () => void;
  missions: Mission[];
  completeMission: (id: string) => void;
  badges: Badge[];
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => void;
  lastDiagnosis: string | null;
  setLastDiagnosis: (d: string) => void;
  setBigWhy: (reason: BigWhyType) => void;
  activeSoundscape: Soundscape | null;
  setActiveSoundscape: (s: Soundscape | null) => void;
  updateUserContext: (ctx: UserContext) => void;
  customRoutines: CustomRoutine[];
  addCustomRoutine: (routine: CustomRoutine) => void;
  deleteCustomRoutine: (id: string) => void;
  toggleRoutineActive: (id: string) => void;
  updateNotificationPreferences: (prefs: NotificationPreferences) => void;
  // Notificações
  appNotifications: AppNotification[];
  addNotification: (title: string, message: string, type?: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR') => void;
  removeNotification: (id: string) => void;
  requestBrowserPermission: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // -- State Initialization --
  const [user, setUser] = useState<User | null>(StorageService.get('user', null));
  const [view, setView] = useState<AppView>(StorageService.get('view', AppView.LANDING));
  
  const [habits, setHabits] = useState<Habit[]>(StorageService.get('habits', INITIAL_HABITS));
  const [journey, setJourney] = useState<JourneyDay[]>(StorageService.get('journey', JOURNEY_DATA));
  const [contents, setContents] = useState<MicroContent[]>(StorageService.get('contents', generateMicroContents()));
  
  const [monkModeSettings, setMonkModeSettings] = useState<MonkModeSettings>(StorageService.get('monkSettings', {
    blockNotifications: false,
    blockSocialMedia: false,
    blockNews: false,
    grayscale: false
  }));
  const [blockedSites, setBlockedSites] = useState<string[]>(StorageService.get('blockedSites', []));

  const [smartGoals, setSmartGoals] = useState<SmartGoal[]>(StorageService.get('smartGoals', []));
  const [focusHistory, setFocusHistory] = useState<FocusSession[]>(StorageService.get('focusHistory', []));
  
  const [activeProtocol, setActiveProtocol] = useState<ActiveProtocol | null>(StorageService.get('activeProtocol', null));
  
  const [missions, setMissions] = useState<Mission[]>(StorageService.get('missions', INITIAL_MISSIONS));
  const [badges, setBadges] = useState<Badge[]>(StorageService.get('badges', BADGES));
  
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(StorageService.get('journalEntries', []));
  
  const [lastDiagnosis, setLastDiagnosis] = useState<string | null>(StorageService.get('lastDiagnosis', null));
  
  const [activeSoundscape, setActiveSoundscapeState] = useState<Soundscape | null>(null);

  const [customRoutines, setCustomRoutines] = useState<CustomRoutine[]>(StorageService.get('customRoutines', []));

  const [appNotifications, setAppNotifications] = useState<AppNotification[]>([]);
  
  // Ref to prevent duplicate notifications in strict mode
  const lastNotificationTimeRef = useRef<Record<string, number>>({});

  // -- Persistence Effects --
  useEffect(() => { StorageService.save('user', user); }, [user]);
  useEffect(() => { StorageService.save('view', view); }, [view]);
  useEffect(() => { StorageService.save('habits', habits); }, [habits]);
  useEffect(() => { StorageService.save('journey', journey); }, [journey]);
  useEffect(() => { StorageService.save('contents', contents); }, [contents]);
  useEffect(() => { StorageService.save('monkSettings', monkModeSettings); }, [monkModeSettings]);
  useEffect(() => { StorageService.save('blockedSites', blockedSites); }, [blockedSites]);
  useEffect(() => { StorageService.save('smartGoals', smartGoals); }, [smartGoals]);
  useEffect(() => { StorageService.save('focusHistory', focusHistory); }, [focusHistory]);
  useEffect(() => { StorageService.save('activeProtocol', activeProtocol); }, [activeProtocol]);
  useEffect(() => { StorageService.save('missions', missions); }, [missions]);
  useEffect(() => { StorageService.save('badges', badges); }, [badges]);
  useEffect(() => { StorageService.save('journalEntries', journalEntries); }, [journalEntries]);
  useEffect(() => { StorageService.save('lastDiagnosis', lastDiagnosis); }, [lastDiagnosis]);
  useEffect(() => { StorageService.save('customRoutines', customRoutines); }, [customRoutines]);

  // -- Actions --

  const addNotification = (title: string, message: string, type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' = 'INFO') => {
    // In-App Toast
    const id = Date.now().toString();
    setAppNotifications(prev => [...prev, { id, title, message, type, timestamp: Date.now() }]);
    
    // Auto remove toast after 5s
    setTimeout(() => {
      setAppNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);

    // Browser Notification (if enabled and allowed)
    if (user?.notificationPreferences?.browserNotifications && Notification.permission === 'granted') {
       // Verify Monk Mode
       if (monkModeSettings.blockNotifications) return;
       
       try {
         new Notification(title, { body: message, icon: '/favicon.ico' });
       } catch (e) {
         console.log('Browser notification failed', e);
       }
    }
  };

  const removeNotification = (id: string) => {
    setAppNotifications(prev => prev.filter(n => n.id !== id));
  };

  const requestBrowserPermission = () => {
     if (!('Notification' in window)) {
       alert('Este navegador não suporta notificações.');
       return;
     }
     Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
           addNotification('Notificações Ativadas', 'Você receberá alertas de suas rotinas.', 'SUCCESS');
           if (user) {
              setUser({ 
                 ...user, 
                 notificationPreferences: { ...user.notificationPreferences!, browserNotifications: true }
              });
           }
        }
     });
  };

  // -- Scheduler Logic (The "System" of alerts) --
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      const currentDayIndex = now.getDay(); // 0 = Sunday
      const lastTimes = lastNotificationTimeRef.current;

      // Prevent spamming the same minute
      if (lastTimes['global_check'] === now.getMinutes()) return;
      lastNotificationTimeRef.current['global_check'] = now.getMinutes();

      // 1. Check Custom Routines
      customRoutines.forEach(routine => {
         if (routine.isActive && routine.startTime === currentTime && routine.daysOfWeek.includes(currentDayIndex)) {
            addNotification(`Rotina: ${routine.title}`, 'Está na hora de iniciar seu ritual.', 'INFO');
         }
      });

      // 2. Check Habits (Static Times for MVP)
      // Morning Reminder (08:00)
      if (currentTime === '08:00') {
         const morningHabits = habits.filter(h => h.type === 'morning' && !h.completed);
         if (morningHabits.length > 0) {
            addNotification('Ritual Matinal Incompleto', `Você ainda tem ${morningHabits.length} hábitos matinais pendentes.`, 'WARNING');
         }
      }

      // Night Reminder (22:00)
      if (currentTime === '22:00') {
         addNotification('Ritual Noturno', 'Hora de desconectar e preparar para o sono.', 'INFO');
      }

      // 3. Check Protocol (Check-in Reminder at 18:00)
      if (currentTime === '18:00' && activeProtocol) {
         const todayTasks = activeProtocol.history.find(h => h.day === activeProtocol.currentDay)?.tasks || [];
         const pending = todayTasks.filter(t => !t.completed).length;
         if (pending > 0) {
            addNotification('Protocolo Diário', `Não deixe o dia acabar sem terminar suas ${pending} tarefas.`, 'WARNING');
         }
      }

    }, 30000); // Check every 30 seconds to catch the minute change reliably

    return () => clearInterval(interval);
  }, [customRoutines, habits, activeProtocol, user, monkModeSettings]);

  // -- Existing Logic --

  const login = (name: string, email: string, phoneNumber?: string) => {
    const newUser: User = {
      name,
      email,
      phoneNumber,
      level: 1,
      xp: 0,
      streak: 0,
      coins: 0,
      mode: ModeType.DEFAULT,
      onboardingComplete: true,
      joinedDate: new Date().toISOString(),
      notificationPreferences: {
        emailDaily: true,
        emailWeekly: true,
        browserNotifications: false
      }
    };
    setUser(newUser);
    
    const previousDiagnosis = StorageService.get('lastDiagnosis', null);
    if (previousDiagnosis) {
        setView(AppView.DASHBOARD);
    } else {
        setView(AppView.DASHBOARD);
    }
  };

  const logout = () => {
    setUser(null);
    setView(AppView.LANDING);
    StorageService.clear();
  };

  const addXp = (amount: number) => {
    if (!user) return;
    const newXp = user.xp + amount;
    const newLevel = Math.floor(newXp / 1000) + 1; 
    
    if (newLevel > user.level) {
      addNotification('Level Up!', `Você alcançou o nível ${newLevel}!`, 'SUCCESS');
    }

    setUser({ ...user, xp: newXp, level: newLevel });
  };

  const toggleHabit = (id: string) => {
    const updated = habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h);
    setHabits(updated);
    if (updated.find(h => h.id === id)?.completed) {
      addXp(10);
    }
  };

  const completeJourneyDay = (index: number) => {
    const updated = [...journey];
    updated[index].completed = true;
    if (index + 1 < updated.length) {
      updated[index + 1].locked = false;
    }
    setJourney(updated);
    addXp(100);
    addNotification('Dia Concluído', 'Excelente progresso na jornada.', 'SUCCESS');
  };

  const toggleContentRead = (id: number) => {
    const updated = contents.map(c => c.id === id ? { ...c, read: !c.read } : c);
    setContents(updated);
    if (updated.find(c => c.id === id)?.read) addXp(20);
  };

  const deleteContent = (id: number) => {
      setContents(contents.filter(c => c.id !== id));
  };

  const updateContent = (content: MicroContent) => {
      setContents(contents.map(c => c.id === content.id ? content : c));
  };

  const updateMonkModeSettings = (settings: MonkModeSettings) => {
    setMonkModeSettings(settings);
  };

  const updateBlockedSites = (sites: string[]) => {
    setBlockedSites(sites);
  };

  const setMode = (mode: ModeType) => {
    if (user) setUser({ ...user, mode });
    addNotification('Modo Alterado', `Você entrou no modo ${mode}.`, 'INFO');
  };

  const addSmartGoal = (goal: SmartGoal) => {
    setSmartGoals([...smartGoals, goal]);
    addXp(50);
    addNotification('Meta Criada', 'Objetivo definido com sucesso.', 'SUCCESS');
  };

  const toggleSmartGoalComplete = (id: string) => {
    const updated = smartGoals.map(g => g.id === id ? { ...g, completed: !g.completed, progress: g.completed ? 0 : 100 } : g);
    setSmartGoals(updated);
    if (updated.find(g => g.id === id)?.completed) {
       addXp(200);
       addNotification('Meta Atingida', 'Parabéns pela conquista!', 'SUCCESS');
    }
  };

  const deleteSmartGoal = (id: string) => {
    setSmartGoals(smartGoals.filter(g => g.id !== id));
  };

  const addFocusSession = (session: FocusSession) => {
    setFocusHistory([session, ...focusHistory]);
  };

  const startProtocol = (protocolId: string) => {
    const def = PROTOCOLS.find(p => p.id === protocolId);
    if (!def) return;

    const day1Tasks: ProtocolTask[] = def.templateTasks.map((t, i) => ({
      id: `t-${Date.now()}-${i}`,
      text: t,
      completed: false,
      type: 'TASK'
    }));

    const newProtocol: ActiveProtocol = {
      protocolId,
      startDate: new Date().toISOString(),
      currentDay: 1,
      progress: 0,
      history: [{
        day: 1,
        completed: false,
        tasks: day1Tasks
      }]
    };
    setActiveProtocol(newProtocol);
    setView(AppView.DASHBOARD);
    addNotification('Protocolo Iniciado', `${def.title} ativado.`, 'SUCCESS');
  };

  const checkDailyProtocolProgress = () => {
    if (!activeProtocol) return;
    const currentData = activeProtocol.history.find(h => h.day === activeProtocol.currentDay);
    if (!currentData) return;

    const allDone = currentData.tasks.every(t => t.completed);
    if (allDone && !currentData.completed) {
      const updatedHistory = activeProtocol.history.map(h => 
        h.day === activeProtocol.currentDay ? { ...h, completed: true } : h
      );
      
      setActiveProtocol({
        ...activeProtocol,
        history: updatedHistory
      });
      addXp(150);
      addNotification('Dia de Protocolo Completo', 'Disciplina impecável hoje.', 'SUCCESS');
    }
  };

  const completeProtocolTask = (taskId: string) => {
    if (!activeProtocol) return;
    
    const updatedHistory = activeProtocol.history.map(dayRecord => {
      if (dayRecord.day === activeProtocol.currentDay) {
        return {
          ...dayRecord,
          tasks: dayRecord.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
        };
      }
      return dayRecord;
    });

    setActiveProtocol({
      ...activeProtocol,
      history: updatedHistory
    });
  };

  const completeMission = (id: string) => {
    const mission = missions.find(m => m.id === id);
    if (mission && !mission.completed) {
      setMissions(missions.map(m => m.id === id ? { ...m, completed: true } : m));
      addXp(mission.xpReward);
      addNotification('Missão Cumprida', `+${mission.xpReward} XP`, 'SUCCESS');
    }
  };

  const addJournalEntry = (entry: JournalEntry) => {
    setJournalEntries([entry, ...journalEntries]);
    addXp(50);
    addNotification('Diário Salvo', 'Reflexão diária registrada.', 'SUCCESS');
  };

  const setBigWhy = (reason: BigWhyType) => {
    if (user) setUser({ ...user, bigWhy: reason });
  };

  const setActiveSoundscape = (s: Soundscape | null) => {
    setActiveSoundscapeState(s);
  };

  const updateUserContext = (ctx: UserContext) => {
     if (user) setUser({...user, dailyContext: ctx});
  };

  const addCustomRoutine = (routine: CustomRoutine) => {
     setCustomRoutines([...customRoutines, routine]);
     addNotification('Rotina Criada', 'Seu novo ritual foi agendado.', 'SUCCESS');
  };

  const deleteCustomRoutine = (id: string) => {
     setCustomRoutines(customRoutines.filter(r => r.id !== id));
  };

  const toggleRoutineActive = (id: string) => {
     setCustomRoutines(customRoutines.map(r => r.id === id ? {...r, isActive: !r.isActive} : r));
  };

  const updateNotificationPreferences = (prefs: NotificationPreferences) => {
    if (user) {
      setUser({ ...user, notificationPreferences: prefs });
    }
  };

  return (
    <AppContext.Provider value={{
      user, view, setView, habits, journey, contents, login, logout, toggleHabit, completeJourneyDay,
      toggleContentRead, deleteContent, updateContent, monkModeSettings, updateMonkModeSettings, blockedSites, updateBlockedSites,
      setMode, addXp, smartGoals, addSmartGoal, toggleSmartGoalComplete, deleteSmartGoal, focusHistory, addFocusSession,
      activeProtocol, startProtocol, completeProtocolTask, checkDailyProtocolProgress,
      missions, completeMission, badges, journalEntries, addJournalEntry,
      lastDiagnosis, setLastDiagnosis, setBigWhy, activeSoundscape, setActiveSoundscape,
      updateUserContext, customRoutines, addCustomRoutine, deleteCustomRoutine, toggleRoutineActive,
      updateNotificationPreferences,
      appNotifications, addNotification, removeNotification, requestBrowserPermission
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
