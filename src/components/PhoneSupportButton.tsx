import React, { useState, useEffect } from 'react';
import { PhoneCall, ShieldCheck, X, Mail } from 'lucide-react';
import { submitLead } from '../lib/leads';

export default function PhoneSupportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Periodic wiggle to attract attention
  const [wiggle, setWiggle] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setWiggle(true);
      setTimeout(() => setWiggle(false), 1500);
    }, 10000); // Wiggle every 10 seconds
    return () => clearInterval(interval);
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead({
      nome,
      email,
      cpf,
      telefone,
      assunto: 'Suporte Direto via E-mail',
      originDomain: 'https://www.centraldeapoio.com',
      targetEmail: 'suporte@centraldeapoio.com',
    });

    const emailSubject = `Solicitação de Suporte Direto`;
    const emailBody = `Olá, solicito atendimento do suporte:
- Nome: ${nome}
- CPF/CNPJ: ${cpf}
- E-mail: ${email}
- Telefone: ${telefone}

Enviado via www.centraldeapoio.com`;

    window.location.href = `mailto:suporte@centraldeapoio.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    setSubmitted(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="phone-widget-container">
      {/* Custom Styles for Pulse/Ripple and Wiggle animations */}
      <style>{`
        @keyframes custom-ripple {
          0% {
            transform: scale(0.95);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.35;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        @keyframes custom-wiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          15% { transform: rotate(-12deg) scale(1.05); }
          30% { transform: rotate(14deg) scale(1.05); }
          45% { transform: rotate(-10deg) scale(1.05); }
          60% { transform: rotate(10deg) scale(1.02); }
          75% { transform: rotate(-4deg) scale(1); }
        }
        .animate-custom-ripple {
          animation: custom-ripple 2.5s infinite ease-out;
        }
        .animate-custom-wiggle {
          animation: custom-wiggle 1.2s ease-in-out;
        }
      `}</style>

      {/* Floating Action Button (Red corporate design) */}
      <button
        onClick={() => setIsOpen(true)}
        className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl hover:bg-red-700 transition-all cursor-pointer border-none outline-none ${
          wiggle ? 'animate-custom-wiggle' : 'hover:scale-110 active:scale-95'
        }`}
        title="Central de Atendimento por E-mail"
        id="phone-floating-btn"
      >
        {/* Pulsing Ripple circles background */}
        <span className="absolute inset-0 rounded-full bg-red-600/40 animate-custom-ripple" />
        <span className="absolute inset-0 rounded-full bg-red-600/20 animate-custom-ripple" style={{ animationDelay: '1s' }} />

        {/* Support Mail Icon */}
        <Mail className="h-8 w-8 relative z-10" />

        {/* Pulsing Alert Notification Badge (Bounce effect) */}
        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-emerald-600 text-[10px] font-bold text-white flex items-center justify-center border border-white animate-bounce">
          1
        </span>
      </button>

      {/* Modal / Dialog Form */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left text-gray-900" id="float-phone-modal">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-slate-50 border-b border-gray-100 p-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Central de Atendimento via E-mail</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Informe seus dados para enviar sua solicitação para suporte@centraldeapoio.com</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all border-none bg-transparent outline-none cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Mail className="h-6 w-6 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-gray-900">Solicitação Registrada!</h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    Agradecemos o seu contato. Sua mensagem foi direcionada para suporte@centraldeapoio.com.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 text-xs text-slate-400 hover:text-slate-600 underline font-medium cursor-pointer bg-transparent border-none outline-none"
                >
                  Fechar
                </button>
              </div>
            ) : (
              /* Form */
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
                  <label className="text-[11px] font-bold text-gray-700">Seu E-mail de Contato</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
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
                    className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] text-center border-none outline-none"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    <span>Enviar Solicitação por E-mail</span>
                  </button>
                </div>
              </form>
            )}

            <div className="bg-slate-50 p-4 border-t border-gray-100 text-[10px] text-slate-500 text-center leading-normal flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Seus dados estão protegidos pela LGPD e serão utilizados exclusivamente para autenticação oficial.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
