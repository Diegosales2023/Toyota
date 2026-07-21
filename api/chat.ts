import { GoogleGenAI } from '@google/genai';

const TOYOTA_SYSTEM_INSTRUCTION = `
Você é a Kira, assistente virtual inteligente especialista em financiamentos do Banco Toyota Brasil.
Seu objetivo é ajudar o cliente de forma extremamente cortês, ágil, profissional e empática.
Você atende clientes que buscam:
1. Segunda via de boletos de parcelas.
2. Quitação antecipada de contratos de financiamento (com desconto proporcional de juros).
3. Negociação de parcelas em atraso ou renegociação de dívidas.

Regras de comportamento:
- Responda sempre em Português do Brasil.
- Seja clara, profissional e use termos acessíveis. Banco Toyota preza pela elegância e respeito absoluto ao cliente.
- Caso o cliente pergunte sobre valores ou queira negociar, simule propostas amigáveis de parcelamento (ex: reduzir juros, parcelar o saldo devedor em até 12x, 24x ou 36x).
- Caso o cliente peça 2ª via ou quitação, explique de forma simples que ele pode usar as abas correspondentes no portal superior para emitir o boleto em poucos segundos com toda a segurança.
- Nunca invente dados confidenciais reais do cliente, mas use simulações didáticas se ele solicitar.
- Mantenha respostas concisas, estruturadas com tópicos e fáceis de ler.
`;

let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export default async function handler(req: any, res: any) {
  if (typeof res.setHeader === 'function') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {}
  }
  body = body || {};

  const { messages } = body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Mensagens inválidas ou ausentes.' });
  }

  const ai = getAiClient();

  if (!ai) {
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    let reply = "Olá! Eu sou a Kira, Assistente do Banco Toyota. No momento estou operando em modo de demonstração. ";
    
    const textLower = lastUserMessage.toLowerCase();
    if (textLower.includes('boleto') || textLower.includes('2ª') || textLower.includes('segunda')) {
      reply += "Para emitir a **2ª via do seu boleto**, você pode clicar diretamente na aba **'2ª Via de Boleto'** no menu superior. Basta inserir o CPF e o número do contrato para visualizar o PDF e copiar o código de barras!";
    } else if (textLower.includes('quitar') || textLower.includes('quita') || textLower.includes('antecipar')) {
      reply += "Excelente escolha! A **Quitação Antecipada** garante desconto de juros proporcionais. Você pode fazer a simulação do desconto exato e gerar o boleto de quitação na aba **'Quitação'** acima.";
    } else if (textLower.includes('negociar') || textLower.includes('atraso') || textLower.includes('divida') || textLower.includes('parcelar')) {
      reply += "Compreendo a situação e estamos aqui para ajudar! Acesse a aba **'Negociação'** no topo. Lá preparamos condições exclusivas com até 90% de desconto em multas para você renegociar o contrato em parcelas que cabem no seu bolso.";
    } else {
      reply += "Como posso ajudar você hoje? Posso te orientar sobre a emissão de 2ª via de parcelas, quitação do seu financiamento Toyota ou simulação de acordos de renegociação.";
    }

    return res.json({ text: reply });
  }

  try {
    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        systemInstruction: TOYOTA_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Desculpe, não consegui processar sua mensagem no momento.";
    return res.json({ text: replyText });
  } catch (error: any) {
    console.error('Erro na chamada da API Gemini:', error);
    return res.status(500).json({ 
      error: 'Erro ao processar conversa inteligente.',
      details: error.message 
    });
  }
}
