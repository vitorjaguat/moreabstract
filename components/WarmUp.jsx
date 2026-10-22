import Head from 'next/head';
import { useEffect } from 'react';
import { arweaveHost, warmArtwork } from '../lib/warm';

// Servers the Manifold widget talks to on an artwork page: opening the connections
// now saves a round trip on each request in the widget's serial loading chain.
const HOSTS = [
  'https://bridge.manifoldxyz.dev',
  'https://marketplace.api.manifoldxyz.dev',
  'https://assets.manifold.xyz',
  'https://oauth2.manifoldxyz.dev',
  'https://unpkg.com',
];

export default function WarmUp({ artwork }) {
  useEffect(() => warmArtwork(artwork), [artwork]);

  const hosts = artwork
    ? [...HOSTS, arweaveHost(artwork.metadataUrl), arweaveHost(artwork.originalImage)]
    : HOSTS;

  return (
    <Head>
      {[...new Set(hosts)].map((host) => (
        <link key={host} rel='preconnect' href={host} crossOrigin='anonymous' />
      ))}
    </Head>
  );
}
