import React, { useState } from 'react';
import { Handshake, Scale, CheckCircle2, FileText, Send, ShieldAlert, Percent, HelpCircle, Lock } from 'lucide-react';

export default function NegociarDividaTab() {
  const [waName, setWaName] = useState('');
  const [waCpf, setWaCpf] = useState('');
  const [waContract, setWaContract] = useState('');
  const [waOfferType, setWaOfferType] = useState('VISTA_DESCONTO');

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedText = `Nome: ${waName}%0ACPF: ${waCpf}%0AContrato: ${waContract}%0AOpcão%20Escolha: ${waOfferType}`;
    const url = `https://api.whatsapp.com/send?phone=5511977655148&text=Solicito%20Atendimento%20-%20Negociar%20Divida%0A%0A${formattedText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
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

        {/* Right column: Interactive form */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-100 shadow-md shadow-gray-100/50 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="inline-flex items-center rounded-md bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                Canal de Acordo
              </span>
              <h3 className="text-lg font-bold text-gray-950">Simular Negociação</h3>
              <p className="text-xs text-slate-400">
                Preencha os dados abaixo de forma segura para iniciar a consulta das parcelas vencidas.
              </p>
            </div>

            <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Nome Completo</label>
                <input
                  type="text"
                  value={waName}
                  onChange={(e) => setWaName(e.target.value)}
                  placeholder="Nome do titular do financiamento"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">CPF do Titular</label>
                <input
                  type="text"
                  value={waCpf}
                  onChange={(e) => setWaCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Número do Contrato (Opcional)</label>
                <input
                  type="text"
                  value={waContract}
                  onChange={(e) => setWaContract(e.target.value)}
                  placeholder="Ex: 200.543210"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Preferência de Acordo</label>
                <select
                  value={waOfferType}
                  onChange={(e) => setWaOfferType(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800 font-semibold"
                >
                  <option value="VISTA_DESCONTO">Pagamento à Vista (com maior desconto)</option>
                  <option value="PARCELADO_ENTRADA">Parcelar Dívida com Entrada Facilitada</option>
                  <option value="QUITACO_CONTRATO">Quitação Geral do Financiamento</option>
                  <option value="DILUICAO_SALDO">Diluir as Parcelas no Final do Contrato</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 text-xs shadow-md shadow-red-200 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <Send className="h-4 w-4" />
                <span>Negociar via WhatsApp Oficial</span>
              </button>
            </form>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1 font-semibold">
                <Lock className="h-3.5 w-3.5 text-emerald-500" />
                Dados Protegidos - LGPD
              </span>
              <span>Atendimento em 1 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
