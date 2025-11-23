import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, CheckCircle, Star, ShieldCheck, Lock, Clock, ChevronDown, ChevronUp, AlertTriangle, Zap } from 'lucide-react';

export const Plans: React.FC = () => {
  const { setView } = useApp();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes countdown
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Scarcity Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCheckout = (plan: 'monthly' | 'annual' | 'lifetime') => {
    // Simulate redirection to Kirvano or external checkout
    const links: Record<string, string> = {
      monthly: "https://kirvano.com/checkout/focuslab-monthly-placeholder",
      annual: "https://kirvano.com/checkout/focuslab-annual-placeholder",
      lifetime: "https://kirvano.com/checkout/focuslab-lifetime-placeholder"
    };

    // In a real app, this opens the checkout. 
    // For the prototype, we simulate the user clicking, paying, and returning.
    window.open(links[plan], '_blank');
    
    // Auto-advance to setup after a delay (simulating successful return)
    setTimeout(() => {
       setView(AppView.CONTEXT_QUIZ);
    }, 3000);
  };

  const faqs = [
    { q: "O que acontece após o pagamento?", a: "Você receberá acesso imediato ao app e será direcionado para a configuração do seu protocolo personalizado de 30 dias." },
    { q: "Funciona para quem tem TDAH?", a: "Sim. O método foi desenhado considerando neurodivergência, com foco em estímulos curtos e recompensas rápidas (gamificação)." },
    { q: "Posso cancelar o plano mensal?", a: "A qualquer momento. Sem multas, sem letras miúdas. Você tem controle total." },
    { q: "O plano vitalício é realmente único?", a: "Sim. Você paga uma única vez e tem acesso a todas as atualizações futuras do Focuslab para sempre." }
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-white pb-20 overflow-x-hidden font-sans">
      {/* Urgency Bar */}
      <div className="bg-blue-600/10 border-b border-blue-600/20 p-2 text-center sticky top-0 z-30 backdrop-blur-md">
        <p className="text-xs font-bold text-blue-400 flex items-center justify-center gap-2">
          <Clock className="w-3 h-3 animate-pulse" />
          OFERTA ESPECIAL EXPIRA EM: <span className="text-white font-mono text-sm">{formatTime(timeLeft)}</span>
        </p>
      </div>

      {/* Header / Nav */}
      <div className="flex items-center justify-between px-4 py-4 sticky top-8 z-20 bg-stone-950/80 backdrop-blur border-b border-stone-900">
        <button onClick={() => setView(AppView.QUIZ)} className="p-2 hover:bg-stone-800 rounded-lg text-stone-400 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-sm font-bold text-stone-500 uppercase tracking-widest">Acesso Premium</div>
        <div className="w-8"></div> 
      </div>

      {/* Hero Headline */}
      <div className="text-center px-6 py-12">
         <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-900/20 border border-green-900/50 text-green-500 text-[10px] font-bold uppercase tracking-widest mb-6 animate-fade-in">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Plano Personalizado Pronto
         </div>
         <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
            Não é apenas um App.<br />
            É o seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Novo Cérebro.</span>
         </h1>
         <p className="text-stone-400 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
            Você já tentou "força de vontade" e falhou. O Focuslab instala um <strong>Sistema Operacional</strong> à prova de falhas na sua rotina.
         </p>
      </div>

      {/* Social Proof Strip */}
      <div className="border-y border-stone-900 bg-stone-900/30 py-6 mb-12 overflow-hidden">
         <div className="flex justify-center gap-8 md:gap-16 opacity-50 grayscale">
            <span className="font-bold text-xl text-stone-500">FORBES</span>
            <span className="font-bold text-xl text-stone-500">WIRED</span>
            <span className="font-bold text-xl text-stone-500">TECHCRUNCH</span>
            <span className="font-bold text-xl text-stone-500">VICE</span>
         </div>
         <p className="text-center text-[10px] text-stone-600 mt-4 uppercase tracking-widest">Mencionado como "O fim da procrastinação"</p>
      </div>

      {/* Pricing Section */}
      <div className="px-4 max-w-6xl mx-auto space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8 md:items-center relative">
         
         {/* Monthly Plan */}
         <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 text-center relative md:order-1 hover:border-stone-600 transition-all">
            <h3 className="text-lg font-bold text-stone-300 mb-2">Mensal</h3>
            <div className="flex justify-center items-baseline gap-1 mb-6">
               <span className="text-sm text-stone-500 align-top mt-1">R$</span>
               <span className="text-4xl font-bold text-white">9,90</span>
               <span className="text-sm text-stone-500">/mês</span>
            </div>
            <ul className="text-sm text-stone-400 space-y-4 text-left mb-8">
               <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-blue-500 shrink-0" /> Acesso completo ao App</li>
               <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-blue-500 shrink-0" /> Diagnóstico Básico</li>
               <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-blue-500 shrink-0" /> Cancelamento fácil</li>
            </ul>
            <Button variant="secondary" className="w-full py-4 rounded-xl font-bold" onClick={() => handleCheckout('monthly')}>
               COMEÇAR MENSAL
            </Button>
         </div>

         {/* LIFETIME PLAN (Highlight) */}
         <div className="bg-gradient-to-b from-stone-800 to-stone-900 border-2 border-yellow-500/80 rounded-3xl p-8 text-center relative shadow-2xl shadow-yellow-900/20 transform md:scale-110 z-10 md:order-2">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-500 text-stone-950 text-xs font-extrabold px-6 py-2 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1 whitespace-nowrap">
               <Star className="w-3 h-3 fill-current" /> Escolha da Comunidade
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-1 mt-4">VITALÍCIO</h3>
            <p className="text-xs text-stone-400 mb-6 uppercase tracking-wider">Acesso Eterno • Pagamento Único</p>
            
            <div className="flex justify-center items-baseline gap-2 mb-2">
               <span className="text-lg text-stone-500 line-through decorations-red-500 decoration-2">R$ 197</span>
               <span className="text-sm text-yellow-500 align-top mt-2">R$</span>
               <span className="text-6xl font-extrabold text-white tracking-tighter">59,90</span>
            </div>
            <p className="text-xs text-green-400 font-bold mb-8 bg-green-900/20 py-1.5 rounded-lg border border-green-900/30 inline-block px-4">
               VOCÊ ECONOMIZA R$ 137,00 HOJE
            </p>

            <div className="h-px bg-stone-700/50 mb-8 w-full"></div>

            <ul className="text-sm text-stone-200 space-y-4 text-left mb-10">
               <li className="flex gap-3 items-start"><CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" /> <span><strong>Todos os Protocolos</strong> (30, 60, 90 dias)</span></li>
               <li className="flex gap-3 items-start"><CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" /> <span><strong>Modo Monge & Bunker</strong> Liberados</span></li>
               <li className="flex gap-3 items-start"><CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" /> <span><strong>Sem mensalidades</strong> futuras</span></li>
               <li className="flex gap-3 items-start"><CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" /> <span><strong>Bônus:</strong> Curso "Sono de Elite"</span></li>
            </ul>
            
            <Button className="w-full py-5 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold border-none text-lg rounded-xl shadow-xl shadow-yellow-500/10 group relative overflow-hidden" onClick={() => handleCheckout('lifetime')}>
               <span className="relative z-10 flex items-center justify-center gap-2">QUERO ACESSO VITALÍCIO <Zap className="w-5 h-5 fill-current" /></span>
            </Button>
            <p className="text-[10px] text-stone-500 mt-4 flex items-center justify-center gap-1">
               <Lock className="w-3 h-3" /> Pagamento seguro via Kirvano
            </p>
         </div>

         {/* Annual Plan */}
         <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 text-center relative md:order-3 hover:border-stone-600 transition-all">
            <h3 className="text-lg font-bold text-stone-300 mb-2">Anual</h3>
            <div className="flex justify-center items-baseline gap-1 mb-6">
               <span className="text-sm text-stone-500 align-top mt-1">R$</span>
               <span className="text-4xl font-bold text-white">39,90</span>
               <span className="text-sm text-stone-500">/ano</span>
            </div>
            <ul className="text-sm text-stone-400 space-y-4 text-left mb-8">
               <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-stone-500 shrink-0" /> Acesso por 12 meses</li>
               <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-stone-500 shrink-0" /> Todos os recursos do App</li>
               <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-stone-500 shrink-0" /> Renovação automática</li>
            </ul>
            <Button variant="secondary" className="w-full py-4 rounded-xl font-bold" onClick={() => handleCheckout('annual')}>
               ESCOLHER ANUAL
            </Button>
         </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-4xl mx-auto px-6 mt-20 mb-20">
         <h2 className="text-2xl font-bold text-center text-white mb-10">Quem entra, não sai mais.</h2>
         <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard 
               name="Ricardo M." 
               role="Empresário" 
               text="Eu achava que tinha TDAH. Descobri que só não tinha método. O Focuslab salvou minha empresa em 30 dias."
               stars={5}
            />
            <TestimonialCard 
               name="Ana Clara" 
               role="Estudante Medicina" 
               text="O Modo Monge é surreal. Estudei em 4h o que levava 3 dias. O plano vitalício vale cada centavo."
               stars={5}
            />
            <TestimonialCard 
               name="Felipe T." 
               role="Dev Senior" 
               text="Simples, brutal e direto ao ponto. Sem firulas. A melhor plataforma de produtividade que já usei."
               stars={5}
            />
         </div>
      </div>

      {/* Guarantee */}
      <div className="max-w-3xl mx-auto px-6 mb-20">
         <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center shrink-0 border border-green-900/50">
               <ShieldCheck className="w-10 h-10 text-green-500" />
            </div>
            <div>
               <h3 className="text-xl font-bold text-white mb-2">Garantia Incondicional de 7 Dias</h3>
               <p className="text-stone-400 text-sm leading-relaxed">
                  Teste o sistema sem riscos. Se você não sentir uma mudança radical na sua produtividade na primeira semana, nós devolvemos 100% do seu dinheiro. Basta um email.
               </p>
            </div>
         </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto px-6">
         <h2 className="text-2xl font-bold text-center text-white mb-8">Perguntas Frequentes</h2>
         <div className="space-y-3">
            {faqs.map((faq, idx) => (
               <div key={idx} className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
                  <button 
                     className="w-full p-5 text-left flex justify-between items-center font-bold text-stone-300 hover:text-white transition-colors"
                     onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  >
                     {faq.q}
                     {activeFaq === idx ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {activeFaq === idx && (
                     <div className="px-5 pb-5 text-sm text-stone-400 leading-relaxed border-t border-stone-800 pt-4 animate-fade-in">
                        {faq.a}
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>

      <div className="text-center mt-20 text-stone-600 text-xs pb-8">
         <p>Pagamentos processados seguramente por Kirvano.</p>
         <p className="mt-2">© 2024 Focuslab Inc. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

const TestimonialCard = ({ name, role, text, stars }: { name: string, role: string, text: string, stars: number }) => (
   <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl relative">
      <div className="absolute -top-3 left-6 bg-stone-800 px-2 py-1 rounded border border-stone-700 flex gap-1">
         {[...Array(stars)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />)}
      </div>
      <p className="text-stone-300 text-sm italic mb-4 pt-2 leading-relaxed">"{text}"</p>
      <div className="flex items-center gap-3">
         <div className="w-10 h-10 bg-gradient-to-br from-stone-700 to-stone-800 rounded-full flex items-center justify-center font-bold text-sm text-stone-400 border border-stone-600">
            {name.charAt(0)}
         </div>
         <div>
            <p className="text-white text-sm font-bold">{name}</p>
            <p className="text-stone-600 text-[10px] uppercase font-bold tracking-wider">{role}</p>
         </div>
      </div>
   </div>
);