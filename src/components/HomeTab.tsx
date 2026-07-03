import React from 'react';
import { FileText, Coins, Percent, ArrowRight, ShieldAlert, CheckCircle, Smartphone, MessageSquare } from 'lucide-react';

interface HomeTabProps {
  setActiveTab: (tab: string) => void;
}

export default function HomeTab({ setActiveTab }: HomeTabProps) {

  return (
    <div className="space-y-16 py-8" id="home-tab-container">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-12 sm:py-24 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-left space-y-6">
            <div className="inline-flex items-center space-x-2 bg-red-600/10 text-red-400 border border-red-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span>Canal de Autoatendimento Oficial</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-none text-white">
              Gestão rápida do seu <span className="text-red-500">Financiamento Toyota</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Emita a segunda via de parcelas vencidas, realize simulações de quitação antecipada com descontos de juros ou faça um acordo de parcelamento de forma 100% segura e digital.
            </p>
            
            {/* CTA Quick Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setActiveTab('boleto')}
                className="inline-flex items-center space-x-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-700 hover:shadow-red-700/40 transition-all cursor-pointer"
                id="btn-hero-boleto"
              >
                <FileText className="h-4 w-4" />
                <span>Emitir 2ª Via</span>
              </button>
              <button
                onClick={() => setActiveTab('quitacao')}
                className="inline-flex items-center space-x-2 rounded-xl bg-slate-800 border border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-100 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
                id="btn-hero-quitacao"
              >
                <Coins className="h-4 w-4" />
                <span>Quitação Antecipada</span>
              </button>
              <button
                onClick={() => setActiveTab('negociacao')}
                className="inline-flex items-center space-x-2 rounded-xl bg-slate-800 border border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-100 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
                id="btn-hero-negociacao"
              >
                <Percent className="h-4 w-4" />
                <span>Negociar Atrasos</span>
              </button>
            </div>
          </div>

          {/* Elegant Card showing off a Toyota design */}
          <div className="relative w-full lg:w-[420px] bg-slate-800/80 backdrop-blur border border-slate-700 p-6 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Destaque de Segurança</span>
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="bg-slate-900 p-4 rounded-xl space-y-3 border border-slate-800">
              <div className="flex items-center space-x-3 text-amber-400">
                <ShieldAlert className="h-5 w-5 shrink-0" />
                <span className="text-sm font-bold">Dica Banco Toyota</span>
              </div>
              <p className="text-xs text-slate-300 leading-normal">
                Verifique sempre os dados do beneficiário antes de pagar qualquer boleto. O Banco Toyota S.A. possui o CNPJ oficial <strong>02.115.111/0001-22</strong>. Nossos canais legítimos emitem boletos emitidos via registradores centralizados da CIP/Febraban.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span>Portal Versão 2.4</span>
              <span>Conexão TLS 1.3 ativa</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
            Qual serviço você deseja realizar hoje?
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm">
            Selecione uma das opções abaixo ou utilize o menu superior para acessar as áreas exclusivas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div 
            onClick={() => setActiveTab('boleto')}
            className="group cursor-pointer bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300 flex flex-col justify-between space-y-6"
            id="service-card-boleto"
          >
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                2ª Via de Boleto
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Esqueceu ou perdeu a parcela mensal? Insira o CPF/CNPJ e tenha acesso rápido para copiar o código de barras ou visualizar o boleto atualizado.
              </p>
            </div>
            <span className="inline-flex items-center text-xs font-semibold text-red-600 group-hover:translate-x-1.5 transition-transform">
              Acessar Boletos <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </span>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => setActiveTab('quitacao')}
            className="group cursor-pointer bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300 flex flex-col justify-between space-y-6"
            id="service-card-quitacao"
          >
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                <Coins className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                Quitação Antecipada
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Deseja quitar todo o seu contrato ou antecipar parcelas finais? Calcule o desconto proporcional de juros por antecipação de forma instantânea.
              </p>
            </div>
            <span className="inline-flex items-center text-xs font-semibold text-red-600 group-hover:translate-x-1.5 transition-transform">
              Calcular Desconto <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </span>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => setActiveTab('negociacao')}
            className="group cursor-pointer bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300 flex flex-col justify-between space-y-6"
            id="service-card-negociacao"
          >
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                <Percent className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                Negociar Dívida
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Possui uma ou mais parcelas em atraso? Conheça nossos planos flexíveis de renegociação com abatimentos em encargos de mora.
              </p>
            </div>
            <span className="inline-flex items-center text-xs font-semibold text-red-600 group-hover:translate-x-1.5 transition-transform">
              Negociar Online <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </span>
          </div>
        </div>
      </section>

      {/* WhatsApp Support Information Section */}
      <section className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8" id="whatsapp-info-section">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <h2 className="font-display text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-emerald-600 shrink-0" />
              Atendimento Digital Banco Toyota via WhatsApp
            </h2>
            <p className="text-sm text-slate-500">
              Inicie um atendimento automatizado e seguro diretamente em nosso WhatsApp para resolver pendências do seu contrato.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-700 border border-emerald-100 shrink-0">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Kira (Assistente Virtual) Ativa</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Informative text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-850">Como funciona o nosso canal de suporte?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nossa assistente inteligente, <strong>Kira</strong>, foi projetada para tornar a sua experiência o mais rápida e prática possível. Sem filas de espera no telefone e sem burocracia, você pode solicitar os seguintes serviços em segundos:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                <span className="font-bold text-xs text-red-600 uppercase tracking-wider block">Boleto e Parcelas</span>
                <p className="text-xs text-slate-500">Emissão de 2ª via de boleto de parcela mensal ou atrasada com atualização de juros.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                <span className="font-bold text-xs text-emerald-600 uppercase tracking-wider block">Desconto de Quitação</span>
                <p className="text-xs text-slate-500">Amortização de parcelas ou quitação total com desconto proporcional de juros garantido por lei.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                <span className="font-bold text-xs text-blue-600 uppercase tracking-wider block">Acordo de Dívida</span>
                <p className="text-xs text-slate-500">Planos flexíveis de renegociação para regularização imediata de restrições de crédito.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                <span className="font-bold text-xs text-purple-600 uppercase tracking-wider block">Segurança Integrada</span>
                <p className="text-xs text-slate-500">Documentos oficiais em PDF protegidos com criptografia e registro oficial Febraban.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-amber-800 bg-amber-50/50 border border-amber-100/60 p-3.5 rounded-xl">
              <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
              <p>
                <strong>Dica de segurança:</strong> Nós nunca solicitamos senhas de acesso, códigos SMS ou dados de cartão de crédito. Todo o processo é validado unicamente através do seu CPF/CNPJ do titular do financiamento.
              </p>
            </div>
          </div>

          {/* Call-to-action box */}
          <div className="lg:col-span-5 bg-emerald-50/40 border border-emerald-100/60 p-6 sm:p-8 rounded-2xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-750 uppercase tracking-widest block">Canal Oficial Autorizado</span>
                <h4 className="text-lg font-extrabold text-slate-900 leading-tight">Atendimento Instantâneo</h4>
              </div>
              
              <p className="text-xs text-slate-600 leading-relaxed">
                Clique no botão abaixo para ser redirecionado de forma segura ao nosso canal oficial do WhatsApp. Envie uma mensagem com a sua solicitação e receba suporte imediato.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Média de resposta: <strong>menos de 1 min</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Disponível: <strong>24h por dia, 7 dias por semana</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-100/60">
              <button 
                onClick={() => window.open('https://api.whatsapp.com/send?phone=5511977655148&text=Solicito%20Atendimento', '_blank', 'noopener,noreferrer')}
                className="w-full rounded-xl bg-emerald-600 py-4 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2"
                id="btn-whatsapp-home-info"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.01 14.12 1.01 11.5 1.01c-5.436 0-9.86 4.37-9.864 9.8 0 1.637.452 3.23 1.309 4.633L1.925 21.8l6.452-1.68c.31.08.31.08-.01.08zM17.51 14.39c-.3-.149-1.762-.87-2.034-.97-.27-.1-.47-.149-.669.149-.2.3-.764.96-.938 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.785-1.48-1.76-1.65-2.059-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.59-.49-.51-.67-.52-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.08-.12-.29-.2-.59-.35z"/>
                </svg>
                <span>Falar com Atendimento no WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Safe navigation alerts */}
        <div className="bg-red-50/50 border border-red-100 rounded-3xl p-8 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-gray-900">
              Atenção com Boletos Falsos!
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              O Banco Toyota preza pela segurança dos seus dados. Siga sempre as orientações abaixo:
            </p>
            <ul className="text-xs text-slate-500 space-y-2 list-disc pl-4 leading-normal">
              <li>Verifique o beneficiário do boleto: deve constar <strong>BANCO TOYOTA S/A (CNPJ 02.115.111/0001-22)</strong>.</li>
              <li>O código de banco para boletos emitidos pelo Banco Toyota começa com <strong>033</strong> (Banco Santander, emissor parceiro) ou <strong>341</strong> (Itaú).</li>
              <li>Sempre desconfie de propostas com descontos absurdos de quitação vindas de números não oficiais no WhatsApp.</li>
            </ul>
          </div>
        </div>

        {/* Dynamic Mobile App download callout */}
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 text-slate-700">
              <Smartphone className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-gray-900">
              Banco Toyota no seu Celular
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Acompanhe seu contrato de onde estiver! Baixe o aplicativo "Banco Toyota Clientes" diretamente na Google Play Store ou Apple App Store para ter acesso à carteira digital completa.
            </p>
          </div>
          <div className="flex items-center space-x-3 pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Disponível em:</span>
            <div className="bg-gray-200 px-2.5 py-1 rounded text-[10px] font-bold text-gray-700">Android</div>
            <div className="bg-gray-200 px-2.5 py-1 rounded text-[10px] font-bold text-gray-700">iOS (iPhone)</div>
          </div>
        </div>

      </section>
    </div>
  );
}
