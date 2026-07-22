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

  const cloudRunUrl = `${CLOUD_RUN_BACKEND_URL}/api/contact`;
  const localUrl = getApiUrl('/api/contact');

  // Envia diretamente para o servidor Cloud Run que possui portas SMTP totalmente liberadas para envio imediato via GoDaddy
  try {
    const cloudRunResponse = await fetch(cloudRunUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const cloudRunData = await cloudRunResponse.json().catch(() => ({}));

    if (cloudRunResponse.ok) {
      // Grava em segundo plano no backup do servidor do domínio sem bloquear o envio do e-mail
      if (localUrl !== cloudRunUrl) {
        fetch(localUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(() => {});
      }

      return {
        success: true,
        emailSent: cloudRunData.emailSent ?? cloudRunData.lead?.emailSent ?? true,
        emailStatus: cloudRunData.emailStatus,
        message: cloudRunData.message || 'Solicitação enviada e e-mail entregue com sucesso.',
      };
    }
    console.warn('[Leads] Resposta do Cloud Run não OK:', cloudRunResponse.status, cloudRunData);
  } catch (err: any) {
    console.warn('[Leads] Falha ao conectar ao servidor de e-mail Cloud Run, tentando servidor local:', err?.message || err);
  }

  // Fallback para envio na rota local caso Cloud Run esteja indisponível
  try {
    const response = await fetch(localUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    return {
      success: response.ok,
      emailSent: data.emailSent ?? false,
      emailStatus: data.emailStatus,
      message: data.message || 'Solicitação registrada.',
    };
  } catch (localError: any) {
    console.error('[Leads] Erro ao enviar lead:', localError);
    return {
      success: false,
      message: 'Erro de conexão ao enviar formulário.',
    };
  }
}


