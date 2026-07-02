import React, { useState } from 'react';
import { Handshake, Percent, Scale, HelpCircle, Send, Info, ShieldAlert, FileText } from 'lucide-react';

export default function NegociacaoTab() {
  const [waName, setWaName] = useState('');
  const [waCpf, setWaCpf] = useState('');
  const [waPlan, setWaPlan] = useState('CASH');
  const [waEntry, setWaEntry] = useState('500');

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const url = 'https://api.whatsapp.com/send?phone=5511977655148&text=Suporte%20Online';
    window.open(url, '_blank', 'noopener,noreferrer');
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

        {/* Right Column - WhatsApp Direct Form */}
        <div className="lg:col-span-5 bg-white border border-emerald-100 shadow-md rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Canal WhatsApp Ativo
            </div>
            <h3 className="text-xl font-bold text-gray-900">Proposta no WhatsApp</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Preencha os dados abaixo para estruturar sua proposta de negociação. A nossa assistente virtual Kira receberá seus dados para validar as condições comerciais.
            </p>
          </div>

          <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                Seu Nome Completo *
              </label>
              <input
                type="text"
                placeholder="Ex: João Silva de Souza"
                value={waName}
                onChange={(e) => setWaName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 font-medium text-xs transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                Seu CPF ou CNPJ *
              </label>
              <input
                type="text"
                placeholder="Ex: 123.456.789-00"
                value={waCpf}
                onChange={(e) => setWaCpf(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 font-medium text-xs transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                Opção de Acordo Desejada *
              </label>
              <select
                value={waPlan}
                onChange={(e) => setWaPlan(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 font-medium text-xs bg-white transition-all"
              >
                <option value="CASH">Pagamento à Vista do Atraso (Desconto de 90%)</option>
                <option value="SPLIT">Parcelamento em 3x fixas</option>
                <option value="EXTEND">Diluir atraso para o final do contrato</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                Valor Proposto de Entrada (R$) *
              </label>
              <input
                type="text"
                placeholder="Ex: 500"
                value={waEntry}
                onChange={(e) => setWaEntry(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 font-medium text-xs transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/10 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-4 hover:scale-[1.02] active:scale-[0.98]"
              id="btn-whatsapp-negociacao-direct"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.01 14.12 1.01 11.5 1.01c-5.436 0-9.86 4.37-9.864 9.8 0 1.637.452 3.23 1.309 4.633L1.925 21.8l6.452-1.68c.31.08.31.08-.01.08zM17.51 14.39c-.3-.149-1.762-.87-2.034-.97-.27-.1-.47-.149-.669.149-.2.3-.764.96-.938 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.785-1.48-1.76-1.65-2.059-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.59-.49-.51-.67-.52-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.08-.12-.29-.2-.59-.35z"/>
              </svg>
              <span>Enviar Proposta no WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
