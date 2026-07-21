import React, { useState } from 'react';
import { Building2, Award, ShieldCheck, Users, Milestone, HeartHandshake, PhoneCall, CheckCircle2, Phone, Mail, AlertTriangle } from 'lucide-react';
import { submitLead } from '../lib/leads';

export default function SobreNosTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSentStatus, setEmailSentStatus] = useState<boolean | null>(null);

  const formatCPFOrCNPJ = (value: string) => {
    const raw = value.replace(/\D/g, '');
    if (raw.length <= 11) {
      return raw
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      return raw
        .substring(0, 14)
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
  };

  const formatPhone = (value: string) => {
    const raw = value.replace(/\D/g, '');
    if (raw.length <= 10) {
      return raw
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d{4})$/, '$1-$2');
    } else {
      return raw
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{4})$/, '$1-$2');
    }
  };

  const handleOpenModal = () => {
    setSubmitted(false);
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await submitLead({
      nome,
      email: '',
      cpf,
      telefone,
      assunto: 'Atendimento Institucional - Sobre Nós',
      originDomain: 'https://www.centraldeapoio.com',
      targetEmail: 'suporte@centraldeapoio.com',
    });

    setEmailSentStatus(result.emailSent ?? false);
    setLoading(false);
    setSubmitted(true);
  };

  const stats = [
    { label: 'Clientes Atendidos', value: '+1 Milhão' },
    { label: 'Anos no Brasil', value: '+20 Anos' },
    { label: 'Índice de Confiança', value: 'Excelente' },
    { label: 'Presença Nacional', value: '100% Concessionárias' },
  ];

  const pillars = [
    {
      icon: <Building2 className="h-6 w-6 text-red-600" />,
      title: 'Estrutura Sólida',
      description: 'Como braço financeiro oficial da Toyota, oferecemos a solidez necessária para apoiar seu planejamento financeiro de curto, médio e longo prazo.',
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />,
      title: 'Segurança e Transparência',
      description: 'Garantimos processos de atendimento seguros, em conformidade com as diretrizes do Banco Central do Brasil, combatendo fraudes e prezando pela ética.',
    },
    {
      icon: <Award className="h-6 w-6 text-blue-600" />,
      title: 'Qualidade Toyota',
      description: 'O renomado padrão de atendimento e qualidade dos veículos Toyota é transportado diretamente para o desenvolvimento e gestão dos nossos serviços financeiros.',
    },
  ];

  return (
    <div className="py-8 space-y-12 max-w-7xl mx-auto animate-fade-in" id="sobrenos-tab-container">
      {/* Hero Banner Section */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.15),transparent_45%)]" />
        
        <div className="space-y-4 max-w-xl z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">Quem Somos</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Seu Toyota mais perto de você.
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            O <strong>Banco Toyota do Brasil S.A.</strong> é a instituição financeira oficial da marca no país. Criado para viabilizar a aquisição de veículos novos e seminovos, entregamos soluções flexíveis de financiamento, leasing, consórcio e seguros para milhares de brasileiros.
          </p>
        </div>

        {/* Floating Brand Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto shrink-0 z-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 text-center min-w-[140px] space-y-1">
              <p className="text-xl font-extrabold text-white">{stat.value}</p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Pillars of Trust */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-display text-2xl font-extrabold text-gray-900 tracking-tight">Nossos Pilares de Atuação</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Atuamos sob princípios rígidos para entregar a melhor experiência de crédito automobilístico do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
              <div className="p-2.5 rounded-xl bg-slate-50 inline-block">
                {pillar.icon}
              </div>
              <h4 className="font-bold text-sm text-gray-950">{pillar.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate History / Timeline Card */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-display text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <Milestone className="h-5 w-5 text-red-600" />
            Nossa Trajetória de Liderança
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Iniciamos nossas operações no Brasil com o objetivo de aproximar as pessoas de seus sonhos automobilísticos. Hoje, somos referência nacional em satisfação no segmento de bancos de montadoras (segundo rankings de órgãos setoriais e avaliações de consumidores).
          </p>
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Presença física integrada a todas as concessionárias do país.</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Sistemas avançados de criptografia e proteção de dados bancários.</span>
            </div>
          </div>
        </div>

        {/* Timeline graphics */}
        <div className="lg:col-span-7 space-y-4 border-l-2 border-red-100 pl-6 ml-2">
          <div className="relative space-y-1">
            <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-red-600 ring-4 ring-white" />
            <span className="font-mono text-xs font-bold text-red-600">1999</span>
            <h4 className="font-bold text-xs text-gray-950">Fundação do Banco Toyota</h4>
            <p className="text-[11px] text-slate-500">Início das operações no Brasil para financiamentos e leasing exclusivos da marca.</p>
          </div>

          <div className="relative space-y-1 pt-2">
            <div className="absolute -left-[31px] top-3 h-3 w-3 rounded-full bg-red-600 ring-4 ring-white" />
            <span className="font-mono text-xs font-bold text-red-600">2012</span>
            <h4 className="font-bold text-xs text-gray-950">Lançamento do Ciclo Toyota</h4>
            <p className="text-[11px] text-slate-500">Introdução de um programa inovador que garante a recompra do veículo usado no final do contrato.</p>
          </div>

          <div className="relative space-y-1 pt-2">
            <div className="absolute -left-[31px] top-3 h-3 w-3 rounded-full bg-red-600 ring-4 ring-white" />
            <span className="font-mono text-xs font-bold text-red-600">2023 - Presente</span>
            <h4 className="font-bold text-xs text-gray-950">Digitalização e Segurança Antifraude</h4>
            <p className="text-[11px] text-slate-500">Expansão de canais de autoatendimento integrados por telefone com criptografia e assistentes inteligentes de suporte em tempo real.</p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-8 text-center space-y-4">
        <HeartHandshake className="h-8 w-8 text-red-600 mx-auto" />
        <h3 className="font-display text-lg font-bold text-gray-900">Precisa falar com nossa ouvidoria ou suporte institucional?</h3>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          Nosso relacionamento vai além do financiamento do seu carro. Se você precisa de qualquer auxílio corporativo, nossa central de relacionamento está sempre aberta para você.
        </p>
        <div className="pt-2">
          <button 
            onClick={handleOpenModal}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-3 shadow-md shadow-red-200 transition-all cursor-pointer text-center border-none outline-none"
          >
            <PhoneCall className="h-4 w-4" />
            <span>Falar com Atendimento Oficial</span>
          </button>
        </div>
      </div>

      {/* Modal / Dialog Form */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" id="sobrenos-modal">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-slate-50 border-b border-gray-100 p-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Atendimento Oficial</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Suporte Institucional & Ouvidoria</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all border-none bg-transparent outline-none cursor-pointer"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">Solicitação Enviada com Sucesso!</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Agradecemos o seu contato, <strong className="text-slate-800">{nome}</strong>. Sua solicitação foi recebida por nossa equipe de atendimento.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer border-none outline-none"
                  >
                    Fechar Janela
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Form */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Nome do Titular</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Nome completo do titular"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">CPF ou CNPJ</label>
                    <input
                      type="text"
                      value={cpf}
                      onChange={(e) => setCpf(formatCPFOrCNPJ(e.target.value))}
                      placeholder="000.000.000-00 ou 00.000.000/0000-00"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                      maxLength={18}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Telefone de Contato</label>
                    <input
                      type="tel"
                      value={telefone}
                      onChange={(e) => setTelefone(formatPhone(e.target.value))}
                      placeholder="(00) 00000-0000"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                      maxLength={15}
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] text-center border-none outline-none"
                    >
                      <Mail className="h-4 w-4 shrink-0" />
                      <span>{loading ? 'Registrando Solicitação...' : 'Enviar Solicitação por E-mail'}</span>
                    </button>
                  </div>
                </form>

                <div className="bg-slate-50 p-4 border-t border-gray-100 text-[10px] text-slate-500 text-center leading-normal">
                  Seus dados estão protegidos por criptografia em conformidade com a LGPD e serão utilizados exclusivamente para direcionar seu atendimento oficial.
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
