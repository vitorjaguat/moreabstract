import '../styles/globals.css';
import '../styles/marketplace.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import localFont from '@next/font/local';
// import ogImg from '../public/card.jpg';
import { ParallaxProvider } from 'react-scroll-parallax';
import { appWithTranslation } from 'next-i18next';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import useHomeScrollRestore from '../components/useHomeScrollRestore';

//SEO & Head:
import Head from 'next/head';

const DOMAIN = 'https://www.moreabstract.xyz';
const DEFAULT_OG_IMAGE = 'https://www.moreabstract.xyz/card.jpg';

// Fonts:
const din = localFont({
  src: [
    { path: '../public/fonts/din-regular.woff2', weight: '400' },
    { path: '../public/fonts/din-bold.woff2', weight: '800', style: 'bold' },
    { path: '../public/fonts/din-italic.woff2', style: 'italic' },
    { path: '../public/fonts/din-light.woff2', style: 'light', weight: '100' },
  ],
  variable: '--din-font',
  display: 'block',
});

function MyApp({ Component, pageProps }) {
  // The claims widget is only used on the home page (Section 6) and /claim.
  const { pathname } = useRouter();
  useHomeScrollRestore();
  const needsClaims = pathname === '/' || pathname === '/claim';

  /**
   * NOTE: prior to v3 of marketplace widgets, it was necessary to trigger the `m-refresh-widgets`
   * event when dynamically changing elements on the page/routes.
   * See the docs for more details: https://docs.manifold.xyz/v/manifold-for-developers/resources/widgets/marketplace-widgets/window-events
   */
  // const router = useRouter();
  // useEffect(() => {
  //   const handleRouteChange = (url, { shallow }) => {
  //     // Note: need to trigger a m-refresh-widgets event every time the URL changes client side
  //     window.dispatchEvent(new Event('m-refresh-widgets'));
  //   };
  //   router.events.on('routeChangeStart', handleRouteChange);

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange);
  //   };
  // }, []);

  // Manifold's m-lazy-media widget inserts a <source> into an already-mounted
  // <audio> element (Vue patches it in as a child, not as a src attribute on
  // <audio> itself). Browsers don't pick up a <source> added after the
  // element has initialized, so playback silently does nothing. Force a
  // reload once each <audio> element gets its <source>.
  // useEffect(() => {
  //   const loadedAudios = new WeakSet();

  //   const tryLoad = (audio) => {
  //     if (loadedAudios.has(audio)) return;
  //     if (audio.querySelector('source[src]')) {
  //       loadedAudios.add(audio);
  //       audio.load();
  //     }
  //   };

  //   document.querySelectorAll('audio').forEach(tryLoad);

  //   const observer = new MutationObserver((mutations) => {
  //     for (const mutation of mutations) {
  //       if (mutation.target.tagName === 'AUDIO') {
  //         tryLoad(mutation.target);
  //       }
  //       mutation.addedNodes.forEach((node) => {
  //         if (node.nodeType !== 1) return;
  //         if (node.tagName === 'AUDIO') tryLoad(node);
  //         node.querySelectorAll?.('audio').forEach(tryLoad);
  //       });
  //     }
  //   });

  //   observer.observe(document.body, { childList: true, subtree: true });

  //   return () => observer.disconnect();
  // }, []);

  const title = 'MORE ABSTRACT';
  const description = 'Pedro Victor Brandão at Portas Vilaseca';
  const siteName = 'Pedro Victor Brandão';
  const canonical = DOMAIN;
  const ogImage = DEFAULT_OG_IMAGE;
  const ogType = 'website';
  const twitterHandle = '@pierresacoman';

  return (
    <>
      <Head>
        {/* <title key='title'>{title}</title>
        <meta name='description' content={description} />
        <meta key='og_type' property='og:type' content={ogType} />
        <meta key='og_title' property='og:title' content={title} />
        <meta
          key='og_description'
          property='og:description'
          content={description}
        />
        <meta key='og_locale' property='og:locale' content='en_IE' />
        <meta key='og_site_name' property='og:site_name' content={siteName} />
        <meta key='og_url' property='og:url' content={canonical ?? DOMAIN} />
        <meta key='og_site_name' property='og:site_name' content={siteName} />
        <meta
          key='og_image'
          property='og:image'
          content='https://www.moreabstract.xyz/card.jpg'
        />
        <meta
          key='og_image:alt'
          property='og:image:alt'
          content={`${title} | ${siteName}`}
        />
        <meta key='og_image:width' property='og:image:width' content='941' />
        <meta key='og_image:height' property='og:image:height' content='627' />

        <meta name='robots' content='index,follow' />

        <meta
          key='twitter:card'
          name='twitter:card'
          content='summary_large_image'
        />
        <meta key='twitter:site' name='twitter:site' content={twitterHandle} />
        <meta
          key='twitter:creator'
          name='twitter:creator'
          content={twitterHandle}
        />
        <meta key='twitter:title' property='twitter:title' content={title} />
        <meta
          key='twitter:description'
          property='twitter:description'
          content={description}
        />
        <meta
          name='twitter:image'
          content='https://www.moreabstract.xyz/card.jpg'
        /> */}

        {/* <!-- HTML Meta Tags --> */}
        <title>MORE ABSTRACT</title>
        <meta
          name='description'
          content='Pedro Victor Brandão at Portas Vilaseca'
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property='og:url' content='https://www.moreabstract.xyz/' />
        <meta property='og:title' content='MORE ABSTRACT' />
        <meta
          property='og:description'
          content='Pedro Victor Brandão at Portas Vilaseca'
        />
        <meta
          property='og:image'
          content='https://www.moreabstract.xyz/card.jpg'
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content='moreabstract.xyz' />
        <meta property='twitter:url' content='https://www.moreabstract.xyz/' />
        <meta name='twitter:title' content='MORE ABSTRACT' />
        <meta
          name='twitter:description'
          content='Pedro Victor Brandão at Portas Vilaseca'
        />
        <meta
          name='twitter:image'
          content='https://www.moreabstract.xyz/card.jpg'
        />

        <link rel='canonical' href={canonical ?? DOMAIN} />

        <link rel='shortcut icon' href='/img/favicon.jpg' />
      </Head>
      {/* GOOGLE-analytics https://www.makeuseof.com/nextjs-google-analytics/ */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GANALYTICS}`}
      />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* Manifold scripts */}
      <div className=''>
        {/* -- Stylesheets for connect and marketplace widgets -- */}
        {/* replace the specific version with `latest` to get the most up-to-date version of the widgets. */}
        {/* WARNING: `latest` may cause breakage, so use with caution */}
        <link
          rel='stylesheet'
          href='https://connect.manifoldxyz.dev/3.2.2/connect.css'
        />
        <script
          src='https://connect.manifoldxyz.dev/3.2.2/connect.umd.js'
          async
          defer
        ></script>
        {/* <link
          rel='stylesheet'
          href='https://connect.manifoldxyz.dev/2.2.3/connect.css'
        />
        <script
          src='https://connect.manifoldxyz.dev/2.2.3/connect.umd.js'
          async
        ></script> */}

        {/* walletIdentity widget removed: v2.1.0 (and even the latest v3.0.0)
            hardcode a call to hasura2.foundation.app, which no longer resolves
            (NXDOMAIN). That failure was breaking hydration for the other
            widgets on the page, including m-card-catalog artwork images. */}

        {/* restrictedToken widget removed: no page uses it (saved ~170 KB of JS per page). */}

        <link
          rel='stylesheet'
          // href='https://marketplace.manifoldxyz.dev/3.3.10/marketplace.css'
          // href='https://marketplace.manifoldxyz.dev/3.5.13/marketplace.css'
          href='https://marketplace.manifoldxyz.dev/3.9.1/marketplace.css'
          // href='../styles/marketplace3310.css'
        />
        <script
          // src='https://marketplace.manifoldxyz.dev/3.3.10/marketplace.umd.js'
          // src='https://marketplace.manifoldxyz.dev/3.5.13/marketplace.umd.js'
          src='https://marketplace.manifoldxyz.dev/3.9.1/marketplace.umd.js'
          async
          defer
        ></script>
        {/* <script src='/scripts/marketplace3310.js' async defer></script> */}

        {/* Claims widget: only on the pages that use it, so /artwork/[id] does not
            download and parse ~830 KB of unused JS. */}
        {needsClaims && (
          <>
            <link
              rel='stylesheet'
              href='https://claims.manifoldxyz.dev/1.10.0/claimComplete.css'
            />
            <Script
              src='https://claims.manifoldxyz.dev/1.10.0/claimComplete.umd.min.js'
              strategy='afterInteractive'
            />
          </>
        )}

        {/* <link
          rel='stylesheet'
          href='https://claims.manifoldxyz.dev/1.3.9/claimComplete.css'
        />
        <script
          src='https://claims.manifoldxyz.dev/1.3.9/claimComplete.umd.min.js'
          async
        ></script> */}
      </div>

      <main className={`${din.variable} font-din`}>
        <ParallaxProvider>
          <Component {...pageProps} />
          <Analytics />
        </ParallaxProvider>
      </main>
    </>
  );
}

export default appWithTranslation(MyApp);
