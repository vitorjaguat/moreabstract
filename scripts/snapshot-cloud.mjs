// One-time snapshot of the "Cloud, Continent, Island" series (listings 5196-5200).
// Downloads each token's poster from Arweave, writes a resized WebP to
// public/img/cloud/ and the card data to data/cloud.json.
//
// Usage: node scripts/snapshot-cloud.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Listing id -> token metadata URL (tokenURI of contract 0x5d9a…1473, tokens 1-5).
const TOKENS = [
  [5196, 'https://arweave.net/Jtxe9Akl8-i_I-6-fOihJd8fVnuOVZsZi1PHvfEt5uY'],
  [5197, 'https://arweave.net/1PESq_V6g-EGMQj-kxBbo4Ts2R6xre60xROnhaR6ZtA'],
  [5198, 'https://arweave.net/RkSx9QFDLfhnr1ibG6tzSSFrIKx7uFwleTbCgLsGFvc'],
  [5199, 'https://arweave.net/O4FoT2ZdQJn7z5RGoWHTpYWwl_f9MmESKA-1r8foaKg'],
  [5200, 'https://arweave.net/j4PBdFu3MvwEiK55aukk0YNVgvt7Hh4SqEno-SYVn9w'],
];

const WIDTH = 1000;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imgDir = path.join(root, 'public/img/cloud');
const dataFile = path.join(root, 'data/cloud.json');

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

await mkdir(imgDir, { recursive: true });
await mkdir(path.dirname(dataFile), { recursive: true });

const results = [];
for (const [id, metaUrl] of TOKENS) {
  const meta = await fetchWithRetry(metaUrl, true);
  const original = await fetchWithRetry(meta.image, false);
  const file = `${id}.webp`;
  const { width, height } = await sharp(original)
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(imgDir, file));
  results.push({
    id,
    title: meta.name,
    image: `/img/cloud/${file}`,
    width,
    height,
    // Manifold's CDN serves originals by content hash (fast); Arweave is the fallback.
    video: `https://assets.manifold.xyz/original/${meta.animation_details.sha256}.mp4`,
    videoFallback: meta.animation_url ?? meta.animation,
  });
  console.log(`${id} ${meta.name} -> ${file} (${width}x${height})`);
}

await writeFile(dataFile, JSON.stringify(results, null, 2) + '\n');
console.log(`Wrote ${results.length} entries to ${path.relative(root, dataFile)}`);
