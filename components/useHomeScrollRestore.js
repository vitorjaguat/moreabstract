import { useEffect } from 'react';
import Router from 'next/router';

// Module-level on purpose: the i18n wrapper around _app remounts it when moving between
// pages with and without translations, which would reset a variable kept in the effect.
let savedY = 0;

// Next.js scrolls every new navigation to the top. Remember where the visitor was on
// the home page and put them back there when they return (HOME button or back).
export default function useHomeScrollRestore() {
  useEffect(() => {
    // routeChangeStart: Router.pathname is still the page being left.
    const save = () => {
      if (Router.pathname === '/') savedY = window.scrollY;
    };

    // routeChangeComplete: Next has already scrolled to the top by now.
    const restore = () => {
      if (Router.pathname !== '/' || savedY === 0) return;

      // Stop correcting as soon as the visitor scrolls themselves.
      let touched = false;
      const stop = () => (touched = true);
      const inputs = ['wheel', 'touchstart', 'keydown'];
      inputs.forEach((type) => window.addEventListener(type, stop, { once: true, passive: true }));

      const apply = () => {
        if (touched || Math.abs(window.scrollY - savedY) <= 2) return;
        const root = document.documentElement;
        root.style.scrollBehavior = 'auto'; // globals.css makes scrolling smooth
        window.scrollTo(0, savedY);
        root.style.scrollBehavior = '';
      };

      apply();
      // Late-loading content (e.g. widgets near the bottom) can change the page height.
      [300, 1000, 2000].forEach((ms) => setTimeout(apply, ms));
    };

    Router.events.on('routeChangeStart', save);
    Router.events.on('routeChangeComplete', restore);
    return () => {
      Router.events.off('routeChangeStart', save);
      Router.events.off('routeChangeComplete', restore);
    };
  }, []);
}
