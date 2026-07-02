import React from 'react';
import { Menu, X, Landmark, PhoneCall, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'boleto', label: '2ª Via de Boleto' },
    { id: 'quitacao', label: 'Quitação' },
    { id: 'negociacao', label: 'Negociação' },
    { id: 'privacidade', label: 'Privacidade' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <div 
          className="flex cursor-pointer items-center space-x-3" 
          onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
          id="navbar-logo"
        >
          {/* Toyota Inspired Monogram */}
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-200">
            <span className="font-display text-xl font-extrabold tracking-tighter">T</span>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-display text-lg font-extrabold tracking-tight text-gray-900">BANCO</span>
              <span className="font-display text-lg font-extrabold tracking-tight text-red-600">TOYOTA</span>
            </div>
            <span className="text-[10px] font-medium tracking-widest text-gray-400 uppercase block -mt-1">Serviços Financeiros</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'text-red-600 bg-red-50/70 font-semibold' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-red-600" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Contact info and security badge */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-xs text-gray-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span className="font-medium text-slate-600">Ambiente 100% Seguro</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">Atendimento SAC</p>
            <p className="text-sm font-bold text-gray-900 flex items-center justify-end gap-1">
              <PhoneCall className="h-3 w-3 text-red-600" /> 0800 016 4155
            </p>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 shadow-lg space-y-1 transition-all duration-300">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive 
                    ? 'text-red-600 bg-red-50 font-semibold' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-4 border-t border-gray-100 mt-2 flex flex-col space-y-3 px-4">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Ambiente de Segurança Bancária</span>
            </div>
            <div className="text-xs text-gray-600">
              <p className="font-semibold text-gray-400">SAC Banco Toyota</p>
              <p className="font-bold text-gray-800 text-sm">0800 016 4155</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
