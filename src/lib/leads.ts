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
  const targetEmail = lead.targetEmail || 'suporte@centraldeapoio.com';
  
  const payload: LeadData = {
    ...lead,
    originDomain: lead.originDomain || currentOrigin,
    targetEmail: targetEmail,
    createdAt: new Date().toISOString(),
  };

  // Grava imediatamente no localStorage client-side
  try {
    const existing = localStorage.getItem('central_leads');
    const list = existing ? JSON.parse(existing) : [];
    list.unshift({ id: `lead_${Date.now()}_${Math.random().toString(36).substring(2,6)}`, ...payload });
    localStorage.setItem('central_leads', JSON.stringify(list));
  } catch (e) {
    console.warn('Erro ao gravar lead no localStorage:', e);
  }

  const cloudRunUrl = `${CLOUD_RUN_BACKEND_URL}/api/contact`;
  const localUrl = getApiUrl('/api/contact');

  let emailDelivered = false;
  let statusMessage = 'Solicitação recebida com sucesso.';

  // 1. Envio Direto via FormSubmit HTTPS API (Super seguro, não bloqueado por Vercel/GoDaddy)
  try {
    const fsRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        _subject: `[Novo Lead Central de Apoio] ${lead.assunto || 'Atendimento'} - ${lead.nome}`,
        _replyto: lead.email || undefined,
        _template: 'table',
        _captcha: 'false',
        Nome: lead.nome,
        CPF_CNPJ: lead.cpf || 'Não informado',
        Email: lead.email || 'Não informado',
        Telefone: lead.telefone || 'Não informado',
        Assunto: lead.assunto || 'Atendimento Geral',
        Contrato: lead.contrato || 'Não informado',
        Mensagem: lead.mensagem || 'Sem mensagem adicional',
        Origem: payload.originDomain,
        Data_Hora: new Date().toLocaleString('pt-BR'),
      }),
    });

    if (fsRes.ok) {
      const fsData = await fsRes.json().catch(() => ({}));
      if (fsData.success === 'true' || fsData.success === true || fsData.message) {
        emailDelivered = true;
        statusMessage = 'E-mail enviado com sucesso diretamente para suporte@centraldeapoio.com!';
      }
    }
  } catch (fsErr: any) {
    console.warn('[Leads Frontend] FormSubmit envio direto falhou:', fsErr?.message || fsErr);
  }

  // 2. Gravar e disparar via Backend local e Cloud Run em paralelo
  try {
    const localPromise = fetch(localUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(r => r.json().catch(() => ({}))).catch(() => ({}));

    const cloudRunPromise = fetch(cloudRunUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(r => r.json().catch(() => ({}))).catch(() => ({}));

    const [localData, cloudRunData] = await Promise.all([localPromise, cloudRunPromise]);

    if (localData?.emailSent || cloudRunData?.emailSent) {
      emailDelivered = true;
    }
  } catch (backendErr: any) {
    console.warn('[Leads Backend Sync] Aviso no backup de leads:', backendErr?.message || backendErr);
  }

  return {
    success: true,
    emailSent: emailDelivered,
    emailStatus: emailDelivered ? 'Entregue' : 'Registrado no Sistema',
    message: statusMessage,
  };
}


