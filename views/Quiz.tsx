
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AppView, BigWhyType } from '../types';
import { Button } from '../components/Button';
import { 
  ArrowRight, 
  CheckCircle, 
  Brain, 
  Activity, 
  ShieldAlert, 
  Battery, 
  Target, 
  AlertTriangle,
  Heart,
  ArrowLeft,
  Lock,
  List
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: { text: string; weight: 'NOISE' | 'CHAOS' | 'DIRECTION' }[];
  type: 'single';
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Como você descreve seu nível de foco hoje?",
    type: 'single',
    options: [
      { text: "Consigo focar por horas sem interrupção", weight: 'DIRECTION' },
      { text: "Começo bem, mas me perco no meio do caminho", weight: 'CHAOS' },
      { text: "Minha mente parece um navegador com 50 abas abertas", weight: 'NOISE' },
      { text: "Não consigo focar em nada por mais de 5 minutos", weight: 'NOISE' }
    ]
  },
  {
    id: 2,
    text: "Qual seu maior inimigo atualmente?",
    type: 'single',
    options: [
      { text: "O celular e redes sociais", weight: 'NOISE' },
      { text: "Falta de organização e rotina", weight: 'CHAOS' },
      { text: "Não sei exatamente o que deveria estar fazendo", weight: 'DIRECTION' },
      { text: "Cansaço mental extremo", weight: 'NOISE' }
    ]
  },
  {
    id: 3,
    text: "Como você se sente ao final do dia?",
    type: 'single',
    options: [
      { text: "Realizado e produtivo", weight: 'DIRECTION' },
      { text: "Exausto, mas com a sensação de que não fiz nada", weight: 'CHAOS' },
      { text: "Ansioso pelo dia de amanhã", weight: 'NOISE' },
      { text: "Frustrado por ter procrastinado tudo", weight: 'DIRECTION' }
    ]
  },
  {
    id: 4,
    text: "Quando você precisa realizar uma tarefa difícil, o que acontece?",
    type: 'single',
    options: [
      { text: "Encaro e resolvo imediatamente", weight: 'DIRECTION' },
      { text: "Arrumo a casa, checo e-mail, faço tudo menos a tarefa", weight: 'CHAOS' },
      { text: "Travo e fico paralisado pensando no esforço", weight: 'NOISE' },
      { text: "Deixo para a última hora possível", weight: 'DIRECTION' }
    ]
  },
  {
    id: 5,
    text: "Sua relação com o celular é:",
    type: 'single',
    options: [
      { text: "Ferramenta de trabalho, uso consciente", weight: 'DIRECTION' },
      { text: "Pego 'rapidinho' e perco 40 minutos", weight: 'CHAOS' },
      { text: "É a primeira coisa que vejo ao acordar e a última ao dormir", weight: 'NOISE' },
      { text: "Sinto ansiedade se fico longe dele", weight: 'NOISE' }
    ]
  },
  {
    id: 6,
    text: "Sobre seus objetivos de longo prazo:",
    type: 'single',
    options: [
      { text: "Tenho um plano claro e estou executando", weight: 'DIRECTION' },
      { text: "Tenho sonhos, mas nenhuma rotina para alcançá-los", weight: 'CHAOS' },
      { text: "Mudo de ideia toda semana sobre o que quero", weight: 'DIRECTION' },
      { text: "Estou apenas sobrevivendo aos dias", weight: 'NOISE' }
    ]
  },
  {
    id: 7,
    text: "Qual frase define sua rotina atual?",
    type: 'single',
    options: [
      { text: "Um relógio suíço", weight: 'DIRECTION' },
      { text: "Apagando incêndios o dia todo", weight: 'CHAOS' },
      { text: "Começo mil coisas, termino zero", weight: 'NOISE' },
      { text: "Um dia produtivo, três dias improdutivos", weight: 'CHAOS' }
    ]
  },
  {
    id: 8,
    text: "Você sente culpa por não produzir?",
    type: 'single',
    options: [
      { text: "Raramente, sei o que estou fazendo", weight: 'DIRECTION' },
      { text: "Sim, me cobro muito mas faço pouco", weight: 'NOISE' },
      { text: "Sinto que estou jogando meu potencial no lixo", weight: 'CHAOS' },
      { text: "Sim, e isso me paralisa ainda mais", weight: 'NOISE' }
    ]
  },
  {
    id: 9,
    text: "Como está sua energia física?",
    type: 'single',
    options: [
      { text: "Alta e constante", weight: 'DIRECTION' },
      { text: "Acordo cansado todos os dias", weight: 'CHAOS' },
      { text: "Tenho picos de energia e vales profundos", weight: 'NOISE' },
      { text: "Sinto um peso constante no corpo", weight: 'CHAOS' }
    ]
  },
  {
    id: 10,
    text: "O que falta para você atingir o próximo nível?",
    type: 'single',
    options: [
      { text: "Apenas tempo", weight: 'DIRECTION' },
      { text: "Disciplina para fazer o chato", weight: 'CHAOS' },
      { text: "Clareza mental e silêncio", weight: 'NOISE' },
      { text: "Um método que funcione", weight: 'CHAOS' }
    ]
  },
  {
    id: 11,
    text: "Quando você tenta se organizar:",
    type: 'single',
    options: [
      { text: "Funciona bem", weight: 'DIRECTION' },
      { text: "Compro planners que nunca uso", weight: 'CHAOS' },
      { text: "Fico sobrecarregado só de listar as tarefas", weight: 'NOISE' },
      { text: "Dura 2 dias e volto ao caos", weight: 'CHAOS' }
    ]
  },
  {
    id: 12,
    text: "Qual sua prioridade número 1 agora?",
    type: 'single',
    options: [
      { text: "Escalar meus resultados", weight: 'DIRECTION' },
      { text: "Ter paz mental", weight: 'NOISE' },
      { text: "Deixar de ser procrastinador", weight: 'CHAOS' },
      { text: "Organizar minha vida financeira/profissional", weight: 'DIRECTION' }
    ]
  }
];

type DiagnosisType = 'NOISE' | 'CHAOS' | 'DIRECTION';

const DIAGNOSES = {
  NOISE: {
    title: "Diagnóstico: Excesso de Ruído Mental",
    color: "text-blue-400",
    bg: "bg-blue-900/20",
    borderColor: "border-blue-500",
    description: "Sua mente está operando com o 'disco cheio'. O excesso de estímulos, informações e autocobrança criou uma névoa mental que impede o foco profundo. Você não precisa de mais informação, precisa de SILÊNCIO ESTRATÉGICO.",
    symptoms: ["Ansiedade constante", "Paralisia por análise", "Cansaço mental mesmo sem esforço físico"],
    risk: "Burnout iminente e abandono total de metas importantes."
  },
  CHAOS: {
    title: "Diagnóstico: Rotina Caótica",
    color: "text-blue-400", 
    bg: "bg-blue-900/20", 
    borderColor: "border-blue-500", 
    description: "Você tem energia e vontade, mas desperdiça tudo por falta de estrutura. É como tentar encher um balde furado. Você apaga incêndios o dia todo, termina exausto e sente que não construiu nada de valor.",
    symptoms: ["Começa e não termina", "Procrastinação ativa (faz tarefas fáceis para evitar as difíceis)", "Sensação de estar sempre atrasado"],
    risk: "Estagnação profissional e ciclo eterno de frustração."
  },
  DIRECTION: {
    title: "Diagnóstico: Perda de Direção",
    color: "text-blue-400", 
    bg: "bg-blue-900/20", 
    borderColor: "border-blue-500", 
    description: "Você está correndo na esteira. Fazendo força, suando, mas não saindo do lugar. Falta um sistema claro de execução. A motivação acabou e agora você depende de uma disciplina que ainda não construiu.",
    symptoms: ["Sensação de vazio produtivo", "Dúvida constante sobre o futuro", "Baixa execução apesar do potencial"],
    risk: "Desperdício de talento e arrependimento futuro."
  }
};

export const Quiz: React.FC = () => {
  const { setView, setLastDiagnosis, setBigWhy, login, user } = useApp();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [scores, setScores] = useState({ NOISE: 0, CHAOS: 0, DIRECTION: 0 });
  const [answerHistory, setAnswerHistory] = useState<DiagnosisType[]>([]); 
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showBigWhy, setShowBigWhy] = useState(false);
  
  // Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');

  const currentQ = QUESTIONS[currentQIndex];
  const progress = ((currentQIndex) / QUESTIONS.length) * 100;

  const handleOptionClick = (weight: DiagnosisType) => {
    setScores(prev => ({ ...prev, [weight]: prev[weight] + 1 }));
    setAnswerHistory(prev => [...prev, weight]);
    
    if (currentQIndex < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQIndex(prev => prev + 1), 250);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        // If user is ALREADY logged in (e.g. came from Registration), skip lead capture
        if (!user) {
          setShowLeadCapture(true);
        } else {
          setShowBigWhy(true);
        }
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentQIndex === 0) {
      if (user) setView(AppView.DASHBOARD);
      else setView(AppView.LANDING);
      return;
    }
    const lastAnswer = answerHistory[answerHistory.length - 1];
    if (lastAnswer) {
      setScores(prev => ({ ...prev, [lastAnswer]: Math.max(0, prev[lastAnswer] - 1) }));
      setAnswerHistory(prev => prev.slice(0, -1));
      setCurrentQIndex(prev => prev - 1);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(leadName, leadEmail, leadPhone);
    setShowLeadCapture(false);
    setShowBigWhy(true);
  };

  const handleBigWhySelect = (reason: BigWhyType) => {
    setBigWhy(reason);
    setShowBigWhy(false);
    setShowResult(true);
  }

  const getResult = (): DiagnosisType => {
    const max = Math.max(scores.NOISE, scores.CHAOS, scores.DIRECTION);
    if (scores.NOISE === max) return 'NOISE';
    if (scores.CHAOS === max) return 'CHAOS';
    return 'DIRECTION';
  };

  const handleNextStep = () => {
    const diagnosis = getResult();
    setLastDiagnosis(diagnosis);
    // Redirect to Sales Page (Plans) instead of Context Quiz
    setView(AppView.PLANS);
  };

  // -- Renders --

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Analisando seu perfil...</h2>
        <p className="text-stone-400 animate-pulse">Cruzando dados de foco e disciplina</p>
      </div>
    );
  }

  if (showLeadCapture) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4 animate-fade-in">
         <div className="w-full max-w-md bg-stone-900 p-8 rounded-2xl border border-stone-800 shadow-2xl">
            <div className="text-center mb-6">
               <div className="w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-900/50">
                  <Lock className="w-8 h-8 text-blue-500" />
               </div>
               <h2 className="text-2xl font-bold text-white mb-2">Análise Concluída</h2>
               <p className="text-stone-400 text-sm">
                 Identificamos o padrão exato que está travando seu crescimento. Crie seu acesso para desbloquear o diagnóstico completo e seu plano de ação.
               </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
               <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Nome Completo</label>
                  <input 
                    type="text" required 
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none"
                    value={leadName} onChange={e => setLeadName(e.target.value)}
                    placeholder="Seu nome"
                  />
               </div>
               <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Email Profissional</label>
                  <input 
                    type="email" required 
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none"
                    value={leadEmail} onChange={e => setLeadEmail(e.target.value)}
                    placeholder="seu@email.com"
                  />
               </div>
               <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Whatsapp / Telefone</label>
                  <input 
                    type="tel" required 
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none"
                    value={leadPhone} onChange={e => setLeadPhone(e.target.value)}
                    placeholder="(XX) XXXXX-XXXX"
                  />
               </div>
               <Button type="submit" className="w-full py-4 mt-4 text-lg shadow-lg shadow-blue-900/20">
                  Desbloquear Diagnóstico
               </Button>
               <p className="text-center text-[10px] text-stone-600 mt-4">
                  Seus dados estão seguros. Não enviamos spam.
               </p>
            </form>
         </div>
      </div>
    );
  }

  if (showBigWhy) {
    const reasons: { id: BigWhyType, label: string, icon: any }[] = [
      { id: 'FAMILIA', label: 'Família', icon: Heart },
      { id: 'SAUDE', label: 'Saúde', icon: Activity },
      { id: 'CARREIRA', label: 'Carreira', icon: Target },
      { id: 'DESENVOLVIMENTO', label: 'Desenvolvimento Pessoal', icon: Brain },
      { id: 'EMOCIONAL', label: 'Reconstrução Emocional', icon: ShieldAlert },
      { id: 'RIQUEZA', label: 'Riqueza', icon: Target },
      { id: 'PROPOSITO', label: 'Propósito', icon: Target },
    ];

    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center px-6 animate-fade-in relative">
        <div className="max-w-lg w-full text-center">
           <h2 className="text-3xl font-bold text-white mb-6">Qual é o seu "Motivo Profundo" para mudar de vida?</h2>
           <p className="text-stone-400 mb-8">Quando a disciplina falhar, essa será a razão que te fará continuar.</p>
           
           <div className="grid grid-cols-2 gap-4">
             {reasons.map(r => (
               <button 
                 key={r.id} 
                 onClick={() => handleBigWhySelect(r.id)}
                 className="bg-stone-900 border border-stone-800 hover:border-blue-500 hover:bg-stone-800 p-4 rounded-xl flex flex-col items-center transition-all group"
               >
                 <r.icon className="w-8 h-8 text-stone-600 group-hover:text-blue-500 mb-2 transition-colors" />
                 <span className="font-bold text-white text-sm">{r.label}</span>
               </button>
             ))}
           </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const diagnosisType = getResult();
    const diagnosis = DIAGNOSES[diagnosisType];
    const score = Math.floor(Math.random() * (94 - 68) + 68);

    return (
      <div className="min-h-screen bg-stone-950 text-stone-200 overflow-y-auto pb-20">
        <div className="max-w-3xl mx-auto px-6 py-12">
          
          {/* Result Header */}
          <div className="text-center mb-10">
            <p className="text-stone-500 text-sm uppercase tracking-widest mb-2">Análise Completa</p>
            <div className="inline-block bg-stone-900 rounded-full px-6 py-2 border border-stone-800 mb-6">
              <span className="text-stone-400 text-sm mr-2">Nível de Sobrecarga:</span>
              <span className="font-bold text-lg text-blue-400">{score}/100</span>
            </div>
          </div>

          {/* Diagnosis Card */}
          <div className={`bg-stone-900 border-2 ${diagnosis.borderColor} rounded-2xl p-8 mb-12 shadow-2xl relative overflow-hidden`}>
            <div className={`absolute top-0 left-0 w-full h-1.5 ${diagnosis.bg.replace('/20', '')}`}></div>
            
            <h1 className={`text-3xl md:text-4xl font-bold ${diagnosis.color} mb-6`}>
              {diagnosis.title}
            </h1>
            
            <p className="text-lg text-stone-300 leading-relaxed mb-8 border-l-4 border-stone-700 pl-4">
              {diagnosis.description}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-stone-950/50 p-4 rounded-xl">
                <h4 className="flex items-center gap-2 text-white font-bold mb-3">
                  <List className="w-5 h-5 text-blue-500" /> Sintomas Identificados
                </h4>
                <ul className="space-y-2">
                  {diagnosis.symptoms.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-stone-400">
                      <span className="text-blue-500 mt-1 font-bold">✕</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-stone-950/50 p-4 rounded-xl border border-stone-800">
                <h4 className="flex items-center gap-2 text-white font-bold mb-3">
                  <AlertTriangle className="w-5 h-5 text-blue-500" /> Risco Iminente
                </h4>
                <p className="text-sm text-stone-400">{diagnosis.risk}</p>
              </div>
            </div>
          </div>

          {/* Solution Pitch */}
          <div className="space-y-8 mb-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Por que você precisa do Focuslab?</h2>
              <p className="text-stone-400">Seu diagnóstico exige uma intervenção imediata. O sistema foi desenhado para corrigir exatamente o padrão <span className={diagnosis.color}>{diagnosisType === 'NOISE' ? 'de Ruído Mental' : diagnosisType === 'CHAOS' ? 'de Caos' : 'de Falta de Direção'}</span>.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-stone-900 p-5 rounded-xl border border-stone-800 text-center">
                <Brain className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-1">Clareza Radical</h3>
                <p className="text-xs text-stone-400">Elimine a névoa mental em 24h.</p>
              </div>
              <div className="bg-stone-900 p-5 rounded-xl border border-stone-800 text-center">
                <ShieldAlert className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-1">Bloqueio de Caos</h3>
                <p className="text-xs text-stone-400">Ferramentas anti-distração.</p>
              </div>
              <div className="bg-stone-900 p-5 rounded-xl border border-stone-800 text-center">
                <Target className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-1">Execução Pura</h3>
                <p className="text-xs text-stone-400">Do plano à ação em minutos.</p>
              </div>
            </div>

            <div className="bg-blue-900/10 p-4 rounded-lg border border-blue-900/30 text-center text-sm text-blue-300">
              ⚠ <strong>Consequência de não agir:</strong> Se você continuar nesse padrão por mais 30 dias, sua ansiedade aumentará em 40% e você adiará novamente suas metas principais.
            </div>
          </div>

          {/* CTA */}
          <div className="sticky bottom-0 md:relative bg-stone-950/90 backdrop-blur-lg p-4 border-t md:border-none border-stone-800 text-center z-20">
            <div className="max-w-md mx-auto">
              <Button 
                size="lg" 
                className="w-full text-lg py-6 shadow-2xl shadow-blue-600/20 animate-pulse uppercase font-bold"
                onClick={handleNextStep}
              >
                Ver Meu Plano Personalizado
              </Button>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-stone-500">
                <span className="line-through">R$ 97,00</span>
                <span className="text-blue-500 font-bold bg-blue-900/20 px-2 py-0.5 rounded">HOJE: R$ 9,90/mês</span>
              </div>
              <p className="mt-2 text-[10px] text-stone-600 uppercase tracking-widest">Garantia de 7 dias • Acesso Vitalício</p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col relative">
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-stone-900 fixed top-0 left-0 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Botão Voltar (Header) */}
      <div className="absolute top-4 left-4 z-40">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-stone-900/80 backdrop-blur-md hover:bg-stone-800 rounded-full text-stone-400 hover:text-white transition-all border border-stone-800 group shadow-lg"
          aria-label="Voltar para pergunta anterior"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline-block">Voltar</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto px-6 w-full py-12">
        
        <div className="mb-8 text-center">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">
            Pergunta {currentQIndex + 1} de {QUESTIONS.length}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 leading-tight animate-fade-in text-center">
          {currentQ.text}
        </h2>

        <div className="space-y-4">
          {currentQ.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(option.weight)}
              className="w-full text-left p-5 rounded-xl bg-stone-900 border border-stone-800 hover:border-blue-500 hover:bg-stone-800 transition-all group flex items-center justify-between animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <span className="text-lg text-stone-300 group-hover:text-white transition-colors">
                {option.text}
              </span>
              <ArrowRight className="w-5 h-5 text-stone-700 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
