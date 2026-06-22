import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import xml2js from 'xml2js';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// GSC Credentials
const GSC_KEY_PATH = path.join(rootDir, 'gsc-credentials.json');
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;

// Try to find sitemap in dist first, then public
let SITEMAP_PATH = path.join(rootDir, 'dist', 'sitemap.xml');
if (!fs.existsSync(SITEMAP_PATH)) {
  SITEMAP_PATH = path.join(rootDir, 'public', 'sitemap.xml');
}

async function readSitemapUrls() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.warn(`[WARN] Sitemap non trovata in dist/ né in public/.`);
    return [];
  }
  const sitemapXml = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(sitemapXml);
  
  if (!result.urlset || !result.urlset.url) return [];
  
  return result.urlset.url.map(entry => entry.loc[0]);
}

async function notifyGoogle(urls) {
  if (!fs.existsSync(GSC_KEY_PATH)) {
    console.warn(`[WARN] Credenziali GSC non trovate: ${GSC_KEY_PATH}`);
    return;
  }
  
  console.log(`[GOOGLE] Notificando ${urls.length} URL a Google Indexing API...`);
  
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: GSC_KEY_PATH,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });
    
    const authClient = await auth.getClient();
    const indexing = google.indexing({ version: 'v3', auth: authClient });
    
    const urlsToNotify = urls.slice(0, 200); 
    
    for (const url of urlsToNotify) {
      await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED'
        }
      });
      console.log(`[GOOGLE] URL_UPDATED per: ${url}`);
      await new Promise(r => setTimeout(r, 100)); // rate limiting
    }
  } catch (err) {
    console.error(`[GOOGLE] Errore API:`, err.message);
  }
}

async function notifyIndexNow(urls) {
  if (!urls.length) return;
  if (!INDEXNOW_KEY) {
    console.warn(`[WARN] INDEXNOW_KEY non configurata nel .env`);
    return;
  }
  
  const host = new URL(urls[0]).hostname; // Infer host from the first URL
  
  console.log(`[INDEXNOW] Notificando ${urls.length} URL per host ${host}...`);
  
  const payload = JSON.stringify({
    host: host,
    key: INDEXNOW_KEY,
    keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
    urlList: urls
  });
  
  const options = {
    hostname: 'api.indexnow.org',
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  };
  
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log(`[INDEXNOW] Successo! (${res.statusCode})`);
        } else {
          console.error(`[INDEXNOW] Errore ${res.statusCode}:`, data);
        }
        resolve();
      });
    });
    
    req.on('error', error => {
      console.error('[INDEXNOW] Errore di rete:', error);
      reject(error);
    });
    
    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log(`=== Avvio Instant Indexing API ===`);
  const urls = await readSitemapUrls();
  if (urls.length === 0) {
    console.log(`Nessun URL da notificare o sitemap vuota.`);
    return;
  }
  
  console.log(`Trovati ${urls.length} URL nella sitemap.`);
  
  await notifyIndexNow(urls);
  await notifyGoogle(urls);
  
  console.log(`=== Completato ===`);
}

run();
