import { useEffect, useRef } from 'react';
import artworks from '../data/artworks.json';
import { warmArtwork } from '../lib/warm';

// Attach the returned ref to a card: when it is near the viewport, hovered or focused,
// warm the slow Arweave requests behind its /artwork page so the page opens fast when
// clicked. lib/warm.js skips repeats until the gateway's warmth is about to expire.
export default function useWarmOnView(listingId) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const artwork = artworks[listingId];
    if (!el || !artwork) return;

    const warm = () => warmArtwork(artwork);
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && warm(),
      { rootMargin: '300px' }
    );
    observer.observe(el);
    el.addEventListener('pointerenter', warm);
    el.addEventListener('focusin', warm);

    return () => {
      observer.disconnect();
      el.removeEventListener('pointerenter', warm);
      el.removeEventListener('focusin', warm);
    };
  }, [listingId]);

  return ref;
}
