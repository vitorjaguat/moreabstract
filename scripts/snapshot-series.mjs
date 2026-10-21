// One-time snapshot of the "View to nothingness" series.
// Downloads each token's metadata + image from Arweave, writes a resized WebP
// (alpha preserved) to public/img/series/ and the card data to data/series.json.
//
// Usage: node scripts/snapshot-series.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const METADATA_BASE =
  'https://mvndvalpztyy72urt7v7ekjshbabiqfdwa4hcfvtpyjjgdf3iara.arweave.net/ZVo6gW_M8Y_qkZ_r8ikyOEAUQKOwOHEWs34Skwy7QCI';

// Manifold listing ids, in token order (token #1 = first id). 5162 is not part of the series.
const LISTING_IDS = [
  5155, 5156, 5157, 5158, 5159, 5160, 5161, 5163, 5164, 5165, 5166, 5167, 5168,
  5169, 5170, 5171, 5172, 5173, 5174, 5175, 5176, 5177, 5178, 5179, 5180, 5181,
  5182, 5183, 5184, 5185, 5186, 5187, 5188, 5189, 5190, 5191,
];

const WIDTH = 1000; // cards render at most ~600px wide on retina screens
const CONCURRENCY = 4;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imgDir = path.join(root, 'public/img/series');
const dataFile = path.join(root, 'data/series.json');

async function fetchWithRetry(url, asJson, tries = 4) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(120_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return asJson ? await res.json() : Buffer.from(await res.arrayBuffer());
    } catch (err) {
      if (i >= tries) throw new Error(`${url}: ${err.message}`);
      await new Promise((r) => setTimeout(r, 1500 * i));
    }
  }
}

async function snapshot(listingId, index) {
  const token = index + 1;
  const meta = await fetchWithRetry(`${METADATA_BASE}/${token}`, true);
  const original = await fetchWithRetry(meta.image, false);
  const file = `${String(token).padStart(3, '0')}.webp`;
  const { width, height } = await sharp(original)
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90 })
    .toFile(path.join(imgDir, file));
  console.log(`#${token} ${meta.name} -> ${file} (${width}x${height})`);
  return { id: listingId, token, title: meta.name, image: `/img/series/${file}`, width, height };
}

await mkdir(imgDir, { recursive: true });
await mkdir(path.dirname(dataFile), { recursive: true });

const results = new Array(LISTING_IDS.length);
let next = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (next < LISTING_IDS.length) {
      const i = next++;
      results[i] = await snapshot(LISTING_IDS[i], i);
    }
  })
);

await writeFile(dataFile, JSON.stringify(results, null, 2) + '\n');
console.log(`Wrote ${results.length} entries to ${path.relative(root, dataFile)}`);
