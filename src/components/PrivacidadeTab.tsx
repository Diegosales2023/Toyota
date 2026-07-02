import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle } from 'lucide-react';

export default function PrivacidadeTab() {
  return (
    <div className="py-8 space-y-10 max-w-4xl mx-auto animate-fade-in" id="privacidade-tab-container">
      <div className="text-center space-y-2">
        <h2 className="font-display text-3xl font-extrabold text-gray-900">
          Política de Privacidade
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Saiba como protegemos seus dados pessoais de acordo com a LGPD (Lei Geral de Proteção de Dados - Lei nº 13.709/2018).
        </p>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm p-6 sm:p-8 rounded-2xl space-y-8">
        
        {/* Core Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2.5">
            <Lock className="h-6 w-6 text-red-600" />
            <h3 className="font-bold text-sm text-gray-900">Segurança Total</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Utilizamos criptografia ponta a ponta e auditorias rigorosas para garantir que seus dados nunca caiam em mãos erradas.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2.5">
            <Eye className="h-6 w-6 text-red-600" />
            <h3 className="font-bold text-sm text-gray-900">Transparência Estrita</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Você tem total controle sobre as informações coletadas, podendo solicitar exclusão ou portabilidade a qualquer momento.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2.5">
            <ShieldCheck className="h-6 w-6 text-red-600" />
            <h3 className="font-bold text-sm text-gray-900">Conformidade Legal</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nossa operação está 100% alinhada com as diretrizes do Banco Central do Brasil e a legislação federal LGPD.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-6 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5 border-b border-gray-100 pb-2">
              <FileText className="h-4 w-4 text-slate-400" /> 1. Quais dados coletamos?
            </h3>
            <p>
              Para prestar serviços de emissão de segunda via, amortização e renegociação de financiamentos, coletamos apenas dados necessários para identificação civil e financeira:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Dados de Identificação: Nome completo, CPF, RG ou CNPJ.</li>
              <li>Dados de Contrato: Número do contrato de financiamento, placa do veículo ou chassi.</li>
              <li>Dados de Contato: Número de telefone celular (para direcionamento via WhatsApp) e e-mail.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5 border-b border-gray-100 pb-2">
              <FileText className="h-4 w-4 text-slate-400" /> 2. Para que finalidade usamos os seus dados?
            </h3>
            <p>
              Suas informações são utilizadas de forma exclusiva para:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Autenticar sua identidade nos sistemas financeiros e evitar fraudes ou acessos não autorizados.</li>
              <li>Calcular os descontos de juros de amortizações de acordo com as regras contratuais e do CDC.</li>
              <li>Facilitar o direcionamento seguro de solicitações para atendimento humano ou automatizado no WhatsApp institucional.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5 border-b border-gray-100 pb-2">
              <FileText className="h-4 w-4 text-slate-400" /> 3. Compartilhamento e Direcionamento via WhatsApp
            </h3>
            <p>
              Ao utilizar as ferramentas de solicitação rápida e preencher seus dados, você está ciente de que as informações fornecidas serão formatadas e enviadas de forma voluntária ao nosso canal de atendimento integrado no WhatsApp para dar andamento à sua solicitação de boleto ou negociação.
            </p>
            <p>
              Garantimos que nenhum dado é vendido a terceiros ou utilizado para fins de marketing sem o seu consentimento prévio e explícito.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5 border-b border-gray-100 pb-2">
              <FileText className="h-4 w-4 text-slate-400" /> 4. Seus Direitos (Art. 18 da LGPD)
            </h3>
            <p>
              Você possui os seguintes direitos garantidos por lei:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Confirmar a existência do tratamento de dados pessoais de sua titularidade.</li>
              <li>Acessar seus dados armazenados em nossos cadastros de forma facilitada.</li>
              <li>Solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
              <li>Revogar o consentimento ou solicitar a exclusão de suas informações de nossa base de dados ativa.</li>
            </ul>
          </div>
        </div>

        {/* Closing Commitment Badge */}
        <div className="bg-emerald-50 border border-emerald-100 p-4.5 rounded-xl flex items-start space-x-3 text-emerald-800">
          <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold">Privacidade Garantida e Protegida</p>
            <p className="text-emerald-700 leading-normal">
              Esta página foi revisada e aprovada pela nossa equipe de Governança Corporativa e Encarregados de Proteção de Dados (DPO) em conformidade total com a legislação nacional.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
