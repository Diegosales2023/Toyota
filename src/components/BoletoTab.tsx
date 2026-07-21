import React, { useState } from 'react';
import { FileText, ShieldAlert, CheckCircle2, HelpCircle, Info, Phone, Mail, MessageSquare } from 'lucide-react';

export default function BoletoTab() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [contactMethod, setContactMethod] = useState<'phone' | 'whatsapp' | 'email'>('whatsapp');

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

  const handleBoletoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (contactMethod === 'phone') {
      setTimeout(() => {
        window.location.href = 'tel:11977655148';
      }, 500);
    } else if (contactMethod === 'whatsapp') {
      const waNumber = '5511977655148';
      const waMessage = `Olá, gostaria de solicitar a 2ª Via de Boleto para o meu contrato:
- Nome do Titular: ${nome}
- CPF/CNPJ: ${cpf}
- E-mail de Contato: ${email}
- Telefone de Contato: ${telefone}`;
      setTimeout(() => {
        window.location.href = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(waMessage)}`;
      }, 500);
    } else {
      const recipient = 'atendimento@bancotoyota.com.br';
      const emailSubject = `Solicitação de 2ª Via de Boleto - ${nome}`;
      const emailBody = `Olá, gostaria de solicitar a 2ª via de boleto para o meu contrato:
- Nome do Titular: ${nome}
- CPF/CNPJ: ${cpf}
- E-mail de Contato: ${email}
- Telefone de Contato: ${telefone}

Atenciosamente,
${nome}`;
      setTimeout(() => {
        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      }, 500);
    }
  };

  return (
    <div className="py-8 space-y-10 max-w-7xl mx-auto animate-fade-in" id="boleto-tab-container">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
          Segunda Via de Boleto
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Veja abaixo como funciona o processo de emissão e acesse o canal oficial de atendimento telefônico.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Informações e Explicação de Como Funciona */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card: Como Funciona */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Info className="h-5 w-5 text-red-600" />
              Como Funciona a Emissão de Boleto?
            </h3>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              Para sua comodidade e segurança contra golpes, as segundas vias de boletos do <strong>Banco Toyota</strong> são geradas e enviadas de forma instantânea diretamente através do nosso canal telefônico oficial. Um especialista ajudará você em todo o processo de emissão segura.
            </p>

            {/* Steps Visual */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 font-bold text-sm">
                  1
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-gray-950">Atendimento por Telefone</h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    Clique no botão de atendimento para iniciar uma ligação de suporte com nossa central oficial de atendimento.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 font-bold text-sm">
                  2
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-gray-950">Confirmação de Segurança</h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    Informe seu CPF ou número de contrato diretamente no chat para que nosso sistema localize suas parcelas com segurança.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 font-bold text-sm">
                  3
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-gray-950">Recebimento do Boleto em PDF</h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    Valide os dados do boleto e receba o PDF verificado e pronto para pagamento em menos de 1 minuto.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Tipos de Boletos Emitidos */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-red-600" />
              Tipos de Boletos que você pode emitir
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <p className="font-bold text-slate-800">Parcela Atual / A Vencer</p>
                <p className="text-slate-500 leading-relaxed">
                  Emita a guia de pagamento para a parcela do mês corrente que ainda não venceu, garantindo a pontualidade do seu contrato.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <p className="font-bold text-slate-800">Parcelas em Atraso</p>
                <p className="text-slate-500 leading-relaxed">
                  Regularize as parcelas que já passaram do vencimento com o cálculo automático de juros e mora contratuais sem burocracia.
                </p>
              </div>
            </div>
          </div>

          {/* Safety Alert Box */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-start space-x-4">
            <ShieldAlert className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-xs text-red-900 uppercase tracking-wide">AVISO DE SEGURANÇA CONTRA GOLPES</h4>
              <p className="text-xs text-red-700 leading-relaxed">
                Antes de realizar qualquer pagamento, certifique-se sempre de que o beneficiário do boleto na tela de seu banco é o <strong>Banco Toyota do Brasil S.A. (CNPJ: 02.115.111/0001-22)</strong>. Nós nunca solicitamos PIX ou transferências para contas de pessoas físicas (CPFs).
              </p>
            </div>
          </div>

          {/* FAQ Accordion Item */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-3">
            <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-slate-400" />
              Dúvidas Frequentes sobre Boletos
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <p>
                <strong>Há cobrança de tarifa para emissão de 2ª via?</strong><br />
                Não. A emissão de segunda via de boleto para pagamento de financiamento é totalmente gratuita e faz parte dos canais de autoatendimento oficiais.
              </p>
              <p>
                <strong>Quanto tempo demora para compensar o pagamento?</strong><br />
                O prazo de compensação bancária padrão é de até 2 (dois) dias úteis após a realização do pagamento no banco ou casa lotérica.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column - Interactive Form Panel / Success Screen */}
        <div className="lg:col-span-5">
          {submitted ? (
            <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 sm:p-8 space-y-6 text-center py-12">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">Solicitação Enviada!</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {contactMethod === 'phone' ? (
                    <>Seus dados foram verificados com sucesso. Um especialista entrará em contato com você no telefone <strong className="text-slate-800">{telefone}</strong> para fornecer a 2ª via do boleto de forma segura.</>
                  ) : contactMethod === 'whatsapp' ? (
                    <>Sua solicitação foi gerada com sucesso! O WhatsApp foi aberto para que você envie seus dados diretamente ao nosso suporte oficial de forma ágil e segura.</>
                  ) : (
                    <>Sua solicitação foi gerada com sucesso! O rascunho do seu e-mail de solicitação de boleto foi aberto. Você pode enviar a mensagem diretamente para <strong className="text-slate-800">atendimento@bancotoyota.com.br</strong>.</>
                  )}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 space-y-3">
                {contactMethod === 'phone' ? (
                  <>
                    <p className="text-[10px] text-slate-400">Caso prefira, você também pode discar diretamente para nossa Central:</p>
                    <a
                      href="tel:11977655148"
                      className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer border-none outline-none text-center"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Ligar para Central: (11) 97765-5148</span>
                    </a>
                  </>
                ) : contactMethod === 'whatsapp' ? (
                  <>
                    <p className="text-[10px] text-slate-400">Caso o chat do WhatsApp não tenha aberto automaticamente, clique no botão abaixo:</p>
                    <a
                      href={`https://api.whatsapp.com/send?phone=5511977655148&text=${encodeURIComponent(`Olá, gostaria de solicitar a 2ª Via de Boleto para o meu contrato:\n- Nome: ${nome}\n- CPF/CNPJ: ${cpf}\n- E-mail: ${email}\n- Telefone: ${telefone}`)}`}
                      target="_blank"
                      rel="noreferrer referrer"
                      className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer border-none outline-none text-center"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Enviar via WhatsApp</span>
                    </a>
                  </>
                ) : (
                  <>
                    <p className="text-[10px] text-slate-400">Caso o seu cliente de e-mail não tenha aberto, você pode enviar diretamente para:</p>
                    <a
                      href={`mailto:atendimento@bancotoyota.com.br?subject=Solicitação de 2ª Via de Boleto - ${nome}&body=${encodeURIComponent(`Olá, gostaria de solicitar a 2ª via de boleto para o meu contrato:\n- Nome do Titular: ${nome}\n- CPF/CNPJ: ${cpf}\n- E-mail de Contato: ${email}\n- Telefone de Contato: ${telefone}\n\nAtenciosamente,\n${nome}`)}`}
                      className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer border-none outline-none text-center"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Reabrir E-mail de Suporte</span>
                    </a>
                  </>
                )}
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 underline font-medium cursor-pointer bg-transparent border-none outline-none pt-2"
                >
                  Voltar para o formulário
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-100 shadow-md rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-800 border border-red-100 text-xs font-semibold">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  Formulário de Solicitação
                </div>
                <h3 className="text-xl font-bold text-gray-900">Solicitar 2ª Via de Boleto</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Escolha o canal de preferência e preencha os dados cadastrais do seu financiamento abaixo para receber seu boleto seguro de forma imediata.
                </p>
              </div>

              {/* Canal Selection Tabs */}
              <div className="flex rounded-xl bg-slate-100/80 p-1 gap-1" id="boleto-contact-tabs">
                <button
                  type="button"
                  onClick={() => setContactMethod('whatsapp')}
                  className={`flex-1 py-2.5 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1 border-none cursor-pointer outline-none ${
                    contactMethod === 'whatsapp'
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('email')}
                  className={`flex-1 py-2.5 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1 border-none cursor-pointer outline-none ${
                    contactMethod === 'email'
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  E-mail
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('phone')}
                  className={`flex-1 py-2.5 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1 border-none cursor-pointer outline-none ${
                    contactMethod === 'phone'
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Phone className="h-3.5 w-3.5" />
                  Telefone
                </button>
              </div>

              <form onSubmit={handleBoletoSubmit} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Nome do Titular</label>
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
                  <label className="text-xs font-bold text-gray-700">Seu E-mail de Contato</label>
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
                  <label className="text-xs font-bold text-gray-700">CPF ou CNPJ</label>
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
                  <label className="text-xs font-bold text-gray-700">Telefone de Contato</label>
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
                    className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] text-center border-none outline-none"
                    id="btn-phone-boleto-submit"
                  >
                    {contactMethod === 'phone' ? (
                      <>
                        <Phone className="h-4.5 w-4.5 shrink-0" />
                        <span>Emitir 2ª Via por Telefone</span>
                      </>
                    ) : contactMethod === 'whatsapp' ? (
                      <>
                        <MessageSquare className="h-4.5 w-4.5 shrink-0" />
                        <span>Emitir 2ª Via por WhatsApp</span>
                      </>
                    ) : (
                      <>
                        <Mail className="h-4.5 w-4.5 shrink-0" />
                        <span>Emitir 2ª Via por E-mail</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1 text-[11px] text-slate-500">
                <p className="font-bold text-slate-700">Dica de Segurança:</p>
                <p>O atendimento oficial do Banco Toyota é verificado e nunca solicita transferências ou pagamentos direcionados a contas bancárias de terceiros (pessoas físicas).</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
