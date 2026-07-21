import { setCorsHeaders, readLeadsBackup, saveLeadsBackup, sendLeadEmail, ContactLead } from './shared/leadsService';

export default async function handler(req: any, res: any) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Utilize POST.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // use raw body as fallback
      }
    }
    body = body || {};

    const nome = body.nome || body.name;
    const email = body.email || '';
    const cpf = body.cpf || body.cnpj || '';
    const telefone = body.telefone || body.phone || '';
    const assunto = body.assunto || body.subject || 'Atendimento Geral';
    const mensagem = body.mensagem || body.message || '';
    const contrato = body.contrato || '';
    const originDomain = body.originDomain || 'https://www.centraldeapoio.com';
    const targetEmail = body.targetEmail || 'suporte@centraldeapoio.com';

    if (!nome || (!email && !telefone)) {
      return res.status(400).json({
        error: 'Nome e pelo menos um meio de contato (e-mail ou telefone) são obrigatórios.',
      });
    }

    const newLead: ContactLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      nome,
      email,
      cpf,
      telefone,
      assunto,
      mensagem,
      contrato,
      originDomain,
      targetEmail,
      createdAt: new Date().toISOString(),
      emailSent: false,
    };

    // 1. Salvar backup no arquivo JSON temporário
    const leadsList = readLeadsBackup();
    leadsList.unshift(newLead);
    saveLeadsBackup(leadsList);

    // 2. Disparar e-mail via Nodemailer (com fallback gracioso caso SMTP não esteja configurado)
    const emailStatus = await sendLeadEmail(newLead);
    newLead.emailSent = emailStatus.sent;

    // Atualizar o status de envio de e-mail no backup local
    if (leadsList.length > 0 && leadsList[0].id === newLead.id) {
      leadsList[0].emailSent = emailStatus.sent;
      saveLeadsBackup(leadsList);
    }

    return res.status(200).json({
      success: true,
      message: emailStatus.sent 
        ? 'Contato registrado e e-mail despachado com sucesso para a administração.' 
        : 'Contato registrado no backup local com sucesso.',
      leadId: newLead.id,
      emailStatus: emailStatus.message,
      lead: newLead,
    });
  } catch (err: any) {
    console.error('Erro na rota /api/contact:', err);
    return res.status(500).json({
      error: 'Erro interno ao processar e salvar o contato.',
      details: err.message || String(err),
    });
  }
}
