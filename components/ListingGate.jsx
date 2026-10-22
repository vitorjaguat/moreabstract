import { useEffect, useRef, useState } from 'react';
import Listing from './Listing';
import ListingSkeleton from './ListingSkeleton';

const POLL_MS = 150;
const IMAGE_GRACE_MS = 1500; // video/audio tokens may have no <img> to wait for
const GIVE_UP_MS = 15000; // reveal the widget anyway (e.g. to show Manifold's own errors)
const FADE_MS = 250;

// Shows a skeleton until the Manifold widget has its real title (it first renders an
// "Unnamed" placeholder) and image. The widget is always mounted, just invisible, so
// Manifold's scripts find it and load it exactly as before.
export default function ListingGate({ id, network }) {
  const widgetRef = useRef(null);
  const [phase, setPhase] = useState('loading'); // loading -> fading -> done

  useEffect(() => {
    const startedAt = Date.now();
    let titleSeenAt = null;

    const timer = setInterval(() => {
      const root = widgetRef.current;
      if (!root) return;

      const name = root.querySelector('.m-name')?.textContent?.trim();
      if (name && name !== 'Unnamed' && titleSeenAt === null) titleSeenAt = Date.now();

      const img = root.querySelector('.m-complete-view img');
      const imageReady = img && img.complete && img.naturalWidth > 0;
      const ready =
        titleSeenAt !== null && (imageReady || Date.now() - titleSeenAt > IMAGE_GRACE_MS);

      if (ready || Date.now() - startedAt > GIVE_UP_MS) {
        clearInterval(timer);
        setPhase('fading');
      }
    }, POLL_MS);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (phase !== 'fading') return;
    const timer = setTimeout(() => setPhase('done'), FADE_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  const loading = phase === 'loading';

  return (
    <div className='relative'>
      <div
        ref={widgetRef}
        className={`listing-gate-widget transition-opacity duration-200 ${
          loading ? 'pointer-events-none absolute inset-x-0 top-0 opacity-0' : 'relative opacity-100'
        }`}
        aria-hidden={loading}
        {...(loading ? { inert: '' } : {})}
      >
        <Listing id={id} network={network} />
      </div>

      {phase !== 'done' && (
        <ListingSkeleton
          className={`listing-gate-skeleton transition-opacity duration-200 ${
            loading ? 'opacity-100' : 'pointer-events-none absolute inset-x-0 top-0 opacity-0'
          }`}
        />
      )}

      {/* Without JavaScript nothing could ever reveal the widget, so show it right away. */}
      <noscript>
        <style>{`.listing-gate-skeleton{display:none}.listing-gate-widget{position:relative!important;opacity:1!important;pointer-events:auto!important}`}</style>
      </noscript>
    </div>
  );
}
