import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import contactHandler from './api/contact';
import contactsHandler from './api/contacts';
import clearContactsHandler from './api/contacts/clear';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Set Content-Security-Policy headers to allow Google Tag Manager and Google Analytics
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' * data: blob: 'unsafe-inline' 'unsafe-eval'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.gstatic.com; " +
    "script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.gstatic.com; " +
    "img-src 'self' * data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://ssl.gstatic.com; " +
    "connect-src 'self' * https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://stats.g.doubleclick.net; " +
    "frame-src 'self' https://www.googletagmanager.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com data:;"
  );
  next();
});

// Lazy-loaded Gemini client
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined. The AI assistant will operate in simulation mode.");
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

// System instruction to give the assistant a realistic Toyota financing specialist persona
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

// API Routes Serverless/Express Mounts
app.all('/api/contact', (req, res) => contactHandler(req, res));
app.all('/api/contacts/clear', (req, res) => clearContactsHandler(req, res));
app.all('/api/contacts', (req, res) => contactsHandler(req, res));
app.all('/api/leads', (req, res) => {
  if (req.method === 'POST') {
    return contactHandler(req, res);
  }
  return contactsHandler(req, res);
});


app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Mensagens inválidas ou ausentes.' });
  }

  const ai = getAiClient();

  if (!ai) {
    // Elegant fallback simulation when API Key is missing or invalid
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
    // Format messages for the @google/genai SDK
    // SDK uses chat API or generateContent
    // Let's use ai.models.generateContent with standard chat role formatting
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
});

// Serve Vite dev server or static bundle
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
