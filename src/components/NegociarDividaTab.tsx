import React, { useState } from 'react';
import { Handshake, Scale, CheckCircle2, FileText, ShieldAlert, Percent, Lock, Phone, Mail, MessageSquare } from 'lucide-react';
import { submitLead } from '../lib/leads';

export default function NegociarDividaTab() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [assunto, setAssunto] = useState('Negociação de Dívidas');
  const [submitted, setSubmitted] = useState(false);

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

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead({
      nome,
      email,
      cpf,
      telefone,
      assunto,
      originDomain: 'https://www.centraldeapoio.com',
      targetEmail: 'suporte@centraldeapoio.com',
    });

    setSubmitted(true);
    const waNumber = '5511977655148';
    const waMessage = `Olá, gostaria de solicitar atendimento para meu contrato:
- Assunto: ${assunto}
- Nome do Titular: ${nome}
- CPF/CNPJ: ${cpf}
- E-mail de Contato: ${email}
- Telefone de Contato: ${telefone}`;
    setTimeout(() => {
      window.location.href = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(waMessage)}`;
    }, 500);
  };

  return (
    <div className="py-8 space-y-10 max-w-7xl mx-auto animate-fade-in" id="negociardivida-tab-container">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
          Negociar Dívida
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Recupere sua tranquilidade financeira. Acesse descontos exclusivos e regularize seu financiamento com total sigilo e rapidez.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Benefits and policy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Handshake className="h-5 w-5 text-red-600" />
              Por que fechar seu acordo hoje?
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              O Banco Toyota oferece condições sob medida para que você coloque suas contas em dia sem apertar o seu orçamento mensal. Veja as principais vantagens de negociar conosco:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <Percent className="h-5.5 w-5.5 text-red-600" />
                <p className="font-bold text-xs text-slate-800">Redução de até 90% dos Encargos</p>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Reduzimos juros acumulados, multas e custos de cobrança cartorária para pagamento facilitado.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <CheckCircle2 className="h-5.5 w-5.5 text-emerald-600" />
                <p className="font-bold text-xs text-slate-800">Limpeza de Restrição (SPC/Serasa)</p>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Seu nome será regularizado nos órgãos de crédito em até 5 dias úteis após a compensação da primeira parcela do acordo.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <Scale className="h-5.5 w-5.5 text-blue-600" />
                <p className="font-bold text-xs text-slate-800">Evite Medidas Judiciais</p>
                <p className="text-[11px] text-slate-500 leading-normal">
                  A negociação amigável interrompe qualquer ação de busca e apreensão, assegurando a permanência do veículo com você.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <FileText className="h-5.5 w-5.5 text-purple-600" />
                <p className="font-bold text-xs text-slate-800">Termo de Acordo Oficial</p>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Receba um documento formal discriminando os valores negociados e garanta total respaldo de lei.
                </p>
              </div>
            </div>
          </div>

          {/* Security alert */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex gap-4 items-start">
            <ShieldAlert className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-xs text-red-900">Alerta de Fraude: Cuidado com Boleto Falso</h4>
              <p className="text-xs text-red-700 leading-relaxed">
                Boletos de negociação de dívida emitidos pelo Banco Toyota do Brasil contêm código de barras que aponta para o beneficiário correto no momento do pagamento em seu aplicativo bancário. Sempre revise antes de finalizar.
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Form / Success Screen */}
        <div className="lg:col-span-5 font-sans">
          {submitted ? (
            <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 sm:p-8 space-y-6 text-center py-12">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">Solicitação Enviada!</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Sua solicitação foi gerada com sucesso! O WhatsApp foi aberto para conectar você ao nosso suporte oficial de forma ágil e segura.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <p className="text-[10px] text-slate-400 font-sans">Caso o chat não tenha aberto automaticamente, clique no botão abaixo:</p>
                <a
                  href={`https://api.whatsapp.com/send?phone=5511977655148&text=${encodeURIComponent(`Olá, gostaria de solicitar atendimento para meu contrato:\n- Assunto: ${assunto}\n- Nome: ${nome}\n- CPF/CNPJ: ${cpf}\n- E-mail: ${email}\n- Telefone: ${telefone}`)}`}
                  target="_blank"
                  rel="noreferrer referrer"
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer border-none outline-none text-center"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Iniciar Atendimento no WhatsApp</span>
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 underline font-medium cursor-pointer bg-transparent border-none outline-none pt-2"
                >
                  Voltar para o formulário
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-100 shadow-md shadow-gray-100/50 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                  Canal de Atendimento Ativo
                </span>
                <h3 className="text-lg font-bold text-gray-900 font-display">Solicitar Atendimento</h3>
                <p className="text-xs text-slate-500">
                  Preencha os dados abaixo e selecione o assunto desejado para receber seu atendimento imediato.
                </p>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Nome do Titular</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome completo do titular"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800 font-sans"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Seu E-mail de Contato</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800 font-sans"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">CPF ou CNPJ</label>
                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(formatCPFOrCNPJ(e.target.value))}
                    placeholder="000.000.000-00 ou 00.000.000/0000-00"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800 font-sans"
                    maxLength={18}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Telefone de Contato</label>
                  <input
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(formatPhone(e.target.value))}
                    placeholder="(00) 00000-0000"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800 font-sans"
                    maxLength={15}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Assunto do Atendimento</label>
                  <select
                    value={assunto}
                    onChange={(e) => setAssunto(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800 cursor-pointer font-medium font-sans"
                    required
                  >
                    <option value="2ª Via de Boleto">2ª Via de Boleto</option>
                    <option value="Quitação de Contrato">Quitação de Contrato</option>
                    <option value="Antecipação de Parcelas">Antecipação de Parcelas</option>
                    <option value="Negociação de Dívidas">Negociação de Dívidas</option>
                    <option value="Dúvidas e Outros Assuntos">Dúvidas e Outros Assuntos</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] text-center border-none outline-none mt-2"
                  id="btn-negociar-submit"
                >
                  <MessageSquare className="h-4.5 w-4.5 shrink-0" />
                  <span>Enviar Solicitação</span>
                </button>
              </form>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 font-semibold">
                  <Lock className="h-3.5 w-3.5 text-emerald-500" />
                  Dados Protegidos - LGPD
                </span>
                <span>Atendimento ágil</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
