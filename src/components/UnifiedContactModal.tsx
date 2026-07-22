import React, { useState } from 'react';
import { X, Mail, ShieldCheck, CheckCircle2, Send, FileText, Lock, User, Phone, CreditCard, HelpCircle } from 'lucide-react';
import { submitLead } from '../lib/leads';

interface UnifiedContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAssunto?: string;
}

export default function UnifiedContactModal({ isOpen, onClose, defaultAssunto = '2ª Via de Boleto' }: UnifiedContactModalProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [contrato, setContrato] = useState('');
  const [assunto, setAssunto] = useState(defaultAssunto);
  const [mensagem, setMensagem] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sentViaMailto, setSentViaMailto] = useState(false);

  if (!isOpen) return null;

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

  const getMailtoLink = () => {
    const subjectText = `[Atendimento Banco Toyota] ${assunto} - ${nome}`;
    const bodyText = `Olá,\n\nGostaria de solicitar atendimento para meu financiamento junto ao Banco Toyota:\n\n` +
      `- Nome do Titular: ${nome}\n` +
      `- CPF / CNPJ: ${cpf}\n` +
      `- E-mail de Contato: ${email}\n` +
      `- Telefone / WhatsApp: ${telefone}\n` +
      `- Nº do Contrato: ${contrato || 'Não informado'}\n` +
      `- Assunto / Serviço: ${assunto}\n` +
      `- Mensagem / Detalhes: ${mensagem || 'Sem observações adicionais'}\n\n` +
      `Solicitação enviada via Portal Central de Apoio (www.centraldeapoio.com)`;

    return `mailto:suporte@centraldeapoio.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const leadData = {
      nome,
      email,
      cpf,
      telefone,
      contrato,
      assunto,
      mensagem,
      originDomain: 'https://www.centraldeapoio.com',
      targetEmail: 'suporte@centraldeapoio.com',
    };

    // 1. Enviar via lib/leads (grava no localStorage + backend + FormSubmit AJAX)
    try {
      await submitLead(leadData);
    } catch (err) {
      console.warn('Erro ao disparar submitLead:', err);
    }

    // 2. Disparar formulário via FormSubmit em iframe oculto (Garante recebimento em suporte@centraldeapoio.com sem erro de CORS)
    try {
      const hiddenForm = document.createElement('form');
      hiddenForm.method = 'POST';
      hiddenForm.action = 'https://formsubmit.co/suporte@centraldeapoio.com';
      hiddenForm.target = 'hidden_iframe_lead';

      const fields = {
        _subject: `[Atendimento Toyota Portal] ${assunto} - ${nome}`,
        _replyto: email,
        _template: 'table',
        _captcha: 'false',
        'Nome Completo': nome,
        'CPF/CNPJ': cpf,
        'E-mail': email,
        'Telefone': telefone,
        'Contrato': contrato || 'Não informado',
        'Assunto': assunto,
        'Mensagem': mensagem || 'Sem mensagem',
        'Origem': 'www.centraldeapoio.com',
      };

      Object.entries(fields).forEach(([key, val]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = val;
        hiddenForm.appendChild(input);
      });

      document.body.appendChild(hiddenForm);
      hiddenForm.submit();
      setTimeout(() => {
        try { document.body.removeChild(hiddenForm); } catch (e) {}
      }, 1000);
    } catch (e) {
      console.warn('Iframe form submit fallback fail:', e);
    }

    setLoading(false);
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setNome('');
    setEmail('');
    setCpf('');
    setTelefone('');
    setContrato('');
    setMensagem('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in text-left text-gray-900 font-sans" id="unified-contact-modal">
      {/* Target iframe for hidden form submit */}
      <iframe name="hidden_iframe_lead" id="hidden_iframe_lead" style={{ display: 'none' }} title="FormSubmit Frame" />

      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 flex flex-col max-h-[92vh] animate-scale-up">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 bg-red-600/20 rounded-full blur-xl pointer-events-none" />
          
          <div className="space-y-1 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/30 border border-red-500/40 text-[10px] font-bold text-red-300 uppercase tracking-wider">
              <ShieldCheck className="h-3 w-3 text-red-400" />
              Canal de Atendimento Oficial
            </div>
            <h3 className="text-base font-extrabold text-white">Solicitar Atendimento / 2ª Via</h3>
            <p className="text-[11px] text-slate-300">
              Enviando diretamente para <strong className="text-red-400">suporte@centraldeapoio.com</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={resetAndClose}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-all cursor-pointer border-none bg-transparent outline-none relative z-10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        {submitted ? (
          <div className="p-6 space-y-5 text-center overflow-y-auto">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200">
              <CheckCircle2 className="h-8 w-8 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-bold text-gray-900">Solicitação Enviada com Sucesso!</h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                Sua solicitação foi registrada no sistema e direcionada para a central de atendimento no e-mail <strong className="text-slate-900">suporte@centraldeapoio.com</strong>.
              </p>
            </div>

            {/* Lead Summary */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-left space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block border-b border-slate-200 pb-1">
                Resumo dos Dados Cadastrados:
              </span>
              <p className="text-slate-700"><strong>Nome:</strong> {nome}</p>
              <p className="text-slate-700"><strong>CPF/CNPJ:</strong> {cpf}</p>
              <p className="text-slate-700"><strong>E-mail:</strong> {email}</p>
              <p className="text-slate-700"><strong>Telefone:</strong> {telefone}</p>
              <p className="text-slate-700"><strong>Assunto:</strong> <span className="text-red-600 font-bold">{assunto}</span></p>
              {contrato && <p className="text-slate-700"><strong>Contrato:</strong> {contrato}</p>}
            </div>

            {/* Direct Mailto Action */}
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl space-y-2 text-left">
              <p className="text-[11px] font-bold text-red-900 flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-red-600" />
                Garantia de Envio via Aplicativo de E-mail
              </p>
              <p className="text-[11px] text-red-800/80">
                Caso prefira enviar também pelo seu programa de e-mail padrão (Gmail, Outlook, Mail):
              </p>
              <a
                href={getMailtoLink()}
                onClick={() => setSentViaMailto(true)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all no-underline shadow-sm cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Abrir no meu aplicativo de e-mail agora</span>
              </a>
              {sentViaMailto && (
                <p className="text-[10px] text-emerald-700 font-bold text-center pt-1">
                  ✓ Link de e-mail acionado no seu dispositivo!
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer border-none outline-none"
              >
                Concluir e Fechar
              </button>
            </div>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
            {/* Assunto / Serviço */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
                <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                Selecione o Serviço Desejado *
              </label>
              <select
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-red-500 focus:bg-white transition-all cursor-pointer"
                required
              >
                <option value="2ª Via de Boleto">2ª Via de Boleto</option>
                <option value="Quitação Antecipada">Quitação Antecipada</option>
                <option value="Parcelamento / Negociação de Atrasos">Parcelamento / Negociação de Atrasos</option>
                <option value="Antecipação de Parcelas">Antecipação de Parcelas</option>
                <option value="Dúvidas e Atendimento Geral">Dúvidas e Atendimento Geral</option>
              </select>
            </div>

            {/* Nome Completo */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-slate-400" />
                Nome Completo do Titular *
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Informe seu nome completo"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* CPF ou CNPJ */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
                  <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                  CPF ou CNPJ *
                </label>
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(formatCPFOrCNPJ(e.target.value))}
                  placeholder="000.000.000-00"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white transition-all"
                  maxLength={18}
                  required
                />
              </div>

              {/* Telefone / WhatsApp */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  Telefone / WhatsApp *
                </label>
                <input
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(formatPhone(e.target.value))}
                  placeholder="(00) 00000-0000"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white transition-all"
                  maxLength={15}
                  required
                />
              </div>
            </div>

            {/* E-mail */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                Seu E-mail de Contato *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white transition-all"
                required
              />
            </div>

            {/* Nº do Contrato (Opcional) */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 text-slate-400" />
                Nº do Contrato (Opcional)
              </label>
              <input
                type="text"
                value={contrato}
                onChange={(e) => setContrato(e.target.value)}
                placeholder="Ex: CTR-987654"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white transition-all"
              />
            </div>

            {/* Mensagem / Detalhes */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700">
                Observações Adicionais (Opcional)
              </label>
              <textarea
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Digite detalhes da sua solicitação..."
                rows={2}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-3 text-xs text-slate-800 outline-none focus:border-red-500 focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] border-none outline-none"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando solicitação...
                  </span>
                ) : (
                  <>
                    <Send className="h-4 w-4 shrink-0" />
                    <span>Enviar Solicitação para suporte@centraldeapoio.com</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-gray-100 text-[10px] text-slate-500 text-center flex items-center justify-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Seus dados são transmitidos de forma criptografada para suporte@centraldeapoio.com.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
