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

export function setCorsHeaders(res: any, req?: any) {
  const reqOrigin = req?.headers?.origin || req?.headers?.Origin;
  const allowOrigin = reqOrigin || '*';
  if (typeof res.setHeader === 'function') {
    res.setHeader('Access-Control-Allow-Origin', allowOrigin);
    if (reqOrigin) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
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
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const EMAIL_WEBHOOK_URL = process.env.EMAIL_WEBHOOK_URL;
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const SMTP_FROM = process.env.SMTP_FROM;

  const host = (SMTP_HOST || 'smtpout.secureserver.net').trim();
  const portConfig = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;
  const user = (SMTP_USER || 'suporte@centraldeapoio.com').trim();
  const pass = (SMTP_PASS || '132$8$Dv$').trim();
  const fromEmail = (SMTP_FROM || user || 'suporte@centraldeapoio.com').trim();
  const recipientEmail = (lead.targetEmail || 'suporte@centraldeapoio.com').trim();

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

  // 1. Tentar via Resend API (HTTPS - Ideal para Vercel)
  if (RESEND_API_KEY && RESEND_API_KEY.trim().length > 0) {
    try {
      const resendSender = SMTP_FROM || 'onboarding@resend.dev';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Central de Apoio <${resendSender}>`,
          to: [recipientEmail],
          subject: `[Novo Lead] ${lead.assunto || 'Atendimento'} - ${lead.nome}`,
          html: htmlBody,
          reply_to: lead.email || undefined,
        }),
      });

      if (res.ok) {
        return { sent: true, message: 'E-mail enviado com sucesso via Resend API.' };
      } else {
        const errJson = await res.json().catch(() => ({}));
        console.error('[RESEND API ERRO]:', errJson);
      }
    } catch (err: any) {
      console.error('[RESEND API FALHA]:', err);
    }
  }

  // 2. Tentar via SendGrid API (HTTPS)
  if (SENDGRID_API_KEY && SENDGRID_API_KEY.trim().length > 0) {
    try {
      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SENDGRID_API_KEY.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: recipientEmail }] }],
          from: { email: fromEmail, name: 'Central de Apoio' },
          subject: `[Novo Lead] ${lead.assunto || 'Atendimento'} - ${lead.nome}`,
          content: [{ type: 'text/html', value: htmlBody }],
        }),
      });

      if (res.status >= 200 && res.status < 300) {
        return { sent: true, message: 'E-mail enviado com sucesso via SendGrid API.' };
      } else {
        const errText = await res.text().catch(() => '');
        console.error('[SENDGRID API ERRO]:', res.status, errText);
      }
    } catch (err: any) {
      console.error('[SENDGRID API FALHA]:', err);
    }
  }

  // 3. Tentar via Webhook personalizado
  if (EMAIL_WEBHOOK_URL && EMAIL_WEBHOOK_URL.trim().length > 0) {
    try {
      const res = await fetch(EMAIL_WEBHOOK_URL.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead,
          recipientEmail,
          subject: `[Novo Lead] ${lead.assunto || 'Atendimento'} - ${lead.nome}`,
          html: htmlBody,
        }),
      });

      if (res.ok) {
        return { sent: true, message: 'E-mail/lead encaminhado via Webhook.' };
      }
    } catch (err: any) {
      console.error('[WEBHOOK FALHA]:', err);
    }
  }

  // 4. Tentar via FormSubmit HTTPS Service (Garante entrega direta em suporte@centraldeapoio.com sem bloqueio de portas SMTP)
  try {
    const targetEmail = recipientEmail || 'suporte@centraldeapoio.com';
    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
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
        Origem: lead.originDomain || 'www.centraldeapoio.com',
        Data_Hora: new Date(lead.createdAt).toLocaleString('pt-BR'),
      }),
    });

    if (formSubmitRes.ok) {
      const fsData = await formSubmitRes.json().catch(() => ({}));
      if (fsData.success === 'true' || fsData.success === true || fsData.message) {
        console.log('[FORMSUBMIT] E-mail enviado com sucesso para:', targetEmail);
        return { sent: true, message: 'E-mail enviado com sucesso via FormSubmit HTTPS API.' };
      }
    }
  } catch (fsErr: any) {
    console.warn('[FORMSUBMIT API AVISO]:', fsErr?.message || fsErr);
  }

  // 5. Tentar envio via Nodemailer SMTP com múltiplas portas de fallback para GoDaddy / Office 365
  const smtpConfigs = [
    { host, port: portConfig, secure: portConfig === 465 },
    { host: 'smtpout.secureserver.net', port: 465, secure: true },
    { host: 'smtpout.secureserver.net', port: 587, secure: false, requireTLS: true },
    { host: 'smtpout.secureserver.net', port: 3535, secure: false },
    { host: 'smtp.office365.com', port: 587, secure: false, requireTLS: true },
  ];

  let lastSmtpError = '';
  for (const cfg of smtpConfigs) {
    try {
      const nm = nodemailer as any;
      const createTransport = nm.createTransport || nm.default?.createTransport || nm;

      if (typeof createTransport === 'function') {
        const transporter = createTransport({
          host: cfg.host,
          port: cfg.port,
          secure: cfg.secure,
          requireTLS: cfg.requireTLS,
          auth: {
            user: user,
            pass: pass,
          },
          connectionTimeout: 3500,
          greetingTimeout: 3500,
          socketTimeout: 3500,
          tls: {
            rejectUnauthorized: false,
          },
        });

        const result = await new Promise<{ sent: boolean; message: string }>((resolve) => {
          let isSettled = false;

          const timer = setTimeout(() => {
            if (!isSettled) {
              isSettled = true;
              try { transporter.close(); } catch (e) {}
              resolve({
                sent: false,
                message: `Timeout de conexão (${cfg.host}:${cfg.port}).`,
              });
            }
          }, 3800);

          transporter.sendMail(
            {
              from: `"Central de Apoio" <${fromEmail}>`,
              to: recipientEmail,
              subject: `[Novo Lead] ${lead.assunto || 'Atendimento'} - ${lead.nome}`,
              html: htmlBody,
              replyTo: lead.email || undefined,
            },
            (err: any, _info: any) => {
              if (isSettled) return;
              isSettled = true;
              clearTimeout(timer);
              try { transporter.close(); } catch (e) {}

              if (err) {
                console.error(`[SMTP ERRO ${cfg.host}:${cfg.port}]`, err.message || err);
                resolve({
                  sent: false,
                  message: `Falha em ${cfg.host}:${cfg.port} - ${err.message || String(err)}`,
                });
              } else {
                resolve({
                  sent: true,
                  message: `E-mail enviado com sucesso via SMTP (${cfg.host}:${cfg.port}).`,
                });
              }
            }
          );
        });

        if (result.sent) {
          return result;
        }
        lastSmtpError = result.message;
      }
    } catch (err: any) {
      console.error(`[SMTP CATCH ${cfg.host}:${cfg.port}]:`, err);
      lastSmtpError = err.message || String(err);
    }
  }

  // Se o envio SMTP falhou em todas as combinações de porta/host da GoDaddy
  return {
    sent: false,
    message: `Falha no envio SMTP após tentar portas 465, 587 e 3535. Último erro: ${lastSmtpError}. O lead foi salvo com sucesso em /api/contacts.`,
  };
}
