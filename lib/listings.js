// Server-side reader for Manifold marketplace listings (Ethereum mainnet).
// Used from getStaticProps so price/status are baked into the page HTML.

const MARKETPLACE = '0x3a3548e060Be10c2614d0a4Cb0c03CC9093fD799';
const GET_LISTING = '0xe1f332f1'; // getListing(uint40)
const RPC_URL = process.env.ETH_RPC_URL || 'https://ethereum-rpc.publicnode.com';

const word = (words, i) => BigInt('0x' + words[i]);

function formatEth(wei) {
  const whole = wei / 10n ** 18n;
  const frac = (wei % 10n ** 18n).toString().padStart(18, '0').replace(/0+$/, '');
  return `${whole}${frac ? '.' + frac : ''} ETH`;
}

// Layout of the ABI-encoded Listing struct (words after the leading offset):
// 0 id, 2 finalized, 3 totalSold, 6 initialAmount, 8 totalAvailable, 14 startTime, 15 endTime
function parseListing(hex) {
  const h = hex.slice(2);
  const words = h.match(/.{64}/g);
  const base = Number(word(words, 0)) / 32;
  const w = (i) => word(words, base + i);

  const now = BigInt(Math.floor(Date.now() / 1000));
  const remaining = Number(w(8) - w(3));
  let status = 'available';
  if (w(2) === 1n || now >= w(15)) status = 'ended';
  else if (now < w(14)) status = 'soon';
  else if (remaining <= 0) status = 'sold';

  return { price: formatEth(w(6)), status, remaining };
}

// Returns { [listingId]: { price, status, remaining } }. Never throws: on any
// failure it returns what it could read so the page still builds.
export async function getListings(ids) {
  try {
    const body = ids.map((id, i) => ({
      jsonrpc: '2.0',
      id: i,
      method: 'eth_call',
      params: [
        {
          to: MARKETPLACE,
          data: GET_LISTING + BigInt(id).toString(16).padStart(64, '0'),
        },
        'latest',
      ],
    }));
    const res = await fetch(RPC_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15_000),
    });
    const replies = await res.json();

    const out = {};
    for (const reply of replies) {
      if (!reply.result) continue;
      try {
        out[ids[reply.id]] = parseListing(reply.result);
      } catch {}
    }
    return out;
  } catch (err) {
    console.error('getListings failed:', err.message);
    return {};
  }
}
