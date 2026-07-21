import React, { useState } from 'react';
import { Coins, Percent, ShieldCheck, HelpCircle, Info, AlertTriangle, FileText, CheckCircle2, Phone, Mail, MessageSquare } from 'lucide-react';
import { submitLead } from '../lib/leads';

export default function QuitacaoTab() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [assunto, setAssunto] = useState('Quitação de Contrato');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSentStatus, setEmailSentStatus] = useState<boolean | null>(null);

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

  const handleQuitacaoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await submitLead({
      nome,
      email,
      cpf,
      telefone,
      assunto,
      originDomain: 'https://www.centraldeapoio.com',
      targetEmail: 'suporte@centraldeapoio.com',
    });

    setEmailSentStatus(result.emailSent ?? false);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="py-8 space-y-10 max-w-7xl mx-auto animate-fade-in" id="quitacao-tab-container">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
          Quitação e Antecipação
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Economize dinheiro reduzindo juros futuros. Solicite o cálculo de desconto proporcional garantido por lei para amortizar seu contrato.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Informações sobre Quitação */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card: Benefícios e Direitos */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Percent className="h-5 w-5 text-red-600" />
              Direito ao Abatimento Proporcional de Juros (Art. 52 do CDC)
            </h3>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              De acordo com o <strong>Artigo 52, Parágrafo 2º do Código de Defesa do Consumidor (CDC)</strong>, é garantido ao cliente a liquidação antecipada do débito, total ou parcialmente, mediante <strong>redução proporcional dos juros</strong> e demais acréscimos.
            </p>

            {/* Key benefits highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <Coins className="h-5 w-5 text-red-600" />
                <p className="font-bold text-xs text-slate-800">Economia Real</p>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Elimine os juros de parcelas futuras que seriam pagos ao longo dos meses.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <p className="font-bold text-xs text-slate-800">Baixa de Gravame</p>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Após a quitação total, o veículo é desalienado no DETRAN automaticamente.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <FileText className="h-5 w-5 text-blue-600" />
                <p className="font-bold text-xs text-slate-800">Histórico de Crédito</p>
                <p className="text-[11px] text-slate-500 leading-normal">
                  A amortização antecipada melhora seu score financeiro nos órgãos de proteção ao crédito.
                </p>
              </div>
            </div>
          </div>

          {/* Card: Modalidades de Quitação */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Info className="h-5 w-5 text-red-600" />
              Modalidades Disponíveis para seu Financiamento
            </h3>
            <div className="space-y-4 text-xs text-slate-600">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-800 mb-1">1. Quitação Integral (Liquidação Total)</p>
                <p className="leading-relaxed">
                  Consiste no pagamento de todas as parcelas restantes do seu contrato de uma única vez. É calculado o desconto de juros trazido a valor presente de cada uma das parcelas do saldo devedor até a data escolhida para pagamento.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-800 mb-1">2. Amortização / Antecipação Parcial</p>
                <p className="leading-relaxed">
                  Você escolhe um número de parcelas para antecipar (começando geralmente de trás para frente, isto é, da última parcela para as anteriores). Isso ajuda a reduzir o tempo total de financiamento mantendo a parcela mensal ou ajuda a reajustar o fluxo de caixa.
                </p>
              </div>
            </div>
          </div>

          {/* Safety Warning */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-yellow-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-xs text-yellow-900 uppercase tracking-wide">Atenção com Boletos de Quitação Falsos</h4>
              <p className="text-xs text-yellow-700 leading-relaxed">
                Golpistas costumam criar sites falsos oferecendo descontos irreais de até 90% para quitação total de veículos. <strong>Desconfie de ofertas absurdas</strong>. O desconto concedido pelo Banco Toyota é estritamente financeiro (trazido a valor presente com base na taxa estipulada em seu contrato). Sempre confirme a validade com a Kira em nosso canal oficial.
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-3">
            <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-slate-400" />
              Dúvidas Comuns sobre Quitação
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <p>
                <strong>Qual o prazo para baixa do gravame no DETRAN?</strong><br />
                A liberação da garantia (baixa de alienação fiduciária) ocorre de forma eletrônica e automática no sistema do DETRAN do seu estado em até 10 (dez) dias úteis após a compensação bancária do pagamento de quitação.
              </p>
              <p>
                <strong>Posso antecipar parcelas de forma recorrente?</strong><br />
                Sim. Você pode amortizar seu financiamento quantas vezes quiser e no valor que desejar diretamente em nosso canal.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column - Interactive Form Panel / Success Screen */}
        {submitted ? (
          <div className="lg:col-span-5 bg-white border border-gray-100 shadow-md rounded-2xl p-6 sm:p-8 space-y-6 text-center py-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Solicitação Registrada!</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sua solicitação sobre <strong className="text-slate-800">{assunto}</strong> foi gravada com sucesso em nosso banco de dados central (backup disponível em <strong>/api/contacts</strong>).
              </p>
            </div>

            {emailSentStatus === true ? (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-left space-y-1 text-xs text-emerald-900">
                <p className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  E-mail despachado por SMTP!
                </p>
                <p className="text-[11px] leading-relaxed text-emerald-700">
                  A mensagem foi enviada de forma automatizada pelo servidor para <strong>suporte@centraldeapoio.com</strong>.
                </p>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-left space-y-1.5 text-xs text-amber-900">
                <p className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                  Observação sobre envio automático por E-mail:
                </p>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  Seus dados já foram registrados no sistema. Como as variáveis de autenticação SMTP de servidor (como <strong>SMTP_PASS</strong>) não foram configuradas no ambiente, clique no botão vermelho abaixo para abrir seu leitor de e-mail e enviar diretamente para <strong>suporte@centraldeapoio.com</strong>.
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 space-y-3">
              <a
                href={`mailto:suporte@centraldeapoio.com?subject=${encodeURIComponent(`Solicitação de Atendimento - ${assunto}`)}&body=${encodeURIComponent(`Olá, gostaria de solicitar atendimento para meu contrato:\n- Assunto: ${assunto}\n- Nome: ${nome}\n- CPF/CNPJ: ${cpf}\n- E-mail: ${email}\n- Telefone: ${telefone}`)}`}
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer border-none outline-none text-center"
              >
                <Mail className="h-4 w-4" />
                <span>Enviar E-mail via Leitor Local (suporte@centraldeapoio.com)</span>
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-slate-400 hover:text-slate-600 underline font-medium cursor-pointer bg-transparent border-none outline-none pt-1"
              >
                Voltar para o formulário
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-5 bg-white border border-gray-100 shadow-md rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-800 border border-red-100 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Formulário de Atendimento
              </div>
              <h3 className="text-xl font-bold text-gray-900">Solicitar Atendimento</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Preencha os dados abaixo e selecione o assunto desejado para receber seu atendimento imediato.
              </p>
            </div>

            <form onSubmit={handleQuitacaoSubmit} className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Nome do Titular</label>
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
                <label className="text-xs font-bold text-gray-700">Seu E-mail de Contato</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">CPF ou CNPJ</label>
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
                <label className="text-xs font-bold text-gray-700">Telefone de Contato</label>
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

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Assunto do Atendimento</label>
                <select
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-xs outline-none focus:border-red-500 focus:bg-white transition-all text-gray-800 cursor-pointer font-medium"
                  required
                >
                  <option value="2ª Via de Boleto">2ª Via de Boleto</option>
                  <option value="Quitação de Contrato">Quitação de Contrato</option>
                  <option value="Antecipação de Parcelas">Antecipação de Parcelas</option>
                  <option value="Negociação de Dívidas">Negociação de Dívidas</option>
                  <option value="Dúvidas e Outros Assuntos">Dúvidas e Outros Assuntos</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] text-center border-none outline-none"
                  id="btn-quitacao-submit"
                >
                  <Mail className="h-4.5 w-4.5 shrink-0" />
                  <span>{loading ? 'Registrando Solicitação...' : 'Enviar Solicitação'}</span>
                </button>
              </div>
            </form>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1 text-[11px] text-slate-500">
              <p className="font-bold text-slate-700">Dica de Segurança:</p>
              <p>O cálculo oficial de desconto para quitação é emitido exclusivamente pelo Banco Toyota do Brasil S.A. e detalhado com segurança por telefone ou e-mail corporativo oficial.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
