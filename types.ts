
export enum AppView {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  FOCUS = 'FOCUS',
  JOURNEY = 'JOURNEY',
  HABITS = 'HABITS',
  LIBRARY = 'LIBRARY',
  MODES = 'MODES',
  PROFILE = 'PROFILE',
  REPORTS = 'REPORTS',
  SETTINGS = 'SETTINGS',
  VALIDATION = 'VALIDATION',
  QUIZ = 'QUIZ',
  PRODUCTIVITY = 'PRODUCTIVITY',
  PROTOCOL_SELECTOR = 'PROTOCOL_SELECTOR',
  GAMIFICATION = 'GAMIFICATION',
  JOURNAL = 'JOURNAL',
  COMMUNITY = 'COMMUNITY',
  PLANS = 'PLANS',
  // Novas Views
  CONTEXT_QUIZ = 'CONTEXT_QUIZ',
  CUSTOM_ROUTINES = 'CUSTOM_ROUTINES'
}

export enum ModeType {
  DEFAULT = 'DEFAULT',
  MONK = 'MONK', // High restriction
  WARRIOR = 'WARRIOR', // High energy
  BUNKER = 'BUNKER' // Total isolation
}

export type BigWhyType = 'FAMILIA' | 'SAUDE' | 'CARREIRA' | 'DESENVOLVIMENTO' | 'EMOCIONAL' | 'RIQUEZA' | 'PROPOSITO' | null;

// Contexto do dia a dia do usuário para adaptação de planos
export interface UserContext {
  wakeUpTime: string;
  hasJob: boolean;
  jobShift?: 'MANHA' | 'TARDE' | 'NOITE' | 'INTEGRAL';
  isStudent: boolean;
  commuteTime: '0-15' | '15-30' | '30-60' | '60+';
  lunchTime: string;
  availableTimeDaily: '15' | '30' | '45' | '60' | '90+';
  intensityPreference: 'LEVE' | 'MODERADA' | 'INTENSA';
}

export interface NotificationPreferences {
  emailDaily: boolean;
  emailWeekly: boolean;
  browserNotifications: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  timestamp: number;
}

export interface User {
  name: string;
  email: string;
  phoneNumber?: string; // Adicionado campo de telefone
  level: number;
  xp: number;
  streak: number;
  coins: number; // Cave coins
  mode: ModeType;
  onboardingComplete: boolean;
  joinedDate: string;
  bigWhy?: BigWhyType;
  isPro?: boolean;
  dailyContext?: UserContext;
  notificationPreferences?: NotificationPreferences; // Adicionado preferências
}

export interface SmartGoal {
  id: string;
  title: string;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string; // Date string
  progress: number; // 0-100
  completed: boolean;
  createdAt: string;
}

export interface FocusSession {
  id: string;
  date: string;
  duration: number; // in minutes
  type: 'FOCUS' | 'SHORT_BREAK' | 'LONG_BREAK';
  task?: string;
}

export interface Habit {
  id: string;
  title: string;
  type: 'morning' | 'night' | 'habit';
  completed: boolean;
  streak: number;
}

export interface MicroContent {
  id: number;
  titulo: string;
  frase_impacto: string;
  explicacao: string;
  acao_pratica: string;
  resultado_esperado: string;
  categoria: 'Disciplina' | 'Foco' | 'Produtividade' | 'Força Mental' | 'Energia' | 'Antifragilidade' | 'Gestão Emocional';
  tempo_execucao: string;
  read?: boolean;
}

export interface JourneyDay {
  day: number;
  title: string;
  mission: string;
  microAction: string;
  completed: boolean;
  locked: boolean;
}

export interface ValidationReportItem {
  category: string;
  status: 'Pronto' | 'Requer Ajustes' | 'Incoerente';
  details: string;
}

export interface MonkModeSettings {
  blockNotifications: boolean;
  blockSocialMedia: boolean;
  blockNews: boolean;
  grayscale: boolean;
}

// Renamed Protocol Types (Removed WAP)
export interface ProtocolTask {
  id: string;
  text: string;
  completed: boolean;
  type: 'TASK' | 'HABIT' | 'READING';
}

export interface ProtocolDefinition {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  intensity: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Brutal';
  recommendedFor: string[]; // Tags matching diagnosis symptoms
  dailyQuote: string;
  templateTasks: string[]; // Base tasks to generate daily to-dos
  isSpecial?: boolean; // For "Choque de Disciplina" etc
}

export interface ActiveProtocol {
  protocolId: string;
  startDate: string;
  currentDay: number;
  progress: number; // 0-100
  history: {
    day: number;
    completed: boolean;
    tasks: ProtocolTask[];
  }[];
}

// Custom Routine Types
export interface RoutineActivity {
  id: string;
  name: string;
  durationMin: number;
}

export interface CustomRoutine {
  id: string;
  title: string;
  startTime: string; // "07:00"
  endTime: string; // "08:00"
  activities: RoutineActivity[];
  daysOfWeek: number[]; // 0=Dom, 1=Seg...
  isActive: boolean;
}

// Gamification Types
export interface Mission {
  id: string;
  title: string;
  xpReward: number;
  completed: boolean;
  type: 'DAILY' | 'WEEKLY';
}

export interface Badge {
  id: string;
  name: string;
  icon: string; // Lucide icon name or description
  description: string;
  unlocked: boolean;
}

// Journal Types
export interface JournalEntry {
  id: string;
  date: string;
  good: string;
  improve: string;
  victory: string;
  intention: string;
}

// Soundscapes
export interface Soundscape {
  id: string;
  name: string;
  url: string;
  icon: any;
}
