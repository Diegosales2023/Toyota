import React, { useState } from 'react';
import { Coins, Percent, ShieldCheck, HelpCircle, Info, AlertTriangle, FileText, CheckCircle2, Phone, Mail, MessageSquare } from 'lucide-react';

export default function QuitacaoTab() {
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
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d{4})$/, '$1-$2');
    } else {
      return raw
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{4})$/, '$1-$2');
    }
  };

  const handleQuitacaoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (contactMethod === 'phone') {
      setTimeout(() => {
        window.location.href = 'tel:11977655148';
      }, 500);
    } else if (contactMethod === 'whatsapp') {
      const waNumber = '5511977655148';
      const waMessage = `Olá, gostaria de solicitar uma simulação para a Quitação do meu contrato:
- Nome do Titular: ${nome}
- CPF/CNPJ: ${cpf}
- E-mail de Contato: ${email}
- Telefone de Contato: ${telefone}`;
      setTimeout(() => {
        window.location.href = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(waMessage)}`;
      }, 500);
    } else {
      const recipient = 'atendimento@bancotoyota.com.br';
      const emailSubject = `Solicitação de Quitação de Contrato - ${nome}`;
      const emailBody = `Olá, gostaria de solicitar uma simulação e boleto para a Quitação do meu contrato:
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
    <div className="py-8 space-y-10 max-w-7xl mx-auto animate-fade-in" id="quitacao-tab-container">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
          Quitação e Antecipação
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Economize dinheiro reduzindo juros futuros. Solicite o cálculo de desconto proporcional garantido por lei para amortizar seu contrato.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Informações sobre Quitação */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card: Benefícios e Direitos */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Percent className="h-5 w-5 text-red-600" />
              Direito ao Abatimento Proporcional de Juros (Art. 52 do CDC)
            </h3>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              De acordo com o <strong>Artigo 52, Parágrafo 2º do Código de Defesa do Consumidor (CDC)</strong>, é garantido ao cliente a liquidação antecipada do débito, total ou parcialmente, mediante <strong>redução proporcional dos juros</strong> e demais acréscimos.
            </p>

            {/* Key benefits highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <Coins className="h-5 w-5 text-red-600" />
                <p className="font-bold text-xs text-slate-800">Economia Real</p>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Elimine os juros de parcelas futuras que seriam pagos ao longo dos meses.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <p className="font-bold text-xs text-slate-800">Baixa de Gravame</p>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Após a quitação total, o veículo é desalienado no DETRAN automaticamente.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <FileText className="h-5 w-5 text-blue-600" />
                <p className="font-bold text-xs text-slate-800">Histórico de Crédito</p>
                <p className="text-[11px] text-slate-500 leading-normal">
                  A amortização antecipada melhora seu score financeiro nos órgãos de proteção ao crédito.
                </p>
              </div>
            </div>
          </div>

          {/* Card: Modalidades de Quitação */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Info className="h-5 w-5 text-red-600" />
              Modalidades Disponíveis para seu Financiamento
            </h3>
            <div className="space-y-4 text-xs text-slate-600">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-800 mb-1">1. Quitação Integral (Liquidação Total)</p>
                <p className="leading-relaxed">
                  Consiste no pagamento de todas as parcelas restantes do seu contrato de uma única vez. É calculado o desconto de juros trazido a valor presente de cada uma das parcelas do saldo devedor até a data escolhida para pagamento.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-800 mb-1">2. Amortização / Antecipação Parcial</p>
                <p className="leading-relaxed">
                  Você escolhe um número de parcelas para antecipar (começando geralmente de trás para frente, isto é, da última parcela para as anteriores). Isso ajuda a reduzir o tempo total de financiamento mantendo a parcela mensal ou ajuda a reajustar o fluxo de caixa.
                </p>
              </div>
            </div>
          </div>

          {/* Safety Warning */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-yellow-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-xs text-yellow-900 uppercase tracking-wide">Atenção com Boletos de Quitação Falsos</h4>
              <p className="text-xs text-yellow-700 leading-relaxed">
                Golpistas costumam criar sites falsos oferecendo descontos irreais de até 90% para quitação total de veículos. <strong>Desconfie de ofertas absurdas</strong>. O desconto concedido pelo Banco Toyota é estritamente financeiro (trazido a valor presente com base na taxa estipulada em seu contrato). Sempre confirme a validade com a Kira em nosso canal oficial.
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-3">
            <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-slate-400" />
              Dúvidas Comuns sobre Quitação
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <p>
                <strong>Qual o prazo para baixa do gravame no DETRAN?</strong><br />
                A liberação da garantia (baixa de alienação fiduciária) ocorre de forma eletrônica e automática no sistema do DETRAN do seu estado em até 10 (dez) dias úteis após a compensação bancária do pagamento de quitação.
              </p>
              <p>
                <strong>Posso antecipar parcelas de forma recorrente?</strong><br />
                Sim. Você pode amortizar seu financiamento quantas vezes quiser e no valor que desejar diretamente em nosso canal.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column - Interactive Form Panel / Success Screen */}
        {submitted ? (
          <div className="lg:col-span-5 bg-white border border-gray-100 shadow-md rounded-2xl p-6 sm:p-8 space-y-6 text-center py-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Solicitação Enviada!</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {contactMethod === 'phone' ? (
                  <>Seus dados foram verificados com sucesso. Um especialista de quitação entrará em contato com você no telefone <strong className="text-slate-800">{telefone}</strong> para apresentar o cálculo de abatimento proporcional de juros.</>
                ) : contactMethod === 'whatsapp' ? (
                  <>Sua solicitação foi gerada com sucesso! O WhatsApp foi aberto para que você envie seus dados diretamente ao nosso suporte oficial de forma ágil e segura.</>
                ) : (
                  <>Sua solicitação foi gerada com sucesso! O rascunho de e-mail para quitação de contrato foi criado. Envie a mensagem diretamente para <strong className="text-slate-800">atendimento@bancotoyota.com.br</strong>.</>
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
                    href={`https://api.whatsapp.com/send?phone=5511977655148&text=${encodeURIComponent(`Olá, gostaria de solicitar uma simulação para a Quitação do meu contrato:\n- Nome: ${nome}\n- CPF/CNPJ: ${cpf}\n- E-mail: ${email}\n- Telefone: ${telefone}`)}`}
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
                  <p className="text-[10px] text-slate-400">Caso o seu cliente de e-mail não tenha aberto, envie diretamente para:</p>
                  <a
                    href={`mailto:atendimento@bancotoyota.com.br?subject=Solicitação de Quitação de Contrato - ${nome}&body=${encodeURIComponent(`Olá, gostaria de solicitar uma simulação e boleto para a Quitação do meu contrato:\n- Nome do Titular: ${nome}\n- CPF/CNPJ: ${cpf}\n- E-mail de Contato: ${email}\n- Telefone de Contato: ${telefone}\n\nAtenciosamente,\n${nome}`)}`}
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
          <div className="lg:col-span-5 bg-white border border-gray-100 shadow-md rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-800 border border-red-100 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Formulário de Solicitação
              </div>
              <h3 className="text-xl font-bold text-gray-900">Quitação de Contrato</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Escolha o canal de preferência e preencha os dados do titular abaixo para gerar a simulação oficial com abatimento proporcional de juros.
              </p>
            </div>

            {/* Canal Selection Tabs */}
            <div className="flex rounded-xl bg-slate-100/80 p-1 gap-1" id="quitacao-contact-tabs">
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

            <form onSubmit={handleQuitacaoSubmit} className="space-y-4 pt-2">
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
                  id="btn-phone-quitacao-submit"
                >
                  {contactMethod === 'phone' ? (
                    <>
                      <Phone className="h-4.5 w-4.5 shrink-0" />
                      <span>Solicitar Quitação por Telefone</span>
                    </>
                  ) : contactMethod === 'whatsapp' ? (
                    <>
                      <MessageSquare className="h-4.5 w-4.5 shrink-0" />
                      <span>Solicitar Quitação por WhatsApp</span>
                    </>
                  ) : (
                    <>
                      <Mail className="h-4.5 w-4.5 shrink-0" />
                      <span>Solicitar Quitação por E-mail</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1 text-[11px] text-slate-500">
              <p className="font-bold text-slate-700">Dica de Segurança:</p>
              <p>O cálculo oficial de desconto para quitação é emitido exclusivamente pelo Banco Toyota do Brasil S.A. e detalhado com segurança por telefone ou e-mail corporativo oficial.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
