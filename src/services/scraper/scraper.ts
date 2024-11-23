import axios from 'axios';
import * as cheerio from 'cheerio';
import type { ScrapedPage, ScrapedLink, ScrapingResult } from './types';
import { UPIICSA_BASE_URL, SELECTORS, SCRAPING_RULES } from './config';

class UPIICSAScraper {
  private visitedUrls: Set<string> = new Set();
  private results: Map<string, ScrapedPage> = new Map();

  constructor() {
    this.visitedUrls.add(UPIICSA_BASE_URL);
  }

  private async scrapePage(url: string): Promise<ScrapingResult> {
    if (this.visitedUrls.has(url)) {
      console.log(`URL already visited: ${url}`);
      return { success: false, error: 'URL already visited' };
    }

    try {
      console.log(`Scraping: ${url}`);
      const response = await axios.get(`http://localhost:3001/proxy?url=${encodeURIComponent(url)}`);
      const html = response.data;
      const $ = cheerio.load(html);

      const title = $(SELECTORS.title).first().text().trim();
      const content = $(SELECTORS.content)
        .map((_, el) => $(el).text().trim())
        .get()
        .join('\n');

      const links: ScrapedLink[] = $(SELECTORS.links)
        .map((_, el) => {
          const href = $(el).attr('href');
          const text = $(el).text().trim();
          if (href && href.startsWith('/')) {
            return {
              href: `${UPIICSA_BASE_URL}${href}`,
              text: text || 'Sin texto',
            };
          }
          return null;
        })
        .get()
        .filter((link): link is ScrapedLink => link !== null);

      const scrapedPage: ScrapedPage = {
        url,
        title: title || 'Sin título',
        content: content || 'Sin contenido',
        links,
        lastScraped: new Date(),
      };

      this.results.set(url, scrapedPage);
      this.visitedUrls.add(url);

      return { success: true, data: scrapedPage };
    } catch (error: any) {
      console.error(`Error scraping ${url}:`, error.message);
      if (error.response) {
        console.error(`HTTP Status: ${error.response.status}`);
      }
      return { success: false, error: error.message || 'Unknown error' };
    }
  }

  public async scrapeAll(): Promise<Map<string, ScrapedPage>> {
    try {
      console.log("Starting scraping process...");
      
      // Obtener las URLs dinámicamente desde las reglas de inclusión configuradas
      const mainPages = SCRAPING_RULES.includePatterns.map((pattern) =>
        pattern instanceof RegExp
          ? pattern.source.replace(/^\/|\$$/g, "") // Limpia la RegExp para obtener URLs base
          : pattern
      ).map((endpoint) => `${UPIICSA_BASE_URL}/${endpoint}`);
  
      // Procesar cada URL
      for (const url of mainPages) {
        if (!this.visitedUrls.has(url)) {
          console.log(`Scraping URL: ${url}`);
          await this.scrapePage(url);
        }
      }
  
      console.log(`Scraping completed. Processed ${this.results.size} pages.`);
      return this.results;
    } catch (error) {
      console.error("Error during scraping:", error);
      throw error;
    }
  }
  
  public getResults(): Map<string, ScrapedPage> {
    return this.results;
  }
}

export const scraper = new UPIICSAScraper();
