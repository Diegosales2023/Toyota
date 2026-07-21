import fs from 'fs';
import path from 'path';
import os from 'os';
import nodemailer from 'nodemailer';

export interface ContactLead {
  id: string;
  nome: string;
  email: string;
  cpf?: string;
  telefone?: string;
  assunto?: string;
  mensagem?: string;
  contrato?: string;
  originDomain?: string;
  targetEmail?: string;
  createdAt: string;
  emailSent?: boolean;
}

const BACKUP_FILE = path.join(os.tmpdir(), 'leads_backup.json');

export function setCorsHeaders(res: any) {
  if (typeof res.setHeader === 'function') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
  }
}

export function readLeadsBackup(): ContactLead[] {
  try {
    if (!fs.existsSync(BACKUP_FILE)) {
      return [];
    }
    const data = fs.readFileSync(BACKUP_FILE, 'utf-8');
    if (!data || !data.trim()) {
      return [];
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Erro ao ler arquivo de backup /tmp/leads_backup.json:', err);
    return [];
  }
}

export function saveLeadsBackup(leads: ContactLead[]): boolean {
  try {
    const dir = path.dirname(BACKUP_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Erro ao salvar em /tmp/leads_backup.json:', err);
    return false;
  }
}

export function clearLeadsBackup(): boolean {
  return saveLeadsBackup([]);
}

export async function sendLeadEmail(lead: ContactLead): Promise<{ sent: boolean; message: string }> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('[SMTP AVISO] Variáveis de ambiente SMTP não configuradas (SMTP_HOST/SMTP_USER/SMTP_PASS). Simulando envio de e-mail para o lead:', lead.id);
    return {
      sent: false,
      message: 'SMTP não configurado no servidor. Envio simulado com sucesso e lead armazenado no backup local.',
    };
  }

  try {
    const port = Number(SMTP_PORT) || 587;
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: port,
      secure: port === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const fromEmail = SMTP_FROM || SMTP_USER;
    const recipientEmail = lead.targetEmail || 'suporte@centraldeapoio.com';

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .header { background: #dc2626; color: #ffffff; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
          .header p { margin: 4px 0 0 0; font-size: 12px; opacity: 0.9; }
          .content { padding: 24px; }
          .lead-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          .lead-table th, .lead-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .lead-table th { background-color: #f8fafc; color: #64748b; font-weight: 600; width: 35%; }
          .lead-table td { color: #0f172a; font-weight: 500; }
          .message-box { background: #f8fafc; border-left: 4px solid #dc2626; padding: 16px; border-radius: 0 8px 8px 0; margin-top: 20px; font-size: 14px; color: #334155; }
          .footer { background: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Central de Apoio</h1>
            <p>Novo Contato/Lead Recebido no Portal</p>
          </div>
          <div class="content">
            <p style="font-size: 15px; font-weight: 600; color: #0f172a; margin-top: 0;">Prezado Administrador,</p>
            <p style="font-size: 14px; color: #475569;">Uma nova solicitação de atendimento foi registrada através do portal <strong>${lead.originDomain || 'Central de Apoio'}</strong>.</p>
            
            <table class="lead-table">
              <tr><th>Assunto</th><td><strong style="color: #dc2626;">${lead.assunto || 'Atendimento Geral'}</strong></td></tr>
              <tr><th>Nome do Titular</th><td>${lead.nome}</td></tr>
              <tr><th>CPF/CNPJ</th><td>${lead.cpf || 'Não informado'}</td></tr>
              <tr><th>E-mail</th><td><a href="mailto:${lead.email}" style="color: #2563eb; text-decoration: none;">${lead.email || 'Não informado'}</a></td></tr>
              <tr><th>Telefone</th><td><a href="tel:${lead.telefone}" style="color: #2563eb; text-decoration: none;">${lead.telefone || 'Não informado'}</a></td></tr>
              <tr><th>Nº Contrato</th><td>${lead.contrato || 'Não informado'}</td></tr>
              <tr><th>Data / Hora</th><td>${new Date(lead.createdAt).toLocaleString('pt-BR')}</td></tr>
            </table>

            ${lead.mensagem ? `
              <div class="message-box">
                <strong>Mensagem do Cliente:</strong><br/>
                <p style="margin: 8px 0 0 0; white-space: pre-wrap;">${lead.mensagem}</p>
              </div>
            ` : ''}
          </div>
          <div class="footer">
            Este e-mail foi gerado automaticamente pelo sistema de captura de Leads de www.centraldeapoio.com.
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Central de Apoio" <${fromEmail}>`,
      to: recipientEmail,
      subject: `[Novo Lead] ${lead.assunto || 'Atendimento'} - ${lead.nome}`,
      html: htmlBody,
      replyTo: lead.email || undefined,
    });

    return { sent: true, message: 'E-mail enviado com sucesso via SMTP.' };
  } catch (err: any) {
    console.error('[SMTP ERRO] Falha ao enviar e-mail via Nodemailer:', err);
    return {
      sent: false,
      message: `Erro no servidor SMTP: ${err.message || 'Falha ao enviar e-mail.'}`,
    };
  }
}
