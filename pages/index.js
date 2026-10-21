import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Listing from '../components/Listing';
import Connect from '../components/Connect';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Section2 from '../components/Section2';
import Section3 from '../components/Section3';
import Section4 from '../components/Section4';
import Section5 from '../components/Section5';
import Footer from '../components/Footer';
import Detail from '../components/Detail';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Section6 from '../components/Section6';
import Vista from '../components/Vista';
import { getListings } from '../lib/listings';
import series from '../data/series.json';
import vista2 from '../public/img/vistas/002.jpg';
import vista3 from '../public/img/vistas/003.jpg';
import vista4 from '../public/img/vistas/004.jpg';
import vista5 from '../public/img/vistas/005.jpg';

export default function Home({ listings }) {
  const [showListings, setShowListings] = useState(false);

  useEffect(() => {
    setShowListings(true);
  }, []);

  return (
    <div className='w-screen bg-black'>
      {/* <Head>
        <title>Marketplace do Antílope</title>
        <meta name='description' content='Marketplace do Antílope Cerejinha' />
        <link rel='icon' href='/favicon.ico' />
      </Head> */}
      <Hero />
      <Section2 />
      {/* <Detail /> */}
      <Vista img={vista2} />
      <Section3 listings={listings} />
      <Section4 />

      <Section5 />

      <Section6 />
      <Vista img={vista5} />
      <Footer />
    </div>
  );
}

// export function getStaticProps() {
//   return {
//     props: {},
//   };
// }

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Live price/status from the Manifold marketplace contract, refreshed at most once a minute.
      listings: await getListings(series.map((item) => item.id)),
    },
    revalidate: 60,
  };
}
