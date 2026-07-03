import React, { useState } from 'react';
import { CalendarRange, Percent, ShieldCheck, HelpCircle, Send, Info, AlertTriangle, ChevronRight } from 'lucide-react';

export default function AntecipacaoTab() {
  const [waName, setWaName] = useState('');
  const [waCpf, setWaCpf] = useState('');
  const [waContract, setWaContract] = useState('');
  const [waQuantity, setWaQuantity] = useState('1');

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const url = 'https://api.whatsapp.com/send?phone=5511977655148&text=Solicito%20Atendimento';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-8 space-y-10 max-w-7xl mx-auto animate-fade-in" id="antecipacao-tab-container">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
          Antecipação de Parcelas
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Adiantar o pagamento de suas parcelas é uma decisão inteligente. Garanta descontos significativos com a redução proporcional de juros.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Informações sobre Antecipação */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card: Como Funciona o Desconto */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Percent className="h-5 w-5 text-red-600" />
              Como funciona o Desconto por Antecipação?
            </h3>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              Toda vez que você antecipa parcelas do seu financiamento, você tem o direito garantido de receber um <strong>desconto proporcional de juros</strong>. Isso acontece porque o prazo de empréstimo do dinheiro foi reduzido. O cálculo é feito de trás para frente (da última parcela do contrato para a mais recente), reduzindo o saldo devedor de forma acelerada.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-red-50 text-red-600">
                    <CalendarRange className="h-4 w-4" />
                  </div>
                  <p className="font-bold text-xs text-slate-800">Ordem Inversa (Trás para Frente)</p>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Ao antecipar a última parcela do financiamento, você garante o maior desconto possível, pois é a parcela que acumula mais juros de longo prazo.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <p className="font-bold text-xs text-slate-800">Garantia por Lei</p>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  O abatimento é regulamentado pelo Banco Central e pelo Código de Defesa do Consumidor, sendo obrigatório e calculado com precisão matemática.
                </p>
              </div>
            </div>
          </div>

          {/* Card: Vantagens de Antecipar */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Info className="h-5 w-5 text-red-600" />
              Vantagens de Realizar a Antecipação
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-xs text-slate-600">
                <div className="mt-0.5 rounded-full bg-red-100 p-0.5 text-red-600">
                  <ChevronRight className="h-3 w-3" />
                </div>
                <div>
                  <strong className="text-slate-800">Redução de Juros:</strong> Quanto mais parcelas você antecipar de uma vez, maior será o montante de juros poupado, liberando limite para novos planos.
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-600">
                <div className="mt-0.5 rounded-full bg-red-100 p-0.5 text-red-600">
                  <ChevronRight className="h-3 w-3" />
                </div>
                <div>
                  <strong className="text-slate-800">Encurtamento do Contrato:</strong> Reduza meses ou até anos da duração do financiamento do seu Toyota de forma flexível e programada.
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-600">
                <div className="mt-0.5 rounded-full bg-red-100 p-0.5 text-red-600">
                  <ChevronRight className="h-3 w-3" />
                </div>
                <div>
                  <strong className="text-slate-800">Liberdade Financeira:</strong> Acelere o processo para quitar integralmente o veículo e retire a alienação fiduciária com mais rapidez.
                </div>
              </div>
            </div>
          </div>

          {/* Safety Warning */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-yellow-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-xs text-yellow-900 uppercase tracking-wide">Aviso Importante sobre Pagamentos</h4>
              <p className="text-xs text-yellow-700 leading-relaxed">
                A simulação de desconto e a emissão do boleto de antecipação devem ser efetuados unicamente através de nossos canais verificados de atendimento. Certifique-se sempre de que o boleto aponta como beneficiário final o <strong>Banco Toyota do Brasil S.A.</strong>
              </p>
            </div>
          </div>

        </div>

        {/* Right Column - WhatsApp Request Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-gray-100 shadow-md shadow-gray-100/50 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1.5">
              <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                Simulação Online
              </span>
              <h3 className="text-xl font-bold text-gray-900">Solicitar Antecipação</h3>
              <p className="text-xs text-slate-400">
                Preencha os campos abaixo para iniciar a sua simulação de desconto de juros no WhatsApp.
              </p>
            </div>

            <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Nome do Titular</label>
                <input 
                  type="text" 
                  value={waName}
                  onChange={(e) => setWaName(e.target.value)}
                  placeholder="Nome completo do titular" 
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
                  placeholder="Ex: 200.123456" 
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Quantidade de Parcelas para Antecipar</label>
                <select 
                  value={waQuantity}
                  onChange={(e) => setWaQuantity(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800 font-medium"
                >
                  <option value="1">1 Parcela (A última)</option>
                  <option value="2">2 Parcelas (As últimas)</option>
                  <option value="5">5 Parcelas (As últimas)</option>
                  <option value="10">10 Parcelas (As últimas)</option>
                  <option value="ALL">Quitação Integral do Contrato</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 text-xs shadow-md shadow-red-200 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <Send className="h-4 w-4" />
                <span>Simular Antecipação no WhatsApp</span>
              </button>
            </form>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                Conexão Segura SSL
              </span>
              <span>Resposta em menos de 1 min</span>
            </div>
          </div>

          {/* Help Card */}
          <div className="bg-slate-100/50 rounded-2xl p-6 border border-slate-200/40 text-center space-y-3">
            <HelpCircle className="h-6 w-6 text-slate-400 mx-auto" />
            <h4 className="font-bold text-xs text-slate-800">Dúvidas sobre o abatimento?</h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              Se preferir, nossa equipe de analistas financeiros está pronta para ligar para você ou sanar todas as suas dúvidas via central oficial de relacionamento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
