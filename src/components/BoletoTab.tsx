import React, { useState } from 'react';
import { FileText, ShieldAlert, CheckCircle2, HelpCircle, Send, Info, AlertCircle, ExternalLink } from 'lucide-react';

export default function BoletoTab() {
  const handleWhatsAppRedirect = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const url = 'https://api.whatsapp.com/send?phone=5511977655148&text=Solicito%20Atendimento%20-%20Segunda%20Via%20de%20Boleto';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-8 space-y-10 max-w-7xl mx-auto animate-fade-in" id="boleto-tab-container">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
          Segunda Via de Boleto
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Veja abaixo como funciona o processo de emissão e acesse o canal oficial de atendimento via WhatsApp.
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
              Para sua comodidade e segurança contra golpes, as segundas vias de boletos do <strong>Banco Toyota</strong> são geradas e enviadas de forma instantânea diretamente através do nosso canal verificado do WhatsApp. A nossa assistente virtual <strong>Kira</strong> guiará você em todo o processo.
            </p>

            {/* Steps Visual */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 font-bold text-sm">
                  1
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-gray-950">Acesso ao WhatsApp</h4>
                  <p className="text-xs text-slate-500 leading-normal">
                    Clique no botão de atendimento para iniciar uma conversa criptografada e segura com nossa assistente virtual Kira.
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

        {/* Right Column - WhatsApp Direct Information Panel */}
        <div className="lg:col-span-5 bg-white border border-emerald-100 shadow-md rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Canal WhatsApp Ativo
            </div>
            <h3 className="text-xl font-bold text-gray-900">Solicitar 2ª Via de Boleto</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Você não precisa preencher nenhum formulário aqui no site. Nosso atendimento é feito diretamente e com toda segurança pelo WhatsApp oficial.
            </p>
          </div>

          <div className="space-y-4 border-t border-slate-100 pt-4">
            <h4 className="font-bold text-xs text-slate-800">Tenha em mãos para o atendimento:</h4>
            
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Número do CPF ou CNPJ do titular do contrato</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Número do contrato (se possuir, para agilizar)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Identificação de qual parcela deseja emitir</span>
              </li>
            </ul>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1 text-[11px] text-slate-500">
              <p className="font-bold text-slate-700">Dica de Segurança:</p>
              <p>O atendimento oficial do Banco Toyota é verificado e possui o selo verde de autenticidade no WhatsApp.</p>
            </div>
          </div>

          <button
            onClick={() => handleWhatsAppRedirect()}
            className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            id="btn-whatsapp-boleto-direct"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.01 14.12 1.01 11.5 1.01c-5.436 0-9.86 4.37-9.864 9.8 0 1.637.452 3.23 1.309 4.633L1.925 21.8l6.452-1.68c.31.08.31.08-.01.08zM17.51 14.39c-.3-.149-1.762-.87-2.034-.97-.27-.1-.47-.149-.669.149-.2.3-.764.96-.938 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.785-1.48-1.76-1.65-2.059-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.59-.49-.51-.67-.52-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.08-.12-.29-.2-.59-.35z"/>
            </svg>
            <span>Iniciar Atendimento no WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
