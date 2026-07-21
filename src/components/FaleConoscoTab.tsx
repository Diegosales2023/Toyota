import React, { useState } from 'react';
import { Mail, PhoneCall, MapPin, Send, ShieldCheck, HelpCircle, AlertCircle, Clock, ChevronRight, Phone, CheckCircle2, AlertTriangle } from 'lucide-react';
import { submitLead } from '../lib/leads';

export default function FaleConoscoTab() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [subject, setSubject] = useState('BOLETO');
  const [message, setMessage] = useState('');
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
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{4})(\d{4})$/, '$1-$2');
    } else {
      return raw
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{5})(\d{4})$/, '$1-$2');
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await submitLead({
      nome: name,
      email,
      cpf,
      telefone: phone,
      assunto: subject,
      mensagem: message,
      originDomain: 'https://www.centraldeapoio.com',
      targetEmail: 'suporte@centraldeapoio.com',
    });

    setEmailSentStatus(result.emailSent ?? false);
    setLoading(false);
    setSubmitted(true);
  };

  const contactChannels = [
    {
      icon: <PhoneCall className="h-5 w-5 text-red-600" />,
      title: 'Central de Relacionamento',
      sub: 'Atendimento de segunda a sexta, das 8h às 20h.',
      value: '0800 016 4155',
    },
    {
      icon: <Mail className="h-5 w-5 text-red-600" />,
      title: 'E-mail Corporativo',
      sub: 'Tempo de resposta médio de até 2 horas úteis.',
      value: 'suporte@centraldeapoio.com',
    },
    {
      icon: <MapPin className="h-5 w-5 text-red-600" />,
      title: 'Sede Administrativa',
      sub: 'São Paulo - SP',
      value: 'Av. Jornalista Roberto Marinho, 85 - Brooklin',
    },
  ];

  return (
    <div className="py-8 space-y-10 max-w-7xl mx-auto animate-fade-in" id="faleconosco-tab-container">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
          Fale Conosco
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Estamos prontos para atender você. Escolha um dos canais abaixo ou envie uma mensagem rápida pelo formulário integrado de suporte.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Contact info and channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-gray-950 flex items-center gap-2">
              <Clock className="h-5 w-5 text-red-600" />
              Canais Oficiais de Atendimento
            </h3>

            <div className="space-y-6">
              {contactChannels.map((channel, idx) => (
                <div key={idx} className="flex gap-4 items-start border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div className="p-2.5 rounded-xl bg-slate-50 text-red-600 mt-0.5 shrink-0">
                    {channel.icon}
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-xs text-gray-950">{channel.title}</p>
                    <p className="text-[10px] text-slate-400">{channel.sub}</p>
                    <p className="text-xs font-semibold text-slate-700 font-mono select-all pt-1">
                      {channel.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety alert */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex gap-4 items-start">
            <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-xs text-emerald-900">Atendimento Verificado</h4>
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                Nossos canais digitais contam com selo oficial de verificação de conta empresarial. Nunca compartilhe sua senha ou dados de login.
              </p>
            </div>
          </div>
        </div>
              {/* Right column: Form / Success Screen */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 sm:p-8 space-y-6 text-center py-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">Mensagem Enviada com Sucesso!</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Agradecemos o seu contato, <strong className="text-slate-800">{name}</strong>. Sua mensagem foi recebida pela nossa equipe e responderemos em breve através do e-mail <strong className="text-slate-800">{email}</strong>.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer border-none outline-none"
                >
                  Enviar Nova Mensagem
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-100 shadow-md shadow-gray-100/50 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-950">Atendimento via Formulário</h3>
                <p className="text-xs text-slate-400">
                  Preencha o formulário abaixo para enviar sua mensagem de suporte diretamente para nossa equipe especializada.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Seu Nome</label>
                    <input
                       type="text"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       placeholder="Seu nome completo"
                       className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                       required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Seu E-mail</label>
                    <input
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="exemplo@email.com"
                       className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                       required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Telefone de Contato</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">CPF ou CNPJ do Titular</label>
                    <input
                      type="text"
                      value={cpf}
                      onChange={(e) => setCpf(formatCPFOrCNPJ(e.target.value))}
                      placeholder="000.000.000-00"
                      maxLength={18}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Assunto</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800 font-semibold"
                  >
                    <option value="BOLETO">2ª Via de Boleto</option>
                    <option value="QUITACAO">Quitação de Contrato</option>
                    <option value="PARCELAMENTO">Parcelamento / Renegociação</option>
                    <option value="ANTECIPACAO">Antecipação de Parcelas</option>
                    <option value="NEGOCIARDIVIDA">Negociar Dívida</option>
                    <option value="DUVIDAS">Dúvidas Gerais / Outros</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Mensagem</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Descreva sua solicitação ou dúvida detalhadamente..."
                    rows={4}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-3.5 px-4 text-xs shadow-md shadow-red-200 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2 border-none outline-none"
                >
                  <Mail className="h-4 w-4" />
                  <span>{loading ? 'Registrando Solicitação...' : 'Enviar Solicitação por E-mail'}</span>
                </button>
              </form>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  Segurança ponta a ponta
                </span>
                <span>Canal de suporte oficial</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
