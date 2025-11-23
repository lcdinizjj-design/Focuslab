import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { AppView } from '../types';
import { Zap, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';
import { StorageService } from '../services/storage';

export const Auth: React.FC = () => {
  const { login, setView } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const emailExists = StorageService.checkEmailExists(email);

      if (isLogin) {
        // LOGIN FLOW
        if (emailExists) {
            // Retrieve user data from "DB"
            const users = StorageService.getUsersDB();
            const userRecord = users.find((u: any) => u.email === email);
            
            // Login and Direct to Dashboard
            login(userRecord?.name || 'Membro', email, userRecord?.phone); 
            setView(AppView.DASHBOARD);
        } else {
            setError('Email não encontrado. Verifique ou crie uma nova conta.');
            setLoading(false);
            return;
        }
      } else {
        // REGISTER FLOW
        if (emailExists) {
            setError('Este email já está cadastrado. Por favor, faça login.');
            setLoading(false);
            return;
        }

        // Register User in "DB"
        const newUser = { name, email, phone, joinedAt: new Date().toISOString() };
        StorageService.registerUserToDB(newUser);
        
        setSuccessMsg('Conta criada com sucesso!');
        
        // Auto-login and redirect to QUIZ (Diagnosis)
        setTimeout(() => {
            login(name, email, phone);
            setView(AppView.QUIZ);
        }, 1000);
      }
      
      if (!successMsg) setLoading(false); // Keep loading if success redirect is pending
    }, 800);
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-stone-900/80 backdrop-blur-xl p-8 rounded-2xl border border-stone-800 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-xl bg-stone-800 mb-4 text-blue-500 shadow-lg shadow-blue-900/20">
            <Zap className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            {isLogin ? 'Acessar QG' : 'Iniciar Protocolo'}
          </h2>
          <p className="text-stone-400 text-sm">
            {isLogin ? 'Bem-vindo de volta ao Lab.' : 'Crie sua conta para iniciar o diagnóstico.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-900/20 border border-red-900/50 p-3 rounded-lg flex items-center gap-2 text-red-400 text-xs mb-4 animate-fade-in font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {error}
            </div>
          )}
          
          {successMsg && (
             <div className="bg-green-900/20 border border-green-900/50 p-3 rounded-lg flex items-center gap-2 text-green-400 text-xs mb-4 animate-fade-in font-bold">
                <CheckCircle className="w-4 h-4 shrink-0" />
                {successMsg}
            </div>
          )}

          {!isLogin && (
            <div className="animate-fade-in">
              <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1 ml-1">Nome de Guerra</label>
              <input 
                type="text" 
                required
                placeholder="Seu nome"
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-all placeholder-stone-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          
          <div>
            <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1 ml-1">Email de Acesso</label>
            <input 
              type="email" 
              required
              placeholder="seu@email.com"
              className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-all placeholder-stone-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {!isLogin && (
             <div className="animate-fade-in">
              <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1 ml-1">Whatsapp</label>
              <input 
                type="tel" 
                required
                placeholder="(XX) XXXXX-XXXX"
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-all placeholder-stone-700"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1 ml-1">Senha</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-all placeholder-stone-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full py-4 mt-2 text-lg shadow-xl shadow-blue-900/20" disabled={loading}>
            {loading ? 'Processando...' : (isLogin ? 'Entrar no Sistema' : 'Criar Conta & Iniciar')} { !loading && <ArrowRight className="w-5 h-5 ml-2" />}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }} 
            className="text-sm text-stone-500 hover:text-white transition-colors underline decoration-stone-700 hover:decoration-white underline-offset-4"
          >
            {isLogin ? 'Ainda não é membro? Criar conta' : 'Já possui cadastro? Fazer login'}
          </button>
          
          {isLogin && (
            <div className="block">
                <button className="text-xs text-stone-600 hover:text-stone-400 transition-colors">Esqueci minha senha</button>
            </div>
          )}
        </div>
        
        <div className="mt-8 pt-6 border-t border-stone-800/50 text-center">
          <button onClick={() => setView(AppView.LANDING)} className="text-xs font-bold text-stone-600 hover:text-stone-400 uppercase tracking-widest transition-colors">
            ← Voltar para Home
          </button>
        </div>
      </div>
    </div>
  );
};