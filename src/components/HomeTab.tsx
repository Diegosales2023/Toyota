import React, { useState } from 'react';
import { FileText, Coins, Percent, ArrowRight, ShieldAlert, CheckCircle, Smartphone, MessageSquare, Phone, ShieldCheck, X } from 'lucide-react';

interface HomeTabProps {
  setActiveTab: (tab: string) => void;
}

export default function HomeTab({ setActiveTab }: HomeTabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const formatCPFOrCNPJ = (value: string) => {
    const raw = value.replace(/\D/g, '');
    if (raw.length <= 11) {
      return raw
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      return raw
        .substring(0, 14)
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
  };

  const formatPhone = (value: string) => {
    const raw = value.replace(/\D/g, '');
    if (raw.length <= 10) {
      return raw
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d{4})$/, '$1-$2');
    } else {
      return raw
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{4})$/, '$1-$2');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = 'tel:11977655148';
      setIsOpen(false);
      setSubmitted(false);
    }, 1800);
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

      {/* Phone Support Information Section */}
      <section className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8" id="phone-info-section">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <h2 className="font-display text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <Phone className="h-6 w-6 text-red-600 shrink-0" />
              Atendimento por Telefone Oficial Banco Toyota
            </h2>
            <p className="text-sm text-slate-500">
              Inicie um atendimento seguro por telefone com nossos especialistas para resolver pendências do seu contrato.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-red-50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-red-700 border border-red-100 shrink-0">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span>Central de Atendimento Ativa</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Informative text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-850">Como funciona o nosso canal de suporte telefônico?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nossa central de voz foi projetada para tornar a sua experiência o mais rápida e prática possível. Sem burocracia, você pode solicitar os seguintes serviços em minutos falando com um consultor autorizado:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                <span className="font-bold text-xs text-red-600 uppercase tracking-wider block">Boleto e Parcelas</span>
                <p className="text-xs text-slate-500">Emissão de 2ª via de boleto de parcela mensal ou atrasada com atualização de juros.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                <span className="font-bold text-xs text-red-650 uppercase tracking-wider block">Desconto de Quitação</span>
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

            <div className="flex items-start gap-2.5 text-xs text-amber-800 bg-amber-50/50 border border-amber-100/60 p-3.5 rounded-xl">
              <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
              <p>
                <strong>Dica de segurança:</strong> Nós nunca solicitamos senhas de acesso, códigos SMS ou dados de cartão de crédito. Todo o processo é validado unicamente através do seu CPF/CNPJ do titular do financiamento.
              </p>
            </div>
          </div>

          {/* Call-to-action box */}
          <div className="lg:col-span-5 bg-red-50/40 border border-red-100/60 p-6 sm:p-8 rounded-2xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest block">Canal Oficial Autorizado</span>
                <h4 className="text-lg font-extrabold text-slate-900 leading-tight">Atendimento Instantâneo</h4>
              </div>
              
              <p className="text-xs text-slate-600 leading-relaxed">
                Clique no botão abaixo para preencher o formulário de segurança e ser conectado de forma rápida e segura ao nosso telefone de suporte oficial.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span>Média de resposta: <strong>menos de 2 min</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span>Disponível: <strong>Segunda a Sexta, das 8h às 20h</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-red-100/60 space-y-4">
              <button 
                onClick={() => setIsOpen(true)}
                className="w-full rounded-xl bg-red-600 py-4 text-xs font-bold text-white shadow-md shadow-red-600/20 hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2 border-none outline-none"
                id="btn-phone-home-info"
              >
                <Phone className="h-4.5 w-4.5 shrink-0" />
                <span>Solicitar por Telefone</span>
              </button>

              <div className="text-center space-y-1">
                <span className="text-[10px] text-slate-500 block">Atendimento ativo com registro oficial.</span>
              </div>
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
              <li>Sempre desconfie de propostas com descontos absurdos de quitação vindas de números não oficiais por telefone ou mensagem.</li>
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

      {/* Modal / Dialog Form */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" id="home-modal">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-slate-50 border-b border-gray-100 p-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Solicitar Atendimento</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Falar com Central de Atendimento por Telefone</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all border-none bg-transparent outline-none cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Phone className="h-6 w-6 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-gray-900">Discando para a Central Oficial...</h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    Conectando ao telefone de suporte. Confirme a chamada no seu aparelho para falar conosco.
                  </p>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-700">Nome do Titular</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome completo do titular"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-700">CPF ou CNPJ</label>
                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(formatCPFOrCNPJ(e.target.value))}
                    placeholder="000.000.000-00 ou 00.000.000/0000-00"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                    maxLength={18}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-700">Telefone de Contato</label>
                  <input
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(formatPhone(e.target.value))}
                    placeholder="(00) 00000-0000"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                    maxLength={15}
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] text-center border-none outline-none"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>Iniciar Atendimento por Telefone</span>
                  </button>
                </div>
              </form>
            )}

            <div className="bg-slate-50 p-4 border-t border-gray-100 text-[10px] text-slate-500 text-center leading-normal flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Seus dados estão protegidos pela LGPD e serão utilizados exclusivamente para autenticação oficial.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
