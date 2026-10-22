import { useEffect, useRef, useState } from 'react';

// Muted looping video that only downloads/plays while it is near the viewport.
// Sits on top of a poster (rendered by the parent) and fades in once playing, so
// the card is never blank. Respects prefers-reduced-motion (poster only).
export default function LazyVideo({ src, fallback, className = '' }) {
  const ref = useRef(null);
  const visible = useRef(false);
  const [loaded, setLoaded] = useState(false); // sources attached
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (!entry.isIntersecting) video.pause();
        else if (loaded) video.play().catch(() => {});
        else setLoaded(true);
      },
      { rootMargin: '200px' }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [loaded]);

  // Sources were just attached: load them and start if still on screen.
  useEffect(() => {
    const video = ref.current;
    if (!loaded || !video) return;
    video.load();
    if (visible.current) video.play().catch(() => {});
  }, [loaded]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload='none'
      onPlaying={() => setPlaying(true)}
      className={`${className} transition-[opacity,transform] duration-700 ${
        playing ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {loaded && (
        <>
          <source src={src} type='video/mp4' />
          {fallback && <source src={fallback} type='video/mp4' />}
        </>
      )}
    </video>
  );
}
