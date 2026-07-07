import React, { useState } from 'react';
import { Mail, PhoneCall, MapPin, Send, ShieldCheck, HelpCircle, AlertCircle, Clock, ChevronRight } from 'lucide-react';

export default function FaleConoscoTab() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('DUVIDAS');
  const [message, setMessage] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedText = `Nome: ${name}%0AEmail: ${email}%0ATelefone: ${phone}%0AAssunto: ${subject}%0AMensagem: ${message}`;
    const url = `https://api.whatsapp.com/send?phone=5511977655148&text=Solicito%20Atendimento%0A%0A${formattedText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
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
      value: 'atendimento@bancotoyota.com.br',
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

        {/* Right column: Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-gray-100 shadow-md shadow-gray-100/50 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-950">Atendimento Direto ou Envio de Formulário</h3>
              <p className="text-xs text-slate-400">
                Inicie um suporte imediato pelo canal direto ou preencha o formulário abaixo para gerar uma mensagem personalizada de abertura de chamado.
              </p>
            </div>

            <div className="space-y-4 pb-6 border-b border-gray-100">
              <a 
                href="https://api.whatsapp.com/send?phone=5511977655148&text=Solicito%20Atendimento"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] text-center"
                id="btn-whatsapp-fale-conosco-direct"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.01 14.12 1.01 11.5 1.01c-5.436 0-9.86 4.37-9.864 9.8 0 1.637.452 3.23 1.309 4.633L1.925 21.8l6.452-1.68c.31.08.31.08-.01.08zM17.51 14.39c-.3-.149-1.762-.87-2.034-.97-.27-.1-.47-.149-.669.149-.2.3-.764.96-.938 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.785-1.48-1.76-1.65-2.059-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.59-.49-.51-.67-.52-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.08-.12-.29-.2-.59-.35z"/>
                </svg>
                <span>Falar com Atendimento Direto no WhatsApp</span>
              </a>

              <div className="text-center space-y-1">
                <span className="text-[10px] text-slate-500 block">Link de redirecionamento direto:</span>
                <a 
                  href="https://api.whatsapp.com/send?phone=5511977655148&text=Solicito%20Atendimento"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold underline break-all block"
                >
                  https://wa.me/5511977655148
                </a>
              </div>
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
                  <label className="text-xs font-bold text-gray-700">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Assunto</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800 font-semibold"
                  >
                    <option value="DUVIDAS">Dúvidas Gerais</option>
                    <option value="RECLAMACOES">Reclamações / Ouvidoria</option>
                    <option value="NEGOCIACAO">Negociação de Financiamento</option>
                    <option value="BOLETO">Problema com Boletos</option>
                    <option value="SUGESTOES">Sugestões e Elogios</option>
                  </select>
                </div>
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
                className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 text-xs shadow-md shadow-red-200 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <Send className="h-4 w-4" />
                <span>Enviar Solicitação via WhatsApp</span>
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
        </div>
      </div>
    </div>
  );
}
