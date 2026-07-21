import React, { useState } from 'react';
import { ShieldCheck, Car, Key, FileSpreadsheet, Percent, HeartHandshake, HelpCircle, PhoneCall, ArrowRight, CheckCircle2, Phone } from 'lucide-react';

export default function ServicosTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
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

  const openModal = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setSubmitted(false);
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = 'tel:11977655148';
    }, 500);
  };

  const services = [
    {
      icon: <Car className="h-6 w-6 text-red-600" />,
      title: 'CDC - Crédito Direto ao Consumidor',
      description: 'A forma tradicional e segura de financiar seu veículo com parcelas mensais fixas e taxas de juros competitivas, do início ao fim do contrato.',
    },
    {
      icon: <Key className="h-6 w-6 text-emerald-600" />,
      title: 'Ciclo Toyota',
      description: 'A maneira mais fácil de estar sempre de Toyota novo. Entrada facilitada, parcelas mensais reduzidas e garantia de recompra do seu seminovo pela concessionária ao final.',
    },
    {
      icon: <FileSpreadsheet className="h-6 w-6 text-blue-600" />,
      title: 'Leasing Financeiro',
      description: 'Indicado para empresas e pessoas físicas que buscam benefícios tributários e operacionais ao alugar o veículo com opção de compra ao término do prazo.',
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-indigo-600" />,
      title: 'Seguros Toyota',
      description: 'Proteção completa e sob medida para seu veículo, com franquia reduzida, uso de peças originais nas concessionárias e atendimento ágil em caso de sinistros.',
    },
  ];

  return (
    <div className="py-8 space-y-12 max-w-7xl mx-auto animate-fade-in" id="servicos-tab-container">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
          Nossos Serviços Prestados
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Oferecemos produtos financeiros sob medida para que você conquiste seu veículo Toyota com total tranquilidade, planejamento e segurança.
        </p>
      </div>

      {/* Grid of Main Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 inline-block">
                {service.icon}
              </div>
              <h3 className="text-base font-bold text-gray-950">{service.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{service.description}</p>
            </div>
            
            <div className="pt-4 border-t border-slate-50 mt-4 flex items-center justify-between">
              <button 
                onClick={() => openModal(service.title)}
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer bg-transparent border-none outline-none"
              >
                <span>Solicitar simulação</span>
                <ArrowRight className="h-3 w-3" />
              </button>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Banco Toyota</span>
            </div>
          </div>
        ))}
      </div>

      {/* Corporate Fleet Services Info Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(239,68,68,0.1),transparent_40%)]" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="inline-flex items-center rounded-md bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-500/20">
              Soluções Corporativas
            </span>
            <h3 className="font-display text-xl font-bold">Financiamento de Frotas e Grandes Empresas</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Desenvolvemos estruturas de financiamento e leasing operacional customizadas para frotistas, locadoras de veículos, órgãos públicos e empresas de todos os portes. Otimize o fluxo de caixa corporativo da sua empresa com as melhores condições e taxas especiais de montadora.
            </p>
          </div>
          
          <div className="lg:col-span-4 lg:text-right">
            <button 
              onClick={() => openModal('Financiamento de Frotas e Grandes Empresas')}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-3.5 transition-all cursor-pointer shadow-lg shadow-red-900/30 text-center border-none outline-none"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Atendimento Pessoa Jurídica</span>
            </button>
          </div>
        </div>
      </div>

      {/* Safety & Compliance Disclaimer card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-slate-50 text-slate-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <p className="text-xs text-slate-600 leading-normal">
            Todos os produtos financeiros ofertados pelo Banco Toyota do Brasil S.A. estão sujeitos à aprovação cadastral e conformidade com as taxas vigentes.
          </p>
        </div>
        <button 
          onClick={() => openModal('Central de Dúvidas')}
          className="rounded-xl border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-bold px-5 py-2.5 transition-all cursor-pointer whitespace-nowrap shrink-0 text-center bg-transparent outline-none"
        >
          Central de Dúvidas
        </button>
      </div>

      {/* Modal / Dialog Form */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" id="servicos-modal">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-slate-50 border-b border-gray-100 p-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Solicitar Atendimento</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{selectedService}</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all border-none bg-transparent outline-none cursor-pointer"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">Mensagem Enviada!</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Agradecemos seu contato, <strong className="text-slate-800">{nome}</strong>. Registramos seu interesse em <strong>{selectedService}</strong>. Entraremos em contato no telefone <strong className="text-slate-800">{telefone}</strong> em breve.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <p className="text-[10px] text-slate-400">Quer adiantar o seu atendimento?</p>
                  <a
                    href="tel:11977655148"
                    className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer border-none outline-none text-center"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Ligar para Central: (11) 97765-5148</span>
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-slate-400 hover:text-slate-600 underline font-medium cursor-pointer bg-transparent border-none outline-none pt-2"
                  >
                    Fechar Janela
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Form */}
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
                      <span>Solicitar por Telefone</span>
                    </button>
                  </div>
                </form>

                <div className="bg-slate-50 p-4 border-t border-gray-100 text-[10px] text-slate-500 text-center leading-normal">
                  Seus dados estão protegidos em conformidade com a LGPD e serão utilizados exclusivamente para direcionar seu atendimento oficial.
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
