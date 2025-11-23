import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MicroContent, AppView } from '../types';
import { Search, ArrowLeft, Check, Trash2, Edit2, Save, X, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '../components/Button';

export const Library: React.FC = () => {
  const { contents, setView } = useApp();
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(contents.map(c => c.categoria)))];

  const filtered = contents.filter(c => {
    const matchesText = c.titulo.toLowerCase().includes(filter.toLowerCase()) || c.explicacao.toLowerCase().includes(filter.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.categoria === selectedCategory;
    return matchesText && matchesCat;
  });

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-4 sticky top-0 bg-stone-950 z-10 py-4 border-b border-stone-900">
        <button onClick={() => setView(AppView.DASHBOARD)} className="p-2 hover:bg-stone-800 rounded-lg">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Biblioteca Focuslab</h2>
          <p className="text-xs text-stone-500">Pílulas de conhecimento estratégico.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-5 h-5 text-stone-500" />
          <input 
            type="text" 
            placeholder="Buscar conhecimento..." 
            className="w-full bg-stone-900 border border-stone-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-blue-500 focus:outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <select 
          className="bg-stone-900 border border-stone-800 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-20">
        {filtered.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-stone-800 rounded-xl">
                <p className="text-stone-500 text-sm">Nenhum conteúdo encontrado.</p>
            </div>
        ) : (
            filtered.map(content => (
            <ContentCard key={content.id} content={content} />
            ))
        )}
      </div>
    </div>
  );
};

const ContentCard: React.FC<{ content: MicroContent }> = ({ content }) => {
  const { toggleContentRead, deleteContent, updateContent } = useApp();
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(content);

  const handleSave = (e: React.MouseEvent) => {
      e.stopPropagation();
      updateContent(editForm);
      setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
      e.stopPropagation();
      setEditForm(content);
      setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      if(confirm('Tem certeza que deseja excluir este conteúdo?')) {
          deleteContent(content.id);
      }
  };

  const handleToggleRead = (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleContentRead(content.id);
  };

  return (
    <div 
      className={`bg-stone-900 border rounded-xl p-5 transition-all cursor-pointer ${
        content.read ? 'border-green-900/30 opacity-80' : 'border-stone-800 hover:border-blue-900/50'
      } ${expanded ? 'ring-1 ring-blue-500/50' : ''}`}
      onClick={() => !isEditing && setExpanded(!expanded)}
    >
      {/* Header Row */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-900/10 px-2 py-0.5 rounded">{content.categoria}</span>
            {content.read && (
                <span className="text-xs font-bold text-green-600 flex items-center gap-1 bg-green-900/10 px-2 py-0.5 rounded">
                    <Check size={10} /> Lido
                </span>
            )}
        </div>
        <span className="text-xs text-stone-500">{content.tempo_execucao}</span>
      </div>

      {/* Content Body */}
      {isEditing ? (
          <div className="space-y-3 mt-2 animate-fade-in" onClick={e => e.stopPropagation()}>
              <input 
                  className="w-full bg-stone-950 border border-stone-700 rounded p-2 text-white font-bold"
                  value={editForm.titulo}
                  onChange={e => setEditForm({...editForm, titulo: e.target.value})}
              />
              <textarea 
                  className="w-full bg-stone-950 border border-stone-700 rounded p-2 text-stone-300 text-sm"
                  value={editForm.explicacao}
                  rows={3}
                  onChange={e => setEditForm({...editForm, explicacao: e.target.value})}
              />
              <input 
                  className="w-full bg-stone-950 border border-stone-700 rounded p-2 text-stone-400 text-sm italic"
                  value={editForm.frase_impacto}
                  onChange={e => setEditForm({...editForm, frase_impacto: e.target.value})}
              />
              <input 
                  className="w-full bg-stone-950 border border-stone-700 rounded p-2 text-blue-400 text-sm"
                  placeholder="Ação Prática"
                  value={editForm.acao_pratica}
                  onChange={e => setEditForm({...editForm, acao_pratica: e.target.value})}
              />
              
              <div className="flex gap-2 pt-2">
                  <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-500">
                      <Save className="w-4 h-4 mr-1" /> Salvar
                  </Button>
                  <Button size="sm" variant="secondary" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-1" /> Cancelar
                  </Button>
              </div>
          </div>
      ) : (
          <>
            <h3 className={`text-lg font-bold mb-1 ${content.read ? 'text-stone-400' : 'text-white'}`}>{content.titulo}</h3>
            <p className="text-stone-400 text-sm italic mb-3">"{content.frase_impacto}"</p>
            
            {expanded && (
                <div className="mt-4 pt-4 border-t border-stone-800 space-y-4 animate-fade-in cursor-default">
                <div>
                    <h4 className="text-sm font-bold text-white mb-1">O Conceito</h4>
                    <p className="text-stone-400 text-sm leading-relaxed">{content.explicacao}</p>
                </div>
                <div className="bg-stone-950 p-3 rounded-lg border border-stone-800">
                    <h4 className="text-sm font-bold text-blue-500 mb-1">Ação Prática</h4>
                    <p className="text-stone-300 text-sm">{content.acao_pratica}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span>Resultado: {content.resultado_esperado}</span>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-800 mt-4">
                    <button 
                        onClick={handleToggleRead}
                        className={`flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-lg transition-colors ${
                            content.read 
                            ? 'bg-green-900/20 text-green-500 hover:bg-green-900/30' 
                            : 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white'
                        }`}
                    >
                        {content.read ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                        {content.read ? 'Concluído' : 'Marcar como Concluído'}
                    </button>

                    <div className="flex gap-2">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                            className="p-2 text-stone-500 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Editar"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="p-2 text-stone-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Excluir"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                </div>
            )}
          </>
      )}
    </div>
  );
};