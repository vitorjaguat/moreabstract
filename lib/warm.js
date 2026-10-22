// The Manifold widget on /artwork/[listingId] sends a HEAD request to the ORIGINAL
// 18 MB image on Arweave and waits for it before showing the title and image. The
// Arweave gateway answers in ~0.3 s when it has recently served the file but takes
// 4-9 s when it is cold. Firing the same request early (from the artwork page, and
// from the cards on the home page) makes the gateway warm by the time the widget asks.

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz234567';

// arweave.net/<id> redirects to <base32(sha256 id)>.arweave.net/<id>.
export function arweaveHost(url) {
  const id = new URL(url).pathname.split('/')[1];
  const bin = atob(id.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (id.length % 4)) % 4));
  let bits = 0;
  let value = 0;
  let out = '';
  for (let i = 0; i < bin.length; i++) {
    value = (value << 8) | bin.charCodeAt(i);
    bits += 8;
    while (bits >= 5) {
      out += ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += ALPHABET[(value << (5 - bits)) & 31];
  return `https://${out}.arweave.net`;
}

// The gateway stays warm for roughly 6 minutes (measured: fast at 1, 3 and 6 min, cold
// again at 10), so a request is repeated once it is older than this.
const REWARM_AFTER_MS = 4 * 60 * 1000;
const warmedAt = new Map();

// Safe to call often (hover, scroll, page load): it only fires when the last warm-up
// of that URL is older than REWARM_AFTER_MS.
export function warmArtwork(artwork) {
  if (!artwork || typeof window === 'undefined') return;

  const refresh = (key, request) => {
    const last = warmedAt.get(key);
    if (last && Date.now() - last < REWARM_AFTER_MS) return;
    warmedAt.set(key, Date.now());
    request().catch(() => {});
  };

  refresh(artwork.originalImage, () =>
    fetch(artwork.originalImage, { method: 'HEAD', mode: 'no-cors' })
  );
  refresh(artwork.metadataUrl, () => fetch(artwork.metadataUrl, { mode: 'cors' }));
}
