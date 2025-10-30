#!/usr/bin/env node
// Minimal Figma fetcher: downloads /v1/files JSON and saves it to PWA/figma/file.json
// Usage: FIGMA_FILE_KEY=... FIGMA_TOKEN=... node scripts/fetch-figma.js

const fs = require('fs');
const path = require('path');
const https = require('https');

const FILE_KEY = process.env.FIGMA_FILE_KEY;
const TOKEN = process.env.FIGMA_TOKEN;

if (!FILE_KEY || !TOKEN) {
  console.error('Missing FIGMA_FILE_KEY or FIGMA_TOKEN env vars.');
  process.exit(1);
}

const outDir = path.resolve(__dirname, '..', 'figma');
const outFile = path.join(outDir, 'file.json');

fs.mkdirSync(outDir, { recursive: true });

function fetchJSON(url, headers) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: 'GET', headers }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (e) {
            reject(new Error('Failed to parse JSON: ' + e.message));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  try {
    const url = `https://api.figma.com/v1/files/${encodeURIComponent(FILE_KEY)}`;
    const headers = { 'X-Figma-Token': TOKEN };
    console.log('Fetching', url);
    const json = await fetchJSON(url, headers);
    fs.writeFileSync(outFile, JSON.stringify(json, null, 2), 'utf8');
    console.log('Saved to', path.relative(process.cwd(), outFile));
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(2);
  }
})();

