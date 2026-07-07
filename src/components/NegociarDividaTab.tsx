import React from 'react';
import { Handshake, Scale, CheckCircle2, FileText, ShieldAlert, Percent, HelpCircle, Lock } from 'lucide-react';

export default function NegociarDividaTab() {
  const handleWhatsAppRedirect = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const url = 'https://api.whatsapp.com/send?phone=5511977655148&text=Solicito%20Atendimento%20-%20Negociar%20Divida';
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

        {/* Right column: WhatsApp Direct Information Panel */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-100 shadow-md shadow-gray-100/50 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                Canal de Acordo Ativo
              </span>
              <h3 className="text-lg font-bold text-gray-950">Acordo via WhatsApp</h3>
              <p className="text-xs text-slate-400">
                Consulte as opções de parcelamento de suas pendências ou quitação com descontos especiais na nossa central.
              </p>
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-4">
              <h4 className="font-bold text-xs text-slate-800">Como funciona o acordo de dívida:</h4>
              
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Atendimento rápido para tirar restrições de crédito</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Emissão de boletos oficiais do Banco Toyota S.A.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Totalmente seguro sob as regras do CDC e da LGPD</span>
                </li>
              </ul>

              <div className="p-3 bg-emerald-50/50 border border-emerald-100/40 rounded-xl text-[11px] text-emerald-800">
                <p className="font-bold">Dados protegidos:</p>
                <p>Nossos analistas financeiros usam criptografia SSL para garantir total segurança.</p>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href="https://api.whatsapp.com/send?phone=5511977655148&text=Solicito%20Atendimento"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-4 text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.01 14.12 1.01 11.5 1.01c-5.436 0-9.86 4.37-9.864 9.8 0 1.637.452 3.23 1.309 4.633L1.925 21.8l6.452-1.68c.31.08.31.08-.01.08zM17.51 14.39c-.3-.149-1.762-.87-2.034-.97-.27-.1-.47-.149-.669.149-.2.3-.764.96-.938 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.785-1.48-1.76-1.65-2.059-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.59-.49-.51-.67-.52-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.08-.12-.29-.2-.59-.35z"/>
                </svg>
                <span>Negociar via WhatsApp Oficial</span>
              </a>

              <div className="text-center space-y-1">
                <span className="text-[10px] text-slate-500 block">Link de redirecionamento direto:</span>
                <a 
                  href="https://api.whatsapp.com/send?phone=5511977655148&text=Solicito%20Atendimento"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold underline break-all block"
                >
                  https://wa.me/5511977655148
                </a>
              </div>
            </div>

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
