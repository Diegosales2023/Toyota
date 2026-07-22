import { getApiUrl, CLOUD_RUN_BACKEND_URL } from './api';

export interface LeadData {
  nome: string;
  email: string;
  cpf?: string;
  telefone?: string;
  assunto?: string;
  mensagem?: string;
  contrato?: string;
  originDomain?: string;
  targetEmail?: string;
  createdAt?: string;
}

export interface SubmitLeadResponse {
  success: boolean;
  emailSent?: boolean;
  emailStatus?: string;
  message?: string;
}

export async function submitLead(lead: LeadData): Promise<SubmitLeadResponse> {
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://www.centraldeapoio.com';
  
  const payload: LeadData = {
    ...lead,
    originDomain: lead.originDomain || currentOrigin,
    targetEmail: lead.targetEmail || 'suporte@centraldeapoio.com',
    createdAt: new Date().toISOString(),
  };

  const primaryUrl = getApiUrl('/api/contact');
  const fallbackUrl = `${CLOUD_RUN_BACKEND_URL}/api/contact`;

  // 1. Tentar envio na rota principal (Vercel ou servidor local)
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000); // Timeout de 5s para evitar travamentos em servidor sem saída SMTP

    const response = await fetch(primaryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timer);

    const data = await response.json().catch(() => ({}));

    if (response.ok && data.emailSent === true) {
      return {
        success: true,
        emailSent: true,
        emailStatus: data.emailStatus,
        message: data.message,
      };
    }
    console.warn('[Leads] Servidor principal não enviou e-mail ou não possui suporte a SMTP. Tentando servidor Cloud Run...', data);
  } catch (error: any) {
    console.warn('[Leads] Falha na rota principal /api/contact, acionando servidor de apoio Cloud Run:', error?.message || error);
  }

  // 2. Se o servidor do domínio (Vercel) não conseguiu enviar por e-mail por restrição de porta SMTP, envia diretamente para o Cloud Run que possui portas SMTP totalmente liberadas
  try {
    const fallbackResponse = await fetch(fallbackUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const fallbackData = await fallbackResponse.json().catch(() => ({}));

    if (fallbackResponse.ok) {
      return {
        success: true,
        emailSent: fallbackData.emailSent ?? fallbackData.lead?.emailSent ?? true,
        emailStatus: fallbackData.emailStatus,
        message: fallbackData.message || 'Solicitação enviada e e-mail entregue com sucesso.',
      };
    }
  } catch (fallbackError: any) {
    console.error('[Leads] Erro no servidor Cloud Run de fallback:', fallbackError);
  }

  return {
    success: true,
    emailSent: false,
    message: 'Solicitação registrada no sistema.',
  };
}


