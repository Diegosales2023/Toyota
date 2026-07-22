import React, { useState } from 'react';
import { FileText, Coins, Percent, ArrowRight, ShieldAlert, Smartphone, Mail, ShieldCheck } from 'lucide-react';
import UnifiedContactModal from './UnifiedContactModal';

interface HomeTabProps {
  setActiveTab: (tab: string) => void;
}

export default function HomeTab({ setActiveTab }: HomeTabProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAssunto, setModalAssunto] = useState('2ª Via de Boleto');

  const openFormModal = (assunto: string) => {
    setModalAssunto(assunto);
    setModalOpen(true);
  };

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
            
            {/* CTA Quick Buttons - ALL OPEN THE UNIFIED FORM */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => openFormModal('2ª Via de Boleto')}
                className="inline-flex items-center space-x-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-700 hover:shadow-red-700/40 transition-all cursor-pointer border-none outline-none"
                id="btn-hero-boleto"
              >
                <FileText className="h-4 w-4" />
                <span>Emitir 2ª Via</span>
              </button>
              <button
                onClick={() => openFormModal('Quitação Antecipada')}
                className="inline-flex items-center space-x-2 rounded-xl bg-slate-800 border border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-100 hover:bg-slate-700 hover:text-white transition-all cursor-pointer outline-none"
                id="btn-hero-quitacao"
              >
                <Coins className="h-4 w-4" />
                <span>Quitação Antecipada</span>
              </button>
              <button
                onClick={() => openFormModal('Parcelamento / Negociação de Atrasos')}
                className="inline-flex items-center space-x-2 rounded-xl bg-slate-800 border border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-100 hover:bg-slate-700 hover:text-white transition-all cursor-pointer outline-none"
                id="btn-hero-negociacao"
              >
                <Percent className="h-4 w-4" />
                <span>Negociar Atrasos</span>
              </button>
            </div>
          </div>

          {/* Elegant Card showing off Toyota design */}
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
                Verifique sempre os dados do beneficiário antes de pagar qualquer boleto. O Banco Toyota S.A. possui o CNPJ oficial <strong>02.115.111/0001-22</strong>. Nossos canais legítimos emitem boletos via registradores centralizados CIP/Febraban.
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
            Clique em qualquer um dos serviços abaixo para preencher o formulário oficial de solicitação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div 
            onClick={() => openFormModal('2ª Via de Boleto')}
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
                Esqueceu ou perdeu a parcela mensal? Preencha os dados no formulário para solicitar a emissão do boleto atualizado.
              </p>
            </div>
            <span className="inline-flex items-center text-xs font-semibold text-red-600 group-hover:translate-x-1.5 transition-transform">
              Solicitar Boleto <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </span>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => openFormModal('Quitação Antecipada')}
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
                Deseja quitar todo o seu contrato ou antecipar parcelas finais? Solicite o cálculo com desconto proporcional de juros por e-mail.
              </p>
            </div>
            <span className="inline-flex items-center text-xs font-semibold text-red-600 group-hover:translate-x-1.5 transition-transform">
              Solicitar Quitação <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </span>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => openFormModal('Parcelamento / Negociação de Atrasos')}
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
                Possui parcelas em atraso? Envie seus dados para receber propostas de renegociação com condições facilitadas.
              </p>
            </div>
            <span className="inline-flex items-center text-xs font-semibold text-red-600 group-hover:translate-x-1.5 transition-transform">
              Solicitar Acordo <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </span>
          </div>
        </div>
      </section>

      {/* Phone Support Information Section */}
      <section className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8" id="phone-info-section">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <h2 className="font-display text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <Mail className="h-6 w-6 text-red-600 shrink-0" />
              Atendimento Oficial Central de Apoio
            </h2>
            <p className="text-sm text-slate-500">
              Inicie um atendimento seguro por e-mail com nossos especialistas para resolver pendências do seu contrato.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-red-50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-red-700 border border-red-100 shrink-0">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span>Central de Atendimento Ativa</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-850">Como funciona o nosso canal de suporte por e-mail?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nossa central de atendimento por e-mail foi projetada para tornar a sua experiência a mais rápida e prática possível. Sem burocracia, você pode solicitar os seguintes serviços enviando sua mensagem para <strong>suporte@centraldeapoio.com</strong>:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                <span className="font-bold text-xs text-red-600 uppercase tracking-wider block">Boleto e Parcelas</span>
                <p className="text-xs text-slate-500">Emissão de 2ª via de boleto de parcela mensal ou atrasada com atualização de juros.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                <span className="font-bold text-xs text-red-600 uppercase tracking-wider block">Desconto de Quitação</span>
                <p className="text-xs text-slate-500">Amortização de parcelas ou quitação total com desconto proporcional de juros garantido por lei.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                <span className="font-bold text-xs text-blue-600 uppercase tracking-wider block">Acordo de Dívida</span>
                <p className="text-xs text-slate-500">Planos flexíveis de renegociação para regularização imediata de restrições de crédito.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                <span className="font-bold text-xs text-slate-700 uppercase tracking-wider block">Segurança Integrada</span>
                <p className="text-xs text-slate-500">Documentos oficiais gerados em conformidade com as diretrizes do Banco Central.</p>
              </div>
            </div>
          </div>

          {/* Call-to-action box */}
          <div className="lg:col-span-5 bg-red-50/40 border border-red-100/60 p-6 sm:p-8 rounded-2xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest block">Canal Oficial Autorizado</span>
                <h4 className="text-lg font-extrabold text-slate-900 leading-tight">Atendimento por E-mail</h4>
              </div>
              
              <p className="text-xs text-slate-600 leading-relaxed">
                Clique no botão abaixo para preencher o formulário e enviar sua solicitação para <strong>suporte@centraldeapoio.com</strong>.
              </p>
            </div>

            <div className="pt-4 border-t border-red-100/60 space-y-4">
              <button 
                onClick={() => openFormModal('Atendimento Geral - Página Inicial')}
                className="w-full rounded-xl bg-red-600 py-4 text-xs font-bold text-white shadow-md shadow-red-600/20 hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2 border-none outline-none"
                id="btn-phone-home-info"
              >
                <Mail className="h-4.5 w-4.5 shrink-0" />
                <span>Preencher Formulário de Solicitação</span>
              </button>

              <div className="text-center space-y-1">
                <span className="text-[10px] text-slate-500 block">Atendimento ativo via suporte@centraldeapoio.com.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
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
              <li>O código de banco para boletos emitidos pelo Banco Toyota começa com <strong>033</strong> ou <strong>341</strong>.</li>
              <li>Sempre desconfie de propostas com descontos absurdos enviadas por contatos não verificados.</li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 text-slate-700">
              <Smartphone className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-gray-900">
              Banco Toyota no seu Celular
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Acompanhe seu contrato de onde estiver! Baixe o aplicativo "Banco Toyota Clientes" diretamente na Google Play Store ou Apple App Store.
            </p>
          </div>
          <div className="flex items-center space-x-3 pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Disponível em:</span>
            <div className="bg-gray-200 px-2.5 py-1 rounded text-[10px] font-bold text-gray-700">Android</div>
            <div className="bg-gray-200 px-2.5 py-1 rounded text-[10px] font-bold text-gray-700">iOS (iPhone)</div>
          </div>
        </div>
      </section>

      {/* Unified Contact Form Modal */}
      <UnifiedContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultAssunto={modalAssunto}
      />
    </div>
  );
}
