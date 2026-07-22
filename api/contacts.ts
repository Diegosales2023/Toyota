import { setCorsHeaders, readLeadsBackup } from './shared/leadsService';

export default async function handler(req: any, res: any) {
  setCorsHeaders(res, req);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido. Utilize GET.' });
  }

  try {
    const leads = readLeadsBackup();

    // Ordenar do mais recente para o mais antigo
    leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return res.status(200).json({
      success: true,
      total: leads.length,
      domain: 'https://www.centraldeapoio.com',
      targetEmail: 'suporte@centraldeapoio.com',
      leads,
    });
  } catch (err: any) {
    console.error('Erro na rota GET /api/contacts:', err);
    return res.status(500).json({
      error: 'Erro interno ao consultar contatos do backup.',
      details: err.message || String(err),
    });
  }
}
