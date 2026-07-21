import React, { useState } from 'react';
import { Handshake, Percent, Scale, HelpCircle, Info, ShieldAlert, FileText, CheckCircle2, Phone, Mail, MessageSquare } from 'lucide-react';

export default function NegociacaoTab() {
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

  const handleNegociacaoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="py-8 space-y-10 max-w-7xl mx-auto animate-fade-in" id="negociacao-tab-container">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
          Negociação de Dívidas
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Regularize seus débitos com condições especiais. Oferecemos opções de parcelamento facilitado e descontos significativos em juros e encargos de atraso.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Informações sobre Negociação */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card: Por que Negociar? */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Handshake className="h-5 w-5 text-red-600" />
              Regularize seu Contrato Sem Complicação
            </h3>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              Sabemos que imprevistos acontecem. O <strong>Banco Toyota</strong> disponibiliza canais humanizados e automatizados para renegociar parcelas em atraso, evitando custos adicionais e problemas judiciais ou de restrição ao seu nome.
            </p>

            {/* Key advantages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <Percent className="h-5 w-5 text-red-600" />
                <p className="font-bold text-slate-800">Até 90% de Desconto</p>
                <p className="text-slate-500 leading-normal">
                  Abatimento expressivo sobre juros de mora e multas contratuais para pagamentos à vista.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <Scale className="h-5 w-5 text-red-600" />
                <p className="font-bold text-slate-800">Segurança Jurídica</p>
                <p className="text-slate-500 leading-normal">
                  Acordo oficial homologado com termo emitido diretamente pela instituição financeira.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <FileText className="h-5 w-5 text-red-600" />
                <p className="font-bold text-slate-800">Nome Limpo Rápido</p>
                <p className="text-slate-500 leading-normal">
                  Retirada do apontamento nos órgãos de proteção ao crédito em até 5 dias após o pagamento da primeira parcela do acordo.
                </p>
              </div>
            </div>
          </div>

          {/* Card: Opções de Acordos Comuns */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Info className="h-5 w-5 text-red-600" />
              Opções de Planos Disponíveis no Atendimento
            </h3>
            <div className="space-y-4 text-xs text-slate-600">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-800 mb-1">A) Liquidação à Vista do Atraso</p>
                <p className="leading-relaxed">
                  Quitação integral apenas do montante que está atrasado. É a opção que garante maior desconto na multa e nos juros decorrentes do atraso.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-800 mb-1">B) Parcelamento do Débito Vencido</p>
                <p className="leading-relaxed">
                  Divida o valor total das parcelas em atraso com uma entrada facilitada e o restante parcelado em até 3x mensais adicionais.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-800 mb-1">C) Diluição do Atraso no Saldo Residual</p>
                <p className="leading-relaxed">
                  Em casos específicos, é possível incorporar o valor pendente às parcelas finais do financiamento, mantendo seu nome regularizado imediatamente mediante pagamento de uma taxa de adesão ao acordo.
                </p>
              </div>
            </div>
          </div>

          {/* Security Banner */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-start space-x-4">
            <ShieldAlert className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-xs text-red-900 uppercase tracking-wide">ALERTA DE SEGURANÇA: CUIDADO COM ESCRITÓRIOS DE COBRANÇA FALSOS</h4>
              <p className="text-xs text-red-700 leading-relaxed">
                NUNCA faça pagamentos para contas bancárias de terceiros (empresas de assessoria desconhecidas, assessores virtuais em canais não oficiais). Os acordos oficiais do Banco Toyota do Brasil geram boletos onde a entidade beneficiária é exclusivamente o próprio <strong>Banco Toyota do Brasil S.A.</strong>. Sempre feche seu acordo com a nossa assistente Kira.
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-3">
            <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-slate-400" />
              Dúvidas Comuns sobre Acordo e Cobrança
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <p>
                <strong>Em quantos dias meu nome sai do SPC/SERASA após pagar o acordo?</strong><br />
                O prazo legal estabelecido para a retirada da restrição nos cadastros de inadimplência é de até 5 (cinco) dias úteis após a compensação do primeiro pagamento da renegociação.
              </p>
              <p>
                <strong>O que acontece se eu atrasar o pagamento do acordo?</strong><br />
                O atraso de qualquer parcela do acordo pode acarretar a quebra do contrato de renegociação, retornando os valores originais da dívida e desconsiderando os descontos anteriormente concedidos.
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
                Sua solicitação foi registrada com sucesso. O WhatsApp foi aberto para conectar você ao nosso atendimento oficial de forma rápida e segura.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <p className="text-[10px] text-slate-400">Caso o chat não tenha aberto automaticamente, clique no botão abaixo:</p>
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
          <div className="lg:col-span-5 bg-white border border-gray-100 shadow-md rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-800 border border-red-100 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Formulário de Atendimento
              </div>
              <h3 className="text-xl font-bold text-gray-900">Solicitar Atendimento</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Preencha os dados abaixo e selecione o assunto desejado para receber seu atendimento imediato.
              </p>
            </div>

            <form onSubmit={handleNegociacaoSubmit} className="space-y-4 pt-1">
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

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Assunto do Atendimento</label>
                <select
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800 cursor-pointer font-medium"
                  required
                >
                  <option value="2ª Via de Boleto">2ª Via de Boleto</option>
                  <option value="Quitação de Contrato">Quitação de Contrato</option>
                  <option value="Antecipação de Parcelas">Antecipação de Parcelas</option>
                  <option value="Negociação de Dívidas">Negociação de Dívidas</option>
                  <option value="Dúvidas e Outros Assuntos">Dúvidas e Outros Assuntos</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] text-center border-none outline-none"
                  id="btn-phone-negociacao-submit"
                >
                  <MessageSquare className="h-4.5 w-4.5 shrink-0" />
                  <span>Enviar Solicitação</span>
                </button>
              </div>
            </form>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1 text-[11px] text-slate-500">
              <p className="font-bold text-slate-700">Dica de Segurança:</p>
              <p>O Banco Toyota oficial garante o sigilo total de suas informações de acordo com a LGPD e nunca compartilha seus dados cadastrais.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
