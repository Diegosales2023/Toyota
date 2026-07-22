import React, { useState, useEffect } from 'react';
import { Mail, RefreshCw, Download, Trash2, Search, Filter, CheckCircle, AlertCircle, FileText, Send, UserCheck, ShieldCheck, Plus } from 'lucide-react';
import { LeadData } from '../lib/leads';

export default function LeadsAdminTab() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('todos');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [statusMsg, setStatusMsg] = useState('');

  const loadLeads = async () => {
    setLoading(true);
    let allLeads: any[] = [];

    // 1. Carregar do localStorage local
    try {
      const localData = localStorage.getItem('central_leads');
      if (localData) {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed)) {
          allLeads = [...parsed];
        }
      }
    } catch (e) {
      console.warn('Erro ao ler localStorage:', e);
    }

    // 2. Carregar do Servidor via /api/contacts
    try {
      const res = await fetch('/api/contacts');
      if (res.ok) {
        const serverData = await res.json();
        if (serverData && Array.isArray(serverData.leads)) {
          // Mesclar removendo duplicados por id ou por combinação de email+data
          const serverLeads = serverData.leads;
          serverLeads.forEach((sLead: any) => {
            const exists = allLeads.some(l => l.id === sLead.id || (l.email === sLead.email && l.createdAt === sLead.createdAt));
            if (!exists) {
              allLeads.push(sLead);
            }
          });
        }
      }
    } catch (err) {
      console.warn('Servidor local /api/contacts indisponível, exibindo leads do localStorage:', err);
    }

    // Ordenar do mais recente para o mais antigo
    allLeads.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

    setLeads(allLeads);
    setLoading(false);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleAddTestLead = () => {
    const testLead = {
      id: `test_${Date.now()}`,
      nome: 'Cliente Exemplo Teste',
      email: 'suporte@centraldeapoio.com',
      cpf: '123.456.789-00',
      telefone: '(11) 98765-4321',
      assunto: '2ª Via de Boleto',
      contrato: 'CTR-2026-99',
      mensagem: 'Esta é uma mensagem de teste para verificar a recepção de leads do sistema em suporte@centraldeapoio.com.',
      originDomain: 'https://www.centraldeapoio.com',
      targetEmail: 'suporte@centraldeapoio.com',
      createdAt: new Date().toISOString(),
      emailSent: true,
    };

    const updated = [testLead, ...leads];
    setLeads(updated);
    try {
      localStorage.setItem('central_leads', JSON.stringify(updated));
    } catch (e) {}

    setStatusMsg('Lead de teste adicionado com sucesso!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleClearLeads = async () => {
    if (!window.confirm('Tem certeza que deseja limpar o histórico de leads salvos localmente?')) {
      return;
    }
    setLeads([]);
    try {
      localStorage.removeItem('central_leads');
      await fetch('/api/contacts/clear', { method: 'POST' }).catch(() => {});
    } catch (e) {}
    setStatusMsg('Histórico de leads limpo.');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const exportCSV = () => {
    if (leads.length === 0) {
      alert('Nenhum lead disponível para exportar.');
      return;
    }

    const headers = ['Data', 'Nome', 'CPF_CNPJ', 'Email', 'Telefone', 'Assunto', 'Contrato', 'Mensagem'];
    const rows = leads.map(l => [
      `"${new Date(l.createdAt).toLocaleString('pt-BR')}"`,
      `"${(l.nome || '').replace(/"/g, '""')}"`,
      `"${(l.cpf || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.telefone || '').replace(/"/g, '""')}"`,
      `"${(l.assunto || '').replace(/"/g, '""')}"`,
      `"${(l.contrato || '').replace(/"/g, '""')}"`,
      `"${(l.mensagem || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_centraldeapoio_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(lead => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (lead.nome && lead.nome.toLowerCase().includes(term)) ||
      (lead.email && lead.email.toLowerCase().includes(term)) ||
      (lead.cpf && lead.cpf.toLowerCase().includes(term)) ||
      (lead.telefone && lead.telefone.toLowerCase().includes(term)) ||
      (lead.assunto && lead.assunto.toLowerCase().includes(term));

    const matchesSubject = selectedSubject === 'todos' || lead.assunto === selectedSubject;

    return matchesSearch && matchesSubject;
  });

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto animate-fade-in" id="leads-admin-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold mb-2">
            <ShieldCheck className="h-3.5 w-3.5 text-red-600" />
            Painel Administrativo do Atendimento
          </div>
          <h2 className="font-display text-2xl font-extrabold text-gray-900">
            Gerenciador de Leads Recebidos
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Destinatário Oficial Configurado: <strong className="text-slate-800">suporte@centraldeapoio.com</strong>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={loadLeads}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            Atualizar Lista
          </button>

          <button
            onClick={handleAddTestLead}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            Criar Lead Teste
          </button>

          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            Exportar CSV
          </button>

          <button
            onClick={handleClearLeads}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-all cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Limpar
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400">Total de Leads Registrados</span>
          <p className="text-2xl font-extrabold text-slate-900">{leads.length}</p>
        </div>

        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400">E-mail de Destino Principal</span>
          <p className="text-sm font-bold text-red-600 truncate">suporte@centraldeapoio.com</p>
        </div>

        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400">Status do Servidor</span>
          <div className="flex items-center gap-1.5 pt-1">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-700">Ativo e Gravando Contatos</span>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome, e-mail, CPF..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="w-full sm:w-auto rounded-xl bg-slate-50 border border-slate-200 text-xs px-3 py-2 text-slate-700 outline-none focus:border-red-500 font-medium"
          >
            <option value="todos">Todos os Assuntos</option>
            <option value="2ª Via de Boleto">2ª Via de Boleto</option>
            <option value="Quitação de Contrato">Quitação de Contrato</option>
            <option value="Parcelamento / Renegociação">Parcelamento / Renegociação</option>
            <option value="Antecipação de Parcelas">Antecipação de Parcelas</option>
            <option value="Dúvidas Gerais">Dúvidas Gerais</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Mail className="h-10 w-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">Nenhum lead encontrado no momento</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Quando os clientes enviarem solicitações pelo site, elas aparecerão listadas aqui em tempo real.
            </p>
            <button
              onClick={handleAddTestLead}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-all cursor-pointer"
            >
              Adicionar Lead de Teste para Validar
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4">Data / Hora</th>
                  <th className="py-3.5 px-4">Nome do Cliente</th>
                  <th className="py-3.5 px-4">CPF / CNPJ</th>
                  <th className="py-3.5 px-4">E-mail</th>
                  <th className="py-3.5 px-4">Telefone</th>
                  <th className="py-3.5 px-4">Assunto</th>
                  <th className="py-3.5 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead, idx) => (
                  <tr key={lead.id || idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                      {new Date(lead.createdAt || Date.now()).toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {lead.nome}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                      {lead.cpf || 'Não informado'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {lead.email}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                      {lead.telefone || 'Não informado'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-red-50 text-red-700 font-bold text-[10px]">
                        {lead.assunto || 'Atendimento'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition-all cursor-pointer"
                        >
                          Detalhes
                        </button>
                        <a
                          href={`mailto:${lead.email}?subject=${encodeURIComponent(`[Banco Toyota] Resposta sobre: ${lead.assunto || 'Atendimento'}`)}&body=${encodeURIComponent(`Olá ${lead.nome},\n\nRecebemos sua solicitação enviada para suporte@centraldeapoio.com.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold transition-all no-underline inline-flex items-center gap-1"
                        >
                          <Send className="h-3 w-3" />
                          Responder
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Detalhes do Lead */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-xl border border-gray-100 animate-scale-up">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-red-600" />
                Detalhes da Solicitação do Cliente
              </h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 block font-bold text-[10px]">Nome Completo</span>
                  <strong className="text-slate-800 text-sm">{selectedLead.nome}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[10px]">CPF / CNPJ</span>
                  <strong className="text-slate-800 font-mono">{selectedLead.cpf || 'Não informado'}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 block font-bold text-[10px]">E-mail do Cliente</span>
                  <strong className="text-slate-800">{selectedLead.email}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[10px]">Telefone</span>
                  <strong className="text-slate-800">{selectedLead.telefone || 'Não informado'}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 block font-bold text-[10px]">Assunto</span>
                  <strong className="text-red-600 font-bold">{selectedLead.assunto}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[10px]">Nº do Contrato</span>
                  <strong className="text-slate-800">{selectedLead.contrato || 'Não informado'}</strong>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl space-y-1">
                <span className="text-slate-400 block font-bold text-[10px]">Mensagem Enviada</span>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedLead.mensagem || 'Nenhuma mensagem adicional informada.'}
                </p>
              </div>

              <div className="text-[10px] text-slate-400 pt-1 flex justify-between">
                <span>Data do Registro: {new Date(selectedLead.createdAt).toLocaleString('pt-BR')}</span>
                <span>Destino: suporte@centraldeapoio.com</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer"
              >
                Fechar
              </button>
              <a
                href={`mailto:${selectedLead.email}?subject=${encodeURIComponent(`[Banco Toyota] Resposta sobre: ${selectedLead.assunto}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-all no-underline inline-flex items-center gap-1.5"
              >
                <Mail className="h-3.5 w-3.5" />
                Responder Cliente
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
