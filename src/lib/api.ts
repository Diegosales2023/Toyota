/**
 * Mapeia as URLs das requisições de forma resiliente
 */
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
  return `https://www.centraldeapoio.com${path}`; // Em produção com domínio customizado externo, aponta para a URL absoluta
};
