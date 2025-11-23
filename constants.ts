import { MicroContent, JourneyDay, Habit, ProtocolDefinition, Mission, Badge, Soundscape } from './types';

// Helper to generate 100 contents programmatically for brevity in code, 
// but structure matches requirements. 
// In a real DB this would be a JSON file fetched.
export const generateMicroContents = (): MicroContent[] => {
  const categories = ['Disciplina', 'Foco', 'Produtividade', 'Força Mental', 'Energia', 'Antifragilidade', 'Gestão Emocional'] as const;
  
  const baseContents: MicroContent[] = [
    {
      id: 1,
      titulo: "A Regra dos 2 Minutos",
      frase_impacto: "Se leva menos de 2 minutos, faça agora.",
      explicacao: "A procrastinação muitas vezes nasce da superestimação do esforço. Tarefas pequenas acumulam carga mental.",
      acao_pratica: "Identifique 3 tarefas pendentes que levam menos de 2 min e execute agora.",
      resultado_esperado: "Alívio imediato da carga mental e início de inércia positiva.",
      categoria: "Produtividade",
      tempo_execucao: "2 min"
    },
    {
      id: 2,
      titulo: "O Jejum de Dopamina",
      frase_impacto: "O tédio é o precursor da criatividade.",
      explicacao: "O excesso de estímulos (redes sociais, açúcar) vicia o cérebro em recompensas fáceis, matando a motivação para tarefas difíceis.",
      acao_pratica: "Passe a próxima 1 hora sem celular, música ou comida. Apenas você e uma tarefa.",
      resultado_esperado: "Recalibração dos receptores de prazer para apreciar o esforço.",
      categoria: "Disciplina",
      tempo_execucao: "60 min"
    },
    {
      id: 3,
      titulo: "Respiração de Caixa (Box Breathing)",
      frase_impacto: "Controle sua respiração, controle sua mente.",
      explicacao: "Técnica usada por Navy SEALs para reduzir cortisol instantaneamente.",
      acao_pratica: "Inspire 4s, Segure 4s, Expire 4s, Segure 4s. Repita 4 vezes.",
      resultado_esperado: "Redução da frequência cardíaca e clareza mental.",
      categoria: "Gestão Emocional",
      tempo_execucao: "2 min"
    },
    {
      id: 4,
      titulo: "O Ambiente Focuslab",
      frase_impacto: "Seu ambiente vence sua força de vontade.",
      explicacao: "Tentar focar em um ambiente caótico gasta energia cognitiva desnecessária.",
      acao_pratica: "Remova tudo da sua mesa que não seja essencial para a tarefa atual.",
      resultado_esperado: "Aumento imediato da capacidade de foco.",
      categoria: "Foco",
      tempo_execucao: "5 min"
    },
    {
      id: 5,
      titulo: "Visualização Negativa",
      frase_impacto: "Esteja pronto para o pior, espere o melhor.",
      explicacao: "Técnica estoica para reduzir ansiedade e aumentar antifragilidade.",
      acao_pratica: "Imagine o pior cenário para seu dia e como você lidaria com ele com calma.",
      resultado_esperado: "Redução do medo do fracasso.",
      categoria: "Antifragilidade",
      tempo_execucao: "3 min"
    }
  ];

  // Filling the rest to reach 100 simulating a database
  const filledContents: MicroContent[] = [...baseContents];
  
  for (let i = 6; i <= 100; i++) {
    const cat = categories[i % categories.length];
    filledContents.push({
      id: i,
      titulo: `Protocolo ${cat} #${i}`,
      frase_impacto: `A consistência vence a intensidade (Lição #${i}).`,
      explicacao: `Microconteúdo focado em desenvolver sua ${cat.toLowerCase()} através de repetição e consciência.`,
      acao_pratica: "Execute uma micro-ação de 5 minutos relacionada ao seu objetivo principal.",
      resultado_esperado: "Fortalecimento neural do hábito.",
      categoria: cat,
      tempo_execucao: "5 min"
    });
  }

  return filledContents;
};

export const INITIAL_HABITS: Habit[] = [
  { id: 'h1', title: 'Arrumar a cama', type: 'morning', completed: false, streak: 0 },
  { id: 'h2', title: 'Beber 500ml de água', type: 'morning', completed: false, streak: 0 },
  { id: 'h3', title: 'Visualizar metas', type: 'morning', completed: false, streak: 0 },
  { id: 'h4', title: 'Ler 10 páginas', type: 'habit', completed: false, streak: 0 },
  { id: 'h5', title: 'Treino Físico', type: 'habit', completed: false, streak: 0 },
  { id: 'h6', title: 'Sem telas 1h antes de dormir', type: 'night', completed: false, streak: 0 },
  { id: 'h7', title: 'Journaling do dia', type: 'night', completed: false, streak: 0 },
];

export const JOURNEY_DATA: JourneyDay[] = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  title: `Dia ${i + 1}`,
  mission: i === 0 ? "Configurar o ambiente Focuslab" : "Executar 2 blocos de Foco Profundo",
  microAction: "10 flexões ao acordar",
  completed: false,
  locked: i !== 0
}));

export const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 5000];

export const PROTOCOLS: ProtocolDefinition[] = [
  // Original Protocols Renamed
  {
    id: 'p-7',
    title: 'Programa de 7 Dias: Reset Rápido',
    description: 'Um choque de ordem para sair da inércia. Foco em eliminação de ruído e estabelecimento de rotina básica.',
    durationDays: 7,
    intensity: 'Iniciante',
    recommendedFor: ['CHAOS'],
    dailyQuote: "A simplicidade é o último grau da sofisticação.",
    templateTasks: ["Arrumar a cama imediatamente", "Zero redes sociais até 12h", "20min de leitura", "Planejar o dia seguinte"]
  },
  {
    id: 'p-15',
    title: 'Programa de 15 Dias: Despertar Mental',
    description: 'Para quem já tem rotina mas sente a mente nebulosa. Foco em clareza, detox de dopamina e exercícios cognitivos.',
    durationDays: 15,
    intensity: 'Intermediário',
    recommendedFor: ['NOISE'],
    dailyQuote: "Clareza precede o sucesso.",
    templateTasks: ["Meditação (10min)", "Jornal da Gratidão", "Exercício físico (30min)", "1h de Foco Profundo"]
  },
  {
    id: 'p-30',
    title: 'Programa de 30 Dias: Reconstrução Total',
    description: 'O protocolo padrão. Construção sólida de hábitos, disciplina e identidade. Uma nova versão de si mesmo.',
    durationDays: 30,
    intensity: 'Avançado',
    recommendedFor: ['DIRECTION', 'CHAOS'],
    dailyQuote: "Nós somos o que repetidamente fazemos.",
    templateTasks: ["Rotina Matinal Completa", "4 Blocos de Pomodoro", "Leitura Técnica", "Visualização de Metas"]
  },
  {
    id: 'p-45',
    title: 'Programa de 45 Dias: Força Inabalável',
    description: 'Foco em resiliência e antifragilidade. Desafios físicos e mentais progressivos.',
    durationDays: 45,
    intensity: 'Avançado',
    recommendedFor: ['DIRECTION'],
    dailyQuote: "A dor é temporária, a glória é eterna.",
    templateTasks: ["Banho Gelado", "Treino de Alta Intensidade", "Estudo (1h)", "Sem açúcar"]
  },
  {
    id: 'p-60',
    title: 'Programa de 60 Dias: Ascensão Avançada',
    description: 'Para quem busca o topo. Produtividade extrema e otimização de cada minuto do dia.',
    durationDays: 60,
    intensity: 'Brutal',
    recommendedFor: [],
    dailyQuote: "O topo é solitário, mas a vista é bela.",
    templateTasks: ["Acordar às 5h", "2h de Deep Work antes das 8h", "Treino Pesado", "Jejum Intermitente"]
  },
  {
    id: 'p-90',
    title: 'Programa de 90 Dias: Transformação Definitiva',
    description: 'Mudança completa de estilo de vida. 3 meses para reescrever sua biografia.',
    durationDays: 90,
    intensity: 'Brutal',
    recommendedFor: [],
    dailyQuote: "Não pare quando estiver cansado. Pare quando tiver terminado.",
    templateTasks: ["Protocolo Completo Manhã/Noite", "4h de Deep Work", "Projeto Paralelo", "Mentoria/Estudo"]
  },
  // New Protocols
  {
    id: 'p-shock',
    title: 'Choque de Disciplina',
    description: '7 Dias de rigor militar. Sem desculpas, sem negociação. Para quem precisa "acordar pra vida" imediatamente.',
    durationDays: 7,
    intensity: 'Brutal',
    recommendedFor: ['CHAOS', 'NOISE'],
    dailyQuote: "Disciplina é liberdade.",
    templateTasks: ["Banho Gelado Obrigatório", "Sem Redes Sociais (24h)", "Treino Físico Intenso", "Acordar 05:00"],
    isSpecial: true
  },
  {
    id: 'p-anti-proc',
    title: 'Anti-Procrastinação',
    description: '10 dias focados em quebrar a resistência inicial e gerar movimento.',
    durationDays: 10,
    intensity: 'Intermediário',
    recommendedFor: ['CHAOS'],
    dailyQuote: "Feito é melhor que perfeito.",
    templateTasks: ["Método Pomodoro (4h/dia)", "Lista de Tarefas na noite anterior", "Celular em outro cômodo ao trabalhar"]
  },
  {
    id: 'p-morning',
    title: 'Ritual Matinal',
    description: '14 dias para dominar a primeira hora do seu dia e garantir vitória diária.',
    durationDays: 14,
    intensity: 'Iniciante',
    recommendedFor: ['NOISE'],
    dailyQuote: "Vença a manhã, vença o dia.",
    templateTasks: ["Não tocar no celular ao acordar", "Beber 500ml de água", "Exposição solar", "Movimento físico"]
  },
  {
    id: 'p-stress',
    title: 'Anti-Stress',
    description: '7 dias de descompressão estratégica e regulação emocional.',
    durationDays: 7,
    intensity: 'Iniciante',
    recommendedFor: ['NOISE'],
    dailyQuote: "A calma é um superpoder.",
    templateTasks: ["Meditação Guiada", "Caminhada sem fones", "Leitura leve", "Dormir 8h"]
  },
  {
    id: 'p-prod-ext',
    title: 'Produtividade Extrema',
    description: '30 dias de otimização de tempo para quem quer produzir em nível de elite.',
    durationDays: 30,
    intensity: 'Brutal',
    recommendedFor: ['DIRECTION'],
    dailyQuote: "Tempo é o ativo mais valioso.",
    templateTasks: ["Blocos de Foco de 90min", "Delegação ou Eliminação", "Zero Reuniões inúteis", "Review Semanal"]
  },
  {
    id: 'p-renegade',
    title: 'Renegado Digital',
    description: '7 dias de detox de dopamina radical. Recupere sua atenção sequestrada.',
    durationDays: 7,
    intensity: 'Avançado',
    recommendedFor: ['NOISE'],
    dailyQuote: "Desconecte para reconectar.",
    templateTasks: ["Tela em Preto e Branco", "Sem redes sociais", "Sem notícias", "Apenas ferramentas essenciais"]
  }
];

export const SENSEI_MESSAGES = {
  MOTIVATIONAL: [
    "A dor da disciplina é menor que a dor do arrependimento.",
    "Você não está cansado, você está apenas desmotivado. Execute.",
    "O conforto é o assassino do progresso.",
    "Sua versão do futuro está te observando agora.",
    "Não negocie com sua mente. Apenas faça.",
    "1% melhor todos os dias. Juros compostos da vida.",
    "Se fosse fácil, todo mundo faria."
  ],
  TOUGH_LOVE: [
    "Vai desistir agora? Sério?",
    "Sua cama é quentinha, mas ela não vai pagar seus boletos.",
    "Procrastinar é o jeito mais rápido de se tornar irrelevante.",
    "Ninguém vai te salvar. Levante e faça.",
    "Você disse que queria mudar. Prove.",
    "Chega de desculpas. Resultados ou nada."
  ],
  SUCCESS: [
    "Excelente. É assim que se constrói um império.",
    "Mantenha o ritmo. Você está no controle.",
    "Vitória confirmada. Próximo desafio.",
    "Disciplina é isso. Fazer o que precisa ser feito.",
    "Orgulho. Agora repita amanhã."
  ]
};

export const SOUNDSCAPES: Soundscape[] = [
  { id: 'rain', name: 'Chuva Pesada', url: 'https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg', icon: 'CloudRain' },
  { id: 'forest', name: 'Floresta', url: 'https://actions.google.com/sounds/v1/nature/forest_morning.ogg', icon: 'Trees' },
  { id: 'cafe', name: 'Café Silencioso', url: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg', icon: 'Coffee' },
  { id: 'white', name: 'Ruído Branco', url: 'https://actions.google.com/sounds/v1/ambiences/industrial_hum.ogg', icon: 'Waves' }, // Using industrial hum as white noise proxy
  { id: 'office', name: 'Escritório', url: 'https://actions.google.com/sounds/v1/ambiences/keyboard_typing.ogg', icon: 'Building' }
];

export const INITIAL_MISSIONS: Mission[] = [
  { id: 'm1', title: 'Completar 4 Pomodoros', xpReward: 100, completed: false, type: 'DAILY' },
  { id: 'm2', title: 'Zero Redes Sociais (Manhã)', xpReward: 150, completed: false, type: 'DAILY' },
  { id: 'm3', title: 'Leitura de 20 pág', xpReward: 100, completed: false, type: 'DAILY' },
  { id: 'm4', title: 'Treino Físico', xpReward: 120, completed: false, type: 'DAILY' },
  { id: 'w1', title: 'Completar 5 dias de Protocolo', xpReward: 500, completed: false, type: 'WEEKLY' },
  { id: 'w2', title: 'Zero falhas no Hábito Matinal', xpReward: 500, completed: false, type: 'WEEKLY' },
];

export const BADGES: Badge[] = [
  { id: 'b1', name: 'Iniciado', icon: 'Zap', description: 'Completou o primeiro dia.', unlocked: true },
  { id: 'b2', name: 'Guerreiro', icon: 'Sword', description: '7 dias de streak.', unlocked: false },
  { id: 'b3', name: 'Monge', icon: 'Brain', description: '4h de foco em um dia.', unlocked: false },
  { id: 'b4', name: 'Imparável', icon: 'Flame', description: '30 dias de protocolo.', unlocked: false },
  { id: 'b5', name: 'Elite', icon: 'Crown', description: 'Nível 10 alcançado.', unlocked: false },
];