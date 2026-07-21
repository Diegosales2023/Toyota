import { getApiUrl } from './api';

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

export async function submitLead(lead: LeadData): Promise<boolean> {
  const payload: LeadData = {
    ...lead,
    originDomain: lead.originDomain || 'https://www.centraldeapoio.com',
    targetEmail: lead.targetEmail || 'suporte@centraldeapoio.com',
    createdAt: new Date().toISOString(),
  };

  try {
    const targetUrl = getApiUrl('/api/contact');
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn('Falha ao registrar lead no servidor:', response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao enviar lead para o servidor:', error);
    return false;
  }
}

