import { setCorsHeaders, clearLeadsBackup } from '../shared/leadsService';

export default async function handler(req: any, res: any) {
  setCorsHeaders(res, req);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Utilize POST.' });
  }

  try {
    const success = clearLeadsBackup();

    if (!success) {
      return res.status(500).json({ error: 'Não foi possível limpar o arquivo de backup.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Arquivo de backup de contatos limpo com sucesso.',
      total: 0,
    });
  } catch (err: any) {
    console.error('Erro na rota POST /api/contacts/clear:', err);
    return res.status(500).json({
      error: 'Erro interno ao limpar backup de contatos.',
      details: err.message || String(err),
    });
  }
}
