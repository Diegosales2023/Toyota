import React from 'react';
import { CalendarRange, Percent, ShieldCheck, HelpCircle, Info, AlertTriangle, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function AntecipacaoTab() {
  const handleWhatsAppRedirect = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const url = 'https://api.whatsapp.com/send?phone=5511977655148&text=Solicito%20Atendimento%20-%20Antecipacao%20de%20Parcelas';
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

        {/* Right Column - WhatsApp Direct Information Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-gray-100 shadow-md shadow-gray-100/50 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1.5">
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                Canal WhatsApp Ativo
              </span>
              <h3 className="text-xl font-bold text-gray-900">Antecipação via WhatsApp</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Inicie a simulação do seu abatimento proporcional de juros com nossa assistente virtual Kira. Ela gerará os demonstrativos oficiais de cálculo.
              </p>
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-4">
              <h4 className="font-bold text-xs text-slate-800">Como funciona o atendimento de antecipação:</h4>
              
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Escolha adiantar parcelas específicas ou da última para trás</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Cálculo eletrônico instantâneo de abatimento de juros</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Geração de boleto oficial seguro e rastreável</span>
                </li>
              </ul>

              <div className="p-3 bg-emerald-50/50 border border-emerald-100/40 rounded-xl text-[11px] text-emerald-800">
                <p className="font-bold">Agilidade no atendimento:</p>
                <p>O processo é finalizado em menos de 3 minutos sem burocracia ou envio de senhas.</p>
              </div>
            </div>

            <button 
              onClick={() => handleWhatsAppRedirect()}
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-4 text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.01 14.12 1.01 11.5 1.01c-5.436 0-9.86 4.37-9.864 9.8 0 1.637.452 3.23 1.309 4.633L1.925 21.8l6.452-1.68c.31.08.31.08-.01.08zM17.51 14.39c-.3-.149-1.762-.87-2.034-.97-.27-.1-.47-.149-.669.149-.2.3-.764.96-.938 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.785-1.48-1.76-1.65-2.059-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.59-.49-.51-.67-.52-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.08-.12-.29-.2-.59-.35z"/>
              </svg>
              <span>Simular Antecipação no WhatsApp</span>
            </button>

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
