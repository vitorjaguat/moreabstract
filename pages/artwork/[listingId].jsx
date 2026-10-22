import Connect from '../../components/Connect';
import ListingGate from '../../components/ListingGate';
import WarmUp from '../../components/WarmUp';
import artworks from '../../data/artworks.json';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Listing.module.css';

export default function ListingID({ listingId, artwork }) {
  const router = useRouter();

  return (
    <div className='image-aligned w-screen bg-black'>
      <WarmUp artwork={artwork} />
      {/* -- Add Connect Widget -- */}
      <div className='flex w-full justify-between items-stretch p-8 pb-4 md:pb-8 px-3 md:px-8'>
        <div
          onClick={() => router.push('/')}
          className='flex justify-center items-center cursor-pointer rounded-lg border-[0.5px] py-3 px-5 md:px-8 hover:text-slate-400 hover:bg-slate-900 text-sm tracking-widest md:w-[200px]'
        >
          HOME
        </div>

        <Connect network='1' />
      </div>

      {/* ~~ Add Marketplace Widget component ~~ */}
      <div className='md:max-w-[1100px] mx-auto listing'>
        <ListingGate
          key={listingId}
          id={listingId}
          // network={process.env.NEXT_APP_NETWORK}
          // id={'4250'}
          network='1'
        />
      </div>

      <div className='mt-10 flex w-full justify-between items-stretch p-8 pb-4 md:pb-8 px-3 md:px-8'>
        <div
          onClick={() => router.push('/')}
          className='flex justify-center items-center cursor-pointer rounded-lg border-[0.5px] py-3 px-5 hover:text-slate-400 hover:bg-slate-900 text-sm tracking-widest md:w-[200px]'
        >
          HOME
        </div>

        <Connect network='1' />
      </div>
    </div>
  );
}

// The listing id is known at build time, so it is in the HTML from the first paint
// (the Manifold widget no longer has to wait for hydration to learn it).
export function getStaticPaths({ locales }) {
  const paths = Object.keys(artworks).flatMap((listingId) =>
    locales.map((locale) => ({ params: { listingId }, locale }))
  );
  return { paths, fallback: 'blocking' };
}

export function getStaticProps({ params }) {
  return {
    props: {
      listingId: params.listingId,
      artwork: artworks[params.listingId] ?? null,
    },
  };
}
