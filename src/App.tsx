import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeTab from './components/HomeTab';
import BoletoTab from './components/BoletoTab';
import QuitacaoTab from './components/QuitacaoTab';
import NegociacaoTab from './components/NegociacaoTab';
import AntecipacaoTab from './components/AntecipacaoTab';
import SobreNosTab from './components/SobreNosTab';
import ServicosTab from './components/ServicosTab';
import PrivacidadeTab from './components/PrivacidadeTab';
import NegociarDividaTab from './components/NegociarDividaTab';
import FaleConoscoTab from './components/FaleConoscoTab';
import EmailTab from './components/EmailTab';
import LeadsAdminTab from './components/LeadsAdminTab';
import PhoneSupportButton from './components/PhoneSupportButton';
import { ShieldCheck, HelpCircle, Mail, Landmark, AlertCircle, FileSpreadsheet } from 'lucide-react';

const pathToTab = (path: string): string => {
  const cleanPath = path.toLowerCase().replace(/\/$/, '');
  if (cleanPath === '/2viadeboleto') return 'boleto';
  if (cleanPath === '/quitacao') return 'quitacao';
  if (cleanPath === '/negociacao') return 'negociacao';
  if (cleanPath === '/antecipacao') return 'antecipacao';
  if (cleanPath === '/sobrenos') return 'sobrenos';
  if (cleanPath === '/servicos') return 'servicos';
  if (cleanPath === '/negociardivida') return 'negociardivida';
  if (cleanPath === '/faleconosco') return 'faleconosco';
  if (cleanPath === '/email') return 'faleconosco';
  if (cleanPath === '/privacidade') return 'privacidade';
  if (cleanPath === '/admin' || cleanPath === '/contacts' || cleanPath === '/leads') return 'admin';
  return 'home';
};

const tabToPath = (tab: string): string => {
  if (tab === 'boleto') return '/2viadeboleto';
  if (tab === 'quitacao') return '/quitacao';
  if (tab === 'negociacao') return '/negociacao';
  if (tab === 'antecipacao') return '/antecipacao';
  if (tab === 'sobrenos') return '/sobrenos';
  if (tab === 'servicos') return '/servicos';
  if (tab === 'negociardivida') return '/negociardivida';
  if (tab === 'faleconosco') return '/faleconosco';
  if (tab === 'email') return '/email';
  if (tab === 'privacidade') return '/privacidade';
  if (tab === 'admin') return '/admin';
  return '/';
};

export default function App() {
  const [activeTab, setActiveTabState] = useState<string>(() => {
    return pathToTab(window.location.pathname);
  });

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    const newPath = tabToPath(tab);
    if (window.location.pathname !== newPath) {
      window.history.pushState({ tab }, '', newPath);
    }
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const tab = event.state?.tab || pathToTab(window.location.pathname);
      setActiveTabState(tab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Render the appropriate tab content based on active state
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab setActiveTab={setActiveTab} />;
      case 'boleto':
        return <BoletoTab />;
      case 'quitacao':
        return <QuitacaoTab />;
      case 'negociacao':
        return <NegociacaoTab />;
      case 'antecipacao':
        return <AntecipacaoTab />;
      case 'sobrenos':
        return <SobreNosTab />;
      case 'servicos':
        return <ServicosTab />;
      case 'negociardivida':
        return <NegociarDividaTab />;
      case 'faleconosco':
        return <FaleConoscoTab />;
      case 'email':
        return <EmailTab />;
      case 'privacidade':
        return <PrivacidadeTab />;
      case 'admin':
        return <LeadsAdminTab />;
      default:
        return <HomeTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between" id="app-root-container">
      <div>
        {/* Navigation Header */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Global Security Disclaimer strip */}
        <div className="bg-red-600 text-white py-2 px-4 text-xs font-semibold">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 justify-center sm:justify-start">
              <AlertCircle className="h-4 w-4 shrink-0 text-white" />
              <span>Aviso: O Banco Toyota não solicita transferências imediatas para PIX pessoais.</span>
            </span>
            <span className="text-[10px] opacity-90 text-center sm:text-right">
              Confira sempre o CNPJ oficial: 02.115.111/0001-22
            </span>
          </div>
        </div>

        {/* Main Content Stage */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex-grow">
          {renderTabContent()}
        </main>
      </div>

      {/* Corporate Bank Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs mt-16 border-t border-slate-800" id="banco-toyota-footer">
        
        {/* Upper footer help contacts */}
        <div className="border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
                  <span className="font-display text-sm font-bold">T</span>
                </div>
                <span className="font-display font-bold text-sm tracking-tight text-white uppercase">Banco Toyota</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Comprometidos com a excelência, transparência e segurança jurídica de todos os serviços de financiamento de automóveis no Brasil.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300">Central de Atendimento</h4>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                <li className="flex items-center gap-1.5">
                  <Mail className="h-3 w-3 text-red-500" />
                  <span>E-mail: suporte@centraldeapoio.com</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300">Suporte Oficial</h4>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3 w-3 text-emerald-500" />
                  <span>Atendimento Ativo 24/7 via E-mail</span>
                </li>
                <li>
                  <span className="text-[10px] text-slate-500 block">Resposta rápida em horário comercial</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300">Segurança Bancária</h4>
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 flex items-start space-x-2.5">
                <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-300 leading-normal">
                  Sempre confira os dados do destinatário ao efetuar pagamentos. O beneficiário final legítimo é o <strong>Banco Toyota do Brasil S.A.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lower footer copyright & legally required central bank disclaimers */}
        <div className="py-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl space-y-4">
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Banco Toyota do Brasil S.A. - Av. Paulista, 1274 - 14º andar - CEP 01310-925 - Bela Vista, São Paulo/SP. CNPJ: 02.115.111/0001-22. Instituição autorizada a funcionar pelo Banco Central do Brasil. O crédito está sujeito a análise cadastral e aprovação. Consulte as taxas, tarifas, CET (Custo Efetivo Total) e demais condições do financiamento no momento da contratação.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-slate-800 text-[10px] text-slate-500">
            <span>© {new Date().getFullYear()} Banco Toyota do Brasil S.A. Todos os direitos reservados.</span>
            <div className="flex space-x-4 mt-2 sm:mt-0 font-medium text-slate-400">
              <button onClick={() => { setActiveTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-500 transition-colors cursor-pointer text-[10px] text-slate-400 font-bold flex items-center gap-1">
                <FileSpreadsheet className="h-3 w-3 text-red-500" />
                Painel de Leads (Admin)
              </button>
              <button onClick={() => { setActiveTab('privacidade'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-500 transition-colors cursor-pointer text-[10px]">Políticas de Privacidade</button>
              <a href="#sac" className="hover:text-red-500 transition-colors">Segurança</a>
              <a href="#central" className="hover:text-red-500 transition-colors">Banco Central</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Animated Phone Support Integration */}
      <PhoneSupportButton />
    </div>
  );
}
