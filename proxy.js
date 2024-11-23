import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/proxy', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL requerida' });
  }

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const content = await page.content();
    await browser.close();

    res.send(content);
  } catch (error) {
    console.error('Error en el proxy con Puppeteer:', error.message);
    res.status(500).json({ error: 'Error al obtener la URL con Puppeteer' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy escuchando en http://localhost:${PORT}`);
});
