import React, { useState } from 'react';
import { CalendarRange, Percent, ShieldCheck, HelpCircle, Info, AlertTriangle, ChevronRight, CheckCircle2, Phone, Mail, MessageSquare } from 'lucide-react';
import { submitLead } from '../lib/leads';

export default function AntecipacaoTab() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [assunto, setAssunto] = useState('Antecipação de Parcelas');
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

  const handleAntecipacaoSubmit = async (e: React.FormEvent) => {
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
    <div className="py-8 space-y-10 max-w-7xl mx-auto animate-fade-in" id="antecipacao-tab-container">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
          Antecipação de Parcelas
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Adiantar o pagamento de suas parcelas é uma decisão inteligente. Garanta descontos significativos com a redução proporcional de juros.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Informações sobre Antecipação */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card: Como Funciona o Desconto */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Percent className="h-5 w-5 text-red-600" />
              Como funciona o Desconto por Antecipação?
            </h3>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              Toda vez que você antecipa parcelas do seu financiamento, você tem o direito garantido de receber um <strong>desconto proporcional de juros</strong>. Isso acontece porque o prazo de empréstimo do dinheiro foi reduzido. O cálculo é feito de trás para frente (da última parcela do contrato para a mais recente), reduzindo o saldo devedor de forma acelerada.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-red-50 text-red-600">
                    <CalendarRange className="h-4 w-4" />
                  </div>
                  <p className="font-bold text-xs text-slate-800">Ordem Inversa (Trás para Frente)</p>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Ao antecipar a última parcela do financiamento, você garante o maior desconto possível, pois é a parcela que acumula mais juros de longo prazo.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <p className="font-bold text-xs text-slate-800">Garantia por Lei</p>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  O abatimento é regulamentado pelo Banco Central e pelo Código de Defesa do Consumidor, sendo obrigatório e calculado com precisão matemática.
                </p>
              </div>
            </div>
          </div>

          {/* Card: Vantagens de Antecipar */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Info className="h-5 w-5 text-red-600" />
              Vantagens de Realizar a Antecipação
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-xs text-slate-600">
                <div className="mt-0.5 rounded-full bg-red-100 p-0.5 text-red-600">
                  <ChevronRight className="h-3 w-3" />
                </div>
                <div>
                  <strong className="text-slate-800">Redução de Juros:</strong> Quanto mais parcelas você antecipar de uma vez, maior será o montante de juros poupado, liberando limite para novos planos.
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-600">
                <div className="mt-0.5 rounded-full bg-red-100 p-0.5 text-red-600">
                  <ChevronRight className="h-3 w-3" />
                </div>
                <div>
                  <strong className="text-slate-800">Encurtamento do Contrato:</strong> Reduza meses ou até anos da duração do financiamento do seu Toyota de forma flexível e programada.
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-600">
                <div className="mt-0.5 rounded-full bg-red-100 p-0.5 text-red-600">
                  <ChevronRight className="h-3 w-3" />
                </div>
                <div>
                  <strong className="text-slate-800">Liberdade Financeira:</strong> Acelere o processo para quitar integralmente o veículo e retire a alienação fiduciária com mais rapidez.
                </div>
              </div>
            </div>
          </div>

          {/* Safety Warning */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-yellow-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="font-bold text-xs text-yellow-900 uppercase tracking-wide">Aviso Importante sobre Pagamentos</h4>
              <p className="text-xs text-yellow-700 leading-relaxed">
                A simulação de desconto e a emissão do boleto de antecipação devem ser efetuados unicamente através de nossos canais verificados de atendimento. Certifique-se sempre de que o boleto aponta como beneficiário final o <strong>Banco Toyota do Brasil S.A.</strong>
              </p>
            </div>
          </div>

        </div>

        {/* Right Column - Interactive Form Panel / Success Screen */}
        <div className="lg:col-span-5 space-y-6">
          {submitted ? (
            <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 sm:p-8 space-y-6 text-center py-10">
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
            <div className="bg-white border border-gray-100 shadow-md shadow-gray-100/50 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1.5">
                <span className="inline-flex items-center rounded-md bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                  Formulário de Atendimento
                </span>
                <h3 className="text-xl font-bold text-gray-900">Solicitar Atendimento</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Preencha os dados abaixo e selecione o assunto desejado para receber seu atendimento imediato.
                </p>
              </div>

              <form onSubmit={handleAntecipacaoSubmit} className="space-y-4 pt-1">
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
                    className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold text-xs shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] text-center border-none outline-none"
                    id="btn-antecipacao-submit"
                  >
                    <Mail className="h-4.5 w-4.5 shrink-0" />
                    <span>{loading ? 'Registrando Solicitação...' : 'Enviar Solicitação por E-mail'}</span>
                  </button>
                </div>
              </form>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  Conexão Segura SSL
                </span>
                <span>Resposta ágil e segura</span>
              </div>
            </div>
          )}

          {/* Help Card */}
          <div className="bg-slate-100/50 rounded-2xl p-6 border border-slate-200/40 text-center space-y-3">
            <HelpCircle className="h-6 w-6 text-slate-400 mx-auto" />
            <h4 className="font-bold text-xs text-slate-800">Dúvidas sobre o abatimento?</h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              Se preferir, nossa equipe de analistas financeiros está pronta para ligar para você ou sanar todas as suas dúvidas via central oficial de relacionamento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
