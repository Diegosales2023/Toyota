import React, { useState } from 'react';
import { VEHICLE_DATABASE } from '../mocks';
import { FileText, Coins, Percent, ArrowRight, ShieldAlert, CheckCircle, Smartphone } from 'lucide-react';

interface HomeTabProps {
  setActiveTab: (tab: string) => void;
}

export default function HomeTab({ setActiveTab }: HomeTabProps) {
  // Simulator States
  const [selectedVehicleIdx, setSelectedVehicleIdx] = useState(0);
  const [downPayment, setDownPayment] = useState(40000);
  const [installments, setInstallments] = useState(36);

  const vehicle = VEHICLE_DATABASE[selectedVehicleIdx];
  const maxDownPayment = Math.floor(vehicle.price * 0.8);
  const minDownPayment = Math.floor(vehicle.price * 0.1);

  // Interest rate calculation (simulating standard vehicle financing rates around 1.35% - 1.55%)
  const monthlyRate = 0.0142; // 1.42% am
  const principal = vehicle.price - downPayment;
  
  // PMT formula: PMT = r * PV / (1 - (1 + r)^-n)
  const monthlyPayment = principal > 0 
    ? (monthlyRate * principal) / (1 - Math.pow(1 + monthlyRate, -installments))
    : 0;

  const totalFinanced = monthlyPayment * installments + downPayment;
  const totalInterest = totalFinanced - vehicle.price;

  // Format currency helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
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

      {/* Simulator Section */}
      <section className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="space-y-1">
            <h2 className="font-display text-2xl font-extrabold text-gray-900">
              Simulador de Financiamento Toyota
            </h2>
            <p className="text-sm text-slate-500">
              Quer adquirir um novo veículo? Simule prazos e valores de parcelas de acordo com a taxa vigente.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-700 border border-emerald-100">
            <CheckCircle className="h-4 w-4 shrink-0" />
            <span>Taxa Promocional do Mês</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Simulator Inputs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Vehicle Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-800 block">
                1. Escolha o Modelo Toyota
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {VEHICLE_DATABASE.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedVehicleIdx(index);
                      // Adjust downpayment bounds if currently exceeding maximum of newly selected car
                      const maxDP = Math.floor(item.price * 0.8);
                      if (downPayment > maxDP) {
                        setDownPayment(Math.floor(item.price * 0.4));
                      }
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedVehicleIdx === index
                        ? 'border-red-600 bg-red-50/50 text-red-700 ring-1 ring-red-600'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                    }`}
                  >
                    <span className="block text-xs font-bold leading-tight">{item.model}</span>
                    <span className="block text-[10px] text-gray-400 mt-1">Ref: {formatCurrency(item.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Down Payment Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-800">2. Valor da Entrada (Apoio)</span>
                <span className="font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  {formatCurrency(downPayment)}
                </span>
              </div>
              <input
                type="range"
                min={minDownPayment}
                max={maxDownPayment}
                step={1000}
                value={downPayment}
                onChange={(e) => setDownPayment(parseInt(e.target.value))}
                className="w-full accent-red-600"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>Min: {formatCurrency(minDownPayment)} (10%)</span>
                <span>Max: {formatCurrency(maxDownPayment)} (80%)</span>
              </div>
            </div>

            {/* Installments Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-800">3. Número de Parcelas</span>
                <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                  {installments} Meses
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[12, 24, 36, 48, 60].map((inst) => (
                  <button
                    key={inst}
                    onClick={() => setInstallments(inst)}
                    className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      installments === inst
                        ? 'bg-gray-900 text-white shadow'
                        : 'bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100'
                    }`}
                  >
                    {inst}x
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Simulator Outcomes */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-xl h-44 bg-slate-200">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.model}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-white">
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Modelo selecionado</span>
                  <h4 className="text-sm font-extrabold leading-tight">{vehicle.model}</h4>
                </div>
              </div>

              <div className="space-y-3 text-sm pt-2">
                <div className="flex justify-between text-slate-600">
                  <span>Valor do Veículo:</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(vehicle.price)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Valor Financiado:</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(principal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxa de Juros Especial:</span>
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-xs">1,42% a.m.</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-4">
              <div className="text-center bg-white border border-slate-150 p-4 rounded-xl shadow-sm">
                <span className="text-xs text-slate-500 block font-medium">Parcela Estimada (CDC)</span>
                <span className="text-3xl font-extrabold text-red-600 block my-1">
                  {formatCurrency(monthlyPayment)}
                </span>
                <span className="text-[10px] text-slate-400 block">Simulação sujeita a análise de crédito</span>
              </div>

              <button 
                onClick={() => window.open('https://api.whatsapp.com/send?phone=5511977655148&text=Solicito%20Atendimento', '_blank', 'noopener,noreferrer')}
                className="w-full rounded-xl bg-red-600 py-3.5 text-sm font-bold text-white shadow hover:bg-red-700 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Solicitar Crédito Toyota</span>
                <ArrowRight className="h-4 w-4" />
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
