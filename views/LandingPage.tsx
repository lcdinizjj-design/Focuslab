import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';
import { Button } from '../components/Button';
import { 
  ChevronRight, 
  CheckCircle, 
  TrendingUp, 
  Brain, 
  Target,
  Activity,
  Hexagon,
  Zap
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setView } = useApp();

  useEffect(() => {
    document.title = "Focuslab | Arquitetura de Alta Performance";
  }, []);

  // Both actions now lead to Auth, but contextually user handles the tab there
  const handleStartJourney = () => {
    setView(AppView.AUTH); 
  };

  const SLOGANS = [
    "Silêncio é Poder.",
    "Domine o Caos.",
    "Arquitetura de Foco.",
    "Execução Radical.",
    "Sua Mente, Sua Fortaleza."
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      {/* Header */}
      <header className="fixed w-full z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl md:text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Hexagon className="w-5 h-5 text-white fill-blue-600" />
            </div>
            FOCUSLAB
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleStartJourney}
              className="hidden md:block text-sm font-semibold text-stone-400 hover:text-white transition-colors"
            >
              Acesso Membros
            </button>
            <Button size="sm" onClick={handleStartJourney}>
              Começar Agora
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900 border border-stone-800 mb-8 animate-fade-in">
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-blue-500" />
              <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Sistema Operacional Mental</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-[1.1]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-500">Silêncio é Poder.</span>
            <span className="block text-blue-600">Execução Radical.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Não é um app de to-do list. É um ecossistema de isolamento estratégico projetado para quem precisa produzir em 4 horas o que a maioria faz em 4 dias.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" onClick={handleStartJourney} className="w-full sm:w-auto shadow-blue-900/20 shadow-xl">
              Criar Conta & Iniciar
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto group" onClick={handleStartJourney}>
              Já tenho conta <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Slogans Marquee Static */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-40 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-stone-500">
            {SLOGANS.map((s, i) => (
              <span key={i} className="hover:text-blue-500 transition-colors cursor-default">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Story / Narrative */}
      <section className="py-24 px-6 bg-stone-950 border-y border-stone-900 relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
             <div className="w-16 h-16 bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-500 shrink-0 border border-blue-900/50">
                <Brain className="w-8 h-8" />
             </div>
             <div>
               <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">A História do Focuslab</h3>
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Nós perdemos a guerra pela dopamina.</h2>
               
               <div className="space-y-6 text-stone-400 text-lg leading-relaxed">
                 <p>
                   O mundo moderno foi desenhado para fragmentar sua atenção. Notificações, feeds infinitos, urgências falsas. O inimigo oculto não é a preguiça, é o <strong>Ruído</strong>.
                 </p>
                 <p>
                   O Focuslab nasceu de uma necessidade brutal de sobrevivência. Em um cenário de alta pressão, percebemos que métodos tradicionais ("força de vontade") falhavam contra algoritmos bilionários desenhados para viciar.
                 </p>
                 <p>
                   Precisávamos de um bunker. Um sistema que forçasse o silêncio mental.
                 </p>
                 <p className="text-white border-l-2 border-blue-500 pl-4 italic">
                   "Se você não controla sua atenção, alguém controla por você."
                 </p>
                 <p>
                   Criamos o Focuslab não para "organizar tarefas", mas para reconstruir a arquitetura neural do foco profundo. É uma jornada de 30 dias para limpar o sistema, restaurar a dopamina basal e transformar execução em instinto.
                 </p>
               </div>
             </div>
          </div>
        </div>
        {/* Background Text */}
        <div className="absolute -right-20 top-20 text-[200px] font-bold text-stone-900/50 pointer-events-none select-none rotate-90 md:rotate-0">
          LAB
        </div>
      </section>

      {/* New Feature Highlight: Productivity & SMART */}
      <section className="py-24 bg-stone-900/30">
         <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Engenharia de Produtividade</h2>
               <p className="text-stone-400">Um arsenal completo integrado ao seu bolso.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               <FeatureHighlight 
                  title="Método S.M.A.R.T."
                  desc="Transforme sonhos vagos em alvos de precisão militar. Defina, mensure e execute."
                  icon={<Target className="w-6 h-6" />}
               />
               <FeatureHighlight 
                  title="Pomodoro Tático"
                  desc="Ciclos de 25/5 e 50/10 customizáveis. Com rastreamento de tarefas e histórico de sessões."
                  icon={<Zap className="w-6 h-6" />}
               />
               <FeatureHighlight 
                  title="Dashboard de Métricas"
                  desc="Você não melhora o que não mede. Acompanhe sua consistência, streaks e volume de foco."
                  icon={<TrendingUp className="w-6 h-6" />}
               />
            </div>
         </div>
      </section>

      {/* Roadmap 30 Days */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">O Protocolo de 30 Dias</h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-stone-800 before:to-transparent">
            <RoadmapItem 
              day="Dia 1" 
              title="Detox de Dopamina" 
              desc="Corte radical de estímulos baratos. Reset dos receptores neurais."
              align="left"
            />
            <RoadmapItem 
              day="Semana 1" 
              title="A Estrutura" 
              desc="Implementação de rotinas S.M.A.R.T e rituais matinais inegociáveis."
              align="right"
            />
            <RoadmapItem 
              day="Semana 2" 
              title="Deep Work" 
              desc="Imersão em blocos de 4 horas de foco. O esforço se torna automático."
              align="left"
            />
            <RoadmapItem 
              day="Dia 30" 
              title="Nova Identidade" 
              desc="Você não 'faz' coisas difíceis. Você 'é' alguém que executa o difícil."
              align="right"
              isLast
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center bg-gradient-to-b from-stone-950 to-blue-950/20 relative overflow-hidden border-t border-stone-900">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Assuma o Controle.
          </h2>
          <p className="text-xl text-stone-400 mb-10">
            O caos vai continuar lá fora. Dentro do Lab, existe apenas o seu objetivo.
          </p>
          <Button size="lg" className="w-full sm:w-auto text-xl py-6 px-12 shadow-2xl shadow-blue-500/20" onClick={handleStartJourney}>
            INICIAR TRANSFORMAÇÃO
          </Button>
          <div className="mt-8 flex justify-center gap-8 text-stone-600 text-xs uppercase tracking-widest">
             <span>Acesso Imediato</span>
             <span>•</span>
             <span>Garantia de 7 Dias</span>
             <span>•</span>
             <span>Pagamento Único</span>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-stone-600 text-sm border-t border-stone-900 bg-stone-950">
        <div className="flex justify-center gap-6 mb-6">
          <a href="#" className="hover:text-stone-400">Termos</a>
          <a href="#" className="hover:text-stone-400">Privacidade</a>
          <a href="#" className="hover:text-stone-400">Suporte</a>
        </div>
        <p>© 2024 Focuslab. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

/* Sub-components */

const FeatureHighlight = ({ title, desc, icon }: { title: string, desc: string, icon: any }) => (
  <div className="p-8 rounded-2xl bg-stone-950 border border-stone-800 hover:border-blue-900/50 transition-all hover:-translate-y-1 group">
      <div className="mb-6 p-3 bg-stone-900 rounded-lg inline-block group-hover:bg-blue-900/20 transition-colors text-blue-500 border border-stone-800 group-hover:border-blue-900/50">
         {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-stone-400 leading-relaxed text-sm">{desc}</p>
  </div>
);

const RoadmapItem = ({ day, title, desc, align, isLast }: { day: string, title: string, desc: string, align: 'left' | 'right', isLast?: boolean }) => (
  <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${isLast ? '' : ''}`}>
    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-stone-950 bg-stone-800 group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0 md:order-1 md:group-odd:translate-x-1/2 md:group-even:-translate-x-1/2 z-10 shadow-xl text-stone-400 text-xs font-bold">
      {isLast ? <CheckCircle size={16} /> : <div className="w-2 h-2 bg-current rounded-full" />}
    </div>
    <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-3rem)] bg-stone-900 p-6 rounded-xl border border-stone-800 shadow-lg hover:border-blue-900/30 transition-colors ${align === 'left' ? 'mr-auto' : 'ml-auto'}`}>
      <span className="text-blue-500 text-xs font-bold uppercase tracking-wider mb-1 block">{day}</span>
      <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
      <p className="text-stone-400 text-sm">{desc}</p>
    </div>
  </div>
);