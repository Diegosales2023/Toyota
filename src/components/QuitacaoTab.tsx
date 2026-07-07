import React from 'react';
import { Coins, Percent, ShieldCheck, HelpCircle, Info, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export default function QuitacaoTab() {
  const handleWhatsAppRedirect = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const url = 'https://api.whatsapp.com/send?phone=5511977655148&text=Solicito%20Atendimento%20-%20Quitacao%20de%20Contrato';
    window.open(url, '_blank', 'noopener,noreferrer');
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

        {/* Right Column - WhatsApp Direct Information Panel */}
        <div className="lg:col-span-5 bg-white border border-emerald-100 shadow-md rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Canal WhatsApp Ativo
            </div>
            <h3 className="text-xl font-bold text-gray-900">Quitação via WhatsApp</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Inicie a simulação do seu desconto garantido por lei com nossa assistente virtual Kira. Ela gerará os demonstrativos oficiais de cálculo de forma instantânea.
            </p>
          </div>

          <div className="space-y-4 border-t border-slate-100 pt-4">
            <h4 className="font-bold text-xs text-slate-800">Como funciona o atendimento:</h4>
            
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Simulação 100% gratuita do abatimento de juros</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Opções de quitação integral ou amortização de parcelas finais</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Geração de boleto oficial em formato PDF seguro</span>
              </li>
            </ul>

            <div className="p-3 bg-emerald-50/50 border border-emerald-100/40 rounded-xl text-[11px] text-emerald-800">
              <p className="font-bold">Sem burocracia:</p>
              <p>Basta clicar no botão abaixo. Não solicitamos senhas ou tokens de segurança.</p>
            </div>
          </div>

          <div className="space-y-4">
            <a
              href="https://api.whatsapp.com/send?phone=5511977655148&text=Solicito%20Atendimento%20-%20Quitacao%20de%20Contrato"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] text-center"
              id="btn-whatsapp-quitacao-direct"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.01 14.12 1.01 11.5 1.01c-5.436 0-9.86 4.37-9.864 9.8 0 1.637.452 3.23 1.309 4.633L1.925 21.8l6.452-1.68c.31.08.31.08-.01.08zM17.51 14.39c-.3-.149-1.762-.87-2.034-.97-.27-.1-.47-.149-.669.149-.2.3-.764.96-.938 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.785-1.48-1.76-1.65-2.059-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.59-.49-.51-.67-.52-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.08-.12-.29-.2-.59-.35z"/>
              </svg>
              <span>Solicitar Quitação no WhatsApp</span>
            </a>

            <div className="text-center space-y-1">
              <span className="text-[10px] text-slate-500 block">Link de redirecionamento direto:</span>
              <a 
                href="https://api.whatsapp.com/send?phone=5511977655148&text=Solicito%20Atendimento%20-%20Quitacao%20de%20Contrato"
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold underline break-all block"
              >
                https://wa.me/5511977655148
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
