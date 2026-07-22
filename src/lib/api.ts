/**
 * Mapeia as URLs das requisições de forma resiliente.
 * Servidor do Cloud Run com portas SMTP habilitadas para envio direto.
 */
export const CLOUD_RUN_BACKEND_URL = 'https://ais-pre-7yyms7iealjvog75i2h7bh-82296584552.us-east1.run.app';

export const getApiUrl = (path: string): string => {
  if (typeof window === 'undefined') {
    return path;
  }
  const hostname = window.location.hostname;
  if (
    hostname === "localhost" || 
    hostname === "127.0.0.1" || 
    hostname.endsWith(".run.app")
  ) {
    return path; // Em desenvolvimento ou ambiente de preview integrado, usa caminhos relativos
  }
  return path; // No domínio personalizado www.centraldeapoio.com, usa o caminho relativo local primeiro
};

