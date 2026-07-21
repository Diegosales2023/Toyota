import React, { useState } from 'react';
import { Mail, ShieldCheck, CheckCircle2, HelpCircle, Phone, Clock, Info, ArrowRight, FileText, AlertTriangle } from 'lucide-react';
import { submitLead } from '../lib/leads';

export default function EmailTab() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [contrato, setContrato] = useState('');
  const [assunto, setAssunto] = useState('2ª Via de Boleto');
  const [mensagem, setMensagem] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await submitLead({
      nome,
      email,
      cpf,
      telefone,
      assunto,
      mensagem,
      contrato,
      originDomain: 'https://www.centraldeapoio.com',
      targetEmail: 'suporte@centraldeapoio.com',
    });

    setEmailSentStatus(result.emailSent ?? false);
    setLoading(false);
    setSubmitted(true);
  };

  const infoSteps = [
    {
      icon: <Clock className="h-5 w-5 text-red-600" />,
      title: 'Tempo de Resposta Rápido',
      description: 'Nossa equipe de suporte corporativo analisa e responde as solicitações enviadas por e-mail em até 2 horas úteis.',
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-red-600" />,
      title: 'Segurança e Conformidade LGPD',
      description: 'Todos os seus dados são tratados com total confidencialidade e segurança, restritos à análise do seu contrato oficial.',
    },
    {
      icon: <Mail className="h-5 w-5 text-red-600" />,
      title: 'Histórico Registrado',
      description: 'Ao utilizar o canal de e-mail, você mantém todo o histórico de conversas documentado para sua maior segurança e controle.',
    },
  ];

  return (
    <div className="py-8 space-y-10 max-w-7xl mx-auto animate-fade-in" id="email-tab-container">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
          Suporte por E-mail Oficial
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Envie sua solicitação diretamente para o nosso e-mail corporativo ou utilize o formulário seguro para gerar o seu rascunho de forma imediata.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Informações sobre o Atendimento */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Info className="h-5 w-5 text-red-600" />
              Atendimento Corporativo
            </h3>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              O canal de suporte por e-mail é indicado para formalização de solicitações de parcelamento, quitação e envio de documentações contratuais.
            </p>

            {/* List of details */}
            <div className="space-y-6 pt-2">
              {infoSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-xl bg-red-50 text-red-600 shrink-0">
                    {step.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-gray-950">{step.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Email Display */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Endereço de E-mail Direto</span>
              <a 
                href="mailto:suporte@centraldeapoio.com"
                className="text-sm font-extrabold text-red-600 hover:underline font-mono"
              >
                suporte@centraldeapoio.com
              </a>
            </div>
          </div>

          {/* Quick Info Tip */}
          <div className="bg-red-50 border border-red-100/60 rounded-2xl p-6 flex gap-4 items-start">
            <HelpCircle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-xs text-red-900">Dica de Segurança</h4>
              <p className="text-[11px] text-red-700 leading-relaxed">
                Nossos e-mails oficiais terminam exclusivamente com o domínio <strong className="text-red-900">@centraldeapoio.com</strong>. Desconfie de qualquer remetente usando provedores genéricos (como @gmail.com ou @outlook.com).
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Form / Success State */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 sm:p-8 space-y-6 text-center py-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">Solicitação Registrada!</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sua solicitação sobre <strong className="text-slate-800">{assunto}</strong> foi gravada com sucesso no banco de dados do sistema (backup disponível em <strong>/api/contacts</strong>).
                </p>
              </div>

              {emailSentStatus === true ? (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-left space-y-1 text-xs text-emerald-900">
                  <p className="font-bold flex items-center gap-1.5 text-emerald-800">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    E-mail despachado por SMTP!
                  </p>
                  <p className="text-[11px] leading-relaxed text-emerald-700">
                    A mensagem foi enviada de forma automatizada pelo servidor para <strong>suporte@centraldeapoio.com</strong>.
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-left space-y-1.5 text-xs text-amber-900">
                  <p className="font-bold flex items-center gap-1.5 text-amber-900">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                    Observação sobre envio automático por E-mail:
                  </p>
                  <p className="text-[11px] leading-relaxed text-amber-800">
                    Seus dados já foram registrados no sistema. Como as variáveis de autenticação SMTP de servidor (como <strong>SMTP_PASS</strong>) não foram configuradas no ambiente, você pode enviar o e-mail via leitor local ou configurar o SMTP na Vercel.
                  </p>
                </div>
              )}

              {/* Message Details Preview Card */}
              <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-5 text-left space-y-3">
                <div className="flex justify-between border-b border-slate-100 pb-2 text-[11px]">
                  <span className="text-slate-400 font-bold">Destinatário:</span>
                  <span className="text-slate-700 font-mono font-bold">suporte@centraldeapoio.com</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 text-[11px]">
                  <span className="text-slate-400 font-bold">Assunto:</span>
                  <span className="text-slate-700 font-semibold">Atendimento Oficial - {assunto}</span>
                </div>
                <div className="space-y-1 text-xs text-slate-600 pt-1 font-mono text-[11px] leading-relaxed">
                  <p><strong>Nome:</strong> {nome}</p>
                  <p><strong>CPF/CNPJ:</strong> {cpf}</p>
                  <p><strong>E-mail:</strong> {email}</p>
                  <p><strong>Telefone:</strong> {telefone}</p>
                  <p><strong>Mensagem:</strong> {mensagem || 'Nenhuma mensagem adicional informada.'}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-slate-500 hover:text-slate-700 underline font-medium cursor-pointer bg-transparent border-none outline-none pt-1"
                >
                  Voltar e enviar nova solicitação
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-100 shadow-md shadow-gray-100/50 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-950 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-red-600" />
                  Rascunhar Solicitação por E-mail
                </h3>
                <p className="text-xs text-slate-400">
                  Insira seus dados para que nosso assistente organize um rascunho de e-mail padronizado e seguro.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Nome Completo do Titular</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Nome conforme consta no contrato"
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">CPF ou CNPJ</label>
                    <input
                      type="text"
                      value={cpf}
                      onChange={(e) => setCpf(formatCPFOrCNPJ(e.target.value))}
                      placeholder="000.000.000-00"
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Número do Contrato (Opcional)</label>
                    <input
                      type="text"
                      value={contrato}
                      onChange={(e) => setContrato(e.target.value)}
                      placeholder="Se houver, informe o número"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700">Tipo de Solicitação</label>
                    <select
                      value={assunto}
                      onChange={(e) => setAssunto(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800 font-semibold"
                    >
                      <option value="2ª Via de Boleto">Emitir 2ª Via de Boleto</option>
                      <option value="Quitação de Contrato">Quitação de Contrato</option>
                      <option value="Parcelamento / Renegociação">Parcelamento / Renegociação de Dívidas</option>
                      <option value="Antecipação de Parcelas">Antecipação de Parcelas</option>
                      <option value="Dúvidas Gerais">Dúvidas Gerais / Outros Assuntos</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-700">Detalhes da Solicitação</label>
                  <textarea
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Descreva brevemente o seu pedido para facilitar o atendimento..."
                    rows={4}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800 resize-none"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] text-center border-none outline-none"
                  >
                    <Mail className="h-4.5 w-4.5 shrink-0" />
                    <span>{loading ? 'Registrando Solicitação...' : 'Enviar Solicitação por E-mail'}</span>
                  </button>
                </div>
              </form>

              <div className="bg-slate-50 p-4 border-t border-gray-100 text-[10px] text-slate-500 text-center leading-normal">
                Seus dados estão resguardados sob estrita conformidade com a LGPD e serão utilizados apenas para direcionar o rascunho de e-mail oficial de forma voluntária.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
