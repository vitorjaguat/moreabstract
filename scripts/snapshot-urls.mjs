// One-time snapshot of the URLs behind every artwork page, written to
// data/artworks.json. Used to warm up the slow Arweave requests the Manifold
// widget makes on /artwork/[listingId] (see components/WarmUp.jsx).
//
// Reads the token contract/id from the Manifold marketplace contract, then the
// token metadata JSON (~4 KB each). No images are downloaded.
//
// Usage: node scripts/snapshot-urls.mjs   (optional env: ETH_RPC_URL)
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = async (file) => JSON.parse(await readFile(path.join(root, file), 'utf8'));

const [series, click, cloud] = await Promise.all([
  readJson('data/series.json'),
  readJson('data/click.json'),
  readJson('data/cloud.json'),
]);
const LISTING_IDS = [...series.map((s) => s.id), click.id, ...cloud.map((c) => c.id)];

const RPC_URL = process.env.ETH_RPC_URL || 'https://ethereum-rpc.publicnode.com';
const MARKETPLACE = '0x3a3548e060Be10c2614d0a4Cb0c03CC9093fD799';
const GET_LISTING = '0xe1f332f1'; // getListing(uint40)
const TOKEN_URI = '0xc87b56dd'; // tokenURI(uint256)

const pad = (n) => BigInt(n).toString(16).padStart(64, '0');

async function ethCall(to, data, tries = 4) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(RPC_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_call', params: [{ to, data }, 'latest'] }),
        signal: AbortSignal.timeout(30_000),
      });
      const json = await res.json();
      if (!json.result) throw new Error(JSON.stringify(json.error));
      return json.result.slice(2);
    } catch (err) {
      if (i >= tries) throw err;
      await new Promise((r) => setTimeout(r, 1000 * i)); // public RPCs hiccup now and then
    }
  }
}

// Word layout of getListing (after the leading offset): 16 token id, 17 token contract.
async function getToken(listingId) {
  const hex = await ethCall(MARKETPLACE, GET_LISTING + pad(listingId));
  const words = hex.match(/.{64}/g);
  const base = Number(BigInt('0x' + words[0])) / 32;
  return { tokenId: BigInt('0x' + words[base + 16]).toString(), contract: '0x' + words[base + 17].slice(24) };
}

async function getTokenUri(contract, tokenId) {
  const hex = await ethCall(contract, TOKEN_URI + pad(tokenId));
  const offset = Number(BigInt('0x' + hex.slice(0, 64))) * 2;
  const len = Number(BigInt('0x' + hex.slice(offset, offset + 64)));
  return Buffer.from(hex.slice(offset + 64, offset + 64 + len * 2), 'hex').toString('utf8');
}

async function snapshot(listingId) {
  const { contract, tokenId } = await getToken(listingId);
  const metadataUrl = await getTokenUri(contract, tokenId);
  const meta = await (await fetch(metadataUrl, { signal: AbortSignal.timeout(60_000) })).json();
  const sha = meta.image_details?.sha256;
  return {
    contract,
    tokenId,
    metadataUrl,
    originalImage: meta.image,
    // Manifold's CDN serves a resized copy keyed by the file's sha256 (what the widget displays).
    cdnImage: sha ? `https://assets.manifold.xyz/optimized/${sha}/w_1000.jpg` : null,
  };
}

const out = {};
let next = 0;
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (next < LISTING_IDS.length) {
      const id = LISTING_IDS[next++];
      out[id] = await snapshot(id);
      console.log(id, out[id].contract.slice(0, 8), '#' + out[id].tokenId);
    }
  })
);

const sorted = Object.fromEntries(Object.entries(out).sort(([a], [b]) => a - b));
await mkdir(path.join(root, 'data'), { recursive: true });
await writeFile(path.join(root, 'data/artworks.json'), JSON.stringify(sorted, null, 2) + '\n');
console.log(`Wrote ${Object.keys(sorted).length} entries to data/artworks.json`);
