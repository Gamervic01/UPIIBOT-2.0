export interface ScrapedPage {
  url: string; // URL de la página
  title: string; // Título de la página
  content: string; // Contenido principal de la página
  links: ScrapedLink[]; // Lista de enlaces encontrados en la página
  lastScraped: Date; // Fecha de scraping
}

export interface ScrapedLink {
  href: string; // URL del enlace
  text: string; // Texto visible del enlace
}

export interface ScrapingResult {
  success: boolean; // Indica si el scraping fue exitoso
  error?: string; // Error en caso de fallo
  data?: ScrapedPage; // Datos recolectados si el scraping fue exitoso
}
